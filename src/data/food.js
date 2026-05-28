export const variaties = {
  koolhydraten: [
    "100g aardappelen (= 1,5 opscheplepel)",
    "100g aardappelpuree",
    "60g volkoren pasta",
    "55g zilvervliesrijst",
  ],
  vlees: [
    "varkenshaasje (100g)","varkensfricandeau (100g)","kipfilet (100g)",
    "rosbief (100g)","runderrollade (100g)","runderbieflapje (100g)",
    "schnitzel ongepaneerd (100g)","biefstuk (100g)","tartaar (100g)","rundergehaktbal (50g)",
  ],
  vis: [
    "pangasiusfilet (100g)","kabeljauw (100g)","koolvis (100g)",
    "mosselen (100g)","gamba's (100g)","gerookte zalm (60g)","gegrilde zalm (60g)",
  ],
  beleg: [
    "runderrookvlees","fricandeau","achterham","rosbief",
    "kipfilet","kaas 30+","Philadelphia light","jam","stroop",
  ],
  zuivel: [
    "150ml magere yoghurt","120ml halfvolle yoghurt",
    "120ml vla of kwark (Optimel)","100g magere kwark",
  ],
};

export const catLabels = { koolhydraten:"koolhydraat", vlees:"vleesvervanger", vis:"visvervanger", beleg:"beleg", zuivel:"zuivel" };

export const food = [
  { day:1, meals:[
    { label:"Ontbijt", items:["20g havermout","1 schaaltje magere yoghurt","1 appel of ander fruit"], vars:[{key:"yoghurt",cat:"zuivel"}] },
    { label:"Tussendoor ochtend", items:["1 sinaasappel of ander fruit"], vars:[] },
    { label:"Lunch", items:["1 tosti 30+ kaas, champignons, uien, peterselie + rauwkost","1 schaaltje magere yoghurt"], vars:[{key:"yoghurt",cat:"zuivel"}] },
    { label:"Tussendoor middag", items:["2 mandarijnen of 1 ander fruit"], vars:[] },
    { label:"Diner", items:["100g tonijn in olie (1 el)","4 opscheplepels groente z.zout","2 opscheplepels volkoren pasta z.zout"], vars:[{key:"vis",cat:"vis"},{key:"koolhydraat",cat:"koolhydraten"}] },
    { label:"Tussendoor avond", items:["1 snee geroosterd volkorenbrood + mager beleg","1 schaaltje magere yoghurt"], vars:[{key:"beleg",cat:"beleg"},{key:"zuivel",cat:"zuivel"}] },
  ]},
  { day:2, meals:[
    { label:"Ontbijt", items:["1 snee geroosterd brood + magere vleeswaren","1 schaaltje yoghurt"], vars:[{key:"beleg",cat:"beleg"},{key:"zuivel",cat:"zuivel"}] },
    { label:"Tussendoor ochtend", items:["1 appel"], vars:[] },
    { label:"Lunch", items:["1 snee volkorenbrood + 30+ kaas, tomaat, komkommer","1 snee volkorenbrood + magere vleeswaren","1 mandarijn"], vars:[{key:"beleg",cat:"beleg"}] },
    { label:"Tussendoor middag", items:["1 schaaltje kwark"], vars:[{key:"zuivel",cat:"zuivel"}] },
    { label:"Diner", items:["2 opscheplepels zilvervliesrijst z.zout","100g kipfilet gebakken in olie (1 el)","4 opscheplepels wokgroente + beetje zoete ketjap"], vars:[{key:"koolhydraat",cat:"koolhydraten"},{key:"vlees",cat:"vlees"}] },
    { label:"Tussendoor avond", items:["1 minneola of sinaasappel","1 schaaltje magere yoghurt of kwark"], vars:[{key:"zuivel",cat:"zuivel"}] },
  ]},
  { day:3, meals:[
    { label:"Ontbijt", items:["1 snee geroosterd volkorenbrood + magere vleeswaren","1 schaaltje yoghurt"], vars:[{key:"beleg",cat:"beleg"},{key:"zuivel",cat:"zuivel"}] },
    { label:"Tussendoor ochtend", items:["1 appel"], vars:[] },
    { label:"Lunch", items:["1 snee volkorenbrood + appelstroop","1 snee volkorenbrood + magere vleeswaren","1 peer"], vars:[{key:"beleg",cat:"beleg"}] },
    { label:"Tussendoor middag", items:["1 schaaltje yoghurt of kwark"], vars:[{key:"zuivel",cat:"zuivel"}] },
    { label:"Diner", items:["2 opscheplepels aardappelen","100g pangasiusfilet gebakken in olie (1 el)","4 opscheplepels groente z.zout"], vars:[{key:"koolhydraat",cat:"koolhydraten"},{key:"vis",cat:"vis"}] },
    { label:"Tussendoor avond", items:["1 sinaasappel","1 schaaltje magere yoghurt of kwark"], vars:[{key:"zuivel",cat:"zuivel"}] },
  ]},
];
