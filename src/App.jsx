import { useState, useEffect } from "react";
import { food, variaties, catLabels } from "./data/food";
import { workoutsByWeek } from "./data/workouts";

const DEFAULT_START = "2026-05-13";

const DAY_NAMES = ["zo","ma","di","wo","do","vr","za"];
const MONTH_NAMES = ["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"];

function parseLocalDate(str) {
  const [y,m,d] = str.split("-").map(Number);
  return new Date(y, m-1, d);
}

function daysBetween(a, b) {
  const ua = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const ub = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((ub - ua) / 86400000);
}

function addDays(date, n) {
  const d = new Date(date); d.setDate(d.getDate() + n); return d;
}

function pickOther(arr, excludeIdx) {
  if (arr.length <= 1) return 0;
  const choices = arr.map((_,i) => i).filter(i => i !== excludeIdx);
  return choices[Math.floor(Math.random() * choices.length)];
}

export default function ChallengePlanner() {
  const [startStr, setStartStr] = useState(() => {
    try { return localStorage.getItem("challenge_start") || DEFAULT_START; } catch { return DEFAULT_START; }
  });
  const [showSettings, setShowSettings] = useState(false);
  const [tempStart, setTempStart] = useState(startStr);
  const [offset, setOffset] = useState(0);
  const [tab, setTab] = useState("food");
  const [varIdx, setVarIdx] = useState({});

  const startDate = parseLocalDate(startStr);

  useEffect(() => {
    const today = new Date(); today.setHours(0,0,0,0);
    const diff = daysBetween(startDate, today);
    setOffset(Math.max(0, Math.min(27, diff)));
    setVarIdx({});
  }, [startStr]);

  function saveStart() {
    if (!tempStart) return;
    try { localStorage.setItem("challenge_start", tempStart); } catch {}
    setStartStr(tempStart);
    setShowSettings(false);
  }

  function navigate(delta) {
    setOffset(o => Math.max(0, Math.min(27, o + delta)));
    setVarIdx({});
  }

  const date = addDays(startDate, offset);
  const week = Math.floor(offset / 7) + 1;
  const foodDay = (offset % 3) + 1;
  const workoutIdx = Math.min(offset % 7, 6);
  const weekIdx = Math.min(week - 1, workoutsByWeek.length - 1);
  const fd = food[foodDay - 1];
  const wo = workoutsByWeek[weekIdx][workoutIdx];
  const showVariaties = week >= 2;

  const todayOffset = (() => {
    const today = new Date(); today.setHours(0,0,0,0);
    return Math.max(0, Math.min(27, daysBetween(startDate, today)));
  })();
  const isToday = offset === todayOffset;

  function shuffle(mealIdx, varKey, cat) {
    const k = `${mealIdx}_${varKey}`;
    const cur = varIdx[k] !== undefined ? varIdx[k] : -1;
    setVarIdx(prev => ({ ...prev, [k]: pickOther(variaties[cat], cur) }));
  }

  function getVar(mealIdx, varKey, cat) {
    const k = `${mealIdx}_${varKey}`;
    const i = varIdx[k];
    return i !== undefined ? variaties[cat][i] : null;
  }

  const S = { // shared styles
    card: { background:"#fff", borderRadius:10, border:"1px solid #f0ece4", padding:"12px 14px", marginBottom:14 },
    mono: { fontFamily:"monospace" },
    btn: (active) => ({ flex:1, padding:"10px 0", border:"none", cursor:"pointer", fontSize:13, fontFamily:"monospace", letterSpacing:1, textTransform:"uppercase", background:active?"#111827":"#fff", color:active?"#fff":"#6b7280" }),
  };

  return (
    <div style={{ fontFamily:"'Georgia',serif", maxWidth:480, margin:"0 auto", padding:"16px 12px", background:"#fafaf8", minHeight:"100vh" }}>

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
        <div>
          <div style={{ fontSize:11, ...S.mono, letterSpacing:3, color:"#9ca3af", textTransform:"uppercase", marginBottom:4 }}><a href="https://www.viev1.nl/" target="_blank">Viev1</a> · 4 Weken Challenge</div>
          <div style={{ display:"flex", alignItems:"baseline", gap:8 }}>
            <span style={{ fontSize:26, fontWeight:700, color:"#111827", letterSpacing:-1 }}>
              {DAY_NAMES[date.getDay()]} {date.getDate()} {MONTH_NAMES[date.getMonth()]}
            </span>
            {isToday && <span style={{ fontSize:11, background:"#111827", color:"#fff", borderRadius:4, padding:"2px 7px", ...S.mono, letterSpacing:1 }}>VANDAAG</span>}
          </div>
        </div>
        <button onClick={() => { setTempStart(startStr); setShowSettings(s=>!s); }}
          style={{ background:"none", border:"1px solid #e5e7eb", borderRadius:8, padding:"7px 11px", cursor:"pointer", fontSize:15, color:"#6b7280" }}>
          ⚙
        </button>
      </div>

      {/* Settings */}
      {showSettings && (
        <div style={{ ...S.card, marginBottom:20 }}>
          <div style={{ fontSize:11, ...S.mono, letterSpacing:2, color:"#9ca3af", textTransform:"uppercase", marginBottom:10 }}>Startdatum challenge</div>
          <div style={{ display:"flex", gap:8 }}>
            <input type="date" value={tempStart} onChange={e=>setTempStart(e.target.value)}
              style={{ flex:1, padding:"8px 10px", border:"1px solid #e5e7eb", borderRadius:8, fontSize:14, ...S.mono, background:"#fafaf8" }} />
            <button onClick={saveStart}
              style={{ padding:"8px 14px", background:"#111827", color:"#fff", border:"none", borderRadius:8, ...S.mono, fontSize:12, letterSpacing:1, cursor:"pointer" }}>
              OK
            </button>
            <button onClick={()=>setShowSettings(false)}
              style={{ padding:"8px 12px", background:"none", border:"1px solid #e5e7eb", borderRadius:8, fontSize:14, cursor:"pointer", color:"#6b7280" }}>
              ✕
            </button>
          </div>
          <div style={{ fontSize:11, color:"#9ca3af", marginTop:8, ...S.mono }}>Opgeslagen in je browser · standaard: {DEFAULT_START}</div>
        </div>
      )}

      {/* Week strip */}
      <div style={{ display:"flex", gap:3, marginBottom:20 }}>
        {Array.from({length:28}).map((_,i) => (
          <div key={i} onClick={()=>{ setOffset(i); setVarIdx({}); }}
            style={{ flex:1, height:28, borderRadius:4, cursor:"pointer",
              background: i===offset?"#111827": i<offset?"#d1d5db":"#e5e7eb",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:9, color:i===offset?"#fff":"#6b7280", ...S.mono }}>
            {i%7===0 ? `W${Math.floor(i/7)+1}` : ""}
          </div>
        ))}
      </div>

      {/* Nav */}
      <div style={{ display:"flex", gap:8, marginBottom:20 }}>
        <button onClick={()=>navigate(-1)} disabled={offset===0}
          style={{ flex:1, padding:"10px 0", border:"1.5px solid #e5e7eb", borderRadius:8, background:"#fff", fontSize:18, cursor:offset===0?"default":"pointer", opacity:offset===0?0.3:1 }}>←</button>
        <button onClick={()=>{ setOffset(todayOffset); setVarIdx({}); }}
          style={{ flex:2, padding:"10px 0", border:"1.5px solid #111827", borderRadius:8, background:isToday?"#111827":"#fff", color:isToday?"#fff":"#111827", fontSize:13, ...S.mono, letterSpacing:1, cursor:"pointer" }}>
          VANDAAG
        </button>
        <button onClick={()=>navigate(1)} disabled={offset===27}
          style={{ flex:1, padding:"10px 0", border:"1.5px solid #e5e7eb", borderRadius:8, background:"#fff", fontSize:18, cursor:offset===27?"default":"pointer", opacity:offset===27?0.3:1 }}>→</button>
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", borderRadius:10, overflow:"hidden", border:"1.5px solid #e5e7eb", marginBottom:20 }}>
        <button onClick={()=>setTab("food")} style={S.btn(tab==="food")}>🥦 Voeding</button>
        <button onClick={()=>setTab("workout")} style={S.btn(tab==="workout")}>💪 Training</button>
      </div>

      {/* Food */}
      {tab==="food" && (
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <span style={{ fontSize:12, color:"#6b7280", ...S.mono }}>VOEDINGSDAG {foodDay} · WEEK {week}</span>
            {showVariaties && (
              <span style={{ fontSize:11, background:"#ecfdf5", color:"#065f46", border:"1px solid #6ee7b7", borderRadius:4, padding:"2px 8px", ...S.mono }}>
                variaties actief ✓
              </span>
            )}
          </div>

          {fd.meals.map((meal, mi) => (
            <div key={mi} style={S.card}>
              <div style={{ fontSize:10, ...S.mono, letterSpacing:2, color:"#9ca3af", textTransform:"uppercase", marginBottom:8 }}>{meal.label}</div>
              {meal.items.map((item,j) => (
                <div key={j} style={{ fontSize:14, color:"#374151", lineHeight:1.7, display:"flex", gap:8, alignItems:"flex-start" }}>
                  <span style={{ color:"#d1d5db", marginTop:2, flexShrink:0 }}>·</span><span>{item}</span>
                </div>
              ))}
              {showVariaties && meal.vars && meal.vars.length > 0 && (
                <div style={{ marginTop:10, paddingTop:10, borderTop:"1px dashed #e5e7eb", display:"flex", flexDirection:"column", gap:8 }}>
                  {meal.vars.map(({key,cat}) => {
                    const val = getVar(mi, key, cat);
                    return (
                      <div key={key} style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <div style={{ flex:1 }}>
                          <div style={{ fontSize:10, ...S.mono, color:"#059669", letterSpacing:1, textTransform:"uppercase" }}>
                            variatie {catLabels[cat]}
                          </div>
                          <div style={{ fontSize:13, color: val?"#065f46":"#9ca3af", marginTop:3,
                            background: val?"#ecfdf5":"transparent",
                            borderRadius:6, padding: val?"4px 8px":"0", fontStyle: val?"italic":"normal" }}>
                            {val ? `↳ ${val}` : "Druk op 🔀 voor een suggestie"}
                          </div>
                        </div>
                        <button onClick={()=>shuffle(mi,key,cat)}
                          style={{ flexShrink:0, width:34, height:34, borderRadius:8, border:"1px solid #6ee7b7", background:"#f0fdf4", cursor:"pointer", fontSize:16 }}
                          title="Andere variatie">🔀</button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          {!showVariaties && (
            <div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:10, padding:"10px 14px", fontSize:12, color:"#166534", ...S.mono, marginBottom:14 }}>
              💡 Vanaf week 2 verschijnen variatie-suggesties per maaltijd
            </div>
          )}
          <div style={{ background:"#fffbeb", border:"1px solid #fde68a", borderRadius:10, padding:"12px 14px", fontSize:12, color:"#92400e", lineHeight:1.6, ...S.mono }}>
            ⚠ Brood altijd roosteren · 2–3L water · geen alcohol
          </div>
        </div>
      )}

      {/* Workout */}
      {tab==="workout" && (
        <div>
          <div style={{ background:wo.bg, border:`1.5px solid ${wo.color}33`, borderRadius:12, padding:"12px 14px", marginBottom:14 }}>
            <div style={{ fontSize:10, ...S.mono, letterSpacing:2, color:wo.color, textTransform:"uppercase" }}>{wo.tag}</div>
            <div style={{ fontSize:18, fontWeight:700, color:"#111827", letterSpacing:-0.5 }}>{wo.type}</div>
            {wo.note && <div style={{ fontSize:12, color:"#6b7280", marginTop:2 }}>{wo.note}</div>}
          </div>
          {wo.exercises.length===0 ? (
            <div style={{ textAlign:"center", padding:"32px 0", color:"#9ca3af", fontSize:14 }}>
              <div style={{ fontSize:32, marginBottom:8 }}>🛌</div>
              Rust en herstel. Drink voldoende water!
            </div>
          ) : wo.exercises.map((ex,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", ...S.card }}>
              <div>
                <div style={{ fontSize:14, color:"#111827", fontWeight:500 }}>{ex.name}</div>
                <div style={{ fontSize:12, color:"#9ca3af", marginTop:1, ...S.mono }}>{ex.sets}</div>
              </div>
              <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(ex.q)}`} target="_blank" rel="noreferrer"
                style={{ fontSize:11, color:"#dc2626", ...S.mono, textDecoration:"none", border:"1px solid #fca5a5", borderRadius:6, padding:"4px 8px", whiteSpace:"nowrap", background:"#fff7f7" }}>
                ▶ video
              </a>
            </div>
          ))}
        </div>
      )}

      <a href="https://www.viev1.nl/" target="_blank" style={{ textAlign:"center", marginTop:24, fontSize:10, color:"#d1d5db", ...S.mono, letterSpacing:2 }}>
        VIEV1 · www.viev1.nl
      </a>
    </div>
  );
}
