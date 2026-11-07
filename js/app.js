/* ---------- utilities ---------- */
const $ = (s, r=document) => r.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const T0 = Date.now();
function at(dayOff, h=23, m=59){ const d=new Date(T0); d.setDate(d.getDate()+dayOff); d.setHours(h,m,0,0); return d.getTime(); }
const sod = ts => { const d=new Date(ts); d.setHours(0,0,0,0); return d.getTime(); };
const dayDiff = ts => Math.round((sod(ts)-sod(Date.now()))/86400000);
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const WD=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const WDL=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const DAYS=['U','M','T','W','R','F','S'];
function hm(min){ let h=Math.floor(min/60)%24, m=min%60; const ap=h>=12?'PM':'AM'; h=h%12||12; return `${h}:${String(m).padStart(2,'0')} ${ap}`; }
function hmr(a,b){ return `${hm(a).replace(/ (AM|PM)$/, (a<720)===(b<720)?'':' $1')}–${hm(b)}`; }
const tmin = ts => { const d=new Date(ts); return d.getHours()*60+d.getMinutes(); };
const fTime = ts => hm(tmin(ts));
const fDay = ts => { const d=new Date(ts); return `${WD[d.getDay()]}, ${MON[d.getMonth()]} ${d.getDate()}`; };
const fWhen = ts => `${fDay(ts)} · ${fTime(ts)}`;
const dkey = ts => { const d=new Date(ts); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
const money = n => (n<0?'−':'')+'$'+Math.abs(n).toFixed(2);
function ago(ts){ const s=(Date.now()-ts)/1000; if(s<60) return 'now'; if(s<3600) return Math.floor(s/60)+'m'; if(s<86400) return Math.floor(s/3600)+'h'; return Math.floor(s/86400)+'d'; }
function dueRel(ts){
  const d=ts-Date.now();
  if(d<0) return {t: d>-86400000?'Overdue':`${Math.ceil(-d/86400000)}d overdue`, c:'crit'};
  const m=Math.round(d/60000);
  if(m<60) return {t:`in ${m} min`, c:'crit'};
  if(m<24*60) return {t:`in ${Math.round(m/60)} h`, c:'crit'};
  const dd=dayDiff(ts);
  return {t: dd<=1?'Tomorrow':`in ${dd} days`, c: dd<=3?'warn':'norm'};
}
function hash(str){ let h=2166136261; for(const ch of str){ h^=ch.charCodeAt(0); h=Math.imul(h,16777619);} return Math.abs(h); }
const uid = () => Math.random().toString(36).slice(2,9);
const initials = n => n.split(' ').map(w=>w[0]).slice(0,2).join('');

const IC = {
  home:'M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z',
  book:'M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5',
  map:'M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z M9 4v14 M15 6v14',
  users:'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
  user:'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  bell:'M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9 M13.7 21a2 2 0 0 1-3.4 0',
  cal:'M3 5h18v16H3z M16 3v4 M8 3v4 M3 10h18',
  clock:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2',
  check:'M20 6 9 17l-5-5',
  plus:'M12 5v14 M5 12h14',
  search:'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.3-4.3',
  right:'M9 18l6-6-6-6', left:'M15 18l-6-6 6-6', x:'M18 6 6 18 M6 6l12 12',
  shield:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  walk:'M13 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M9 22l3-7 3 3v4 M6 12l3-4 4 1 3 4 M12 15l-1-6',
  fork:'M3 2v7c0 1.1.9 2 2 2a2 2 0 0 0 2-2V2 M5 11v11 M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3z M21 15v7',
  wallet:'M3 7h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M3 7l12-4v4 M17 14h.01',
  heart:'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z',
  chat:'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  send:'M22 2 11 13 M22 2l-7 20-4-9-9-4z',
  upload:'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M17 8l-5-5-5 5 M12 3v12',
  cap:'M22 10 12 5 2 10l10 5z M6 12v5c3 2 9 2 12 0v-5',
  pin:'M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  door:'M4 21h16 M6 21V3h12v18 M14 12h.01',
  list:'M8 6h13 M8 12h13 M8 18h13 M3 6h.01 M3 12h.01 M3 18h.01',
  bulb:'M9 18h6 M10 22h4 M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z',
  dollar:'M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  sliders:'M4 21v-7 M4 10V3 M12 21v-9 M12 8V3 M20 21v-5 M20 12V3 M1 14h6 M9 8h6 M17 16h6',
  qr:'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h3v3h-3z M20 14v.01 M14 20h.01 M17 20h4v-3',
  mega:'M3 11v2a1 1 0 0 0 1 1h3l6 4V6L7 10H4a1 1 0 0 0-1 1z M17 8a5 5 0 0 1 0 8',
  timer:'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M12 10v4l2 2 M9 2h6',
  file:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M8 13h8 M8 17h5',
  alert:'M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z M12 9v4 M12 17h.01',
  up:'M12 19V5 M5 12l7-7 7 7',
  grid:'M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z',
  tag:'M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z M7.5 7.5h.01',
  swap:'M17 1l4 4-4 4 M3 11V9a4 4 0 0 1 4-4h14 M7 23l-4-4 4-4 M21 13v2a4 4 0 0 1-4 4H3',
  inbox:'M22 12h-6l-2 3h-4l-2-3H2 M5.5 5h13L22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z',
  trash:'M3 6h18 M8 6V4h8v2 M19 6l-1 14H6L5 6',
  copy:'M9 9h11v11H9z M5 15H4V4h11v1',
  link:'M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7 M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7',
  refresh:'M23 4v6h-6 M1 20v-6h6 M3.5 9a9 9 0 0 1 14.9-3.4L23 10 M1 14l4.6 4.4A9 9 0 0 0 20.5 15',
  star:'M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z',
  play:'M6 4l14 8-14 8z',
  brief:'M3 7h18v13H3z M8 7V4h8v3 M3 13h18', bookmark:'M19 21l-7-5-7 5V3h14z',
  coffee:'M17 8h1a4 4 0 0 1 0 8h-1 M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z M6 2v3 M10 2v3 M14 2v3',
  layers:'M12 2 2 7l10 5 10-5z M2 17l10 5 10-5 M2 12l10 5 10-5', arrow:'M5 12h14 M13 6l6 6-6 6', minus:'M5 12h14',
  nav:'M3 11 21 3l-8 18-2-8z', bldg:'M4 21V4h11v17 M15 9h5v12 M8 8h3 M8 12h3 M8 16h3 M2 21h20',
  phone:'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z',
  access:'M12 6.5a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5z M6 9h12 M12 9v5 M9 21l3-7 3 7',
  sun:'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z M12 1v2 M12 21v2 M4.2 4.2l1.4 1.4 M18.4 18.4l1.4 1.4 M1 12h2 M21 12h2 M4.2 19.8l1.4-1.4 M18.4 5.6l1.4-1.4',
  moon:'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z', pause:'M6 4h4v16H6z M14 4h4v16h-4z',
};
const ic = (n, cls='') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${IC[n]||''}"/></svg>`;
const CREST = (s=32) => `<svg width="${s}" height="${s}" viewBox="0 0 32 32" aria-hidden="true"><path d="M4 4h24v12c0 7-6 11.5-12 13C10 27.5 4 23 4 16z" fill="var(--brick)"/><path d="M8 10h16M8 14h16M8 18h16M11 7v16M16 7v19M21 7v16" stroke="#fff" stroke-opacity=".55" stroke-width="1.4" fill="none"/><path d="M4 4h24v12c0 7-6 11.5-12 13C10 27.5 4 23 4 16z" fill="none" stroke="#fff" stroke-opacity=".85" stroke-width="1.5"/></svg>`;

/* ---------- reference data ---------- */
const COURSES = [
  {id:'MATH211',code:'MATH 211',title:'Calculus I',prof:'sato',days:'MWF',start:600,end:650,room:'COR 108',cr:4,c:1},
  {id:'ENGL103',code:'ENGL 103',title:'Expository Writing',prof:'vasquez',days:'MWF',start:660,end:710,room:'FEN 302',cr:3,c:2},
  {id:'PSYC100',code:'PSYC 100',title:'Introduction to Psychology',prof:'brennan',days:'TR',start:540,end:615,room:'HAL 120',cr:3,c:3},
  {id:'FYS100',code:'FYS 100',title:'First-Year Seminar: Cities & Water',prof:'marsh',days:'TR',start:720,end:795,room:'FEN 210',cr:3,c:5},
  {id:'LDSP101',code:'LDSP 101',title:'Foundations of Leadership',prof:'langford',days:'TR',start:810,end:885,room:'ASH 205',cr:3,c:4},
  {id:'ACCT201',code:'ACCT 201',title:'Financial Accounting',prof:'okafor',days:'MWF',start:540,end:590,room:'ASH 110',cr:3,c:6},
  {id:'ECON101',code:'ECON 101',title:'Principles of Microeconomics',prof:'whitfield',days:'MWF',start:540,end:590,room:'ASH 120',cr:3,c:4},
  {id:'BIOL199',code:'BIOL 199',title:'Integrated Biology',prof:'hirsch',days:'TR',start:630,end:705,room:'COR 214',cr:4,c:3},
  {id:'HIST150',code:'HIST 150',title:'The Atlantic World',prof:'reyes',days:'MW',start:840,end:915,room:'FEN 115',cr:3,c:6},
  {id:'CMSC150',code:'CMSC 150',title:'Introduction to Programming',prof:'mehta',days:'MWF',start:780,end:830,room:'COR 330',cr:4,c:1},
  {id:'MUS110',code:'MUS 110',title:'Music & Culture',prof:'kovac',days:'TR',start:900,end:975,room:'ART 101',cr:3,c:5},
];
const CO = Object.fromEntries(COURSES.map(c=>[c.id,c]));
const PROFS = {
  sato:{name:'Ingrid Sato',title:'Associate Professor',dept:'Mathematics',office:'COR 214',email:'isato@ashgrove.edu',hours:[{d:'M',s:840,e:960},{d:'R',s:600,e:690}]},
  vasquez:{name:'Maren Vasquez',title:'Assistant Professor',dept:'English',office:'FEN 318',email:'mvasquez@ashgrove.edu',hours:[{d:'T',s:780,e:900},{d:'W',s:570,e:630}]},
  brennan:{name:'Nadia Brennan',title:'Professor',dept:'Psychology',office:'HAL 204',email:'nbrennan@ashgrove.edu',hours:[{d:'T',s:630,e:720},{d:'F',s:780,e:840}]},
  marsh:{name:'Owen Marsh',title:'Associate Professor',dept:'Geography & Environment',office:'FEN 210',email:'omarsh@ashgrove.edu',hours:[{d:'W',s:900,e:1020}]},
  langford:{name:'Theo Langford',title:'Professor',dept:'Leadership Studies',office:'ASH 312',email:'tlangford@ashgrove.edu',hours:[{d:'M',s:600,e:690},{d:'R',s:900,e:960}]},
  okafor:{name:'Delia Okafor',title:'Associate Professor',dept:'Accounting',office:'ASH 230',email:'dokafor@ashgrove.edu',hours:[{d:'W',s:780,e:900}]},
  whitfield:{name:'Grace Whitfield',title:'Assistant Professor',dept:'Economics',office:'ASH 241',email:'gwhitfield@ashgrove.edu',hours:[{d:'T',s:840,e:960}]},
  hirsch:{name:'Samuel Hirsch',title:'Professor',dept:'Biology',office:'COR 120',email:'shirsch@ashgrove.edu',hours:[{d:'M',s:780,e:870},{d:'W',s:780,e:870}]},
  reyes:{name:'Callum Reyes',title:'Associate Professor',dept:'History',office:'FEN 124',email:'creyes@ashgrove.edu',hours:[{d:'F',s:600,e:720}]},
  mehta:{name:'Arjun Mehta',title:'Assistant Professor',dept:'Computer Science',office:'COR 318',email:'amehta@ashgrove.edu',hours:[{d:'T',s:600,e:720},{d:'R',s:600,e:660}]},
  kovac:{name:'Elena Kovac',title:'Professor',dept:'Music',office:'ART 204',email:'ekovac@ashgrove.edu',hours:[{d:'W',s:660,e:780}]},
};
const BLD = {
  FEN:{name:'Fenwick Hall',kind:'Humanities classrooms & seminar rooms',pts:[[40,70],[190,70],[190,150],[40,150]],door:[190,112],via:'Q5',lbl:['FENWICK','HALL'],floors:3,hours:'7:00 AM – 11:00 PM'},
  LIB:{name:'Marlow Library',kind:'Library, study rooms, writing center',pts:[[215,20],[385,20],[385,100],[215,100]],door:[300,100],via:'Q6',lbl:['MARLOW','LIBRARY'],floors:3,hours:'7:30 AM – 2:00 AM'},
  COR:{name:'Corrigan Science Center',kind:'Sciences, math & computing',pts:[[410,60],[580,60],[580,150],[470,150],[470,120],[410,120]],door:[440,120],via:'Q7',lbl:['CORRIGAN','SCIENCE'],lblAt:[512,100],floors:3,hours:'7:00 AM – 12:00 AM'},
  HAL:{name:'Halloway Hall',kind:'Psychology & social sciences',pts:[[30,240],[130,240],[130,320],[30,320]],door:[130,305],via:'L10',lbl:['HALLOWAY','HALL'],floors:2,hours:'7:00 AM – 10:00 PM'},
  CHP:{name:'Bellamy Chapel',kind:'Chaplaincy, quiet space, concerts',pts:[[165,168],[225,168],[225,222],[165,222]],door:[225,195],via:'Q4',lbl:['BELLAMY','CHAPEL'],floors:1,hours:'8:00 AM – 9:00 PM'},
  ASH:{name:'Ashby School of Leadership & Business',kind:'Leadership studies, business, career center',pts:[[440,210],[580,210],[580,300],[500,300],[500,270],[440,270]],door:[470,270],via:'L14',lbl:['ASHBY','SCHOOL'],lblAt:[510,240],floors:3,hours:'7:00 AM – 11:00 PM'},
  THN:{name:'Thornfield Dining Hall',kind:'All-you-care-to-eat dining',pts:[[30,545],[150,545],[150,615],[30,615]],door:[110,545],via:'L7',lbl:['THORNFIELD','DINING'],floors:1,hours:'See Dining'},
  LAR:{name:'Larch Commons',kind:'Student center, café, mailroom',pts:[[215,545],[355,545],[355,610],[215,610]],door:[285,545],via:'L4',lbl:['LARCH','COMMONS'],floors:2,hours:'7:00 AM – 1:00 AM'},
  ART:{name:'Marlow Arts Center',kind:'Music, theatre, gallery',pts:[[425,545],[535,545],[535,605],[425,605]],door:[480,545],via:'L1',lbl:['ARTS','CENTER'],floors:2,hours:'8:00 AM – 11:00 PM'},
  SAF:{name:'Campus Safety',kind:'24/7 dispatch, lost & found',pts:[[548,545],[592,545],[592,605],[548,605]],door:[570,545],via:'L1',lbl:['SAFETY'],floors:1,hours:'Open 24/7'},
  LRH:{name:'Larch Hall',kind:'First-year residence hall',pts:[[30,670],[140,670],[140,760],[30,760]],door:[85,670],via:'R85',lbl:['LARCH','HALL'],floors:4,hours:'Residents only'},
  KES:{name:'Kestrel Hall',kind:'First-year residence hall',pts:[[165,670],[285,670],[285,760],[165,760]],door:[225,670],via:'R225',lbl:['KESTREL','HALL'],floors:4,hours:'Residents only'},
  WEL:{name:'Ashgrove Wellness Center',kind:'Health, counseling, recreation',pts:[[320,665],[500,665],[500,760],[410,760],[410,720],[320,720]],door:[410,665],via:'R410',lbl:['WELLNESS','CENTER'],lblAt:[455,698],floors:2,hours:'6:00 AM – 11:00 PM'},
};
const DINING = {
  THN:{name:'Thornfield Dining Hall',bldg:'THN',swipes:true,periods:[['Breakfast',420,630],['Lunch',660,870],['Dinner',1020,1230]],
    menu:{Breakfast:[['Buttermilk pancakes','V'],['Scrambled eggs','V GF'],['Tofu & pepper scramble','VG GF'],['Steel-cut oats with berries','VG GF'],['Turkey sausage','GF']],
          Lunch:[['Grilled chicken banh mi',''],['Lemongrass tofu bowl','VG GF'],['Tomato basil soup','V GF'],['Margherita flatbread','V'],['Build-your-own salad bar','VG GF']],
          Dinner:[['Herb roast chicken, root vegetables','GF'],['Mushroom & lentil shepherd’s pie','VG'],['Shrimp & grits','GF'],['Penne alla vodka','V'],['Braised collard greens','VG GF']]}},
  LCC:{name:'Larch Commons Café',bldg:'LAR',periods:[['All day',420,1380]],
    menu:{'All day':[['Espresso bar & cold brew','VG GF'],['Breakfast burrito','V'],['Turkey pesto panini',''],['Hummus veggie wrap','VG'],['Chai oat latte','VG GF']]}},
  LKM:{name:'Lakeside Market',bldg:'LAR',periods:[['All day',480,1440]],
    menu:{'All day':[['California rolls','GF'],['Fruit cups','VG GF'],['Chicken caesar wrap',''],['Overnight oats','V'],['Snacks & groceries','']]}},
  PER:{name:'The Perch',bldg:'LAR',periods:[['Late night',1200,1500]],
    menu:{'Late night':[['Smash burger',''],['Black bean burger','VG'],['Waffle fries','VG GF'],['Milkshakes','V GF'],['Chicken tenders','']]}},
};
const CLUBS = [
  {id:'debate',name:'Debate Union',cat:'Academic',members:46,policy:'approval',meets:'Thursdays 7:00 PM · FEN 115',desc:'Parliamentary debate for every level. We travel to six tournaments a year and run weekly practice rounds.'},
  {id:'run',name:'Ashgrove Running Club',cat:'Sports',members:88,policy:'open',meets:'Mon/Wed 6:30 AM · Lake loop',desc:'Easy group runs around Wren Lake and longer weekend routes on the river trails. All paces welcome.'},
  {id:'film',name:'Film Society',cat:'Arts',members:63,policy:'open',meets:'Fridays 9:00 PM · Larch Commons',desc:'Weekly screenings, a spring short-film festival, and equipment you can borrow for your own projects.'},
  {id:'cook',name:'Cooking Collective',cat:'Social',members:34,policy:'approval',meets:'Sundays 5:00 PM · Kestrel Hall kitchen',desc:'Members cook a shared dinner each week on a rotating theme. Space in the kitchen is limited, so we review requests.'},
  {id:'mun',name:'Model United Nations',cat:'Academic',members:52,policy:'approval',meets:'Tuesdays 8:00 PM · ASH 205',desc:'Prepare for regional conferences, write position papers, and represent countries in committee.'},
  {id:'invest',name:'Weaver Investment Fund',cat:'Career',members:41,policy:'approval',meets:'Wednesdays 6:00 PM · ASH 110',desc:'A student-managed portfolio. First-years join as analysts and pitch one stock per semester.'},
  {id:'notes',name:'The Lakeside Notes',cat:'Arts',members:16,policy:'approval',meets:'Mon/Thu 8:00 PM · ART 101',desc:'Co-ed a cappella. Auditions each fall and spring.'},
  {id:'outdoor',name:'Outdoor Adventure Club',cat:'Sports',members:120,policy:'open',meets:'Trips most weekends',desc:'Kayaking on the river, Blue Ridge hikes, and climbing nights. Gear is free to borrow.'},
  {id:'robotics',name:'Robotics Lab',cat:'Academic',members:29,policy:'open',meets:'Saturdays 1:00 PM · COR 330',desc:'Build autonomous robots for spring competitions. No experience needed.'},
  {id:'build',name:'Build Week Volunteers',cat:'Service',members:74,policy:'open',meets:'Monthly service days',desc:'Repair and build homes with local partners in the city on monthly service days.'},
];
const CLUB = Object.fromEntries(CLUBS.map(c=>[c.id,c]));
const INTEREST_POOL = ['Running','Indie film','Debate','Cooking','Hiking','Photography','Investing','Writing','Gaming','Volunteering','Podcasts','Soccer','Robotics','Model UN','A cappella','Painting'];
const PEERS = [
  {id:'maya',name:'Maya Thompson',year:'First-year',dorm:'Kestrel Hall',courses:['MATH211','ENGL103','FYS100'],interests:['Running','Debate','Podcasts'],rq:[2,4,3,2,4],c:2},
  {id:'leo',name:'Leo Park',year:'First-year',dorm:'Larch Hall',courses:['PSYC100','MATH211'],interests:['Indie film','Gaming','Cooking'],rq:[4,2,4,4,2],c:1},
  {id:'hannah',name:'Hannah Okoye',year:'First-year',dorm:'Larch Hall',courses:['ENGL103','LDSP101'],interests:['Debate','Writing','Volunteering'],rq:[2,5,2,2,5],c:5},
  {id:'diego',name:'Diego Ramirez',year:'First-year',dorm:'Kestrel Hall',courses:['ECON101','MATH211'],interests:['Investing','Soccer','Running'],rq:[3,3,4,3,3],c:4},
  {id:'zoe',name:'Zoe Klein',year:'First-year',dorm:'Larch Hall',courses:['PSYC100','FYS100'],interests:['Cooking','Photography','Indie film'],rq:[2,4,2,3,4],c:3},
  {id:'sam',name:'Sam Whitaker',year:'First-year',dorm:'Kestrel Hall',courses:['CMSC150'],interests:['Robotics','Gaming'],rq:[5,2,3,5,2],c:6},
  {id:'priya',name:'Priya Natarajan',year:'First-year',dorm:'Larch Hall',courses:['ENGL103','PSYC100','HIST150'],interests:['Model UN','Debate','Writing'],rq:[1,5,2,1,5],c:5},
  {id:'owen',name:'Owen Fairley',year:'First-year',dorm:'Kestrel Hall',courses:['MUS110','FYS100'],interests:['A cappella','Hiking'],rq:[3,3,5,4,2],c:1},
];
const PEER = Object.fromEntries(PEERS.map(p=>[p.id,p]));
const RQ = [['Bedtime','Early (10 PM)','Late (2 AM)'],['Tidiness','Relaxed','Spotless'],['Guests','Rarely','Often'],['Noise','Quiet','Music on'],['Study spot','Out of the room','In the room']];
const HEALTH = [
  {id:'caps',name:'Counseling & Psychological Services',short:'CAPS',where:'WEL',floor:'2nd floor',hours:'Mon–Fri 8:30 AM – 5:00 PM',phone:'(804) 555-0142',note:'Free, confidential counseling. Same-day consultations every weekday. After-hours counselor by phone 24/7.',appt:true},
  {id:'shc',name:'Student Health Center',short:'Health Center',where:'WEL',floor:'1st floor',hours:'Mon–Fri 8:30 AM – 5:00 PM · Sat 10:00 AM – 1:00 PM',phone:'(804) 555-0150',note:'Sick visits, flu shots, STI testing, and prescriptions. Nurse advice line 24/7.',appt:true},
  {id:'das',name:'Disability & Accessibility Services',short:'Accessibility',where:'LIB',floor:'Room 105',hours:'Mon–Fri 9:00 AM – 5:00 PM',phone:'(804) 555-0163',note:'Academic accommodations, testing center, and housing accommodations.',appt:true},
  {id:'hp',name:'Health Promotion & Recovery Support',short:'Health Promotion',where:'WEL',floor:'Room 210',hours:'Mon–Fri 10:00 AM – 6:00 PM',phone:'(804) 555-0171',note:'Sleep, nutrition, alcohol and substance-use education, and peer recovery meetings.',appt:false},
  {id:'adv',name:'Confidential Advocate (Title IX resources)',short:'Advocate',where:'WEL',floor:'Room 214',hours:'Mon–Fri 9:00 AM – 5:00 PM · on-call 24/7',phone:'(804) 555-0177',note:'Confidential support after sexual misconduct, stalking, or relationship violence.',appt:true},
  {id:'chap',name:'Office of the Chaplaincy',short:'Chaplaincy',where:'CHP',floor:'Lower level',hours:'Mon–Fri 9:00 AM – 5:00 PM',phone:'(804) 555-0185',note:'Multifaith chaplains for pastoral care, grief support, and conversation.',appt:false},
];
const DISCOUNTS = [
  {name:'Canalside Coffee',cat:'Food',deal:'15% off any drink',code:'WEAVER15',where:'0.4 mi · Grove Ave'},
  {name:'Fan District Bikes',cat:'Transport',deal:'10% off tune-ups and helmets',code:'AGU10',where:'1.8 mi'},
  {name:'Riverbend Cinema',cat:'Fun',deal:'$6 tickets every Tuesday',code:'Show Weaver ID',where:'2.3 mi'},
  {name:'Lakeside Bookshop',cat:'Books',deal:'20% off used textbooks',code:'SPINE20',where:'On campus · LAR'},
  {name:'FitRiver Climbing',cat:'Fun',deal:'No initiation fee, $45/month',code:'WEAVERCLIMB',where:'3.1 mi'},
  {name:'Grove Pizza Co.',cat:'Food',deal:'Large pizza $10 Sun–Wed',code:'Show Weaver ID',where:'0.6 mi'},
  {name:'Metro Transit',cat:'Transport',deal:'Free bus rides with Weaver ID',code:'Tap ID on reader',where:'Citywide'},
];
const FEATURES = [
  [1,'Course schedule builder & LMS import','schedule',0],[2,'Assignment & exam tracker','deadlines',0],[3,'Deadline reminders & push','notif-settings',0],
  [4,'Grade & GPA calculator','grades',0],[5,'Study planner & focus timer','study',0],[6,'Syllabus date extraction','syllabus',0],
  [7,'Professor directory & office hours','profs',0],[8,'Campus events calendar','events',1],[9,'Clubs & join requests','clubs',1],
  [10,'Profile & interests','me',1],[11,'Classmate & roommate matching','match',0],[12,'Group chat & study groups','chats',1],
  [13,'Event RSVP & QR check-in','ticket',1],[14,'Campus map & room finder','map',0],[15,'Dining menus & hours','dining',0],
  [16,'Dining payments','wallet',0],[17,'Library study rooms','library',0],[18,'First-year checklist','checklist',0],
  [19,'Peer tips feed','tips',0],[20,'Counseling & health services','health',0],[21,'Budget & student discounts','budget',0],
  [22,'Safety alerts & Safe Walk','safety',0],[23,'Home dashboard & notification settings','home',1],[24,'Staff portal','staff-home',1],[25,'Job board','jobs',1],[26,'Alumni networking','alumni',1],
];

/* ---------- state ---------- */
const KEY='ashgrove-weave-v1';
function seed(){
  const now=Date.now();
  const s = {
    v:1, staff:false,
    me:{name:'Avery Chen',year:'First-year · Class of 2030',major:'Economics (intended)',dorm:'Larch Hall 214',bio:'From Charlotte. Looking for running buddies and people to watch weird movies with.',interests:['Running','Indie film','Debate','Cooking']},
    enrolled:['MATH211','ENGL103','PSYC100'], lms:{connected:false,synced:null},
    grades:{MATH211:'A-',ENGL103:'B+',PSYC100:'A'}, prior:{cr:0,gpa:0},
    tasks:[
      {id:'t1',title:'Problem Set 7',course:'MATH211',type:'Homework',due:now+60*60000+12000,remind:60,done:false},
      {id:'t2',title:'Quiz 6: Memory',course:'PSYC100',type:'Quiz',due:at(2,9,0),remind:1440,done:false},
      {id:'t3',title:'Rhetorical analysis draft',course:'ENGL103',type:'Paper',due:at(3,23,59),remind:1440,done:false},
      {id:'t4',title:'Peer review comments',course:'ENGL103',type:'Homework',due:at(6,23,59),remind:60,done:false},
      {id:'t5',title:'Midterm 2',course:'MATH211',type:'Exam',due:at(8,10,0),remind:2880,done:false},
      {id:'t6',title:'Research participation hours',course:'PSYC100',type:'Project',due:at(30,17,0),remind:2880,done:false},
      {id:'t7',title:'Problem Set 6',course:'MATH211',type:'Homework',due:at(-6,23,59),remind:60,done:true},
      {id:'t8',title:'Reading: Chapter 7',course:'PSYC100',type:'Homework',due:at(-1,9,0),remind:0,done:true},
    ],
    fired:{},
    settings:{deadlines:true,classes:true,events:true,clubs:true,chats:true,dining:false,announce:true,safety:true,lead:1440,quiet:false,theme:'system',careers:true},
    dash:{next:true,due:true,announce:true,events:true,dining:true,focus:true,quick:true},
    notifs:[
      {id:'n1',cat:'announce',title:'Spring registration opens Nov 10',body:'Meet your advisor by Nov 6 to get your registration PIN.',ts:now-26*3600000,read:false},
      {id:'n2',cat:'clubs',title:'Request sent to Cooking Collective',body:'Officers usually reply within two days.',ts:now-30*3600000,read:true},
      {id:'n3',cat:'events',title:'Film Society Double Feature is coming up',body:'Your ticket is in Campus Life. Doors at 8:45 PM.',ts:now-5*3600000,read:false},
    ],
    announcements:[
      {id:'a1',title:'Lantern Walk around Wren Lake this Saturday',body:'Pick up a lantern at the boathouse at 7 PM. Cider and music on the north lawn afterward.',from:'Student Activities',aud:'All students',ts:now-3*3600000,reach:3412},
      {id:'a2',title:'Spring 2027 registration opens Nov 10',body:'First-years register at 7:00 AM on Tuesday, Nov 10. Meet with your advisor by Nov 6 to get your registration PIN.',from:'Office of the Registrar',aud:'First-years',ts:now-26*3600000,reach:868},
    ],
    alerts:[
      {id:'al1',sev:'advisory',title:'Walkway closed between Corrigan and Ashby',body:'Repaving through Nov 2. Use the lakeside path; it is lit and patrolled until 2 AM.',ts:now-5*3600000,active:true},
      {id:'al2',sev:'info',title:'High winds expected Thursday',body:'Gusts up to 40 mph after noon. Secure bikes and avoid the boathouse dock.',ts:now-9*3600000,active:true},
      {id:'al3',sev:'resolved',title:'Power restored in Kestrel Hall',body:'All floors have power. Report any outages to Facilities.',ts:now-2*86400000,active:false},
    ],
    events:[
      {id:'e1',title:'Weavers vs. Marlton College — Women’s Soccer',cat:'Athletics',start:at(1,16,0),end:at(1,18,0),bldg:'WEL',place:'Reese Field (behind Wellness Center)',host:'Ashgrove Athletics',cap:900,going:412,desc:'Conference play under the lights. First 200 students get a free scarf.'},
      {id:'e2',title:'Lakeside Yoga on the North Lawn',cat:'Wellness',start:at(1,12,15),end:at(1,13,0),bldg:'WEL',place:'North lawn, Wellness Center',host:'Health Promotion',cap:60,going:41,desc:'A 45-minute flow for all levels. Mats provided.'},
      {id:'e3',title:'Internship Fair: Finance & Consulting',cat:'Career',start:at(2,13,0),end:at(2,16,0),bldg:'ASH',place:'Ashby Atrium',host:'Career Services',cap:400,going:233,desc:'Thirty firms recruiting for summer 2027. Bring printed résumés; first-years welcome.'},
      {id:'e4',title:'Debate Union Open Scrimmage',cat:'Clubs',club:'debate',start:at(2,19,0),end:at(2,21,0),bldg:'FEN',place:'FEN 115',host:'Debate Union',cap:50,going:22,desc:'Watch or jump in. Motion announced 15 minutes before rounds.'},
      {id:'e5',title:'Film Society Double Feature: Classic Horror',cat:'Clubs',club:'film',start:at(3,21,0),end:at(3,23,30),bldg:'LAR',place:'Larch Commons Ballroom',host:'Film Society',cap:180,going:131,desc:'A double feature of classic horror. Costumes encouraged; popcorn on us.'},
      {id:'e6',title:'Lantern Walk around Wren Lake',cat:'Social',start:at(4,19,0),end:at(4,21,0),bldg:'LAR',place:'Boathouse, Wren Lake',host:'Student Activities',cap:500,going:298,desc:'Walk the lake loop by lantern light. Cider and live music on the north lawn afterward.'},
      {id:'e7',title:'First-Year Seminar Speaker: The River City Remade',cat:'Academic',start:at(6,18,0),end:at(6,19,30),bldg:'FEN',place:'Fenwick Hall Auditorium',host:'First-Year Seminar Program',cap:220,going:96,desc:'An urban historian on how the city rebuilt its riverfront, and what it means for flood planning.'},
      {id:'e8',title:'Spring Registration Info Session',cat:'Academic',start:at(8,17,0),end:at(8,18,0),bldg:'LIB',place:'Marlow Library, Room 101',host:'Office of the Registrar',cap:120,going:58,desc:'How to build backup schedules, read the registration timeline, and use your PIN.'},
      {id:'e9',title:'Fall Choral Concert',cat:'Arts',start:at(10,19,30),end:at(10,21,0),bldg:'ART',place:'Camp Concert Hall, Marlow Arts Center',host:'Department of Music',cap:600,going:184,desc:'University Choir and Women’s Chorale perform works by Fauré and Florence Price.'},
    ],
    rsvps:{e5:{code:'AGW-7F3K',ts:now-5*3600000,checked:null}},
    attendees:{},
    clubs:{film:'member',cook:'pending'},
    requests:[
      {id:'r1',club:'cook',name:'Avery Chen',me:true,ts:now-30*3600000},
      {id:'r2',club:'debate',name:'Marcus Bell',ts:now-8*3600000},
      {id:'r3',club:'mun',name:'Priya Natarajan',ts:now-20*3600000},
      {id:'r4',club:'notes',name:'Sofia Alvarez',ts:now-2*3600000},
    ],
    chats:[
      {id:'c1',name:'ENGL 103 study group',study:true,course:'ENGL103',members:['maya','hannah','priya'],meets:'Thu 7:00 PM · LIB 204',msgs:[
        {who:'hannah',text:'Anyone started the rhetorical analysis yet?',ts:now-3*3600000},
        {who:'maya',text:'Outline only. Library 204 Thursday at 7? I booked it.',ts:now-2.8*3600000},
        {who:'me',text:'I’m in. I’ll bring the annotated readings.',ts:now-2.5*3600000},
        {who:'priya',text:'Same. Can we also swap drafts Friday?',ts:now-1.2*3600000}]},
      {id:'c2',name:'Larch 2nd floor',members:['leo','hannah','zoe','priya'],msgs:[
        {who:'leo',text:'Fire drill tomorrow at 10 according to our RA',ts:now-6*3600000},
        {who:'zoe',text:'Who left the kettle on in the lounge 😅',ts:now-40*60000}]},
      {id:'c3',name:'Film Society',club:'film',members:['leo','zoe','owen'],msgs:[
        {who:'zoe',text:'Friday double feature is locked in. Need two people for the ticket table at 8:30.',ts:now-9*3600000}]},
    ],
    matchReq:{}, rq:[3,3,3,3,3],
    tips:[
      {id:'p1',text:'Marlow Library’s 3rd floor east side is silent and every carrel has outlets. During finals, get there before 10 AM.',tag:'Study',by:'Junior · English',ts:now-2*86400000,votes:84},
      {id:'p2',text:'Register at exactly 7:00 AM and have a backup section saved for every course. First-choice seats go in under two minutes.',tag:'Registration',by:'Sophomore · Biology',ts:now-4*86400000,votes:95},
      {id:'p3',text:'Thornfield’s stir-fry line is shortest between 12:40 and 1:00. Go then and you’ll make your 1:30.',tag:'Dining',by:'Senior · Leadership',ts:now-18*3600000,votes:61},
      {id:'p4',text:'Email your professor your question before office hours. They often bring a worked example.',tag:'Academics',by:'Junior · Economics',ts:now-3*86400000,votes:57},
      {id:'p5',text:'The weekend shuttle downtown leaves Larch Commons at :15 and :45. Tap your Weaver ID.',tag:'Getting around',by:'Sophomore · Music',ts:now-6*86400000,votes:42},
      {id:'p6',text:'The Wellness Center lends kayaks for Wren Lake free on Sunday afternoons.',tag:'Wellness',by:'Senior · Geography',ts:now-9*3600000,votes:38},
    ],
    voted:{},
    wallet:{swipes:142,swipesMax:175,dd:318.40,cash:46.25,txns:[
      {loc:'Thornfield Dining Hall',acct:'swipes',amt:1,ts:now-4*3600000},
      {loc:'Larch Commons Café',acct:'dd',amt:6.45,ts:now-9*3600000},
      {loc:'Lakeside Market',acct:'dd',amt:11.20,ts:now-30*3600000},
      {loc:'The Perch',acct:'cash',amt:8.75,ts:now-50*3600000}]},
    budget:{total:600,exp:[
      {id:'x1',note:'Used Calculus textbook',cat:'Books',amt:64,ts:at(-24,12,0)},
      {id:'x2',note:'Groceries',cat:'Food',amt:38.20,ts:at(-18,17,0)},
      {id:'x3',note:'Rideshare to the airport',cat:'Transport',amt:31.50,ts:at(-15,8,0)},
      {id:'x4',note:'Concert tickets',cat:'Fun',amt:45,ts:at(-11,20,0)},
      {id:'x5',note:'Laundry card refill',cat:'Personal',amt:20,ts:at(-8,10,0)},
      {id:'x6',note:'Coffee this week',cat:'Food',amt:18.75,ts:at(-3,9,0)},
      {id:'x7',note:'Pharmacy',cat:'Personal',amt:12.40,ts:at(-2,15,0)},
      {id:'x8',note:'Pizza night',cat:'Food',amt:22,ts:at(-1,21,0)}]},
    checklist:{},
    library:{},
    oh:[],
    focus:[{course:'MATH211',min:25,ts:now-6*3600000},{course:'ENGL103',min:25,ts:now-3*3600000}],
    plans:[
      {id:'pl1',ts:at(1,19,0),course:'MATH211',goal:'Midterm 2 review: related rates',min:50},
      {id:'pl2',ts:at(2,19,0),course:'ENGL103',goal:'Draft rhetorical analysis with study group',min:90},
    ],
    healthReqs:[], walk:null,
  };
  // pre-booked library room for the ENGL study group
  s.library[`204|${dkey(at(2,12,0))}|19`]=true; s.library[`204|${dkey(at(2,12,0))}|20`]=true;
  // mark done checklist items
  ['s1','s2','s3','s4','s5','s6','f1','f2','f3'].forEach(k=>s.checklist[k]=true);
  // attendees for events
  const names=['Jalen Brooks','Sofia Alvarez','Marcus Bell','Emma Lindqvist','Noah Fitzgerald','Aaliyah Grant','Ben Osei','Clara Moreau'];
  s.events.forEach((e,i)=>{ s.attendees[e.id]=names.slice(0,5+(i%3)).map((n,j)=>({name:n,code:'AGW-'+(hash(e.id+n)%46656).toString(36).toUpperCase().padStart(3,'0')+String.fromCharCode(65+j),checked:j<2?now-20*60000:null})); });
  s.apps={j1:{status:'Interview',ts:at(-5,14,0),iv:at(2,15,0),ivWhere:'Marlow Library, room 101',resume:'Avery_Chen_Resume_Fall26.pdf'},j4:{status:'Applied',ts:at(-2,20,0),resume:'Avery_Chen_Resume_Fall26.pdf'}};
  s.saved={j3:true,j6:true};
  s.coffee={jordan:{status:'Accepted',ts:at(-3,10,0),topic:'Finance recruiting',fmt:'Video call · 20 min',when:at(5,16,0)}};
  s.attendees.e5.push({name:'Avery Chen',code:'AGW-7F3K',me:true,checked:null});
  // tasks whose reminder time already passed are marked as fired
  s.tasks.forEach(t=>{ if(t.done || t.due - t.remind*60000 < now) s.fired[t.id]=true; });
  return s;
}
let S;
try{ const raw=localStorage.getItem(KEY); if(raw){ const p=JSON.parse(raw); if(p && p.v===1) S=p; } }catch(e){}
if(!S) S=seed();
else { const D0=seed(); for(const k in D0) if(!(k in S)) S[k]=D0[k]; S.settings=Object.assign({},D0.settings,S.settings); S.dash=Object.assign({},D0.dash,S.dash); }
let saveT; function save(){ clearTimeout(saveT); saveT=setTimeout(()=>{ try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){} },150); }

const UI = { dl:'upcoming', dlCourse:'all', evDate:'all', evCat:'All', profQ:'', profDept:'All', clubQ:'', clubCat:'All',
  map:{tab:'map',sel:null,room:null,dir:false,q:'',sugg:false,sl:[],layersOpen:false,layers:{dining:false,study:false,phones:false,access:false},vb:{cx:300,cy:440,w:430},asp:1.3,dragged:false},
  jobQ:'', jobType:'All', jobFy:false, jobSaved:false, apFile:null, alumQ:'', alumInd:'All', alumOpen:false,
  dineLoc:'THN', dineMeal:null, dineTag:'', libDay:0, term:'fall', matchTab:'class', tipTag:'All', tipSort:'top', discCat:'All',
  fc:{cur:88,w:25,target:90}, syl:{text:'',items:null,course:null}, lms:{step:0,pick:{FYS100:true,LDSP101:true}}, pay:{step:'form',loc:'LCC',amt:'',acct:'dd'}, payQR:null,
  healthReq:null, staffEv:'e5', typing:null, addInterest:false, editProfile:false, dashEdit:false };

/* ---------- derived helpers ---------- */
const enrolled = () => S.enrolled.map(id=>CO[id]).filter(Boolean);
const overlaps = (a,b) => [...a.days].some(d=>b.days.includes(d)) && a.start<b.end && b.start<a.end;
const conflictsOf = (c, list=enrolled()) => list.filter(o=>o.id!==c.id && overlaps(c,o));
const unread = () => S.notifs.filter(n=>!n.read).length;
const courseLabel = id => CO[id]?CO[id].code:(id||'Personal');
const cc = id => CO[id]?`--cc:var(--c${CO[id].c})`:'--cc:var(--muted)';
function nextClass(){
  const now=new Date();
  for(let i=0;i<8;i++){
    const d=new Date(now); d.setDate(d.getDate()+i); const dow=d.getDay();
    const nowMin = i===0 ? now.getHours()*60+now.getMinutes() : -1;
    const list = enrolled().filter(c=>c.days.includes(DAYS[dow]) && c.end>nowMin).sort((a,b)=>a.start-b.start);
    if(list.length) return {c:list[0], date:d, i, live: i===0 && list[0].start<=nowMin};
  }
  return null;
}
function nextOH(p){
  const now=new Date(); const out=[];
  for(let i=0;i<14 && out.length<3;i++){
    const d=new Date(now); d.setDate(d.getDate()+i); const dow=DAYS[d.getDay()];
    p.hours.filter(h=>h.d===dow).forEach(h=>{ const st=new Date(d); st.setHours(0,h.s,0,0); const en=new Date(d); en.setHours(0,h.e,0,0); if(en>now) out.push({s:st.getTime(),e:en.getTime()}); });
  }
  return out;
}
function diningStatus(loc){
  const L=DINING[loc]; const n=new Date(); const m=n.getHours()*60+n.getMinutes();
  for(const [label,a,b] of L.periods){ if((m>=a && m<b) || (b>1440 && m<b-1440)) return {open:true,label,until:b}; }
  const upcoming=L.periods.find(([,a])=>a>m);
  return {open:false, next: upcoming ? `Opens ${hm(upcoming[1])}` : `Opens ${hm(L.periods[0][1])} tomorrow`};
}
function bldgOf(room){ const m=String(room||'').match(/^([A-Z]{3})/); return m?m[1]:null; }

/* ---------- push / toast / notifications ---------- */
let pushT, toastT;
function toast(msg){ const t=$('#toast'); t.textContent=msg; t.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove('show'),2600); }
function inQuiet(){ if(!S.settings.quiet) return false; const h=new Date().getHours(); return h>=22 || h<7; }
function notify(cat, title, body, {banner=true}={}){
  S.notifs.unshift({id:uid(),cat,title,body,ts:Date.now(),read:false});
  const allowed = cat==='safety' || S.settings[cat]!==false;
  if(banner && allowed && (cat==='safety' || !inQuiet())){
    const p=$('#push');
    p.innerHTML=`<span class="appic">${CREST(22)}</span><span style="min-width:0;flex:1"><span style="display:flex;gap:8px"><span class="pt">${esc(title)}</span><span class="when">now</span></span><span class="pb" style="display:block">${esc(body)}</span></span>`;
    p.classList.add('show'); clearTimeout(pushT); pushT=setTimeout(()=>p.classList.remove('show'),4800);
  }
  const b=$('#bellbadge'); if(b){ b.hidden=!unread(); b.textContent=unread(); }
  save();
}
function checkReminders(){
  const now=Date.now();
  S.tasks.forEach(t=>{
    if(t.done || !t.remind || S.fired[t.id]) return;
    if(now >= t.due - t.remind*60000){
      S.fired[t.id]=true;
      const lead = t.remind>=1440 ? `${t.remind/1440} day${t.remind>1440?'s':''}` : `${t.remind/60} hour${t.remind>60?'s':''}`;
      notify('deadlines', `${courseLabel(t.course)}: ${t.title}`, `Due ${fTime(t.due)} ${dayDiff(t.due)===0?'today':fDay(t.due)} · reminder set ${lead} before`);
    }
  });
}
setInterval(checkReminders, 4000);
setTimeout(checkReminders, 1500);

/* ---------- navigation ---------- */
let stack=[{s:'home'}], lastTop=null;
function go(s,p={}){ stack.push({s,p}); render(); $('#screen').scrollTop=0; }
function back(){ if(stack.length>1){ stack.pop(); render(); } }
function tab(s){ stack=[{s}]; render(); $('#screen').scrollTop=0; }
function navTo(s,p={}){
  const def=SCREENS[s]; if(!def) return;
  if(def.staff && !S.staff){ S.staff=true; }
  if(!def.staff && S.staff){ S.staff=false; }
  stack = def.root ? [{s,p}] : [{s:def.tab},{s,p}];
  render(); $('#screen').scrollTop=0;
}

/* ---------- small builders ---------- */
const row = ({icon, t, s='', right='', go:g, id='', act='', box=''}) => {
  const attrs = g?`data-go="${g}" ${id?`data-id="${id}"`:''}`:act?`data-act="${act}" ${id?`data-id="${id}"`:''}`:'';
  const tag = (g||act)?'button':'div';
  return `<${tag} class="row" ${attrs} ${tag==='button'?'type="button"':''}>${icon?`<span class="ibox ${box}">${ic(icon)}</span>`:''}<span class="main"><span class="t" style="display:block">${t}</span>${s?`<span class="s" style="display:block">${s}</span>`:''}</span>${right}${(g)?`<span class="chev">${ic('right','sm')}</span>`:''}</${tag}>`;
};
const seg = (k, opts) => `<div class="seg" role="tablist">${opts.map(([v,l])=>`<button type="button" role="tab" aria-selected="${UI[k]===v}" class="${UI[k]===v?'on':''}" data-act="ui" data-k="${k}" data-v="${v}">${l}</button>`).join('')}</div>`;
const chips = (k, opts) => `<div class="chips">${opts.map(([v,l])=>`<button type="button" class="chip ${UI[k]===v?'on':''}" data-act="ui" data-k="${k}" data-v="${esc(v)}">${esc(l)}</button>`).join('')}</div>`;
const sw = (id, checked, ch, extra='') => `<label class="switch"><input type="checkbox" id="${id}" ${checked?'checked':''} data-ch="${ch}" ${extra}><span></span></label>`;
const secH = (title, link='', go='') => `<div class="sec-h"><h2 class="h2">${title}</h2>${link?`<button type="button" class="linkbtn" data-go="${go}">${link}</button>`:''}</div>`;
const courseOptions = (sel, extra=true) => enrolled().map(c=>`<option value="${c.id}" ${c.id===sel?'selected':''}>${c.code} · ${esc(c.title)}</option>`).join('') + (extra?`<option value="" ${!sel?'selected':''}>Personal / other</option>`:'');

/* ---------- screens ---------- */
const SCREENS = {};

/* HOME — dashboard (23) */
SCREENS.home = {root:true, tab:'home', title:'Home', render(){
  const n=new Date(); const hr=n.getHours();
  const greet = hr<12?'Good morning':hr<17?'Good afternoon':'Good evening';
  const termWeek = Math.max(1, Math.ceil((sod(Date.now()) - new Date(n.getFullYear(),7,24).getTime())/604800000));
  const active = S.alerts.filter(a=>a.active && a.sev!=='info');
  let h = `<section class="hero"><span class="eyebrow">${WDL[n.getDay()]}, ${MON[n.getMonth()]} ${n.getDate()} · Fall 2026, week ${termWeek}</span><h1>${greet}, ${esc(S.me.name.split(' ')[0])}</h1>${skyline()}</section><div class="pad">`;
  active.forEach(a=>{ h+=`<button type="button" class="alertbar ${a.sev==='urgent'?'crit':''}" data-go="safety">${ic('alert')}<span><b style="display:block">${esc(a.title)}</b><span class="small">${esc(a.body)}</span></span></button>`; });
  const D=S.dash;
  if(D.quick) h+=`<div class="quick">
    <button type="button" class="sos" data-go="safewalk">${ic('walk')}Safe Walk</button>
    <button type="button" data-go="wallet">${ic('wallet')}Pay</button>
    <button type="button" data-go="library">${ic('door')}Book room</button>
    <button type="button" data-go="map">${ic('map')}Map</button></div>`;
  if(D.next){
    const nc=nextClass();
    if(nc){ const c=nc.c; const when = nc.live?'Now':nc.i===0?'Today':nc.i===1?'Tomorrow':WDL[nc.date.getDay()];
      h+=`<div class="card"><div class="sec-h"><span class="eyebrow">Next class</span><button type="button" class="linkbtn" data-go="schedule">Schedule</button></div>
      <div class="next"><div class="timeblk" style="${cc(c.id)}"><span>${when}</span><b class="num">${hm(c.start).replace(/ (AM|PM)/,'')}</b><span>${hm(c.start).slice(-2)}</span></div>
      <div style="flex:1;min-width:0"><div style="font-weight:700">${c.code} · ${esc(c.title)}</div><div class="small muted">${hmr(c.start,c.end)} · ${esc(BLD[bldgOf(c.room)]?.name||'')} ${c.room.slice(4)}</div><div class="small muted">${esc(PROFS[c.prof].name)}</div></div>
      <button type="button" class="btn sec sm" data-go="map" data-q="${c.room}">${ic('pin','sm')}Find</button></div></div>`; }
    else h+=`<div class="card"><span class="eyebrow">Next class</span><p class="muted">No classes on your schedule yet.</p><button type="button" class="btn sec" data-go="schedule">Build your schedule</button></div>`;
  }
  if(D.due){
    const due=S.tasks.filter(t=>!t.done).sort((a,b)=>a.due-b.due).slice(0,3);
    h+=`<div class="card" style="padding:0;gap:0"><div class="sec-h" style="padding:14px 14px 8px"><span class="eyebrow">Due soon</span><button type="button" class="linkbtn" data-go="deadlines">All deadlines</button></div>${due.map(taskRow).join('')||`<p class="empty">Nothing due. Nice.</p>`}</div>`;
  }
  if(D.announce && S.announcements.length){
    const a=S.announcements[0];
    h+=`<div class="card"><div class="sec-h"><span class="eyebrow">Announcement · ${esc(a.from)}</span><span class="tiny muted">${ago(a.ts)}</span></div><div style="font-weight:700">${esc(a.title)}</div><p class="small muted">${esc(a.body)}</p>${S.announcements.length>1?`<button type="button" class="linkbtn" data-go="announcements" style="align-self:flex-start">${S.announcements.length-1} more</button>`:''}</div>`;
  }
  if(D.events){
    const ev=S.events.filter(e=>e.end>Date.now()).sort((a,b)=>a.start-b.start).slice(0,2);
    h+=`<div>${secH('Coming up','Events','events')}</div><div class="list">${ev.map(evRow).join('')}</div>`;
  }
  if(D.dining){
    const open=Object.entries(DINING).map(([k,L])=>({k,L,st:diningStatus(k)}));
    h+=`<div>${secH('Dining now','Menus','dining')}</div><div class="list">${open.map(({k,L,st})=>row({icon:'fork',t:esc(L.name),s:st.open?`Open · ${st.label} until ${hm(st.until%1440)}`:st.next,right:`<span class="pill ${st.open?'ok':''}">${st.open?'Open':'Closed'}</span>`,act:'dineGo',id:k})).join('')}</div>`;
  }
  if(D.focus){
    const today=S.focus.filter(f=>sod(f.ts)===sod(Date.now())).reduce((a,f)=>a+f.min,0);
    h+=`<div class="card"><div class="sec-h"><span class="eyebrow">Focus today</span><span class="num" style="font-weight:700">${today} min</span></div><div class="bar ok"><i style="width:${Math.min(100,today/120*100)}%"></i></div><div class="small muted">Daily goal: 120 minutes</div><button type="button" class="btn sec" data-go="study">${ic('timer','sm')}Start a focus session</button></div>`;
  }
  h+=`<button type="button" class="btn ghost" data-go="dash-edit">${ic('sliders','sm')}Customize home & notifications</button></div>`;
  return h;
}};
function skyline(){
  return `<svg class="skyline" viewBox="0 0 360 56" preserveAspectRatio="none" aria-hidden="true">
  <path class="s1" d="M0 56V40h22v-8h8v8h18V26l6-9 6 9v14h22v-4h20V14l6-12 6 12v22h16v-6h24v-8h6v8h16v10h30V24l8-12 8 12v16h22v-6h26v-6l6-6 6 6v12H360V56z"/>
  <rect class="win" x="113" y="20" width="3" height="5"/><rect class="win" x="245" y="26" width="3" height="5"/><rect class="win" x="58" y="28" width="3" height="4"/>
  <path class="s2" d="M0 50c40-6 80 6 120 0s80-6 120 0 80 6 120 0v6H0z"/></svg>`;
}
function taskRow(t){
  const r=dueRel(t.due); const done=t.done;
  return `<div class="dl ${done?'done':''}"><button type="button" class="chk ${done?'on':''}" data-act="toggleTask" data-id="${t.id}" aria-label="${done?'Mark not done':'Mark done'}">${ic('check')}</button>
  <div class="main"><div class="t">${esc(t.title)}</div><div class="s"><span class="cdot" style="${cc(t.course)}"></span>${courseLabel(t.course)} · ${esc(t.type)}</div></div>
  <div class="r">${done?`<button type="button" class="icbtn" data-act="delTask" data-id="${t.id}" aria-label="Delete">${ic('trash','sm')}</button>`:`<div class="due ${r.c}">${t.remind?`<span title="Reminder on" style="vertical-align:-3px;color:var(--muted)">${ic('bell','sm')}</span> `:''}${r.t}</div><div class="tiny muted num">${fDay(t.due).split(', ')[1]} · ${fTime(t.due)}</div>`}</div></div>`;
}
function evRow(e){
  const d=new Date(e.start); const r=S.rsvps[e.id];
  return `<button type="button" class="row" data-go="event" data-id="${e.id}"><span class="evdate"><span>${MON[d.getMonth()]}</span><b>${d.getDate()}</b></span><span class="main"><span class="t" style="display:block">${esc(e.title)}</span><span class="s" style="display:block">${WD[d.getDay()]} ${fTime(e.start)} · ${esc(e.place)}</span></span>${r?`<span class="pill ${r.checked?'ok':'brick'}">${r.checked?'Checked in':'Going'}</span>`:''}</button>`;
}

SCREENS.announcements = {tab:'home', title:'Announcements', render(){
  return `<div class="pad">${S.announcements.map(a=>`<div class="card"><div class="sec-h"><span class="eyebrow">${esc(a.from)} · ${esc(a.aud)}</span><span class="tiny muted">${ago(a.ts)}</span></div><div style="font-weight:700">${esc(a.title)}</div><p class="small">${esc(a.body)}</p></div>`).join('')}</div>`;
}};

/* Notifications center */
SCREENS.notifs = {tab:'home', title:'Notifications', render(){
  const L={deadlines:'Deadline',classes:'Class',events:'Event',clubs:'Clubs',chats:'Chat',dining:'Dining',announce:'Announcement',safety:'Safety',careers:'Careers'};
  return `<div class="pad"><div class="btns"><button type="button" class="btn sec sm" data-act="readAll">${ic('check','sm')}Mark all read</button><button type="button" class="btn sec sm" data-act="testPush">${ic('bell','sm')}Send a test push</button><button type="button" class="btn ghost sm" data-go="notif-settings">Settings</button></div>
  <div class="list">${S.notifs.map(n=>`<div class="row" style="${n.read?'':'background:var(--surface-2)'}"><span class="ibox ${n.cat==='safety'?'brick':''}">${ic({deadlines:'clock',events:'cal',clubs:'users',chats:'chat',dining:'fork',announce:'mega',safety:'shield',classes:'book',careers:'brief'}[n.cat]||'bell')}</span><span class="main"><span class="tiny muted" style="display:block">${L[n.cat]||'Campus Life'} · ${ago(n.ts)}</span><span class="t" style="display:block">${esc(n.title)}</span><span class="s" style="display:block">${esc(n.body)}</span></span>${n.read?'':'<span class="pill brick">New</span>'}</div>`).join('')||'<p class="empty">No notifications</p>'}</div></div>`;
}, after(){ setTimeout(()=>{ S.notifs.forEach(n=>n.read=true); save(); const b=$('#bellbadge'); if(b) b.hidden=true; }, 1200); }};

/* Notification settings (3, 23) */
SCREENS['notif-settings'] = {tab:'me', title:'Notifications', render(){
  const items=[['deadlines','Deadline reminders','Assignments and exams you track'],['classes','Class changes','Cancellations and room changes'],['events','Events','Reminders for events you RSVP to'],['clubs','Clubs','Join requests and club posts'],['chats','Messages','Group chats and study groups'],['announce','Announcements','From university offices'],['careers','Careers','Application updates and alumni replies'],['dining','Dining','Daily specials at your favorite halls']];
  return `<div class="pad"><p class="small muted">Push notifications arrive on your lock screen. Turn categories off here; they still appear in your notification inbox.</p>
  <div class="list">${row({icon:'shield',box:'brick',t:'Safety alerts',s:'Always on. Emergencies can’t be muted.',right:sw('ns-safety',true,'noop','disabled')})}${items.map(([k,t,s])=>row({icon:'bell',t,s,right:sw('ns-'+k,S.settings[k],'setting',`data-k="${k}"`)})).join('')}</div>
  <div class="field"><label for="ns-lead">Default reminder for new deadlines</label><select id="ns-lead" class="input" data-ch="lead">${[[0,'No reminder'],[60,'1 hour before'],[180,'3 hours before'],[1440,'1 day before'],[2880,'2 days before']].map(([v,l])=>`<option value="${v}" ${+S.settings.lead===v?'selected':''}>${l}</option>`).join('')}</select></div>
  <div class="list">${row({icon:'clock',t:'Quiet hours',s:'10:00 PM – 7:00 AM. Safety alerts still come through.',right:sw('ns-quiet',S.settings.quiet,'setting','data-k="quiet"')})}</div>
  <button type="button" class="btn sec" data-act="testPush">${ic('bell','sm')}Send a test push</button></div>`;
}};

SCREENS['dash-edit'] = {tab:'home', title:'Customize home', render(){
  const W=[['quick','Quick actions','Safe Walk, pay, book a room, map'],['next','Next class','With room and directions'],['due','Due soon','Your next three deadlines'],['announce','Announcements','Latest from university offices'],['events','Coming up','Next two campus events'],['dining','Dining now','Which halls are open'],['focus','Focus today','Minutes studied vs. your goal']];
  return `<div class="pad"><p class="small muted">Choose what appears on your home screen.</p><div class="list">${W.map(([k,t,s])=>row({t,s,right:sw('dw-'+k,S.dash[k],'dash',`data-k="${k}"`)})).join('')}</div>
  <div class="list">${row({icon:'bell',t:'Notification settings',s:'Categories, reminder timing, quiet hours',go:'notif-settings'})}</div></div>`;
}};

/* CLASSES hub */
SCREENS.classes = {root:true, tab:'classes', title:'Classes', render(){
  const cr=enrolled().reduce((a,c)=>a+c.cr,0); const week=S.tasks.filter(t=>!t.done && t.due-Date.now()<7*86400000).length;
  const g=gpaCalc();
  return `<div class="pad"><div class="balance"><div><span>Credits</span><b>${cr}</b></div><div><span>Due this week</span><b>${week}</b></div><div><span>Term GPA</span><b>${g.term?g.term.toFixed(2):'—'}</b></div></div>
  <div class="list">${row({icon:'cal',t:'Schedule builder',s:`${enrolled().length} courses · ${S.lms.connected?'synced with Ashgrove Learn':'import from Ashgrove Learn'}`,go:'schedule'})}
  ${row({icon:'list',t:'Deadlines',s:'Assignments, quizzes and exams',go:'deadlines'})}
  ${row({icon:'file',t:'Syllabus scanner',s:'Upload a syllabus, get the key dates',go:'syllabus'})}
  ${row({icon:'cap',t:'Grades & GPA',s:'Term and cumulative GPA, final exam calculator',go:'grades'})}
  ${row({icon:'timer',t:'Study planner',s:'Plan sessions and run a focus timer',go:'study'})}
  ${row({icon:'user',t:'Professors',s:'Office hours, locations, contact',go:'profs'})}
  ${row({icon:'door',t:'Library study rooms',s:'Book Marlow Library rooms',go:'library'})}
  ${row({icon:'check',t:'First-year checklist',s:'Housing, financial aid, registration deadlines',go:'checklist'})}</div></div>`;
}};

/* 1. Schedule builder */
SCREENS.schedule = {tab:'classes', title:'Schedule', render(){
  const list=enrolled(); const cr=list.reduce((a,c)=>a+c.cr,0); const clashes=list.filter(c=>conflictsOf(c).length);
  let h=`<div class="pad"><div class="sec-h"><div><span class="eyebrow">Fall 2026</span><div class="h2">${list.length} courses · ${cr} credits</div></div></div>`;
  h+= S.lms.connected ? `<div class="card" style="flex-direction:row;align-items:center"><span class="ibox">${ic('link')}</span><div style="flex:1"><b>Ashgrove Learn connected</b><div class="small muted">Last synced ${ago(S.lms.synced)} ago</div></div><button type="button" class="btn sec sm" data-act="lmsSync">${ic('refresh','sm')}Sync</button></div>`
    : `<button type="button" class="card" data-go="lms" style="flex-direction:row;align-items:center;text-align:left;width:100%;cursor:pointer"><span class="ibox brick">${ic('link')}</span><span style="flex:1"><b style="display:block">Import from Ashgrove Learn</b><span class="small muted">Pull in your registered courses and their assignments</span></span>${ic('right','sm')}</button>`;
  if(clashes.length) h+=`<div class="alertbar crit">${ic('alert')}<span class="small"><b>Time conflict:</b> ${clashes.map(c=>c.code).join(' and ')} overlap. Drop one or pick another section.</span></div>`;
  h+=weekGrid();
  h+=`<div class="list">${list.map(c=>`<div class="row"><span class="cdot" style="${cc(c.id)};width:12px;height:36px;border-radius:4px"></span><span class="main"><span class="t" style="display:block">${c.code} · ${esc(c.title)}</span><span class="s" style="display:block">${c.days} ${hmr(c.start,c.end)} · ${c.room} · ${esc(PROFS[c.prof].name)} · ${c.cr} cr</span></span><button type="button" class="icbtn" data-act="dropCourse" data-id="${c.id}" aria-label="Drop ${c.code}">${ic('x','sm')}</button></div>`).join('')||'<p class="empty">No courses yet</p>'}</div>
  <button type="button" class="btn" data-go="catalog">${ic('plus','sm')}Add courses</button></div>`;
  return h;
}};
function weekGrid(){
  const H0=8,H1=17,ph=36; const D=['M','T','W','R','F'];
  let h=`<div class="wk" aria-label="Weekly schedule"><div class="wk-head"><span></span>${['Mon','Tue','Wed','Thu','Fri'].map(d=>`<span>${d}</span>`).join('')}</div><div class="wk-body" style="height:${(H1-H0)*ph}px"><div class="wk-times">`;
  for(let x=H0;x<H1;x++) h+=`<span style="top:${(x-H0)*ph+2}px">${x>12?x-12:x}</span>`;
  h+='</div>';
  D.forEach(d=>{ h+='<div class="wk-col">'; enrolled().filter(c=>c.days.includes(d)).forEach(c=>{ const top=(c.start/60-H0)*ph, ht=(c.end-c.start)/60*ph; h+=`<div class="wk-blk ${conflictsOf(c).length?'clash':''}" style="top:${top}px;height:${ht}px;${cc(c.id)}"><b>${c.code.split(' ')[0]}</b><span>${c.code.split(' ')[1]}</span></div>`; }); h+='</div>'; });
  return h+'</div></div>';
}
SCREENS.catalog = {tab:'classes', title:'Add courses', render(){
  const q=(UI.catQ||'').toLowerCase();
  const list=COURSES.filter(c=>!q || (c.code+' '+c.title+' '+PROFS[c.prof].name).toLowerCase().includes(q));
  return `<div class="pad"><div class="search">${ic('search')}<input id="cat-q" class="input" placeholder="Search by course, title or professor" value="${esc(UI.catQ||'')}" data-in="catQ" autocomplete="off"></div>
  <div class="list">${list.map(c=>{ const on=S.enrolled.includes(c.id); const cf=on?[]:conflictsOf(c);
    return `<div class="row"><span class="cdot" style="${cc(c.id)};width:10px;height:34px;border-radius:4px"></span><span class="main"><span class="t" style="display:block">${c.code} · ${esc(c.title)}</span><span class="s" style="display:block">${c.days} ${hmr(c.start,c.end)} · ${c.room} · ${c.cr} cr</span><span class="s" style="display:block">${esc(PROFS[c.prof].name)}${cf.length?` · <span style="color:var(--crit);font-weight:600">Conflicts with ${cf.map(x=>x.code).join(', ')}</span>`:''}</span></span>
    ${on?`<button type="button" class="btn sec sm" data-act="dropCourse" data-id="${c.id}">Added ${ic('check','sm')}</button>`:`<button type="button" class="btn sm" data-act="addCourse" data-id="${c.id}" ${cf.length?'disabled':''}>Add</button>`}</div>`; }).join('')}</div></div>`;
}};
SCREENS.lms = {tab:'classes', title:'Ashgrove Learn', render(){
  const st=UI.lms.step;
  const found=['FYS100','LDSP101','MATH211','ENGL103','PSYC100'];
  if(st===0) return `<div class="pad"><div class="card"><span class="ibox brick">${ic('link')}</span><div class="h2">Connect your learning system</div><p class="small muted">Campus Life reads your registered courses and assignment due dates from Ashgrove Learn. It can’t see grades or submit work.</p><button type="button" class="btn block" data-act="lmsConnect">Sign in with Ashgrove ID</button><p class="tiny muted">Prototype: sign-in is simulated with demo data.</p></div></div>`;
  if(st===1) return `<div class="pad"><div class="card" style="align-items:center;text-align:center;padding:32px 14px">${ic('refresh','lg')}<b>Reading your courses…</b><span class="small muted">Contacting Ashgrove Learn</span></div></div>`;
  const newOnes=found.filter(id=>!S.enrolled.includes(id));
  const nTasks=newOnes.filter(id=>UI.lms.pick[id]).length*2;
  return `<div class="pad"><p class="small muted">Found ${found.length} registered courses for Fall 2026. Courses already on your schedule are skipped.</p>
  <div class="list">${found.map(id=>{const c=CO[id]; const has=S.enrolled.includes(id); return `<label class="row" for="lp-${id}"><span class="cdot" style="${cc(id)};width:10px;height:30px;border-radius:4px"></span><span class="main"><span class="t" style="display:block">${c.code} · ${esc(c.title)}</span><span class="s" style="display:block">${c.days} ${hmr(c.start,c.end)} · ${has?'Already on schedule':'2 assignments with due dates'}</span></span><input type="checkbox" id="lp-${id}" data-ch="lmsPick" data-id="${id}" ${has?'checked disabled':UI.lms.pick[id]?'checked':''} style="width:20px;height:20px"></label>`;}).join('')}</div>
  <button type="button" class="btn block" data-act="lmsImport" ${newOnes.some(id=>UI.lms.pick[id])?'':'disabled'}>Import ${newOnes.filter(id=>UI.lms.pick[id]).length} courses & ${nTasks} assignments</button></div>`;
}};

/* 2. Deadlines tracker */
SCREENS.deadlines = {tab:'classes', title:'Deadlines', render(){
  let list=S.tasks.slice();
  if(UI.dl==='upcoming') list=list.filter(t=>!t.done);
  if(UI.dl==='week') list=list.filter(t=>!t.done && t.due-Date.now()<7*86400000);
  if(UI.dl==='done') list=list.filter(t=>t.done);
  if(UI.dlCourse!=='all') list=list.filter(t=>t.course===UI.dlCourse);
  list.sort((a,b)=>UI.dl==='done'?b.due-a.due:a.due-b.due);
  const exams=S.tasks.filter(t=>!t.done && (t.type==='Exam'||t.type==='Quiz')).length;
  return `<div class="pad">${seg('dl',[['upcoming','Upcoming'],['week','This week'],['done','Done']])}
  ${chips('dlCourse',[['all','All courses'],...enrolled().map(c=>[c.id,c.code])])}
  <div class="small muted">${list.length} item${list.length===1?'':'s'} · ${exams} quiz${exams===1?'':'zes'} & exams ahead</div>
  <div class="list">${list.map(taskRow).join('')||'<p class="empty">Nothing here.</p>'}</div>
  <div class="btns"><button type="button" class="btn" data-go="task-new" style="flex:1">${ic('plus','sm')}Add deadline</button><button type="button" class="btn sec" data-go="syllabus">${ic('file','sm')}Scan syllabus</button></div></div>`;
}};
SCREENS['task-new'] = {tab:'classes', title:'New deadline', render(){
  const tm=new Date(Date.now()+86400000);
  return `<form class="pad" data-form="task"><div class="field"><label for="tn-title">What’s due</label><input id="tn-title" name="title" class="input" required placeholder="e.g. Lab report 4"></div>
  <div class="field"><label for="tn-course">Course</label><select id="tn-course" name="course" class="input">${courseOptions(S.enrolled[0])}</select></div>
  <div class="field"><label for="tn-type">Type</label><select id="tn-type" name="type" class="input">${['Homework','Quiz','Exam','Paper','Project','Reading'].map(t=>`<option>${t}</option>`).join('')}</select></div>
  <div class="grid2"><div class="field"><label for="tn-date">Due date</label><input id="tn-date" name="date" type="date" class="input" required value="${dkey(tm)}"></div><div class="field"><label for="tn-time">Time</label><input id="tn-time" name="time" type="time" class="input" value="23:59"></div></div>
  <div class="field"><label for="tn-remind">Reminder</label><select id="tn-remind" name="remind" class="input">${[[0,'None'],[60,'1 hour before'],[180,'3 hours before'],[1440,'1 day before'],[2880,'2 days before']].map(([v,l])=>`<option value="${v}" ${+S.settings.lead===v?'selected':''}>${l}</option>`).join('')}</select></div>
  <button class="btn block" type="submit">Add deadline</button></form>`;
}};

/* 4. Grades & GPA */
const GP={'A':4,'A-':3.7,'B+':3.3,'B':3,'B-':2.7,'C+':2.3,'C':2,'C-':1.7,'D+':1.3,'D':1,'D-':.7,'F':0};
function gpaCalc(){
  let pts=0,cr=0; enrolled().forEach(c=>{ const g=S.grades[c.id]; if(g && GP[g]!=null){ pts+=GP[g]*c.cr; cr+=c.cr; } });
  const term=cr?pts/cr:0; const pc=+S.prior.cr||0, pg=+S.prior.gpa||0;
  const cum = (cr+pc)? (pts+pc*pg)/(cr+pc) : 0;
  return {term,cum,cr};
}
SCREENS.grades = {tab:'classes', title:'Grades & GPA', render(){
  const g=gpaCalc(); const f=UI.fc; const w=f.w/100;
  const need = w>0 ? (f.target - f.cur*(1-w))/w : NaN;
  const msg = isNaN(need)?'Enter a final exam weight.' : need>100 ? `Out of reach: you’d need ${need.toFixed(0)}% on the final.` : need<=0 ? `You’ve locked it in. Even a 0% keeps you at ${(f.cur*(1-w)).toFixed(1)}%.` : `You need <b>${need.toFixed(1)}%</b> on the final to finish with ${f.target}%.`;
  return `<div class="pad"><div class="card"><span class="eyebrow">Projected Fall 2026 GPA</span><div class="gpa-big"><span class="n num">${g.cr?g.term.toFixed(2):'—'}</span><span class="small muted" style="padding-bottom:6px">${g.cr} graded credits<br>Cumulative ${g.cum?g.cum.toFixed(2):'—'}</span></div>
  <div class="scale"><i style="left:${g.term/4*100}%"></i></div><div class="scale-l"><span>0.0</span><span>2.0 good standing</span><span>3.5 Dean’s List</span><span>4.0</span></div></div>
  <div class="list">${enrolled().map(c=>`<div class="row"><span class="cdot" style="${cc(c.id)};width:10px;height:30px;border-radius:4px"></span><span class="main"><span class="t" style="display:block">${c.code}</span><span class="s" style="display:block">${esc(c.title)} · ${c.cr} credits</span></span><select class="input" style="width:88px;min-height:38px;padding:6px 8px" id="gr-${c.id}" data-ch="grade" data-id="${c.id}" aria-label="Grade for ${c.code}"><option value="">—</option>${Object.keys(GP).map(k=>`<option ${S.grades[c.id]===k?'selected':''}>${k}</option>`).join('')}</select></div>`).join('')}</div>
  <div class="card"><span class="eyebrow">Earlier terms</span><div class="grid2"><div class="field"><label for="pr-cr">Credits completed</label><input id="pr-cr" class="input num" type="number" min="0" value="${S.prior.cr}" data-ch="prior" data-k="cr"></div><div class="field"><label for="pr-gpa">Cumulative GPA</label><input id="pr-gpa" class="input num" type="number" min="0" max="4" step="0.01" value="${S.prior.gpa}" data-ch="prior" data-k="gpa"></div></div><p class="tiny muted">First semester? Leave these at 0. AP and transfer credit don’t count toward GPA.</p></div>
  <div class="card"><span class="eyebrow">What do I need on the final?</span><div class="grid2"><div class="field"><label for="fc-cur">Current grade %</label><input id="fc-cur" class="input num" type="number" value="${f.cur}" data-in="fc" data-k="cur"></div><div class="field"><label for="fc-w">Final is worth %</label><input id="fc-w" class="input num" type="number" value="${f.w}" data-in="fc" data-k="w"></div></div>
  <div class="field"><label for="fc-t">Target course grade %</label><input id="fc-t" class="input num" type="number" value="${f.target}" data-in="fc" data-k="target"></div><p>${msg}</p></div></div>`;
}};

/* 5. Study planner + focus timer */
const TM={focus:1500,short:300,long:900};
const timer={mode:'focus',left:1500,running:false,course:'MATH211',h:null};
function timerDom(){
  const t=$('#t-text'); if(!t) return;
  const tot=TM[timer.mode]; const C=2*Math.PI*90;
  t.textContent=`${String(Math.floor(timer.left/60)).padStart(2,'0')}:${String(timer.left%60).padStart(2,'0')}`;
  $('#t-ring').style.strokeDashoffset = C*(1-timer.left/tot);
}
function tick(){
  if(!timer.running) return;
  timer.left--;
  if(timer.left<=0){
    timer.running=false; clearInterval(timer.h);
    if(timer.mode==='focus'){ S.focus.push({course:timer.course,min:25,ts:Date.now()}); notify('classes','Focus session complete','25 minutes logged. Take a 5-minute break.'); timer.mode='short'; }
    else { notify('classes','Break’s over','Ready for another focus session?'); timer.mode='focus'; }
    timer.left=TM[timer.mode]; if(curTop().s==='study') render(); return;
  }
  timerDom();
}
SCREENS.study = {tab:'classes', title:'Study planner', render(){
  const C=2*Math.PI*90; const tot=TM[timer.mode]; UI.tmode=timer.mode;
  const today=S.focus.filter(f=>sod(f.ts)===sod(Date.now())); const mins=today.reduce((a,f)=>a+f.min,0);
  const plans=S.plans.filter(p=>p.ts>Date.now()-3600000).sort((a,b)=>a.ts-b.ts);
  return `<div class="pad"><div class="card timer">${seg('tmode',[['focus','Focus 25'],['short','Break 5'],['long','Long break 15']]).replace(/data-act="ui"/g,'data-act="tmode"')}
  <div class="ring"><svg viewBox="0 0 200 200"><circle class="trk" cx="100" cy="100" r="90"/><circle id="t-ring" class="prg" cx="100" cy="100" r="90" stroke-dasharray="${C}" stroke-dashoffset="${C*(1-timer.left/tot)}"/></svg><div class="lbl"><b id="t-text">${String(Math.floor(timer.left/60)).padStart(2,'0')}:${String(timer.left%60).padStart(2,'0')}</b><span class="small muted">${timer.mode==='focus'?'Focus':'Break'} · ${courseLabel(timer.course)}</span></div></div>
  <div class="field" style="width:100%"><label for="t-course">Studying for</label><select id="t-course" class="input" data-ch="tcourse">${courseOptions(timer.course)}</select></div>
  <div class="btns" style="width:100%"><button type="button" class="btn" style="flex:1" data-act="tToggle">${ic(timer.running?'pause':'play','sm')}${timer.running?'Pause':'Start'}</button><button type="button" class="btn sec" data-act="tReset">Reset</button></div></div>
  <div class="card"><div class="sec-h"><span class="eyebrow">Today</span><span class="num" style="font-weight:700">${mins} min · ${today.length} session${today.length===1?'':'s'}</span></div>${today.length?today.map(f=>`<div class="small" style="display:flex;justify-content:space-between"><span><span class="cdot" style="${cc(f.course)}"></span> ${courseLabel(f.course)}</span><span class="muted num">${fTime(f.ts)} · ${f.min} min</span></div>`).join(''):'<p class="small muted">No sessions yet today.</p>'}</div>
  ${secH('Planned sessions')}
  <div class="list">${plans.map(p=>`<div class="row"><span class="cdot" style="${cc(p.course)};width:10px;height:34px;border-radius:4px"></span><span class="main"><span class="t" style="display:block">${esc(p.goal)}</span><span class="s" style="display:block">${fWhen(p.ts)} · ${p.min} min · ${courseLabel(p.course)}</span></span><button type="button" class="btn sec sm" data-act="planStart" data-id="${p.id}">Start</button><button type="button" class="icbtn" data-act="planDel" data-id="${p.id}" aria-label="Remove">${ic('x','sm')}</button></div>`).join('')||'<p class="empty">No sessions planned.</p>'}</div>
  <form class="card" data-form="plan"><span class="eyebrow">Plan a session</span><div class="field"><label for="pl-goal">Goal</label><input id="pl-goal" name="goal" class="input" required placeholder="e.g. Review chapter 8 flashcards"></div>
  <div class="grid2"><div class="field"><label for="pl-date">Day</label><input id="pl-date" name="date" type="date" class="input" value="${dkey(Date.now()+86400000)}" required></div><div class="field"><label for="pl-time">Start</label><input id="pl-time" name="time" type="time" class="input" value="19:00" required></div></div>
  <div class="grid2"><div class="field"><label for="pl-course">Course</label><select id="pl-course" name="course" class="input">${courseOptions(S.enrolled[0])}</select></div><div class="field"><label for="pl-min">Minutes</label><select id="pl-min" name="min" class="input"><option>25</option><option selected>50</option><option>90</option></select></div></div>
  <button class="btn sec" type="submit">${ic('plus','sm')}Add to plan</button></form></div>`;
}};

/* 6. Syllabus scanner */
const SAMPLE_SYL=`FYS 100: Cities & Water — Fall 2026
Professor Owen Marsh · Fenwick 210 · Office hours Wednesdays 3:00–5:00 pm

Schedule and key dates
Oct 29: Reading response 3 due before class
Nov 3: Quiz on urban hydrology (in class)
Midterm exam: Thursday, Nov 5, in class
Field journal entries due 11/10 by 5 pm
Thanksgiving break: Nov 25–29, no class
Nov 19 – Research paper draft due
Dec 1: Group presentations begin
Final paper due December 9, 2026 at 11:59 pm`;
function parseSyllabus(text){
  const MONTHS={jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,sept:8,oct:9,nov:10,dec:11};
  const KW=[[/\b(final exam|midterm|exam|test)\b/i,'Exam'],[/\bquiz\b/i,'Quiz'],[/\b(paper|essay|draft|response)\b/i,'Paper'],[/\b(project|presentation|presentations)\b/i,'Project'],[/\b(due|problem set|homework|assignment|lab report|journal)\b/i,'Homework']];
  const baseY=new Date(T0).getFullYear();
  const out=[];
  text.split(/\r?\n/).forEach(line=>{
    const L=line.trim(); if(!L) return;
    const kw=KW.find(([re])=>re.test(L)); if(!kw) return;
    let mo,da,yr,m;
    if((m=L.match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sept?|oct|nov|dec)[a-z]*\.?\s+(\d{1,2})(?:st|nd|rd|th)?(?:,?\s*(\d{4}))?/i))){ mo=MONTHS[m[1].toLowerCase()]; da=+m[2]; yr=m[3]?+m[3]:null; }
    else if((m=L.match(/\b(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?\b/))){ mo=+m[1]-1; da=+m[2]; yr=m[3]?(+m[3]<100?2000+ +m[3]:+m[3]):null; }
    else return;
    if(mo<0||mo>11||da<1||da>31) return;
    if(!yr) yr = mo<6 ? baseY+1 : baseY;
    let hh=23, mm=59, t;
    if((t=L.match(/\b(\d{1,2}):(\d{2})\s*(am|pm)\b/i))){ hh=+t[1]%12+(t[3].toLowerCase()==='pm'?12:0); mm=+t[2]; }
    else if((t=L.match(/\b(\d{1,2})\s*(am|pm)\b/i))){ hh=+t[1]%12+(t[2].toLowerCase()==='pm'?12:0); mm=0; }
    else if(/in class|before class/i.test(L)){ hh=9; mm=0; }
    const due=new Date(yr,mo,da,hh,mm).getTime();
    let title=L.replace(m[0],'').replace(/\b(mon|tues?|wed(nes)?|thu(rs)?|fri|sat|sun)[a-z]*\.?,?/ig,'').replace(/\b(at|by)\s+\d{1,2}(:\d{2})?\s*(am|pm)\b/ig,'').replace(/^[\s:–—\-,·]+|[\s:–—\-,·]+$/g,'').replace(/\s{2,}/g,' ').replace(/\s*[,–—-]\s*$/,'').replace(/\s*([:,])\s*,\s*/g,', ').replace(/^[\s:,]+|[\s:,]+$/g,'');
    title=title.charAt(0).toUpperCase()+title.slice(1);
    out.push({title:title.slice(0,70)||kw[1],type:kw[1],due,line:L,pick:true});
  });
  return out;
}
SCREENS.syllabus = {tab:'classes', title:'Syllabus scanner', render(){
  const sy=UI.syl;
  let h=`<div class="pad"><p class="small muted">Upload a syllabus as a text file or paste its text. Campus Life finds lines with a date and a deadline word (exam, quiz, paper, due…) and turns them into deadlines you can review.</p>
  <div class="card"><label class="btn sec" for="syl-file" style="cursor:pointer">${ic('upload','sm')}Upload .txt or .md</label><input id="syl-file" type="file" accept=".txt,.md,.text,text/plain,application/pdf,.pdf" data-ch="sylFile" hidden>
  <div class="field"><label for="syl-text">Or paste syllabus text</label><textarea id="syl-text" class="input" data-in="sylText" placeholder="Paste the schedule section of your syllabus">${esc(sy.text)}</textarea></div>
  <div class="btns"><button type="button" class="btn" data-act="sylParse" style="flex:1">${ic('search','sm')}Find dates</button><button type="button" class="btn sec" data-act="sylSample">Use sample</button></div></div>`;
  if(sy.items){
    const course = sy.course ?? (enrolled().find(c=>sy.text.toUpperCase().includes(c.code))?.id || (sy.text.toUpperCase().includes('FYS 100')?'FYS100':S.enrolled[0]));
    sy.course=course;
    const n=sy.items.filter(i=>i.pick).length;
    h+= sy.items.length ? `${secH(`Found ${sy.items.length} dates`)}
    <div class="field"><label for="syl-course">Add to course</label><select id="syl-course" class="input" data-ch="sylCourse">${COURSES.map(c=>`<option value="${c.id}" ${c.id===course?'selected':''}>${c.code} · ${esc(c.title)}${S.enrolled.includes(c.id)?'':' (not on schedule)'}</option>`).join('')}</select></div>
    <div class="list">${sy.items.map((it,i)=>`<label class="row" for="sy-${i}"><input type="checkbox" id="sy-${i}" data-ch="sylPick" data-i="${i}" ${it.pick?'checked':''} style="width:20px;height:20px"><span class="main"><span class="t" style="display:block">${esc(it.title)}</span><span class="s" style="display:block">${fWhen(it.due)} · <span class="pill">${it.type}</span></span><span class="tiny muted" style="display:block">“${esc(it.line)}”</span></span></label>`).join('')}</div>
    <button type="button" class="btn block" data-act="sylAdd" ${n?'':'disabled'}>Add ${n} to deadlines</button>` : `<p class="empty">No dated deadlines found. Check that lines include both a date (Oct 29, 10/29) and a word like “due”, “quiz” or “exam”.</p>`;
  }
  return h+'</div>';
}};

/* 7. Professors */
SCREENS.profs = {tab:'classes', title:'Professors', render(){
  const q=UI.profQ.toLowerCase(); const depts=['All',...new Set(Object.values(PROFS).map(p=>p.dept))].sort((a,b)=>a==='All'?-1:b==='All'?1:a.localeCompare(b));
  const mine=new Set(enrolled().map(c=>c.prof));
  const list=Object.entries(PROFS).filter(([k,p])=>(UI.profDept==='All'||p.dept===UI.profDept) && (!q || (p.name+p.dept).toLowerCase().includes(q))).sort((a,b)=>(mine.has(b[0])-mine.has(a[0]))||a[1].name.localeCompare(b[1].name));
  return `<div class="pad"><div class="search">${ic('search')}<input id="prof-q" class="input" placeholder="Search name or department" value="${esc(UI.profQ)}" data-in="profQ" autocomplete="off"></div>
  ${chips('profDept',depts.map(d=>[d,d]))}
  <div class="list">${list.map(([k,p])=>{ const nx=nextOH(p)[0]; return `<button type="button" class="row" data-go="prof" data-id="${k}"><span class="av" style="--cc:var(--c${(hash(k)%6)+1})">${initials(p.name)}</span><span class="main"><span class="t" style="display:block">${esc(p.name)} ${mine.has(k)?'<span class="pill brick">Your professor</span>':''}</span><span class="s" style="display:block">${esc(p.dept)} · ${p.office}</span><span class="s" style="display:block">${nx?`Office hours ${dayDiff(nx.s)===0?'today':WD[new Date(nx.s).getDay()]} ${hmr(tmin(nx.s),tmin(nx.e))}`:''}</span></span><span class="chev">${ic('right','sm')}</span></button>`; }).join('')||'<p class="empty">No matches</p>'}</div></div>`;
}};
SCREENS.prof = {tab:'classes', title:p=>PROFS[p.id]?.name||'Professor', render(p){
  const P=PROFS[p.id]; const teaches=COURSES.filter(c=>c.prof===p.id); const oh=nextOH(P);
  const booked=S.oh.filter(b=>b.prof===p.id && b.ts>Date.now());
  return `<div class="pad"><div class="card" style="flex-direction:row;align-items:center;gap:14px"><span class="av lg" style="--cc:var(--c${(hash(p.id)%6)+1})">${initials(P.name)}</span><div><div class="h2">${esc(P.name)}</div><div class="small muted">${esc(P.title)} of ${esc(P.dept)}</div></div></div>
  <dl class="kv card"><dt>Office</dt><dd>${esc(BLD[bldgOf(P.office)].name)}, room ${P.office.slice(4)}</dd><dt>Teaches</dt><dd>${teaches.map(c=>c.code).join(', ')}</dd><dt>Weekly hours</dt><dd>${P.hours.map(h=>`${WD[DAYS.indexOf(h.d)]} ${hmr(h.s,h.e)}`).join(' · ')}</dd></dl>
  <div class="copyline"><span>${P.email}</span><button type="button" class="btn sec sm" data-act="copy" data-v="${P.email}">${ic('copy','sm')}Copy</button></div>
  <button type="button" class="btn sec" data-go="map" data-q="${P.office}">${ic('pin','sm')}Show office on map</button>
  ${booked.length?`<div class="card"><span class="eyebrow">Your appointments</span>${booked.map(b=>`<div style="display:flex;justify-content:space-between;align-items:center"><b class="num">${fWhen(b.ts)}</b><button type="button" class="linkbtn" data-act="ohCancel" data-id="${b.ts}" data-p="${p.id}">Cancel</button></div>`).join('')}</div>`:''}
  ${secH('Reserve an office-hours slot')}<p class="small muted">15-minute slots. Walk-ins are welcome too.</p>
  ${oh.map(o=>{ const slots=[]; for(let t=o.s;t<o.e;t+=900000) slots.push(t); return `<div><div class="flabel" style="margin-bottom:6px">${fDay(o.s)}</div><div class="slots" style="grid-template-columns:repeat(4,1fr)">${slots.map(t=>{ const mine=S.oh.some(b=>b.prof===p.id&&b.ts===t); const taken=!mine && hash(p.id+t)%3===0; const past=t<Date.now(); return `<button type="button" class="slot ${mine?'mine':taken?'taken':''} ${past?'past':''}" ${taken||past?'disabled':''} data-act="ohBook" data-id="${t}" data-p="${p.id}">${hm(tmin(t)).replace(' ',' ')}</button>`; }).join('')}</div></div>`; }).join('')}</div>`;
}};

/* 17. Library rooms */
const ROOMS=[{id:'101',name:'Room 101',seats:4,feat:'Wall display'},{id:'204',name:'Room 204',seats:8,feat:'Whiteboard wall'},{id:'215',name:'Room 215',seats:6,feat:'Display, whiteboard'},{id:'310',name:'Room 310',seats:2,feat:'Silent floor'}];
SCREENS.library = {tab:'classes', title:'Library study rooms', render(){
  const days=[...Array(7)].map((_,i)=>at(i,12,0)); const day=days[UI.libDay]; const dk=dkey(day);
  const mine=Object.keys(S.library).filter(k=>S.library[k]).map(k=>{const [r,d,h]=k.split('|'); return {r,d,h:+h,k};}).filter(b=>b.d>=dkey(Date.now())).sort((a,b)=>(a.d+String(a.h).padStart(2,'0')).localeCompare(b.d+String(b.h).padStart(2,'0')));
  const usedToday=Object.keys(S.library).filter(k=>S.library[k]&&k.split('|')[1]===dk).length;
  const nowH=new Date().getHours();
  return `<div class="pad"><p class="small muted">Marlow Library · open 7:30 AM – 2:00 AM. Book up to 2 hours per day.</p>
  ${mine.length?`<div class="card"><span class="eyebrow">Your bookings</span>${mine.map(b=>`<div style="display:flex;justify-content:space-between;align-items:center"><span><b>Room ${b.r}</b> <span class="small muted num">${fDay(new Date(b.d+'T12:00').getTime())} · ${hm(b.h*60)}–${hm(b.h*60+60)}</span></span><button type="button" class="linkbtn" data-act="libToggle" data-id="${b.k}">Cancel</button></div>`).join('')}</div>`:''}
  <div class="dates">${days.map((d,i)=>{const x=new Date(d); return `<button type="button" class="${UI.libDay===i?'on':''}" data-act="ui" data-k="libDay" data-v="${i}" data-num="1"><span>${i===0?'Today':WD[x.getDay()]}</span><b>${x.getDate()}</b><i class="none"></i></button>`;}).join('')}</div>
  <div class="small muted">${usedToday}/2 hours booked on ${fDay(day)}</div>
  ${ROOMS.map(r=>`<div class="card"><div class="sec-h"><b>${r.name}</b><span class="small muted">${r.seats} seats · ${r.feat}</span></div><div class="slots">${[...Array(14)].map((_,j)=>{ const hr=8+j; const k=`${r.id}|${dk}|${hr}`; const mineB=S.library[k]; const taken=!mineB && hash(k)%3===0; const past=UI.libDay===0 && hr<=nowH-1; return `<button type="button" class="slot ${mineB?'mine':taken?'taken':''} ${past?'past':''}" ${taken||past?'disabled':''} data-act="libToggle" data-id="${k}" aria-label="${r.name} ${hm(hr*60)}">${hr>12?hr-12:hr}${hr>=12?'p':'a'}</button>`; }).join('')}</div></div>`).join('')}
  <div class="small muted" style="display:flex;gap:14px"><span><span class="cdot" style="--cc:var(--ok)"></span> Yours</span><span><span class="cdot" style="--cc:var(--line)"></span> Taken</span></div></div>`;
}};

/* 18. First-year checklist */
const CHECK={
  summer:[['s1','Accept your offer and pay the enrollment deposit','May 1','admissions'],['s2','Submit housing preferences','Jun 15'],['s3','Upload health forms and immunizations','Jul 15'],['s4','Take math and language placement exams','Jul 31'],['s5','Upload your Weaver ID photo','Aug 1'],['s6','Register for fall classes at orientation','Aug 14','schedule']],
  fall:[['f1','Move in and attend Week of Welcome','Aug 21'],['f2','Confirm your meal plan','Sep 4','wallet'],['f3','Add/drop deadline','Sep 4','schedule'],['f4','Meet your academic advisor for your registration PIN','Nov 6'],['f5','Decide on any course withdrawals (last day for a W)','Nov 6','grades'],['f6','Build a spring schedule with backup sections','Nov 8','schedule'],['f7','Register for spring classes at 7:00 AM','Nov 10','schedule'],['f8','Get a free flu shot at the Health Center','Nov 20','health'],['f9','File the 2027–28 FAFSA and CSS Profile (priority)','Dec 1'],['f10','Check out of your residence hall for winter break','Dec 18']],
  spring:[['p1','Return for spring move-in','Jan 17'],['p2','Sophomore housing application','Feb 12'],['p3','Room selection lottery','Mar 19'],['p4','Renew financial aid documents','Apr 15'],['p5','Sign up for summer storage','Apr 23'],['p6','Plan sophomore fall registration','Apr 6','schedule']],
};
function checkDate(term, s){ const [mo,da]=s.split(' '); const y=term==='spring'?2027:2026; return new Date(y, MON.indexOf(mo), +da, 23, 59).getTime(); }
SCREENS.checklist = {tab:'classes', title:'First-year checklist', render(){
  const items=CHECK[UI.term]; const done=items.filter(i=>S.checklist[i[0]]).length;
  return `<div class="pad">${seg('term',[['summer','Summer ’26'],['fall','Fall ’26'],['spring','Spring ’27']])}
  <div class="card"><div class="progress-h"><span>${done} of ${items.length} done</span><span class="num">${Math.round(done/items.length*100)}%</span></div><div class="bar ok"><i style="width:${done/items.length*100}%"></i></div></div>
  <div class="list">${items.map(([k,t,d,link])=>{ const on=S.checklist[k]; const ts=checkDate(UI.term,d); const dd=dayDiff(ts); const st=on?'':dd<0?'<span class="pill crit">Past due</span>':dd<=14?`<span class="pill warn">${dd===0?'Today':dd+' days'}</span>`:''; return `<div class="dl ${on?'done':''}"><button type="button" class="chk ${on?'on':''}" data-act="checkItem" data-id="${k}" aria-label="Toggle">${ic('check')}</button><div class="main"><div class="t">${esc(t)}</div><div class="s"><span class="num">${d}</span>${st}${link&&SCREENS[link]&&!on?` · <button type="button" class="linkbtn" data-go="${link}">Open</button>`:''}</div></div></div>`; }).join('')}</div></div>`;
}};

/* CAMPUS hub */
SCREENS.campus = {root:true, tab:'campus', title:'Campus', render(){
  const active=S.alerts.filter(a=>a.active).length;
  return `<div class="pad"><button type="button" class="sos-big" data-go="safewalk">${ic('walk')}<span><b>Request a Safe Walk</b><span class="small">An escort meets you anywhere on campus, 24/7</span></span></button>
  <div class="list">${row({icon:'cal',t:'Events',s:`${S.events.filter(e=>e.end>Date.now()).length} upcoming on campus`,go:'events'})}
  ${row({icon:'map',t:'Campus map',s:'Find buildings and rooms',go:'map'})}
  ${row({icon:'fork',t:'Dining',s:'Menus, hours, what’s open now',go:'dining'})}
  ${row({icon:'wallet',t:'Weaver Card',s:`${S.wallet.swipes} swipes · ${money(S.wallet.dd)} Dining Dollars`,go:'wallet'})}
  ${row({icon:'shield',t:'Safety',s:active?`${active} active alert${active>1?'s':''}`:'No active alerts',go:'safety',box:active?'brick':''})}
  ${row({icon:'heart',t:'Health & counseling',s:'CAPS, Health Center, support services',go:'health'})}
  ${row({icon:'dollar',t:'Budget & discounts',s:'Track spending, local student deals',go:'budget'})}</div></div>`;
}};

/* 8 + 13. Events */
SCREENS.events = {tab:'campus', title:'Events', render(){
  const days=[...Array(14)].map((_,i)=>at(i,12,0));
  const cats=['All','Academic','Arts','Athletics','Career','Clubs','Social','Wellness'];
  let list=S.events.filter(e=>e.end>Date.now()).sort((a,b)=>a.start-b.start);
  if(UI.evDate!=='all') list=list.filter(e=>dkey(e.start)===UI.evDate);
  if(UI.evCat!=='All') list=list.filter(e=>e.cat===UI.evCat);
  const has=new Set(S.events.map(e=>dkey(e.start)));
  return `<div class="pad"><div class="dates"><button type="button" class="${UI.evDate==='all'?'on':''}" data-act="ui" data-k="evDate" data-v="all"><span>All</span><b>${ic('list','sm')}</b><i class="none"></i></button>${days.map(d=>{const x=new Date(d); const k=dkey(d); return `<button type="button" class="${UI.evDate===k?'on':''}" data-act="ui" data-k="evDate" data-v="${k}"><span>${WD[x.getDay()]}</span><b>${x.getDate()}</b><i class="${has.has(k)?'':'none'}"></i></button>`;}).join('')}</div>
  ${chips('evCat',cats.map(c=>[c,c]))}
  <div class="list">${list.map(evRow).join('')||'<p class="empty">No events match.</p>'}</div>
  ${Object.keys(S.rsvps).length?`<button type="button" class="btn sec" data-go="tickets">${ic('qr','sm')}My tickets (${Object.keys(S.rsvps).length})</button>`:''}</div>`;
}};
SCREENS.event = {tab:'campus', title:'Event', render(p){
  const e=S.events.find(x=>x.id===p.id); if(!e) return '<p class="empty">Event not found</p>';
  const r=S.rsvps[e.id]; const pct=Math.min(100,e.going/e.cap*100); const full=e.going>=e.cap && !r;
  return `<div class="pad"><div><span class="eyebrow">${esc(e.cat)} · ${esc(e.host)}</span><h1 class="h-display" style="margin-top:4px">${esc(e.title)}</h1></div>
  <dl class="kv card"><dt>When</dt><dd>${fDay(e.start)}<br>${hmr(tmin(e.start),tmin(e.end))}</dd><dt>Where</dt><dd>${esc(e.place)}</dd><dt>Host</dt><dd>${esc(e.host)}</dd></dl>
  <p>${esc(e.desc)}</p>
  <div class="card"><div class="progress-h"><span>${e.going} going</span><span class="muted">${e.cap-e.going>0?`${e.cap-e.going} spots left`:'Full'}</span></div><div class="bar ${pct>90?'crit':pct>70?'warn':''}"><i style="width:${pct}%"></i></div></div>
  ${r?`<button type="button" class="btn block" data-go="ticket" data-id="${e.id}">${ic('qr','sm')}View my ticket</button><button type="button" class="btn sec block" data-act="unrsvp" data-id="${e.id}">Cancel RSVP</button>`:`<button type="button" class="btn block" data-act="rsvp" data-id="${e.id}" ${full?'disabled':''}>${full?'Event is full':'RSVP · get a check-in ticket'}</button>`}
  ${e.bldg?`<button type="button" class="btn ghost" data-go="map" data-q="${e.bldg}">${ic('pin','sm')}Show ${esc(BLD[e.bldg].name)} on map</button>`:''}</div>`;
}};
SCREENS.tickets = {tab:'campus', title:'My tickets', render(){
  const ids=Object.keys(S.rsvps).map(id=>S.events.find(e=>e.id===id)).filter(Boolean).sort((a,b)=>a.start-b.start);
  return `<div class="pad"><div class="list">${ids.map(evRow).join('')||'<p class="empty">No tickets yet. RSVP to an event to get one.</p>'}</div></div>`;
}};
SCREENS.ticket = {tab:'campus', title:'Ticket', render(p){
  let id=p.id || Object.keys(S.rsvps)[0]; const e=S.events.find(x=>x.id===id); const r=S.rsvps[id];
  if(!e||!r) return `<div class="pad"><p class="empty">No ticket yet. RSVP to an event to get a QR check-in ticket.</p><button type="button" class="btn" data-go="events">Browse events</button></div>`;
  return `<div class="pad"><div class="ticket"><div class="ticket-top"><span class="eyebrow">${esc(e.cat)} · Admit one</span><div class="h2" style="margin-top:4px">${esc(e.title)}</div><div class="small" style="color:var(--band-muted);margin-top:4px">${fDay(e.start)} · ${hmr(tmin(e.start),tmin(e.end))}<br>${esc(e.place)}</div></div>
  <div class="ticket-mid"><div class="qrbox" data-qr="${r.code}|${esc(S.me.name)}|${e.id}"></div><span class="mono" style="font-size:18px">${r.code}</span><span class="small muted">${esc(S.me.name)}</span>
  ${r.checked?`<span class="pill ok" style="font-size:14px;padding:6px 14px">${ic('check','sm')} Checked in at ${fTime(r.checked)}</span>`:`<span class="pill" style="font-size:13px;padding:5px 12px">Show this code at the door</span>`}</div></div>
  ${r.checked?'':`<button type="button" class="btn sec" data-act="simScan" data-id="${e.id}">${ic('qr','sm')}Simulate door scan</button><p class="tiny muted" style="text-align:center">Staff can also check you in from the staff portal.</p>`}</div>`;
}};

/* 14. Campus map — geometry, routing, screen */
const MW=600, MH=800, MPU=0.9;
const MAPN={};
for(let k=0;k<16;k++){ const a=k*Math.PI/8; MAPN['L'+k]=[300+175*Math.cos(a), 410+105*Math.sin(a)]; }
for(let k=0;k<8;k++){ const a=k*Math.PI/4; MAPN['Q'+k]=[300+50*Math.cos(a), 195+50*Math.sin(a)]; }
Object.assign(MAPN,{RW:[-60,640],R85:[85,640],S1:[185,640],R225:[225,640],S3:[390,640],R410:[410,640],R560:[560,640],RE:[660,640],W:[-60,410],E:[660,410]});
const MAPE=[];
for(let k=0;k<16;k++) MAPE.push(['L'+k,'L'+((k+1)%16),'the Lakeside Path']);
for(let k=0;k<8;k++) MAPE.push(['Q'+k,'Q'+((k+1)%8),'the path around Chapel Green']);
MAPE.push(['L12','Q2','Chapel Walk'],['L8','W','West Walk'],['L0','E','East Walk'],['L6','S1','Kestrel Walk'],['L2','S3','Arts Walk']);
['RW','R85','S1','R225','S3','R410','R560','RE'].reduce((a,b)=>(MAPE.push([a,b,'Grove Drive']),b));
const MAPADJ={};
MAPE.forEach(([a,b,n])=>{ const d=Math.hypot(MAPN[a][0]-MAPN[b][0],MAPN[a][1]-MAPN[b][1]); (MAPADJ[a]=MAPADJ[a]||[]).push([b,d,n]); (MAPADJ[b]=MAPADJ[b]||[]).push([a,d,n]); });
const MAP_YOU='L4';
const MAP_TREES=[[20,190],[95,195],[150,40],[400,30],[595,180],[520,180],[205,250],[395,250],[20,470],[500,470],[590,470],[295,705],[300,640-90],[152,700],[600,330],[30,355]]
  .concat([...Array(12)].map((_,i)=>{ const a=(i*30+15)*Math.PI/180; return [300+150*Math.cos(a),410+86*Math.sin(a)]; }));
const MAP_LAYERS={
  dining:{label:'Dining',icon:'fork',color:'var(--c4)'},
  study:{label:'Study spots',icon:'book',color:'var(--c5)'},
  phones:{label:'Blue-light phones',icon:'phone',color:'var(--c1)'},
  access:{label:'Accessible entrances',icon:'access',color:'var(--ok)'},
};
function bbox(pts){ const xs=pts.map(p=>p[0]), ys=pts.map(p=>p[1]); const x1=Math.min(...xs),x2=Math.max(...xs),y1=Math.min(...ys),y2=Math.max(...ys); return {x1,x2,y1,y2,cx:(x1+x2)/2,cy:(y1+y2)/2}; }
function mapRoute(to){
  const dist={[MAP_YOU]:0}, prev={}, done=new Set();
  for(;;){ let u=null,best=Infinity; for(const k in dist) if(!done.has(k)&&dist[k]<best){best=dist[k];u=k;} if(u===null||u===to) break; done.add(u);
    for(const [v,d,n] of MAPADJ[u]||[]){ const nd=dist[u]+d; if(nd<(dist[v]??Infinity)){ dist[v]=nd; prev[v]=[u,n]; } } }
  const nodes=[to], names=[]; let c=to; while(c!==MAP_YOU){ const [p,n]=prev[c]; names.unshift(n); nodes.unshift(p); c=p; }
  return {nodes,names,d:dist[to]||0};
}
function buildingRoute(k){
  const B=BLD[k]; const r=mapRoute(B.via); const last=MAPN[B.via];
  const d=r.d+Math.hypot(B.door[0]-last[0],B.door[1]-last[1]);
  const segs=[]; r.names.forEach((n,i)=>{ const a=MAPN[r.nodes[i]], b=MAPN[r.nodes[i+1]]; const dd=Math.hypot(a[0]-b[0],a[1]-b[1]); if(segs.length&&segs[segs.length-1].n===n) segs[segs.length-1].d+=dd; else segs.push({n,d:dd}); });
  const m=Math.round(d*MPU/10)*10;
  return {pts:r.nodes.map(n=>MAPN[n]).concat([B.door]), m:Math.max(10,m), min:Math.max(1,Math.round(m/80)), segs};
}
function bldgOpen(k){
  const b=BLD[k];
  if(k==='THN'){ const s=diningStatus('THN'); return {open:s.open, text:s.open?`Open · ${s.label} until ${hm(s.until%1440)}`:s.next}; }
  if(/24\/7/.test(b.hours)) return {open:true,text:'Open 24 hours'};
  const m=b.hours.match(/(\d{1,2}):(\d{2}) (AM|PM) – (\d{1,2}):(\d{2}) (AM|PM)/);
  if(!m) return {open:null,text:b.hours==='Residents only'?'Residents only · Weaver ID access':b.hours};
  const toMin=(h,mi,ap)=>(+h%12+(ap==='PM'?12:0))*60+ +mi; const a=toMin(m[1],m[2],m[3]); let z=toMin(m[4],m[5],m[6]); if(z<=a) z+=1440;
  const n=new Date(); const now=n.getHours()*60+n.getMinutes(); const open=(now>=a&&now<z)||(now+1440<z);
  return {open, text:`${open?'Open today':'Closed now'} · ${hm(a)}–${hm(z%1440)}`};
}
function placeSuggestions(q){
  q=(q||'').trim(); if(!q) return []; const ql=q.toLowerCase(), out=[];
  const m=q.toUpperCase().match(/^([A-Z]{3})\s*-?\s*(\d{3,4})$/);
  if(m&&BLD[m[1]]) out.push({b:m[1],room:m[2],t:`Room ${m[2]}`,s:BLD[m[1]].name,icon:'door',lbl:`${m[1]} ${m[2]}`});
  Object.entries(BLD).forEach(([k,b])=>{ if((k+' '+b.name+' '+b.kind).toLowerCase().includes(ql)) out.push({b:k,t:b.name,s:b.kind,icon:'bldg',lbl:b.name}); });
  COURSES.forEach(c=>{ if((c.code+' '+c.code.replace(' ','')+' '+c.title).toLowerCase().includes(ql)) out.push({b:bldgOf(c.room),room:c.room.slice(4),t:`${c.code} · ${c.title}`,s:`Room ${c.room.slice(4)}, ${BLD[bldgOf(c.room)].name}`,icon:'book',lbl:c.room}); });
  Object.values(PROFS).forEach(p=>{ if((p.name+' '+p.dept).toLowerCase().includes(ql)) out.push({b:bldgOf(p.office),room:p.office.slice(4),t:p.name,s:`Office ${p.office.slice(4)}, ${BLD[bldgOf(p.office)].name}`,icon:'user',lbl:p.office}); });
  return out.slice(0,6);
}
function mapFit(pts){
  const M=UI.map, asp=M.asp||1.3, b=bbox(pts);
  const w=Math.min(640,Math.max(300, b.x2-b.x1+110, (b.y2-b.y1+80)/(0.6*asp)));
  M.vb={cx:b.cx, cy:b.cy+0.2*w*asp, w};
}
function mapSelect(k, room=null, dir=false){
  const M=UI.map; M.sel=k; M.room=room; M.dir=dir; M.steps=false; M.tab='map'; M.sugg=false; M.layersOpen=false;
  mapFit(dir ? buildingRoute(k).pts : BLD[k].pts);
}
function mapApply(p){
  const M=UI.map;
  if(p.q){ const r=placeSuggestions(p.q)[0]; if(r){ mapSelect(r.b,r.room||null); M.q=r.lbl||p.q; } else { M.q=p.q; M.tab='map'; } M.sugg=false; }
  if(p.sel){ mapSelect(p.sel,null,!!p.dir); M.q=''; }
}
function openMap(p){ if(stack.length>1 && stack[stack.length-2].s==='map'){ stack.pop(); mapApply(p); render(); } else go('map',p); }
function mapVB(svg){
  svg=svg||document.getElementById('cmap'); if(!svg) return; const M=UI.map;
  const W=svg.clientWidth||360, H=svg.clientHeight||480; M.asp=H/W;
  let {cx,cy,w}=M.vb; w=Math.max(200,Math.min(700,w)); const h=w*M.asp; const padB=170*(w/W);
  cx = w>=MW+60 ? MW/2 : Math.max(w/2-30, Math.min(MW+30-w/2, cx));
  cy = h>=MH+padB+60 ? (MH+padB)/2 : Math.max(h/2-30, Math.min(MH+padB+30-h/2, cy));
  M.vb={cx,cy,w}; svg.setAttribute('viewBox',`${(cx-w/2).toFixed(1)} ${(cy-h/2).toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}`);
}
addEventListener('resize',()=>mapVB());
const pin=(x,y,L,r=10)=>`<g class="mpin" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><circle r="${r}" style="fill:${L.color}"/><g transform="translate(${-r*.62} ${-r*.62}) scale(${r*.052})"><path d="${IC[L.icon]}"/></g></g>`;
function mapSVG(){
  const M=UI.map; const sel=M.sel; const ring=(cx,cy,rx,ry)=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"`;
  let s=`<svg id="cmap" role="img" aria-label="Map of Ashgrove University campus. Drag to pan." viewBox="0 0 600 800" preserveAspectRatio="xMidYMid meet">
  <defs><pattern id="mgrid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" class="mg-line"/></pattern></defs>
  <rect x="-400" y="-400" width="1400" height="1700" class="mg-ground"/><rect x="-400" y="-400" width="1400" height="1700" fill="url(#mgrid)"/>
  <rect x="525" y="672" width="150" height="160" class="mfield"/><path d="M525 752h150 M600 672v160" class="mfield-l"/><text x="575" y="716" class="mlbl">REESE</text><text x="575" y="728" class="mlbl">FIELD</text>
  ${MAP_TREES.map(([x,y])=>`<circle class="mtree" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="9"/>`).join('')}
  <path class="mroad" d="M-60 640H660"/><path class="mroad-c" d="M-60 640H660"/>
  ${ring(300,410,175,105)} class="mw"/><circle cx="300" cy="195" r="50" class="mw"/>
  ${MAPE.filter(e=>/Walk$/.test(e[2])).map(([a,b])=>`<path class="mw" d="M${MAPN[a].map(v=>v.toFixed(1)).join(' ')}L${MAPN[b].map(v=>v.toFixed(1)).join(' ')}"/>`).join('')}
  ${Object.values(BLD).map(B=>`<path class="mw-thin" d="M${B.door.join(' ')}L${MAPN[B.via].map(v=>v.toFixed(1)).join(' ')}"/>`).join('')}
  <path class="mlake" d="M182 410C182 372 240 352 300 354C368 356 418 372 418 404C418 440 372 466 306 466C236 466 182 446 182 410Z"/><text x="300" y="414" class="mlbl mlake-t">WREN LAKE</text>
  <circle cx="300" cy="195" r="40" class="mgreen"/><text x="300" y="192" class="mlbl mgreen-t">CHAPEL</text><text x="300" y="204" class="mlbl mgreen-t">GREEN</text>`;
  if(sel && M.dir){ const r=buildingRoute(sel); const d='M'+r.pts.map(p=>p.map(v=>v.toFixed(1)).join(' ')).join('L'); s+=`<path class="mroute-bg" d="${d}"/><path class="mroute" d="${d}"/><circle cx="${BLD[sel].door[0]}" cy="${BLD[sel].door[1]}" r="6" class="mroute-end"/>`; }
  Object.entries(BLD).forEach(([k,B])=>{ const b=bbox(B.pts); const [lx,ly]=B.lblAt||[b.cx,b.cy]; const L=B.lbl;
    s+=`<g class="mb ${k===sel?'on':''}" data-act="mapSel" data-id="${k}" role="button" tabindex="0" aria-label="${esc(B.name)}"><polygon points="${B.pts.map(p=>p.join(',')).join(' ')}"/>${L.map((t,i)=>`<text x="${lx}" y="${ly+3+(i-(L.length-1)/2)*12}" class="mlbl">${t}</text>`).join('')}</g>`; });
  const Ly=M.layers;
  if(Ly.dining) ['THN','LAR'].forEach(k=>{ const b=bbox(BLD[k].pts); s+=pin(b.x2-2,b.y1+2,MAP_LAYERS.dining); });
  if(Ly.study) ['LIB','LAR','COR'].forEach(k=>{ const b=bbox(BLD[k].pts); s+=pin(b.x1+2,b.y1+2,MAP_LAYERS.study); });
  if(Ly.phones) ['L3','L9','L13','Q1','S1','R560','Q5'].forEach(n=>{ s+=pin(MAPN[n][0],MAPN[n][1],MAP_LAYERS.phones,9); });
  if(Ly.access) Object.values(BLD).forEach(B=>{ s+=pin(B.door[0],B.door[1],MAP_LAYERS.access,7); });
  const [yx,yy]=MAPN[MAP_YOU];
  s+=`<circle cx="${yx}" cy="${yy}" r="16" class="myou-r"/><circle cx="${yx}" cy="${yy}" r="7" class="myou"/><text x="${yx}" y="${yy-14}" class="mlbl myou-t">YOU</text></svg>`;
  return s;
}
function mapCard(){
  const M=UI.map;
  if(!M.sel){
    const nc=nextClass();
    if(nc){ const c=nc.c, k=bldgOf(c.room), r=buildingRoute(k); const when=nc.live?'Now':nc.i===0?'Today':nc.i===1?'Tomorrow':WDL[nc.date.getDay()];
      return `<div class="mcard"><div class="mc-top"><span class="eyebrow">Next class · ${when} ${hm(c.start)}</span><span class="micon">${ic('book','sm')}</span></div><div class="ttl">${c.code} · ${esc(c.title)}</div><div class="small muted">${esc(BLD[k].name)}, room ${c.room.slice(4)} · ${r.min} min walk</div>
      <div class="mbtns"><button type="button" class="mbtn" data-act="mapPick" data-v="${c.room}">Show room</button><button type="button" class="mbtn pri" data-act="mapPick" data-v="${c.room}" data-dir="1">${ic('nav','sm')}Directions</button></div></div>`; }
    return `<div class="mcard"><span class="eyebrow">Explore</span><div class="ttl">Tap any building</div><div class="small muted">See hours, rooms and walking directions.</div></div>`;
  }
  const k=M.sel, B=BLD[k], st=bldgOpen(k);
  if(M.dir){ const r=buildingRoute(k); const fl=M.room?+M.room[0]:0;
    const steps=r.segs.map((g,i)=>`<li>${i===0?'From Larch Commons, follow':'Turn onto'} ${g.n} for about ${Math.max(10,Math.round(g.d*MPU/10)*10)} m</li>`).join('')+`<li>Arrive at the main entrance of ${esc(B.name)}${M.room&&fl<=B.floors?`, then go to floor ${fl} for room ${M.room}`:''}</li>`;
    const via=r.segs.map(g=>g.n.replace(/^the /,'').replace(/^path around /,'')).map(x=>x[0].toUpperCase()+x.slice(1));
    return `<div class="mcard"><div class="mc-top"><span class="eyebrow">Walking directions</span><button type="button" class="icbtn" data-act="mapClose" aria-label="Close">${ic('x','sm')}</button></div><div class="ttl">${r.min} min to ${esc(B.name)}${M.room?`, room ${M.room}`:''}</div><div class="small muted">${r.m} m${via.length?` · via ${via.join(' → ')}`:' · right next to you'}</div>${M.steps?`<ol class="msteps">${steps}</ol>`:''}
    <div class="mbtns"><button type="button" class="mbtn" data-act="mapDirEnd">End</button><button type="button" class="mbtn pri" data-act="mapSteps" aria-expanded="${!!M.steps}">${ic('list','sm')}${M.steps?'Hide steps':'Steps'}</button></div></div>`;
  }
  const fl=M.room?+M.room[0]:0;
  return `<div class="mcard"><div class="mc-top"><span class="eyebrow">Building details · ${k}</span><span style="display:flex;gap:6px;align-items:center"><span class="micon">${ic('bldg','sm')}</span><button type="button" class="icbtn" data-act="mapClose" aria-label="Close">${ic('x','sm')}</button></span></div>
  <div class="ttl">${M.room?`Room ${M.room} · `:''}${esc(B.name)}</div>
  ${M.room?`<div class="small">${fl>B.floors||fl<1?`This building has ${B.floors} floor${B.floors>1?'s':''}. Check the room number.`:`Floor ${fl}, ${+M.room.slice(-2)%2?'east':'west'} wing`}</div>`:''}
  <div class="small muted" style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">${esc(st.text)}${st.open==null?'':`<span class="pill ${st.open?'ok':'crit'}">${st.open?'Open':'Closed'}</span>`}</div>
  <div class="mbtns"><button type="button" class="mbtn" data-act="mapDetails">View details</button><button type="button" class="mbtn pri" data-act="mapDir">${ic('nav','sm')}Directions</button></div></div>`;
}
function mapTabs(){ const M=UI.map; return `<div class="mtabs" role="tablist">${[['map','Campus map'],['on','What’s on']].map(([v,l])=>`<button type="button" role="tab" aria-selected="${M.tab===v}" class="${M.tab===v?'on':''}" data-act="mapTab" data-v="${v}">${l}</button>`).join('')}</div>`; }
SCREENS.map = {tab:'campus', title:'Campus map', render(p){
  const M=UI.map;
  if(!p._used){ p._used=true; mapApply(p); }
  if(M.tab==='on'){
    const evs=S.events.filter(e=>e.end>Date.now()).sort((a,b)=>a.start-b.start).slice(0,10);
    const groups={}; evs.forEach(e=>{ const dd=dayDiff(e.start); const g=dd<=0?'Today':dd===1?'Tomorrow':WDL[new Date(e.start).getDay()]+', '+MON[new Date(e.start).getMonth()]+' '+new Date(e.start).getDate(); (groups[g]=groups[g]||[]).push(e); });
    const openB=Object.keys(BLD).map(k=>({k,st:bldgOpen(k)})).filter(x=>x.st.open);
    return `<div>${mapTabs()}<div class="mhero"><span class="eyebrow">What’s on</span><h1>Happening around campus.</h1></div><div class="pad">
    ${Object.entries(groups).map(([g,list])=>`<div class="flabel">${g}</div><div class="list">${list.map(e=>`<div class="row"><button type="button" class="main" data-go="event" data-id="${e.id}" style="background:none;border:0;padding:0;text-align:left"><span class="t" style="display:block">${esc(e.title)}</span><span class="s" style="display:block">${hmr(tmin(e.start),tmin(e.end))} · ${esc(e.place)}</span></button>${e.bldg?`<button type="button" class="mbtn sm" data-act="mapSel" data-id="${e.bldg}">${ic('pin','sm')}${e.bldg}</button>`:''}</div>`).join('')}</div>`).join('')}
    <div class="flabel">Open right now</div><div class="list">${openB.map(({k,st})=>`<button type="button" class="row" data-act="mapSel" data-id="${k}"><span class="ibox">${ic('bldg')}</span><span class="main"><span class="t" style="display:block">${esc(BLD[k].name)}</span><span class="s" style="display:block">${esc(st.text)}</span></span><span class="pill ok">Open</span></button>`).join('')||'<p class="empty">Most buildings are closed right now. Campus Safety is open 24/7.</p>'}</div></div></div>`;
  }
  const sl=M.sugg?placeSuggestions(M.q):[]; M.sl=sl;
  return `<div class="mapscr">${mapTabs()}<div class="mhero"><span class="eyebrow">Campus map</span><h1>Find your way around.</h1>
  <form class="msearch" data-form="mapSearch" role="search"><div class="search">${ic('search')}<input id="map-q" class="input" placeholder="Building, room or course" value="${esc(M.q)}" data-in="mapQ" autocomplete="off" aria-label="Search the map"></div><button class="msq" type="submit" aria-label="Search">${ic('arrow')}</button></form>
  ${sl.length?`<div class="msugg" role="listbox">${sl.map((x,i)=>`<button type="button" role="option" data-act="mapSug" data-i="${i}"><span class="micon">${ic(x.icon,'sm')}</span><span style="min-width:0"><b>${esc(x.t)}</b><span class="small muted" style="display:block">${esc(x.s)}</span></span></button>`).join('')}</div>`:(M.sugg&&M.q.trim()?`<div class="msugg"><p class="small muted" style="padding:12px">No building, room or course matches “${esc(M.q)}”.</p></div>`:'')}</div>
  <div class="mwrap">${mapSVG()}
  <div class="mctl"><button type="button" data-act="mapZoom" data-v="in" aria-label="Zoom in">${ic('plus')}</button><button type="button" data-act="mapZoom" data-v="out" aria-label="Zoom out">${ic('minus')}</button><button type="button" data-act="mapHome" aria-label="Center on you">${ic('nav','sm')}</button></div>
  <button type="button" class="mlayers-btn ${Object.values(M.layers).some(Boolean)?'act':''}" data-act="mapLayers" aria-expanded="${M.layersOpen}">${ic('layers','sm')}Layers</button>
  ${M.layersOpen?`<div class="mlayers">${Object.entries(MAP_LAYERS).map(([k,L])=>`<label for="ml-${k}"><span class="mdot" style="background:${L.color}"></span><span style="flex:1">${L.label}</span>${sw('ml-'+k,M.layers[k],'mapLayer',`data-k="${k}"`)}</label>`).join('')}</div>`:''}
  ${mapCard()}</div></div>`;
}, after(){
  const svg=$('#cmap'); if(!svg) return; const M=UI.map; mapVB(svg); let st=null;
  svg.addEventListener('pointerdown',e=>{ if(e.button>0) return; M.dragged=false; if(M.sugg){ M.sugg=false; document.querySelector('.msugg')?.remove(); } if(M.layersOpen){ M.layersOpen=false; document.querySelector('.mlayers')?.remove(); document.querySelector('.mlayers-btn')?.setAttribute('aria-expanded','false'); } st={x:e.clientX,y:e.clientY,cx:M.vb.cx,cy:M.vb.cy,id:e.pointerId,mv:false}; });
  svg.addEventListener('pointermove',e=>{ if(!st||e.pointerId!==st.id) return; const dx=e.clientX-st.x, dy=e.clientY-st.y; if(!st.mv && Math.hypot(dx,dy)<6) return;
    if(!st.mv){ st.mv=true; try{ svg.setPointerCapture(e.pointerId); }catch(_){} svg.classList.add('drag'); }
    const k=M.vb.w/svg.clientWidth; M.vb.cx=st.cx-dx*k; M.vb.cy=st.cy-dy*k; mapVB(svg); });
  const end=()=>{ if(st&&st.mv) M.dragged=true; svg.classList.remove('drag'); st=null; };
  svg.addEventListener('pointerup',end); svg.addEventListener('pointercancel',end);
  svg.addEventListener('click',e=>{ if(M.dragged){ e.stopPropagation(); e.preventDefault(); M.dragged=false; } },true);
  svg.addEventListener('wheel',e=>{ e.preventDefault(); M.vb.w*=e.deltaY>0?1.12:1/1.12; mapVB(svg); },{passive:false});
}};
SCREENS.building = {tab:'campus', title:p=>BLD[p.id]?.name||'Building', render(p){
  const k=p.id, B=BLD[k]; if(!B) return '<p class="empty">Building not found</p>';
  const st=bldgOpen(k), r=buildingRoute(k);
  const myC=enrolled().filter(c=>bldgOf(c.room)===k);
  const offices=Object.entries(PROFS).filter(([,pr])=>bldgOf(pr.office)===k);
  const rooms=[...COURSES.filter(c=>bldgOf(c.room)===k).map(c=>[c.room.slice(4),`${c.code} classroom`]),...offices.map(([,pr])=>[pr.office.slice(4),`Office of ${pr.name}`])].sort((a,b)=>a[0].localeCompare(b[0]));
  const svc=HEALTH.filter(h=>h.where===k), din=Object.entries(DINING).filter(([,d])=>d.bldg===k), evs=S.events.filter(e=>e.bldg===k&&e.end>Date.now()).sort((a,b)=>a.start-b.start).slice(0,3);
  const extra={LIB:['Book a study room','library','door'],SAF:['Request a Safe Walk','safewalk','walk'],WEL:['Health & counseling services','health','heart'],ASH:['Career Center job board','jobs','brief'],THN:['Today’s menu','dining','fork'],LAR:['Pay with Weaver Card','wallet','wallet']}[k];
  return `<div class="pad"><div><span class="eyebrow">${k} · ${B.floors} floor${B.floors>1?'s':''}</span><h1 class="h-display" style="margin-top:4px">${esc(B.name)}</h1><p class="muted" style="margin-top:4px">${esc(B.kind)}</p></div>
  <div class="card"><div class="sec-h"><span style="font-weight:600">${esc(st.text)}</span>${st.open==null?'<span class="pill">Residents</span>':`<span class="pill ${st.open?'ok':'crit'}">${st.open?'Open now':'Closed'}</span>`}</div><div class="small muted">${r.min} min walk · ${r.m} m from you at Larch Commons</div>
  <div class="btns"><button type="button" class="btn" style="flex:1" data-act="bMap" data-id="${k}" data-dir="1">${ic('nav','sm')}Directions</button><button type="button" class="btn sec" style="flex:1" data-act="bMap" data-id="${k}">${ic('map','sm')}Show on map</button></div></div>
  ${extra?`<div class="list">${row({icon:extra[2],box:'brick',t:extra[0],go:extra[1]})}</div>`:''}
  ${myC.length?`${secH('Your classes here')}<div class="list">${myC.map(c=>row({t:`${c.code} · ${esc(c.title)}`,s:`Room ${c.room.slice(4)}, floor ${c.room[4]} · ${c.days} ${hmr(c.start,c.end)}`,act:'roomPick',id:c.room,right:`<span class="pill">${c.room.slice(4)}</span>`})).join('')}</div>`:''}
  ${din.length?`${secH('Dining')}<div class="list">${din.map(([dk,d])=>{ const s=diningStatus(dk); return row({icon:'fork',t:esc(d.name),s:s.open?`Open · ${s.label} until ${hm(s.until%1440)}`:s.next,act:'dineGo',id:dk,right:`<span class="pill ${s.open?'ok':''}">${s.open?'Open':'Closed'}</span>`}); }).join('')}</div>`:''}
  ${svc.length?`${secH('Services here')}<div class="list">${svc.map(h=>row({icon:'heart',t:esc(h.name),s:`${esc(h.floor)} · ${esc(h.hours)}`,go:'health'})).join('')}</div>`:''}
  ${evs.length?`${secH('Upcoming here')}<div class="list">${evs.map(evRow).join('')}</div>`:''}
  ${offices.length?`${secH('Faculty offices')}<div class="list">${offices.map(([id,pr])=>`<button type="button" class="row" data-go="prof" data-id="${id}"><span class="av" style="--cc:var(--c${(hash(id)%6)+1})">${initials(pr.name)}</span><span class="main"><span class="t" style="display:block">${esc(pr.name)}</span><span class="s" style="display:block">${esc(pr.dept)} · room ${pr.office.slice(4)}</span></span><span class="chev">${ic('right','sm')}</span></button>`).join('')}</div>`:''}
  ${rooms.length?`${secH('Room directory')}<div class="list">${rooms.map(([rm,t])=>`<button type="button" class="row" data-act="roomPick" data-id="${k} ${rm}"><span class="code">${rm}</span><span class="main"><span class="t" style="display:block">${esc(t)}</span><span class="s" style="display:block">Floor ${rm[0]}</span></span>${ic('pin','sm')}</button>`).join('')}</div>`:''}
  <div class="card"><span class="eyebrow">Getting in</span><p class="small">Step-free entrance at the main door, facing the path. ${B.floors>1?'The elevator is just inside the main entrance.':'Single-level building.'} ${/Residents/.test(B.hours)?'Residents tap their Weaver ID at the front door; guests must be signed in.':''}</p></div></div>`;
}};

/* 25–26. Job board & alumni network */
const JOBS=[
  {id:'j1',title:'Circulation Desk Assistant',employer:'Marlow Library',type:'On-campus',loc:'Marlow Library',pay:'$14.50/hr',hours:'8–10 hrs/week, evenings and weekends',due:at(4,17,0),fy:true,who:'All students; Federal Work-Study eligible',tags:['library','customer service','work-study'],desc:'Check materials in and out, help visitors find books and study rooms, and keep the main floor running during evening shifts.',does:['Staff the circulation desk and answer questions','Shelve returns and keep the stacks in order','Open and close study rooms for evening hours']},
  {id:'j2',title:'Peer Tutor, Calculus',employer:'Corrigan Tutoring Center',type:'On-campus',loc:'Corrigan Science Center',pay:'$16/hr',hours:'6 hrs/week',due:at(12,23,59),fy:false,who:'Students with an A- or better in MATH 211',tags:['math','tutoring','teaching'],desc:'Lead drop-in tutoring for Calculus I and II and run one review session before each exam.',does:['Hold two drop-in tutoring blocks a week','Run a weekly exam review','Complete a 4-hour training in January']},
  {id:'j3',title:'Summer Analyst Intern',employer:'Northbank Capital',type:'Internship',loc:'Richmond, VA · hybrid',pay:'$28/hr',hours:'Full-time, June–August 2027',due:at(9,23,59),fy:false,who:'Sophomores and juniors; all majors',alum:'jordan',tags:['finance','investing','analyst'],desc:'Join the middle-market banking team for ten weeks. Analysts build company profiles, help with valuation models and present a final deal case.',does:['Build company and industry profiles','Support valuation models and pitch materials','Present a capstone deal case to senior bankers']},
  {id:'j4',title:'Marketing & Social Media Intern',employer:'Canal Street Media',type:'Internship',loc:'Remote',pay:'$17/hr',hours:'10–12 hrs/week, spring semester',due:at(14,23,59),fy:true,who:'All class years',alum:'ben',tags:['media','marketing','film','social'],desc:'Help a small documentary studio plan and post content for its spring releases.',does:['Draft posts and cut short videos','Track engagement and report weekly','Help plan a spring screening tour']},
  {id:'j5',title:'Research Assistant, Cognition Lab',employer:'Department of Psychology',type:'On-campus',loc:'Halloway Hall',pay:'$15/hr',hours:'6–8 hrs/week',due:at(6,17,0),fy:true,who:'Students who have taken or are taking PSYC 100',tags:['research','psychology','lab'],desc:'Run participant sessions and code data for Prof. Nadia Brennan’s memory and attention studies.',does:['Schedule and run study sessions','Enter and check data','Attend the weekly lab meeting']},
  {id:'j6',title:'Summer Program Intern',employer:'River City Food Collective',type:'Internship',loc:'Richmond, VA',pay:'$3,500 summer stipend',hours:'Full-time, 9 weeks',due:at(20,23,59),fy:true,who:'All class years; funded by the Ashgrove Summer Fellowship',alum:'lucia',tags:['nonprofit','community','food','volunteering','cooking'],desc:'Coordinate weekly food distribution, manage volunteers and help run a neighborhood food-access survey.',does:['Coordinate volunteers at two distribution sites','Track inventory and deliveries','Help analyze the food-access survey']},
  {id:'j7',title:'Software Engineering Intern',employer:'Fall Line Software',type:'Internship',loc:'Washington, DC',pay:'$35/hr',hours:'Full-time, summer 2027',due:at(18,23,59),fy:false,who:'Sophomores and juniors who have taken CMSC 221',alum:'renee',tags:['tech','software','programming','robotics'],desc:'Ship features with a team that builds scheduling tools for city transit agencies.',does:['Pair with a mentor engineer','Ship two features to production','Present at intern demo day']},
  {id:'j8',title:'Weekend Barista',employer:'Canalside Coffee',type:'Part-time',loc:'Grove Ave · 0.4 mi from campus',pay:'$13/hr + tips',hours:'Saturday and Sunday mornings',due:null,fy:true,who:'Anyone; no experience needed',tags:['food','coffee','service'],desc:'Make drinks and keep the café running on weekend mornings. Training provided.',does:['Prepare espresso drinks','Run the register','Open the café at 7 AM']},
  {id:'j9',title:'Admission Tour Guide',employer:'Office of Admission',type:'On-campus',loc:'Larch Commons',pay:'$14/hr',hours:'3–5 tours a week',due:at(25,17,0),fy:true,who:'All students in good academic standing',tags:['speaking','admission','leadership'],desc:'Lead prospective students and families around campus and share your own Ashgrove story.',does:['Lead 60-minute walking tours','Staff open-house weekends','Host overnight visitors twice a semester']},
  {id:'j10',title:'Associate Consultant',employer:'Harrow & Pine Consulting',type:'Full-time',loc:'New York, NY',pay:'$90,000 + bonus',hours:'Full-time, starting July 2027',due:at(30,23,59),fy:false,who:'Graduating seniors (Class of 2027)',alum:'marcus',tags:['consulting','strategy','debate'],desc:'Work on strategy projects for healthcare and education clients in case teams of three to five.',does:['Research markets and interview experts','Build analyses and client presentations','Present findings to client teams']},
];
const JOB=Object.fromEntries(JOBS.map(j=>[j.id,j]));
const ALUMNI=[
  {id:'jordan',name:'Jordan Ellis',year:2018,role:'Vice President',company:'Northbank Capital',city:'Richmond, VA',major:'Economics',ind:'Finance',clubs:['invest'],tags:['Investing','Running'],home:'Charlotte, NC',open:true,c:1,path:[['2018','Analyst, Northbank Capital'],['2021','Associate'],['2024','Vice President, middle-market banking']],advice:'Take one accounting class early, even if you aren’t sure about finance. It made every interview easier.',helps:['Résumé review','Finance recruiting','Referral']},
  {id:'renee',name:'Renée Adeyemi',year:2015,role:'Director of Product',company:'Fall Line Software',city:'Washington, DC',major:'Computer Science',ind:'Tech',clubs:['robotics'],tags:['Robotics','Gaming'],home:'Baltimore, MD',open:true,c:5,path:[['2015','Software engineer, Fall Line'],['2019','Product manager'],['2023','Director of Product']],advice:'Build something small and finish it. A finished project says more than a long list of languages.',helps:['Tech careers','Internship search','Referral']},
  {id:'marcus',name:'Marcus Delaney',year:2020,role:'Engagement Manager',company:'Harrow & Pine Consulting',city:'New York, NY',major:'Leadership Studies',ind:'Consulting',clubs:['debate','mun'],tags:['Debate','Model UN'],home:'Norfolk, VA',open:true,c:2,path:[['2020','Associate Consultant'],['2022','Consultant'],['2025','Engagement Manager']],advice:'Debate taught me to structure an argument in thirty seconds. That is most of a case interview.',helps:['Case interview prep','Consulting recruiting','Referral']},
  {id:'lucia',name:'Lucía Ferreira',year:2012,role:'Executive Director',company:'River City Food Collective',city:'Richmond, VA',major:'Geography & Environment',ind:'Nonprofit',clubs:['build','outdoor'],tags:['Volunteering','Cooking','Hiking'],home:'Richmond, VA',open:true,c:3,path:[['2012','Service fellow'],['2015','Program manager'],['2021','Executive Director']],advice:'Volunteer somewhere for a full year. You learn what the work is really like, and people remember you.',helps:['Nonprofit careers','Summer internships','Grad school']},
  {id:'tom',name:'Thomas Hadley',year:2009,role:'Partner',company:'Bramwell & Ash LLP',city:'Charlotte, NC',major:'History',ind:'Law',clubs:['debate'],tags:['Debate','Writing'],home:'Charlotte, NC',open:false,c:4,path:[['2009','Paralegal'],['2014','Law degree, then litigation associate'],['2022','Partner']],advice:'Write every week. Lawyers are paid to write clearly.',helps:['Law school','Pre-law advice']},
  {id:'aisha',name:'Aisha Rahman',year:2017,role:'Pediatrician',company:'Riverlight Children’s Hospital',city:'Atlanta, GA',major:'Biology',ind:'Healthcare',clubs:[],tags:['Running','Volunteering'],home:'Fairfax, VA',open:true,c:6,path:[['2017','Clinical research coordinator'],['2019','Medical school'],['2026','Pediatrician']],advice:'Shadow early and keep notes on what surprises you. It helps your applications and your decision.',helps:['Pre-med advice','Research positions']},
  {id:'ben',name:'Ben Castellano',year:2021,role:'Producer',company:'Canal Street Media',city:'Los Angeles, CA',major:'English',ind:'Media',clubs:['film'],tags:['Indie film','Photography','Writing'],home:'Charlotte, NC',open:true,c:2,path:[['2021','Production assistant'],['2023','Associate producer'],['2025','Producer, documentary unit']],advice:'Make short films with friends now. Your reel matters more than your résumé.',helps:['Film & media','Portfolio review','Referral']},
  {id:'grace',name:'Grace Lin',year:2019,role:'Senior Data Scientist',company:'Kettlewell Analytics',city:'Chicago, IL',major:'Economics & Mathematics',ind:'Tech',clubs:['run','invest'],tags:['Running','Investing','Podcasts'],home:'Raleigh, NC',open:true,c:1,path:[['2019','Data analyst'],['2021','Data scientist'],['2024','Senior Data Scientist']],advice:'Learn to explain a result to someone who never saw the data. That skill gets you promoted.',helps:['Data careers','Economics to tech','Résumé review']},
];
const ALUM=Object.fromEntries(ALUMNI.map(a=>[a.id,a]));
const RESUME='Avery_Chen_Resume_Fall26.pdf';
const APP_STEPS=['Applied','Viewed','Interview','Decision'];
const logo=(name,lg)=>`<span class="logo ${lg?'lg':''}" style="--cc:var(--c${hash(name)%6+1})">${initials(name.replace(/^(The|Department of|Office of) /,''))}</span>`;
const yr=a=>`’${String(a.year).slice(2)}`;
function appPill(s){ return `<span class="pill ${s==='Interview'||s==='Offer'||s==='Accepted'?'ok':s==='Viewed'||s==='Requested'?'warn':''}">${s}</span>`; }
function jobDue(j){ if(!j.due) return {t:'Rolling',c:''}; const d=dayDiff(j.due); return {t:d<0?'Closed':d===0?'Due today':`${d} day${d>1?'s':''} left`,c:d<=3?'crit':d<=7?'warn':''}; }
function alumReasons(a){
  const r=[]; if(/econ/i.test(S.me.major)&&/econ/i.test(a.major)) r.push('Economics');
  a.clubs.forEach(c=>{ if(S.clubs[c]) r.push(CLUB[c].name); });
  a.tags.forEach(t=>{ if(S.me.interests.includes(t) && !r.includes(t)) r.push(t); });
  const city=a.home.split(',')[0]; if(S.me.bio.includes(city)) r.push(`From ${city}`);
  return r;
}
function jobRow(j){
  const a=S.apps[j.id], dd=jobDue(j), sv=S.saved[j.id];
  return `<div class="row" style="align-items:flex-start">${logo(j.employer)}<button type="button" class="main" data-go="job" data-id="${j.id}" style="background:none;border:0;padding:0;text-align:left"><span class="t" style="display:block">${esc(j.title)}</span><span class="s" style="display:block">${esc(j.employer)}${j.loc!==j.employer?` · ${esc(j.loc)}`:''}</span><span style="display:flex;gap:4px;flex-wrap:wrap;margin-top:6px"><span class="pill ${j.type==='Internship'?'brick':j.type==='On-campus'?'ok':''}">${j.type}</span>${j.fy?'<span class="pill">First-year friendly</span>':''}${a?appPill(a.status):''}</span></button>
  <span style="display:flex;flex-direction:column;align-items:flex-end;gap:2px"><button type="button" class="icbtn ${sv?'saved':''}" data-act="jobSave" data-id="${j.id}" aria-pressed="${!!sv}" aria-label="${sv?'Remove from saved':'Save job'}">${ic('bookmark',sv?'sm filled':'sm')}</button><span class="tiny num" style="font-weight:600;${dd.c?`color:var(--${dd.c})`:'color:var(--muted)'}">${dd.t}</span><span class="tiny muted">${esc(j.pay)}</span></span></div>`;
}
SCREENS.jobs = {tab:'connect', title:'Job board', render(){
  const q=(UI.jobQ||'').toLowerCase();
  const list=JOBS.filter(j=>(UI.jobType==='All'||j.type===UI.jobType)&&(!UI.jobFy||j.fy)&&(!UI.jobSaved||S.saved[j.id])&&(!q||(j.title+' '+j.employer+' '+j.tags.join(' ')).toLowerCase().includes(q))).sort((a,b)=>(a.due||9e15)-(b.due||9e15));
  const apps=Object.entries(S.apps).map(([id,a])=>({j:JOB[id],a})).filter(x=>x.j).sort((x,y)=>(y.a.iv||0)-(x.a.iv||0));
  const fair=S.events.find(e=>e.id==='e3' && e.end>Date.now());
  return `<div class="pad">
  ${fair?`<button type="button" class="card" data-go="event" data-id="e3" style="flex-direction:row;align-items:center;text-align:left;width:100%;cursor:pointer"><span class="ibox brick">${ic('brief')}</span><span style="flex:1;min-width:0"><b style="display:block">${esc(fair.title)}</b><span class="small muted">${fWhen(fair.start)} · ${esc(fair.place)}</span></span>${ic('right','sm')}</button>`:''}
  ${apps.length?`${secH('Your applications')}<div class="list">${apps.map(({j,a})=>`<button type="button" class="row" data-go="job" data-id="${j.id}">${logo(j.employer)}<span class="main"><span class="t" style="display:block">${esc(j.title)}</span><span class="s" style="display:block">${esc(j.employer)} · ${a.status==='Interview'&&a.iv?`Interview ${fWhen(a.iv)}`:`Applied ${fDay(a.ts)}`}</span></span>${appPill(a.status)}</button>`).join('')}</div>`:''}
  ${secH('Openings')}
  <div class="search">${ic('search')}<input id="job-q" class="input" placeholder="Search jobs, employers or skills" value="${esc(UI.jobQ||'')}" data-in="jobQ" autocomplete="off"></div>
  ${chips('jobType',[['All','All'],['Internship','Internships'],['On-campus','On-campus'],['Part-time','Part-time'],['Full-time','Full-time']])}
  <div class="chips"><button type="button" class="chip ${UI.jobFy?'on':''}" data-act="jobToggle" data-k="jobFy" aria-pressed="${UI.jobFy}">First-year friendly</button><button type="button" class="chip ${UI.jobSaved?'on':''}" data-act="jobToggle" data-k="jobSaved" aria-pressed="${UI.jobSaved}">${ic('bookmark','sm')} Saved (${Object.keys(S.saved).filter(k=>S.saved[k]).length})</button></div>
  <div class="small muted">${list.length} opening${list.length===1?'':'s'}</div>
  <div class="list">${list.map(jobRow).join('')||'<p class="empty">No jobs match these filters.</p>'}</div>
  <button type="button" class="btn sec" data-go="alumni">${ic('coffee','sm')}Meet alumni in these fields</button></div>`;
}};
SCREENS.job = {tab:'connect', title:p=>JOB[p.id]?.employer||'Job', render(p){
  const j=JOB[p.id]; if(!j) return '<p class="empty">Job not found</p>';
  const a=S.apps[j.id], al=j.alum&&ALUM[j.alum], dd=jobDue(j), sv=S.saved[j.id];
  const stepI=a?{Applied:0,Viewed:1,Interview:2,Offer:3}[a.status]??0:0;
  return `<div class="pad"><div style="display:flex;gap:12px;align-items:center">${logo(j.employer,1)}<div style="min-width:0"><span class="eyebrow">${j.type}${j.fy?' · First-year friendly':''}</span><h1 class="h2" style="margin-top:2px">${esc(j.title)}</h1><div class="small muted">${esc(j.employer)} · ${esc(j.loc)}</div></div></div>
  ${a?`<div class="card"><div class="sec-h"><span class="eyebrow">Your application</span>${appPill(a.status)}</div><div class="steps">${APP_STEPS.map((s,i)=>`<div class="step ${i<stepI||(i===stepI&&i===0)?'done':i===stepI?'cur':''}"><span class="dot">${i<stepI||(i===stepI&&i===0)?ic('check'):''}</span><div><b>${s}</b>${i===0?`<div class="small muted">${fWhen(a.ts)} · ${esc(a.resume)}</div>`:''}${i===2&&a.iv?`<div class="small muted">${fWhen(a.iv)} · ${esc(a.ivWhere)}</div>`:''}</div></div>`).join('')}</div></div>`:''}
  <dl class="kv card"><dt>Pay</dt><dd>${esc(j.pay)}</dd><dt>Hours</dt><dd>${esc(j.hours)}</dd><dt>Location</dt><dd>${esc(j.loc)}</dd><dt>Apply by</dt><dd>${j.due?`${fWhen(j.due)} <span class="pill ${dd.c}">${dd.t}</span>`:'Rolling, open until filled'}</dd><dt>Who can apply</dt><dd>${esc(j.who)}</dd></dl>
  <p>${esc(j.desc)}</p>
  <div class="card"><span class="eyebrow">What you’ll do</span><ul class="small" style="margin:0;padding-left:18px;display:flex;flex-direction:column;gap:4px">${j.does.map(d=>`<li>${esc(d)}</li>`).join('')}</ul></div>
  ${al?`<button type="button" class="card" data-go="alum" data-id="${al.id}" style="flex-direction:row;align-items:center;text-align:left;width:100%;cursor:pointer"><span class="av" style="--cc:var(--c${al.c})">${initials(al.name)}</span><span style="flex:1;min-width:0"><b style="display:block">${esc(al.name)} ${yr(al)} works here</b><span class="small muted">${esc(al.role)} · offers referrals to Ashgrove students</span></span>${ic('right','sm')}</button>`:''}
  ${a?'':`<button type="button" class="btn block" data-go="apply" data-id="${j.id}" ${dd.t==='Closed'?'disabled':''}>Apply with my profile</button>`}
  <div class="btns"><button type="button" class="btn sec" style="flex:1" data-act="jobSave" data-id="${j.id}">${ic('bookmark',sv?'sm filled':'sm')}${sv?'Saved':'Save'}</button>${j.due&&!a?`<button type="button" class="btn sec" style="flex:1" data-act="jobTrack" data-id="${j.id}">${ic('clock','sm')}Add to deadlines</button>`:''}</div></div>`;
}};
SCREENS.apply = {tab:'connect', title:'Apply', render(p){
  const j=JOB[p.id]; if(!j) return '<p class="empty">Pick a job from the job board first.</p>';
  return `<form class="pad" data-form="apply" data-id="${j.id}"><div class="card" style="flex-direction:row;align-items:center">${logo(j.employer)}<div style="min-width:0"><b style="display:block">${esc(j.title)}</b><span class="small muted">${esc(j.employer)}</span></div></div>
  <div class="field"><span class="flabel">Résumé</span><div class="copyline"><span style="font-family:var(--f-body);user-select:text">${ic('file','sm')} ${esc(UI.apFile||RESUME)}</span><label class="btn sec sm" for="ap-file" style="cursor:pointer">Replace</label></div><input id="ap-file" type="file" accept=".pdf,.doc,.docx" data-ch="apFile" hidden><span class="tiny muted">${UI.apFile?'Uploaded just now':'On file from your profile · updated Oct 12'}</span></div>
  <div class="field"><label for="ap-note">Note to the employer (optional)</label><textarea id="ap-note" name="note" class="input" placeholder="Why this role? Two or three sentences is plenty."></textarea></div>
  <div class="field"><label for="ap-avail">When can you start?</label><select id="ap-avail" name="avail" class="input"><option>Right away</option><option>Spring 2027</option><option>Summer 2027</option></select></div>
  <label for="ap-share" style="display:flex;gap:10px;align-items:center" class="small"><input type="checkbox" id="ap-share" name="share" checked style="width:20px;height:20px"> Share my Campus Life profile (year, major, interests)</label>
  <button class="btn block" type="submit">Submit application</button><p class="tiny muted" style="text-align:center">Prototype: nothing is sent to an employer.</p></form>`;
}};
SCREENS.alumni = {tab:'connect', title:'Alumni network', render(){
  const q=(UI.alumQ||'').toLowerCase();
  const list=ALUMNI.map(a=>({a,r:alumReasons(a)})).filter(({a})=>(UI.alumInd==='All'||a.ind===UI.alumInd)&&(!UI.alumOpen||a.open)&&(!q||(a.name+' '+a.company+' '+a.role+' '+a.major+' '+a.city).toLowerCase().includes(q))).sort((x,y)=>y.r.length-x.r.length||y.a.year-x.a.year);
  const chats=Object.entries(S.coffee).map(([id,c])=>({a:ALUM[id],c})).filter(x=>x.a);
  return `<div class="pad"><p class="small muted">${ALUMNI.length} Weavers who volunteered to help current students. Sorted by what you have in common.</p>
  ${chats.length?`${secH('Your coffee chats')}<div class="list">${chats.map(({a,c})=>`<button type="button" class="row" data-go="alum" data-id="${a.id}"><span class="av" style="--cc:var(--c${a.c})">${initials(a.name)}</span><span class="main"><span class="t" style="display:block">${esc(a.name)} ${yr(a)}</span><span class="s" style="display:block">${c.status==='Accepted'&&c.when?`${fWhen(c.when)} · ${esc(c.fmt)}`:`${esc(c.topic)} · sent ${ago(c.ts)} ago`}</span></span>${appPill(c.status)}</button>`).join('')}</div>`:''}
  <div class="search">${ic('search')}<input id="alum-q" class="input" placeholder="Search name, company or major" value="${esc(UI.alumQ||'')}" data-in="alumQ" autocomplete="off"></div>
  ${chips('alumInd',['All','Finance','Consulting','Tech','Nonprofit','Healthcare','Law','Media'].map(x=>[x,x]))}
  <div class="chips"><button type="button" class="chip ${UI.alumOpen?'on':''}" data-act="jobToggle" data-k="alumOpen" aria-pressed="${UI.alumOpen}">Open to coffee chats</button></div>
  <div class="list">${list.map(({a,r})=>`<button type="button" class="row" data-go="alum" data-id="${a.id}" style="align-items:flex-start"><span class="av" style="--cc:var(--c${a.c})">${initials(a.name)}</span><span class="main"><span class="t" style="display:block">${esc(a.name)} <span class="muted" style="font-weight:500">${yr(a)}</span></span><span class="s" style="display:block">${esc(a.role)}, ${esc(a.company)}</span><span class="s" style="display:block">${esc(a.city)} · ${esc(a.major)}</span>${r.length?`<span style="display:flex;gap:4px;flex-wrap:wrap;margin-top:6px">${r.map(x=>`<span class="pill brick">${esc(x)}</span>`).join('')}</span>`:''}</span>${a.open?'':'<span class="pill">Not taking chats</span>'}</button>`).join('')||'<p class="empty">No alumni match.</p>'}</div></div>`;
}};
SCREENS.alum = {tab:'connect', title:p=>ALUM[p.id]?.name||'Alum', render(p){
  const a=ALUM[p.id]; if(!a) return '<p class="empty">Not found</p>';
  const r=alumReasons(a), c=S.coffee[a.id], jobs=JOBS.filter(j=>j.alum===a.id);
  return `<div class="pad"><div class="card" style="flex-direction:row;align-items:center;gap:14px"><span class="av lg" style="--cc:var(--c${a.c})">${initials(a.name)}</span><div style="min-width:0"><div class="h2">${esc(a.name)}</div><div class="small">${esc(a.role)}, ${esc(a.company)}</div><div class="small muted">Class of ${a.year} · ${esc(a.major)} · ${esc(a.city)}</div></div></div>
  ${r.length?`<div><div class="flabel" style="margin-bottom:6px">You have in common</div><div style="display:flex;gap:6px;flex-wrap:wrap">${r.map(x=>`<span class="pill brick">${esc(x)}</span>`).join('')}</div></div>`:''}
  ${c?`<div class="card"><div class="sec-h"><span class="eyebrow">Coffee chat</span>${appPill(c.status)}</div><p class="small">${c.status==='Accepted'&&c.when?`<b>${fWhen(c.when)}</b> · ${esc(c.fmt)}<br>Topic: ${esc(c.topic)}. A calendar invite with the video link is in your Ashgrove email.`:`Sent ${ago(c.ts)} ago about ${esc(c.topic.toLowerCase())}. Alumni usually reply within a few days.`}</p></div>`
    : a.open?`<button type="button" class="btn block" data-go="coffee" data-id="${a.id}">${ic('coffee','sm')}Request a coffee chat</button>`:`<div class="alertbar">${ic('clock')}<span class="small">${esc(a.name.split(' ')[0])} isn’t taking new chats this term. Career Services can pass along a message.</span></div>`}
  <div class="card"><span class="eyebrow">Can help with</span><div style="display:flex;gap:6px;flex-wrap:wrap">${a.helps.map(h=>`<span class="pill">${esc(h)}</span>`).join('')}</div></div>
  <div class="card"><span class="eyebrow">Career path</span><div class="steps">${a.path.map(([y,t],i)=>`<div class="step ${i===a.path.length-1?'cur':'done'}"><span class="dot">${i===a.path.length-1?'':ic('check')}</span><div><b>${esc(t)}</b><div class="small muted num">${y}</div></div></div>`).join('')}</div></div>
  <div class="card"><span class="eyebrow">Advice for first-years</span><p class="quote">“${esc(a.advice)}”</p></div>
  ${jobs.length?`${secH(`Open roles at ${esc(a.company)}`)}<div class="list">${jobs.map(jobRow).join('')}</div>`:''}</div>`;
}};
SCREENS.coffee = {tab:'connect', title:'Coffee chat', render(p){
  const a=ALUM[p.id]; if(!a) return '<p class="empty">Pick someone from the alumni network first.</p>'; const first=a.name.split(' ')[0];
  return `<form class="pad" data-form="coffee" data-id="${a.id}"><div class="card" style="flex-direction:row;align-items:center"><span class="av" style="--cc:var(--c${a.c})">${initials(a.name)}</span><div><b style="display:block">${esc(a.name)} ${yr(a)}</b><span class="small muted">${esc(a.role)}, ${esc(a.company)}</span></div></div>
  <div class="field"><label for="cf-topic">What would you like to talk about?</label><select id="cf-topic" name="topic" class="input">${a.helps.concat(['General career advice']).map(h=>`<option>${esc(h)}</option>`).join('')}</select></div>
  <div class="grid2"><div class="field"><label for="cf-fmt">Format</label><select id="cf-fmt" name="fmt" class="input"><option>Video call · 20 min</option><option>Phone · 20 min</option>${/Richmond/.test(a.city)?'<option>In person · coffee near campus</option>':''}</select></div><div class="field"><label for="cf-when">When works</label><select id="cf-when" name="when" class="input"><option>Weekday afternoons</option><option>Weekday evenings</option><option>Weekends</option></select></div></div>
  <div class="field"><label for="cf-msg">Message</label><textarea id="cf-msg" name="msg" class="input" style="min-height:120px">Hi ${esc(first)}, I’m a first-year at Ashgrove thinking about ${esc(a.ind.toLowerCase())}. Would you have 20 minutes to share how you got started at ${esc(a.company)}? Thank you!</textarea></div>
  <button class="btn block" type="submit">Send request</button><p class="tiny muted" style="text-align:center">Alumni see your name, year, major and this message.</p></form>`;
}};

/* 15. Dining */
SCREENS.dining = {tab:'campus', title:'Dining', render(){
  const L=DINING[UI.dineLoc]; const st=diningStatus(UI.dineLoc); const meals=Object.keys(L.menu);
  let meal=UI.dineMeal && L.menu[UI.dineMeal] ? UI.dineMeal : (st.open && L.menu[st.label] ? st.label : meals[meals.length>1? (new Date().getHours()<11?0:new Date().getHours()<16?1:2) : 0]);
  const items=L.menu[meal].filter(([,t])=>!UI.dineTag || t.split(' ').includes(UI.dineTag));
  return `<div class="pad">${chips('dineLoc',Object.entries(DINING).map(([k,d])=>[k,d.name]))}
  <div class="card"><div class="sec-h"><div class="h2">${esc(L.name)}</div><span class="pill ${st.open?'ok':''}">${st.open?'Open now':'Closed'}</span></div>
  <dl class="kv">${L.periods.map(([l,a,b])=>`<dt>${l}</dt><dd class="num">${hmr(a,b%1440)}${b>1440?' (next day)':''}</dd>`).join('')}</dl>
  <div class="small muted">${st.open?`Open until ${hm(st.until%1440)}`:st.next} · ${L.swipes?'Meal swipes, Dining Dollars, Weaver Cash':'Dining Dollars or Weaver Cash'}</div></div>
  ${meals.length>1?`<div class="seg">${meals.map(m=>`<button type="button" class="${m===meal?'on':''}" data-act="ui" data-k="dineMeal" data-v="${m}">${m}</button>`).join('')}</div>`:''}
  ${chips('dineTag',[['','All'],['V','Vegetarian'],['VG','Vegan'],['GF','Gluten-free']])}
  <div class="list">${items.map(([n,t])=>`<div class="row"><span class="main"><span class="t" style="display:block">${esc(n)}</span></span>${t?t.split(' ').map(x=>`<span class="pill ${x==='GF'?'warn':'ok'}">${x}</span>`).join(''):''}</div>`).join('')||'<p class="empty">Nothing matches that filter.</p>'}</div>
  <p class="tiny muted">V vegetarian · VG vegan · GF made without gluten. Ask a chef about allergens.</p>
  <button type="button" class="btn" data-go="pay" data-id="${UI.dineLoc}">${ic('wallet','sm')}Pay here with Weaver Card</button></div>`;
}};

/* 16. Weaver Card (dining payment) */
SCREENS.wallet = {tab:'campus', title:'Weaver Card', render(){
  const W=S.wallet; const A={swipes:'Meal swipe',dd:'Dining Dollars',cash:'Weaver Cash'};
  return `<div class="pad"><div class="balance"><div><span>Meal swipes</span><b>${W.swipes}</b><span class="tiny muted">of ${W.swipesMax}</span></div><div><span>Dining $</span><b>${money(W.dd)}</b></div><div><span>Weaver Cash</span><b>${money(W.cash)}</b></div></div>
  <div class="btns"><button type="button" class="btn" style="flex:1" data-go="pay">${ic('wallet','sm')}Pay</button><button type="button" class="btn sec" style="flex:1" data-act="payQR">${ic('qr','sm')}Scan-to-pay code</button></div>
  ${UI.payQR?`<div class="card" style="align-items:center"><div class="qrbox" data-qr="${UI.payQR.code}"></div><span class="mono">${UI.payQR.code}</span><span class="small muted" id="qr-count">Refreshes in 30 s</span><p class="tiny muted" style="text-align:center">Hold up to the reader at any register. Charges Dining Dollars first.</p></div>`:''}
  <div class="card"><span class="eyebrow">Add Weaver Cash</span><div class="btns">${[25,50,100].map(v=>`<button type="button" class="btn sec sm" data-act="addCash" data-v="${v}">+$${v}</button>`).join('')}</div><p class="tiny muted">Prototype: no real payment is taken. In the live app this opens the university’s payment processor.</p></div>
  ${secH('Recent activity')}<div class="list">${W.txns.slice().sort((a,b)=>b.ts-a.ts).map(t=>row({icon:t.acct==='add'?'plus':'fork',t:esc(t.loc),s:`${fWhen(t.ts)} · ${A[t.acct]||'Weaver Cash deposit'}`,right:`<b class="num" style="${t.acct==='add'?'color:var(--ok)':''}">${t.acct==='swipes'?'1 swipe':(t.acct==='add'?'+':'−')+money(t.amt).replace('−','')}</b>`})).join('')}</div></div>`;
}};
SCREENS.pay = {tab:'campus', title:'Pay', render(p){
  if(p.id && !p._used){ UI.pay={step:'form',loc:p.id,amt:'',acct:DINING[p.id].swipes?'swipes':'dd'}; p._used=true; }
  const P=UI.pay; const L=DINING[P.loc]; const W=S.wallet;
  if(P.step==='done') return `<div class="pad"><div class="card" style="align-items:center;text-align:center;padding:28px 14px"><span class="chk on" style="width:56px;height:56px">${ic('check','lg')}</span><div class="h2">Paid</div><p>${P.acct==='swipes'?'1 meal swipe':money(+P.amt)} at ${esc(L.name)}</p><p class="small muted">${fWhen(Date.now())} · receipt saved to Weaver Card</p></div><button type="button" class="btn sec" data-act="payAgain">Done</button></div>`;
  const amt=+P.amt; const bal=P.acct==='swipes'?W.swipes:P.acct==='dd'?W.dd:W.cash;
  const ok = P.acct==='swipes' ? W.swipes>0 : (amt>0 && amt<=bal);
  if(P.step==='review') return `<div class="pad"><div class="card"><span class="eyebrow">Review payment</span><dl class="kv"><dt>Location</dt><dd>${esc(L.name)}</dd><dt>Amount</dt><dd class="num"><b>${P.acct==='swipes'?'1 meal swipe':money(amt)}</b></dd><dt>From</dt><dd>${P.acct==='swipes'?`Meal swipes (${W.swipes} left)`:P.acct==='dd'?`Dining Dollars (${money(W.dd)})`:`Weaver Cash (${money(W.cash)})`}</dd></dl></div>
  <button type="button" class="btn block" data-act="payConfirm">Confirm and pay</button><button type="button" class="btn sec block" data-act="payBack">Edit</button></div>`;
  return `<form class="pad" data-form="pay"><div class="field"><label for="py-loc">Where</label><select id="py-loc" class="input" data-ch="payLoc">${Object.entries(DINING).map(([k,d])=>`<option value="${k}" ${k===P.loc?'selected':''}>${esc(d.name)}</option>`).join('')}</select></div>
  <div class="field"><span class="flabel">Pay with</span><div class="seg">${[...(L.swipes?[['swipes','Swipe']]:[]),['dd','Dining $'],['cash','Weaver Cash']].map(([v,l])=>`<button type="button" class="${P.acct===v?'on':''}" data-act="payAcct" data-v="${v}">${l}</button>`).join('')}</div></div>
  ${P.acct==='swipes'?`<p class="small muted">One swipe covers entry to ${esc(L.name)}. You have ${W.swipes} left this semester.</p>`:`<div class="field"><label for="py-amt">Amount</label><input id="py-amt" class="input num" type="number" step="0.01" min="0.01" inputmode="decimal" placeholder="0.00" value="${esc(P.amt)}" data-in="payAmt"><span class="tiny muted">Available: ${money(bal)}</span></div>`}
  <button class="btn block" type="submit" ${ok?'':'disabled'}>Review</button></form>`;
}};

/* 20. Health */
SCREENS.health = {tab:'campus', title:'Health & counseling', render(){
  return `<div class="pad"><div class="crisis"><b>Need help right now?</b><p class="small">Call or text <b>988</b> (Suicide & Crisis Lifeline) any time, or call Campus Safety at <b class="num">(804) 555-0111</b>. In an emergency, call <b>911</b>.</p><p class="small">CAPS has a counselor on call 24/7 at <b class="num">(804) 555-0142</b>.</p></div>
  ${HEALTH.map(h=>`<div class="card"><div class="sec-h"><div class="h2" style="font-size:18px">${esc(h.name)}</div></div><p class="small">${esc(h.note)}</p>
  <dl class="kv small"><dt>Where</dt><dd>${esc(BLD[h.where].name)}, ${esc(h.floor)}</dd><dt>Hours</dt><dd>${esc(h.hours)}</dd></dl>
  <div class="copyline"><span>${h.phone}</span><button type="button" class="btn sec sm" data-act="copy" data-v="${h.phone}">${ic('copy','sm')}Copy</button></div>
  <div class="btns">${h.appt?`<button type="button" class="btn sm" data-act="healthReq" data-id="${h.id}">Request appointment</button>`:''}<button type="button" class="btn sec sm" data-go="map" data-q="${h.where}">${ic('pin','sm')}Map</button></div>
  ${UI.healthReq===h.id?`<form class="card" style="background:var(--surface-2)" data-form="health" data-id="${h.id}"><div class="field"><label for="hr-when">Preferred time</label><select id="hr-when" name="when" class="input"><option>As soon as possible</option><option>Mornings</option><option>Afternoons</option><option>Virtual visit</option></select></div><div class="field"><label for="hr-note">Anything you’d like them to know (optional)</label><textarea id="hr-note" name="note" class="input" style="min-height:70px"></textarea></div><p class="tiny muted">Requests are private and go only to ${esc(h.short)}.</p><button class="btn sm" type="submit">Send request</button></form>`:''}
  ${S.healthReqs.filter(r=>r.id===h.id).map(r=>`<span class="pill ok">${ic('check','sm')} Request sent ${ago(r.ts)} ago · they’ll reply by email</span>`).join('')}</div>`).join('')}</div>`;
}};

/* 22. Safety + Safe Walk */
SCREENS.safety = {tab:'campus', title:'Safety', render(){
  const sevP={urgent:'crit',advisory:'warn',info:'',resolved:'ok'};
  return `<div class="pad"><button type="button" class="sos-big" data-go="safewalk">${ic('walk')}<span><b>${S.walk&&S.walk.step<4?'Safe Walk in progress':'Request a Safe Walk'}</b><span class="small">${S.walk&&S.walk.step<4?'Tap to see your escort':'A trained escort walks with you, 24/7'}</span></span></button>
  <div class="copyline"><span>Campus Safety 24/7 · (804) 555-0111</span><button type="button" class="btn sec sm" data-act="copy" data-v="(804) 555-0111">${ic('copy','sm')}Copy</button></div>
  ${secH('Alerts')}<div class="list">${S.alerts.slice().sort((a,b)=>(b.active-a.active)||b.ts-a.ts).map(a=>`<div class="row" style="align-items:flex-start"><span class="ibox ${a.sev==='urgent'?'brick':''}">${ic(a.sev==='resolved'?'check':'alert')}</span><span class="main"><span style="display:flex;gap:6px;align-items:center;flex-wrap:wrap"><span class="pill ${sevP[a.sev]}">${a.sev[0].toUpperCase()+a.sev.slice(1)}</span><span class="tiny muted">${ago(a.ts)} ago</span></span><span class="t" style="display:block;margin-top:4px">${esc(a.title)}</span><span class="s" style="display:block">${esc(a.body)}</span></span></div>`).join('')}</div>
  <div class="card"><span class="eyebrow">Good to know</span><ul class="small" style="margin:0;padding-left:18px;display:flex;flex-direction:column;gap:4px"><li>Blue-light phones are on every path around Wren Lake.</li><li>Residence halls lock at 10 PM; your Weaver ID opens your own hall.</li><li>The lakeside path is lit and patrolled until 2 AM.</li></ul></div></div>`;
}};
const WALK_STEPS=['Request sent','Escort assigned','Escort on the way','Escort is with you','Arrived safely'];
let walkT=[];
function advanceWalk(){
  walkT.forEach(clearTimeout); walkT=[];
  const delays=[[1,2500,'Escort assigned','Officer Dana Pruitt will meet you in about 4 minutes.'],[2,6000,'Escort on the way','Dana is walking over from Campus Safety.'],[3,12000,'Your escort is here','Look for the reflective Campus Safety vest.']];
  delays.forEach(([st,ms,t,b])=>walkT.push(setTimeout(()=>{ if(!S.walk||S.walk.step>=st) return; S.walk.step=st; notify('safety',t,b); if(curTop().s==='safewalk') render({keep:true}); }, ms)));
}
SCREENS.safewalk = {tab:'campus', title:'Safe Walk', render(){
  const W=S.walk; const opts=Object.entries(BLD).map(([k,b])=>[k,b.name]);
  if(!W || W.step>=4) return `<form class="pad" data-form="walk"><p class="small muted">A Campus Safety escort or trained student walker meets you and walks with you anywhere on campus. Average wait is under 5 minutes.</p>
  <div class="field"><label for="w-from">Pick me up at</label><select id="w-from" name="from" class="input">${opts.map(([k,n])=>`<option value="${k}" ${k==='LIB'?'selected':''}>${esc(n)}</option>`).join('')}</select></div>
  <div class="field"><label for="w-to">Walk me to</label><select id="w-to" name="to" class="input">${opts.map(([k,n])=>`<option value="${k}" ${k==='LRH'?'selected':''}>${esc(n)}</option>`).join('')}</select></div>
  <div class="field"><label for="w-note">Note for your escort (optional)</label><input id="w-note" name="note" class="input" placeholder="e.g. I’m at the main entrance in a green jacket"></div>
  <button class="btn block" type="submit">${ic('walk','sm')}Request Safe Walk</button>
  <p class="tiny muted" style="text-align:center">If you feel you are in danger, call 911.</p>
  ${W&&W.step>=4?`<p class="small muted" style="text-align:center">Last walk completed ${ago(W.done)} ago.</p>`:''}</form>`;
  return `<div class="pad"><div class="card"><span class="eyebrow">${esc(BLD[W.from].name)} → ${esc(BLD[W.to].name)}</span>
  <div class="steps">${WALK_STEPS.slice(0,4).map((s,i)=>`<div class="step ${i<W.step?'done':i===W.step?'cur':''}"><span class="dot">${i<W.step?ic('check'):''}</span><div><b>${s}</b>${i===1&&W.step>=1?`<div class="small muted">Officer Dana Pruitt · badge 214</div>`:''}${i===2&&W.step===2?`<div class="small muted">About 3 minutes away</div>`:''}</div></div>`).join('')}</div></div>
  ${W.step>=3?`<button type="button" class="btn ok block" data-act="walkDone">${ic('check','sm')}I’ve arrived safely</button>`:''}
  <div class="copyline"><span>Call dispatch · (804) 555-0111</span><button type="button" class="btn sec sm" data-act="copy" data-v="(804) 555-0111">Copy</button></div>
  <button type="button" class="btn sec block" data-act="walkCancel">Cancel request</button></div>`;
}};

/* 21. Budget */
SCREENS.budget = {tab:'campus', title:'Budget', render(){
  const B=S.budget; const m=new Date(); const mon=B.exp.filter(e=>{const d=new Date(e.ts); return d.getMonth()===m.getMonth()&&d.getFullYear()===m.getFullYear();});
  const spent=mon.reduce((a,e)=>a+e.amt,0); const left=B.total-spent; const pct=Math.min(100,spent/B.total*100);
  const daysLeft=new Date(m.getFullYear(),m.getMonth()+1,0).getDate()-m.getDate()+1;
  const cats=['Food','Books','Transport','Fun','Personal']; const byCat=cats.map(c=>[c,mon.filter(e=>e.cat===c).reduce((a,e)=>a+e.amt,0)]); const maxC=Math.max(1,...byCat.map(x=>x[1]));
  const disc=DISCOUNTS.filter(d=>UI.discCat==='All'||d.cat===UI.discCat);
  return `<div class="pad"><div class="card"><div class="sec-h"><span class="eyebrow">${MON[m.getMonth()]} budget</span><label class="small muted" for="bd-total">Monthly $ <input id="bd-total" class="input num" type="number" min="0" style="width:90px;min-height:32px;padding:4px 8px;display:inline-block" value="${B.total}" data-ch="budTotal"></label></div>
  <div style="display:flex;align-items:baseline;gap:8px"><span class="h-display num">${money(left)}</span><span class="muted small">left · ${daysLeft} days to go</span></div>
  <div class="bar ${pct>90?'crit':pct>70?'warn':'ok'}"><i style="width:${pct}%"></i></div><div class="small muted num">${money(spent)} of ${money(B.total)} spent · about ${money(Math.max(0,left)/daysLeft)} a day</div></div>
  <div class="card"><span class="eyebrow">By category</span>${byCat.map(([c,v])=>`<div style="display:grid;grid-template-columns:76px 1fr 64px;gap:8px;align-items:center" class="small"><span>${c}</span><div class="bar"><i style="width:${v/maxC*100}%"></i></div><span class="num" style="text-align:right">${money(v)}</span></div>`).join('')}</div>
  <form class="card" data-form="expense"><span class="eyebrow">Add expense</span><div class="grid2"><div class="field"><label for="ex-amt">Amount</label><input id="ex-amt" name="amt" class="input num" type="number" step="0.01" min="0.01" required inputmode="decimal" placeholder="0.00"></div><div class="field"><label for="ex-cat">Category</label><select id="ex-cat" name="cat" class="input">${cats.map(c=>`<option>${c}</option>`).join('')}</select></div></div><div class="field"><label for="ex-note">What for</label><input id="ex-note" name="note" class="input" placeholder="e.g. Lab goggles"></div><button class="btn sec" type="submit">${ic('plus','sm')}Add</button></form>
  ${secH('This month')}<div class="list">${mon.slice().sort((a,b)=>b.ts-a.ts).map(e=>`<div class="row"><span class="main"><span class="t" style="display:block">${esc(e.note)}</span><span class="s" style="display:block">${e.cat} · ${fDay(e.ts)}</span></span><b class="num">${money(e.amt)}</b><button type="button" class="icbtn" data-act="delExp" data-id="${e.id}" aria-label="Delete">${ic('trash','sm')}</button></div>`).join('')||'<p class="empty">No expenses yet this month.</p>'}</div>
  ${secH('Student discounts')}${chips('discCat',[['All','All'],['Food','Food'],['Books','Books'],['Transport','Getting around'],['Fun','Fun']])}
  <div class="list">${disc.map(d=>`<div class="row"><span class="ibox">${ic('tag')}</span><span class="main"><span class="t" style="display:block">${esc(d.name)}</span><span class="s" style="display:block">${esc(d.deal)} · ${esc(d.where)}</span></span><span class="code">${esc(d.code)}</span></div>`).join('')}</div></div>`;
}};

/* CONNECT hub */
SCREENS.connect = {root:true, tab:'connect', title:'Connect', render(){
  const myClubs=Object.entries(S.clubs).filter(([,v])=>v==='member').length;
  return `<div class="pad"><div class="list">${row({icon:'users',t:'Clubs & organizations',s:`${CLUBS.length} groups · you’re in ${myClubs}`,go:'clubs'})}
  ${row({icon:'chat',t:'Chats & study groups',s:`${S.chats.length} conversations`,go:'chats'})}
  ${row({icon:'star',t:'Find classmates & roommates',s:'Matched by classes, interests and habits',go:'match'})}
  ${row({icon:'bulb',t:'Peer tips',s:'Advice from upper-class students',go:'tips'})}</div>
  ${secH('Careers')}<div class="list">${row({icon:'brief',t:'Job board',s:`${JOBS.length} openings · ${Object.keys(S.apps).length} applications in progress`,go:'jobs'})}
  ${row({icon:'coffee',t:'Alumni network',s:`${ALUMNI.length} alumni mentors · ${Object.keys(S.coffee).length} coffee chat${Object.keys(S.coffee).length===1?'':'s'}`,go:'alumni'})}</div>
  ${secH('Latest from your chats')}<div class="list">${S.chats.slice(0,3).map(chatRow).join('')}</div></div>`;
}};

/* 9. Clubs */
SCREENS.clubs = {tab:'connect', title:'Clubs', render(){
  const q=UI.clubQ.toLowerCase(); const cats=['All','Academic','Arts','Career','Service','Social','Sports'];
  const list=CLUBS.filter(c=>(UI.clubCat==='All'||c.cat===UI.clubCat)&&(!q||(c.name+c.desc).toLowerCase().includes(q)));
  return `<div class="pad"><div class="search">${ic('search')}<input id="club-q" class="input" placeholder="Search clubs" value="${esc(UI.clubQ)}" data-in="clubQ" autocomplete="off"></div>${chips('clubCat',cats.map(c=>[c,c]))}
  <div class="list">${list.map(c=>{ const st=S.clubs[c.id]; return `<div class="row"><button type="button" class="main" data-go="club" data-id="${c.id}" style="background:none;border:0;padding:0;text-align:left"><span class="t" style="display:block">${esc(c.name)}</span><span class="s" style="display:block">${c.cat} · ${c.members+(st==='member'?0:0)} members · ${c.policy==='open'?'Open to all':'Request to join'}</span></button>${clubBtn(c)}</div>`; }).join('')||'<p class="empty">No clubs match.</p>'}</div></div>`;
}};
function clubBtn(c){ const st=S.clubs[c.id];
  if(st==='member') return `<span class="pill ok">${ic('check','sm')}Member</span>`;
  if(st==='pending') return `<span class="pill warn">Pending</span>`;
  return `<button type="button" class="btn sm ${c.policy==='open'?'':'sec'}" data-act="joinClub" data-id="${c.id}">${c.policy==='open'?'Join':'Request'}</button>`; }
SCREENS.club = {tab:'connect', title:p=>CLUB[p.id]?.name||'Club', render(p){
  const c=CLUB[p.id]; const st=S.clubs[c.id]; const evs=S.events.filter(e=>e.club===c.id && e.end>Date.now()); const ch=S.chats.find(x=>x.club===c.id);
  return `<div class="pad"><div><span class="eyebrow">${c.cat} · ${c.members} members</span><h1 class="h-display" style="margin-top:4px">${esc(c.name)}</h1></div><p>${esc(c.desc)}</p>
  <dl class="kv card"><dt>Meets</dt><dd>${esc(c.meets)}</dd><dt>Joining</dt><dd>${c.policy==='open'?'Open: join instantly':'Officers review requests, usually within 2 days'}</dd></dl>
  ${st==='member'?`<div class="btns">${ch?`<button type="button" class="btn" style="flex:1" data-go="chat" data-id="${ch.id}">${ic('chat','sm')}Open club chat</button>`:''}<button type="button" class="btn sec" data-act="leaveClub" data-id="${c.id}">Leave</button></div>`:st==='pending'?`<div class="alertbar">${ic('clock')}<span class="small"><b>Request pending.</b> You’ll get a notification when an officer responds.</span></div><button type="button" class="btn sec" data-act="leaveClub" data-id="${c.id}">Withdraw request</button>`:`<button type="button" class="btn block" data-act="joinClub" data-id="${c.id}">${c.policy==='open'?'Join club':'Request to join'}</button>`}
  ${evs.length?`${secH('Upcoming')}<div class="list">${evs.map(evRow).join('')}</div>`:''}</div>`;
}};

/* 12. Chats & study groups */
function chatRow(c){ const last=c.msgs[c.msgs.length-1]; const who=last?(last.who==='me'?'You':PEER[last.who]?.name.split(' ')[0]):'';
  return `<button type="button" class="row" data-go="chat" data-id="${c.id}"><span class="ibox ${c.study?'brick':''}">${ic(c.study?'book':c.club?'users':'chat')}</span><span class="main"><span class="t" style="display:block">${esc(c.name)} ${c.study?'<span class="pill brick">Study group</span>':''}</span><span class="s" style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${last?`${who}: ${esc(last.text)}`:'No messages yet'}</span></span><span class="tiny muted">${last?ago(last.ts):''}</span></button>`; }
SCREENS.chats = {tab:'connect', title:'Chats', render(){
  const list=S.chats.slice().sort((a,b)=>(b.msgs.at(-1)?.ts||0)-(a.msgs.at(-1)?.ts||0));
  return `<div class="pad"><button type="button" class="btn" data-go="group-new">${ic('plus','sm')}New study group</button><div class="list">${list.map(chatRow).join('')}</div></div>`;
}};
SCREENS.chat = {tab:'connect', title:p=>S.chats.find(c=>c.id===p.id)?.name||'Chat', render(p){
  const c=S.chats.find(x=>x.id===p.id); if(!c) return '<p class="empty">Chat not found</p>';
  return `<div class="chat">${c.study||c.meets?`<div class="card" style="padding:10px 12px"><div class="small"><b>${courseLabel(c.course)}</b>${c.meets?` · Meets ${esc(c.meets)}`:''}</div><div class="tiny muted">${c.members.map(m=>PEER[m]?.name).filter(Boolean).join(', ')} and you</div></div>`:`<div class="tiny muted" style="text-align:center">${c.members.map(m=>PEER[m]?.name).filter(Boolean).join(', ')} and you</div>`}
  ${c.msgs.map(m=>`<div class="msg ${m.who==='me'?'me':''}">${m.who!=='me'?`<span class="who">${esc(PEER[m.who]?.name||m.who)}</span>`:''}<span class="b">${esc(m.text)}</span></div>`).join('')}
  ${UI.typing===c.id?`<div class="typing">Someone is typing…</div>`:''}</div>
  <form class="composer" data-form="msg" data-id="${c.id}"><input id="msg-in" name="text" class="input" placeholder="Message" autocomplete="off" aria-label="Message"><button class="btn" type="submit" aria-label="Send">${ic('send','sm')}</button></form>`;
}, after(){ const s=$('#screen'); s.scrollTop=s.scrollHeight; }};
SCREENS['group-new'] = {tab:'connect', title:'New study group', render(){
  const cands=PEERS.filter(p=>p.courses.some(c=>S.enrolled.includes(c)));
  return `<form class="pad" data-form="group"><div class="field"><label for="g-course">Course</label><select id="g-course" name="course" class="input">${courseOptions(S.enrolled[0],false)}</select></div>
  <div class="field"><label for="g-name">Group name</label><input id="g-name" name="name" class="input" placeholder="e.g. Calc midterm crew"></div>
  <div class="field"><label for="g-meets">When you’ll meet</label><input id="g-meets" name="meets" class="input" placeholder="e.g. Sun 4:00 PM · LIB 215"></div>
  <div class="flabel">Invite classmates</div><div class="list">${cands.map(p=>`<label class="row" for="gi-${p.id}"><span class="av" style="--cc:var(--c${p.c})">${initials(p.name)}</span><span class="main"><span class="t" style="display:block">${esc(p.name)}</span><span class="s" style="display:block">${p.courses.filter(c=>S.enrolled.includes(c)).map(courseLabel).join(', ')}</span></span><input type="checkbox" id="gi-${p.id}" name="m" value="${p.id}" style="width:20px;height:20px"></label>`).join('')}</div>
  <button class="btn block" type="submit">Create group</button></form>`;
}};

/* 11. Matching */
function classScore(p){ const sc=p.courses.filter(c=>S.enrolled.includes(c)); const si=p.interests.filter(i=>S.me.interests.includes(i)); return {sc,si,score:Math.min(99,sc.length*22+si.length*14+(p.dorm.startsWith(S.me.dorm.split(' ')[0])?8:0))}; }
function roomScore(p){ const d=p.rq.reduce((a,v,i)=>a+Math.abs(v-S.rq[i]),0); return Math.round(100-d/20*100); }
SCREENS.match = {tab:'connect', title:'Find your people', render(){
  let h=`<div class="pad">${seg('matchTab',[['class','Classmates'],['room','Roommates']])}`;
  if(UI.matchTab==='class'){
    const list=PEERS.map(p=>({p,...classScore(p)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score);
    h+=`<p class="small muted">Ranked by shared classes and interests. Only first-years who opted in to matching are shown.</p><div class="list">${list.map(({p,sc,si,score})=>`<div class="row" style="align-items:flex-start"><span class="av" style="--cc:var(--c${p.c})">${initials(p.name)}</span><span class="main"><span class="t" style="display:block">${esc(p.name)} <span class="pill ${score>60?'ok':''}">${score}% match</span></span><span class="s" style="display:block">${p.dorm}</span><span style="display:flex;flex-wrap:wrap;gap:4px;margin-top:6px">${sc.map(c=>`<span class="pill" style="${cc(c)};color:var(--cc)">${courseLabel(c)}</span>`).join('')}${si.map(i=>`<span class="pill brick">${esc(i)}</span>`).join('')}</span></span><button type="button" class="btn sec sm" data-act="sayHi" data-id="${p.id}">Say hi</button></div>`).join('')}</div>`;
  } else {
    const list=PEERS.map(p=>({p,s:roomScore(p)})).sort((a,b)=>b.s-a.s);
    h+=`<div class="card"><span class="eyebrow">Your living habits</span>${RQ.map(([q,a,b],i)=>`<div class="field"><label for="rq-${i}" style="display:flex;justify-content:space-between"><span>${q}</span><span class="muted">${a} ↔ ${b}</span></label><input id="rq-${i}" type="range" min="1" max="5" value="${S.rq[i]}" data-in="rq" data-i="${i}" style="width:100%;accent-color:var(--brick)"></div>`).join('')}<p class="tiny muted">Used only for roommate matching for 2027–28 housing. Room selection opens Mar 19.</p></div>
    <div class="list">${list.map(({p,s})=>{ const r=S.matchReq[p.id]; return `<div class="row"><span class="av" style="--cc:var(--c${p.c})">${initials(p.name)}</span><span class="main"><span class="t" style="display:block">${esc(p.name)}</span><span class="s" style="display:block">${RQ.map(([q],i)=>Math.abs(p.rq[i]-S.rq[i])<=1?q:null).filter(Boolean).join(' · ')||'Few habits in common'}</span><div class="bar ${s>=75?'ok':s>=55?'warn':'crit'}" style="margin-top:6px"><i style="width:${s}%"></i></div></span><span style="display:flex;flex-direction:column;align-items:flex-end;gap:4px"><b class="num">${s}%</b>${r?`<span class="pill ok">Requested</span>`:`<button type="button" class="btn sec sm" data-act="roomReq" data-id="${p.id}">Request</button>`}</span></div>`; }).join('')}</div>`;
  }
  return h+'</div>';
}};

/* 19. Tips feed */
SCREENS.tips = {tab:'connect', title:'Peer tips', render(){
  const tags=['All',...new Set(S.tips.map(t=>t.tag))];
  let list=S.tips.filter(t=>UI.tipTag==='All'||t.tag===UI.tipTag); list.sort((a,b)=>UI.tipSort==='top'?b.votes-a.votes:b.ts-a.ts);
  return `<div class="pad"><form class="card" data-form="tip"><div class="field"><label for="tp-text">Share a tip with first-years</label><textarea id="tp-text" name="text" class="input" style="min-height:70px" maxlength="280" required placeholder="What do you wish you’d known?"></textarea></div><div style="display:flex;gap:8px"><select name="tag" class="input" id="tp-tag" aria-label="Topic" style="flex:1">${['Study','Academics','Dining','Registration','Getting around','Wellness','Housing'].map(t=>`<option>${t}</option>`).join('')}</select><button class="btn" type="submit">Post</button></div><p class="tiny muted">Posts show your class year and major, not your name.</p></form>
  ${seg('tipSort',[['top','Top'],['new','Newest']])}${chips('tipTag',tags.map(t=>[t,t]))}
  ${list.map(t=>`<div class="card tipcard"><button type="button" class="vote ${S.voted[t.id]?'on':''}" data-act="vote" data-id="${t.id}" aria-label="Upvote">${ic('up','sm')}<span class="num">${t.votes}</span></button><div style="flex:1;min-width:0"><p>${esc(t.text)}</p><div class="tiny muted" style="margin-top:6px"><span class="pill">${esc(t.tag)}</span> ${esc(t.by)} · ${ago(t.ts)} ago</div></div></div>`).join('')}</div>`;
}};

/* 10. Me / profile */
SCREENS.me = {root:true, tab:'me', title:'Me', render(){
  const M=S.me;
  return `<div class="pad"><div class="card" style="align-items:flex-start">
  <div style="display:flex;gap:14px;align-items:center;width:100%"><span class="av lg" style="--cc:var(--brick)">${initials(M.name)}</span><div style="flex:1;min-width:0"><div class="h2">${esc(M.name)}</div><div class="small muted">${esc(M.year)}</div></div><button type="button" class="btn sec sm" data-act="editProfile">${UI.editProfile?'Done':'Edit'}</button></div>
  ${UI.editProfile?`<form data-form="profile" style="display:flex;flex-direction:column;gap:10px;width:100%"><div class="field"><label for="pf-major">Major</label><input id="pf-major" name="major" class="input" value="${esc(M.major)}"></div><div class="field"><label for="pf-dorm">Residence</label><input id="pf-dorm" name="dorm" class="input" value="${esc(M.dorm)}"></div><div class="field"><label for="pf-bio">About me</label><textarea id="pf-bio" name="bio" class="input" style="min-height:70px">${esc(M.bio)}</textarea></div><button class="btn sm" type="submit">Save profile</button></form>`
  :`<dl class="kv"><dt>Major</dt><dd>${esc(M.major)}</dd><dt>Lives in</dt><dd>${esc(M.dorm)}</dd></dl><p class="small">${esc(M.bio)}</p>`}</div>
  <div class="card"><div class="sec-h"><span class="eyebrow">Interests</span><span class="tiny muted">Used for matching and event picks</span></div><div style="display:flex;flex-wrap:wrap;gap:6px">${INTEREST_POOL.concat(M.interests.filter(i=>!INTEREST_POOL.includes(i))).map(i=>`<button type="button" class="chip ${M.interests.includes(i)?'on':''}" data-act="interest" data-v="${esc(i)}" aria-pressed="${M.interests.includes(i)}">${esc(i)}</button>`).join('')}</div>
  <form data-form="interest" style="display:flex;gap:8px"><input id="int-new" name="i" class="input" placeholder="Add your own" maxlength="24"><button class="btn sec" type="submit">Add</button></form></div>
  <div class="card"><div class="sec-h"><span class="eyebrow">Appearance</span><span class="tiny muted">${(S.settings.theme||'system')==='system'?`Following your device (${isDark()?'dark':'light'})`:''}</span></div><div class="seg" role="tablist">${[['system','System'],['light','Light'],['dark','Dark']].map(([v,l])=>`<button type="button" role="tab" aria-selected="${(S.settings.theme||'system')===v}" class="${(S.settings.theme||'system')===v?'on':''}" data-act="theme" data-v="${v}">${ic(v==='light'?'sun':v==='dark'?'moon':'sliders','sm')} ${l}</button>`).join('')}</div></div>
  <div class="list">${row({icon:'bell',t:'Notification settings',s:'Categories, reminders, quiet hours',go:'notif-settings'})}${row({icon:'sliders',t:'Customize home',s:'Choose your dashboard cards',go:'dash-edit'})}${row({icon:'grid',t:'All features',s:'Everything in this prototype',go:'features'})}${row({icon:'swap',t:'Switch to staff portal',s:'Post announcements and events, approve requests',act:'staffOn',box:'brick'})}</div>
  <button type="button" class="btn ghost" data-act="reset">Reset demo data</button></div>`;
}};
SCREENS.features = {tab:'me', title:'All features', render(){
  return `<div class="pad"><div class="list">${FEATURES.map(([n,t,s,orig])=>`<button type="button" class="row" data-act="feat" data-id="${s}"><span class="mono muted" style="width:22px">${String(n).padStart(2,'0')}</span><span class="main"><span class="t" style="display:block">${t}</span></span><span class="chev">${ic('right','sm')}</span></button>`).join('')}</div></div>`;
}};

/* 24. Staff portal */
SCREENS['staff-home'] = {root:true, staff:true, tab:'staff-home', title:'Announcements', render(){
  return `<div class="pad"><form class="card" data-form="announce"><span class="eyebrow">New announcement</span>
  <div class="field"><label for="an-title">Headline</label><input id="an-title" name="title" class="input" required maxlength="80" placeholder="e.g. Dining hall hours change Friday"></div>
  <div class="field"><label for="an-body">Message</label><textarea id="an-body" name="body" class="input" required></textarea></div>
  <div class="grid2"><div class="field"><label for="an-aud">Audience</label><select id="an-aud" name="aud" class="input"><option>All students</option><option>First-years</option><option>Larch Hall residents</option><option>Kestrel Hall residents</option></select></div><div class="field"><label for="an-type">Type</label><select id="an-type" name="type" class="input"><option value="general">General</option><option value="urgent">Urgent safety alert</option></select></div></div>
  <label style="display:flex;align-items:center;justify-content:space-between;gap:12px"><span class="small"><b>Send as push notification</b><br><span class="muted">Urgent alerts always push</span></span>${sw('an-push',true,'noop','name="push"')}</label>
  <button class="btn block" type="submit">${ic('mega','sm')}Publish</button></form>
  ${secH('Sent')}<div class="list">${S.announcements.map(a=>row({icon:'mega',t:esc(a.title),s:`${esc(a.aud)} · ${ago(a.ts)} ago · reached ${a.reach.toLocaleString()} students`})).join('')}</div>
  ${S.alerts.some(a=>a.active)?`${secH('Active safety alerts')}<div class="list">${S.alerts.filter(a=>a.active).map(a=>`<div class="row"><span class="main"><span class="t" style="display:block">${esc(a.title)}</span><span class="s" style="display:block">${a.sev} · ${ago(a.ts)} ago</span></span><button type="button" class="btn sec sm" data-act="resolveAlert" data-id="${a.id}">Mark resolved</button></div>`).join('')}</div>`:''}</div>`;
}};
SCREENS['staff-events'] = {root:true, staff:true, tab:'staff-events', title:'Events', render(){
  return `<div class="pad"><form class="card" data-form="event"><span class="eyebrow">Create event</span>
  <div class="field"><label for="ev-title">Title</label><input id="ev-title" name="title" class="input" required></div>
  <div class="grid2"><div class="field"><label for="ev-cat">Category</label><select id="ev-cat" name="cat" class="input">${['Academic','Arts','Athletics','Career','Social','Wellness'].map(c=>`<option>${c}</option>`).join('')}</select></div><div class="field"><label for="ev-bldg">Location</label><select id="ev-bldg" name="bldg" class="input">${Object.entries(BLD).map(([k,b])=>`<option value="${k}">${esc(b.name)}</option>`).join('')}</select></div></div>
  <div class="grid2"><div class="field"><label for="ev-date">Date</label><input id="ev-date" name="date" type="date" class="input" required value="${dkey(at(3,12,0))}"></div><div class="field"><label for="ev-cap">Capacity</label><input id="ev-cap" name="cap" type="number" min="1" class="input" value="100"></div></div>
  <div class="grid2"><div class="field"><label for="ev-start">Starts</label><input id="ev-start" name="start" type="time" class="input" value="18:00" required></div><div class="field"><label for="ev-end">Ends</label><input id="ev-end" name="end" type="time" class="input" value="19:30" required></div></div>
  <div class="field"><label for="ev-desc">Description</label><textarea id="ev-desc" name="desc" class="input" style="min-height:70px"></textarea></div>
  <button class="btn block" type="submit">Publish to student calendar</button></form>
  ${secH('Upcoming events')}<div class="list">${S.events.filter(e=>e.end>Date.now()).sort((a,b)=>a.start-b.start).map(e=>{ const ci=(S.attendees[e.id]||[]).filter(a=>a.checked).length; return `<button type="button" class="row" data-act="staffCheckin" data-id="${e.id}"><span class="main"><span class="t" style="display:block">${esc(e.title)}</span><span class="s" style="display:block">${fWhen(e.start)} · ${e.going} RSVPs · ${ci} checked in</span></span><span class="pill">Check-in</span></button>`; }).join('')}</div></div>`;
}};
SCREENS['staff-requests'] = {root:true, staff:true, tab:'staff-requests', title:'Join requests', render(){
  return `<div class="pad"><p class="small muted">Requests to clubs that review new members. You’re viewing as an advisor for all clubs.</p><div class="list">${S.requests.map(r=>`<div class="row"><span class="av" style="--cc:var(--c${hash(r.name)%6+1})">${initials(r.name)}</span><span class="main"><span class="t" style="display:block">${esc(r.name)}</span><span class="s" style="display:block">${esc(CLUB[r.club].name)} · ${ago(r.ts)} ago</span></span><button type="button" class="btn ok sm" data-act="approve" data-id="${r.id}">Approve</button><button type="button" class="icbtn" data-act="deny" data-id="${r.id}" aria-label="Decline">${ic('x','sm')}</button></div>`).join('')||'<p class="empty">No pending requests.</p>'}</div></div>`;
}};
SCREENS['staff-checkin'] = {root:true, staff:true, tab:'staff-checkin', title:'Check-in', render(){
  const e=S.events.find(x=>x.id===UI.staffEv)||S.events[0]; const A=S.attendees[e.id]||[]; const ci=A.filter(a=>a.checked).length;
  return `<div class="pad"><div class="field"><label for="ci-ev">Event</label><select id="ci-ev" class="input" data-ch="staffEv">${S.events.filter(x=>x.end>Date.now()).sort((a,b)=>a.start-b.start).map(x=>`<option value="${x.id}" ${x.id===e.id?'selected':''}>${esc(x.title)}</option>`).join('')}</select></div>
  <form class="card" data-form="scan"><span class="eyebrow">Scan or enter ticket code</span><div style="display:flex;gap:8px"><input id="ci-code" name="code" class="input mono" placeholder="AGW-XXXX" autocomplete="off" style="text-transform:uppercase"><button class="btn" type="submit">Check in</button></div><p class="tiny muted">On a phone at the door, the camera scanner reads the QR code into this field.</p></form>
  <div class="card"><div class="progress-h"><span>${ci} of ${A.length} RSVPs checked in</span></div><div class="bar ok"><i style="width:${A.length?ci/A.length*100:0}%"></i></div></div>
  <div class="list">${A.map(a=>`<div class="row"><span class="main"><span class="t" style="display:block">${esc(a.name)}${a.me?' <span class="pill brick">Demo student</span>':''}</span><span class="s mono" style="display:block">${a.code}</span></span>${a.checked?`<span class="pill ok">${fTime(a.checked)}</span>`:`<button type="button" class="btn sec sm" data-act="checkin" data-id="${a.code}">Check in</button>`}</div>`).join('')}</div></div>`;
}};

/* ---------- header / tabs / rail ---------- */
const curTop = () => stack[stack.length-1];
function header(def, t){
  const root=stack.length===1;
  const title = typeof def.title==='function' ? def.title(t.p||{}) : def.title;
  const bell = S.staff ? '' : `<button type="button" class="hbtn" data-go="notifs" aria-label="Notifications">${ic('bell')}<span id="bellbadge" class="badge-dot" ${unread()?'':'hidden'}>${unread()}</span></button>`;
  const dk=isDark(); const themeBtn=`<button type="button" class="hbtn" data-act="themeFlip" aria-label="Switch to ${dk?'light':'dark'} mode">${ic(dk?'sun':'moon')}</button>`;
  if(t.s==='map') return `<div class="hdr-in"><button type="button" class="hbtn" data-back aria-label="Back">${ic('left')}</button><span class="brand">${CREST(28)}<span><b>Campus Life</b><small>Ashgrove University</small></span></span>${bell}</div>`;
  if(t.s==='home') return `<div class="hdr-in"><span class="brand">${CREST(30)}<span><b>Campus Life</b><small>Ashgrove University</small></span></span>${themeBtn}${bell}</div>`;
  return `<div class="hdr-in ${S.staff?'staff':''}">${root?'':`<button type="button" class="hbtn" data-back aria-label="Back">${ic('left')}</button>`}<span class="htitle">${esc(title)}</span>${S.staff?'<span class="staff-flag">Staff</span>':''}${bell}</div>`;
}
function tabbar(def){
  const T = S.staff ? [['staff-home','mega','Announce'],['staff-events','cal','Events'],['staff-requests','inbox','Requests'],['staff-checkin','qr','Check-in'],['__exit','swap','Student view']]
    : [['home','home','Home'],['classes','book','Classes'],['campus','map','Campus'],['connect','users','Connect'],['me','user','Me']];
  return T.map(([s,i,l])=>`<button type="button" class="${def.tab===s?'on':''}" ${s==='__exit'?'data-act="staffOff"':`data-tab="${s}"`} ${def.tab===s?'aria-current="page"':''}>${ic(i)}${l}${s==='staff-requests'&&S.requests.length?` (${S.requests.length})`:''}</button>`).join('');
}
function renderRail(){
  const cur=curTop().s;
  $('#rail').innerHTML=`<div class="brand-r">${CREST(44)}<div><b>Ashgrove Campus Life</b><div class="small muted">Campus app prototype</div></div></div>
  <p>Ashgrove University is a fictional liberal-arts campus of Gothic stone halls around Wren Lake, modeled on a Richmond, Virginia school. Home of the Weavers. Everything here runs on demo data.</p>
  <ol>${FEATURES.map(([n,t,s,o])=>`<li><button type="button" class="${cur===s?'on':''}" data-act="feat" data-id="${s}"><span class="n">${String(n).padStart(2,'0')}</span><span style="flex:1">${t}</span></button></li>`).join('')}</ol>
  <button type="button" class="btn sec block staffbtn" data-act="${S.staff?'staffOff':'staffOn'}">${ic('swap','sm')}${S.staff?'Back to student view':'Open staff portal'}</button>`;
}

/* ---------- theme ---------- */
const HOST_THEME = document.documentElement.getAttribute('data-theme');
const darkMQ = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : null;
function isDark(){ const t=S.settings.theme||'system'; if(t!=='system') return t==='dark'; if(HOST_THEME) return HOST_THEME==='dark'; return !!(darkMQ && darkMQ.matches); }
function applyTheme(){ const t=S.settings.theme||'system'; const r=document.documentElement;
  if(t==='system'){ if(HOST_THEME) r.setAttribute('data-theme',HOST_THEME); else r.removeAttribute('data-theme'); } else r.setAttribute('data-theme',t); }
if(darkMQ && darkMQ.addEventListener) darkMQ.addEventListener('change',()=>{ if((S.settings.theme||'system')==='system') render({keep:true}); });

/* ---------- render ---------- */
function render(opts={}){
  const t=curTop(); const def=SCREENS[t.s]||SCREENS.home;
  const scr=$('#screen'); const same = lastTop===t; const keep = same ? scr.scrollTop : 0;
  const ae=document.activeElement; const fid = ae && ae.id && scr.contains(ae) ? ae.id : null; let sel=null;
  try{ if(fid && ae.selectionStart!=null) sel=[ae.selectionStart, ae.selectionEnd]; }catch(e){}
  const vals={}; if(opts.keep) scr.querySelectorAll('input[id],textarea[id],select[id]').forEach(el=>{ if(el.type!=='checkbox'&&el.type!=='file') vals[el.id]=el.value; });
  applyTheme();
  $('#hdr').innerHTML=header(def,t);
  scr.innerHTML=def.render(t.p||{});
  Object.entries(vals).forEach(([id,v])=>{ const el=document.getElementById(id); if(el && el.type!=='checkbox') el.value=v; });
  $('#tabs').innerHTML=tabbar(def);
  scr.scrollTop=keep;
  if(fid){ const el=document.getElementById(fid); if(el){ el.focus({preventScroll:true}); try{ if(sel) el.setSelectionRange(sel[0],sel[1]); }catch(e){} } }
  def.after && def.after(t.p||{});
  mountQR(); renderRail(); lastTop=t; save();
}
function mountQR(){
  document.querySelectorAll('[data-qr]').forEach(el=>{
    const txt=el.dataset.qr; el.innerHTML='';
    if(window.QRCode){ try{ new QRCode(el,{text:txt,width:180,height:180,colorDark:'#141B2D',colorLight:'#FFFFFF',correctLevel:QRCode.CorrectLevel.M}); return; }catch(e){} }
    // fallback: deterministic pattern so the layout still reads as a code
    const c=document.createElement('canvas'); c.width=c.height=180; const x=c.getContext('2d'); x.fillStyle='#fff'; x.fillRect(0,0,180,180); x.fillStyle='#141B2D';
    for(let i=0;i<21;i++) for(let j=0;j<21;j++){ const finder=(i<7&&j<7)||(i>13&&j<7)||(i<7&&j>13); const on=finder ? (i%6===0||j%6===0||(i%20>1&&i%20<5&&j%20>1&&j%20<5)||(i>15&&i<19&&j>1&&j<5)||(i>1&&i<5&&j>15&&j<19)||i===14||i===20||j===14||j===20) : hash(txt+i+'.'+j)%2; if(on) x.fillRect(6+i*8,6+j*8,8,8); }
    el.appendChild(c);
  });
}

/* ---------- actions ---------- */
const ACT = {
  ui(d){ UI[d.k] = d.num ? +d.v : d.v; if(d.k==='dineLoc') UI.dineMeal=null; render(); },
  copy(d){ const done=()=>toast('Copied'); try{ navigator.clipboard.writeText(d.v).then(done,()=>toast(d.v)); }catch(e){ toast(d.v); } },
  theme(d){ S.settings.theme=d.v; render(); },
  themeFlip(){ S.settings.theme=isDark()?'light':'dark'; render(); toast(`${S.settings.theme==='dark'?'Dark':'Light'} mode`); },
  readAll(){ S.notifs.forEach(n=>n.read=true); render(); },
  testPush(){ notify('announce','Test notification','This is how Campus Life notifications look on your lock screen.'); },
  dineGo(d){ UI.dineLoc=d.id; UI.dineMeal=null; go('dining'); },
  // schedule
  addCourse(d){ const c=CO[d.id]; const cf=conflictsOf(c); if(cf.length){ toast(`${c.code} conflicts with ${cf[0].code}`); return; } S.enrolled.push(d.id); toast(`Added ${c.code}`); render(); },
  dropCourse(d){ S.enrolled=S.enrolled.filter(x=>x!==d.id); toast(`Removed ${CO[d.id].code}`); render(); },
  lmsConnect(){ UI.lms.step=1; render(); setTimeout(()=>{ UI.lms.step=2; if(curTop().s==='lms') render(); },1300); },
  lmsImport(){
    const add=Object.keys(UI.lms.pick).filter(id=>UI.lms.pick[id] && !S.enrolled.includes(id));
    const T={FYS100:[['Reflection essay 3','Paper',5,23,59],['Field journal check','Homework',9,17,0]],LDSP101:[['Team charter','Project',4,23,59],['Leadership interview paper','Paper',15,23,59]],MATH211:[],ENGL103:[],PSYC100:[]};
    let n=0; add.forEach(id=>{ S.enrolled.push(id); (T[id]||[]).forEach(([title,type,off,h,m])=>{ const due=at(off,h,m); S.tasks.push({id:uid(),title,course:id,type,due,remind:+S.settings.lead,done:false,lms:true}); n++; }); });
    S.lms={connected:true,synced:Date.now()}; UI.lms.step=0; stack.pop(); toast(`Imported ${add.length} courses and ${n} assignments`); render();
  },
  lmsSync(){ S.lms.synced=Date.now(); toast('Synced. No new assignments.'); render(); },
  // tasks
  toggleTask(d){ const t=S.tasks.find(x=>x.id===d.id); t.done=!t.done; if(t.done) toast('Marked done'); render(); },
  delTask(d){ S.tasks=S.tasks.filter(x=>x.id!==d.id); render(); },
  // timer
  tmode(d){ timer.running=false; clearInterval(timer.h); timer.mode=d.v; timer.left=TM[d.v]; render(); },
  tToggle(){ timer.running=!timer.running; clearInterval(timer.h); if(timer.running) timer.h=setInterval(tick,1000); render(); },
  tReset(){ timer.running=false; clearInterval(timer.h); timer.left=TM[timer.mode]; render(); },
  planStart(d){ const p=S.plans.find(x=>x.id===d.id); timer.course=p.course; timer.mode='focus'; timer.left=TM.focus; timer.running=true; clearInterval(timer.h); timer.h=setInterval(tick,1000); render(); $('#screen').scrollTop=0; toast('Focus session started'); },
  planDel(d){ S.plans=S.plans.filter(x=>x.id!==d.id); render(); },
  // syllabus
  sylSample(){ UI.syl={text:SAMPLE_SYL,items:parseSyllabus(SAMPLE_SYL),course:null}; render(); },
  sylParse(){ const el=$('#syl-text'); if(el) UI.syl.text=el.value; if(!UI.syl.text.trim()){ toast('Paste or upload a syllabus first'); return; } UI.syl.items=parseSyllabus(UI.syl.text); UI.syl.course=null; render(); },
  sylAdd(){ const it=UI.syl.items.filter(i=>i.pick); const c=UI.syl.course; it.forEach(i=>S.tasks.push({id:uid(),title:i.title,course:c,type:i.type,due:i.due,remind:+S.settings.lead,done:false})); it.forEach(i=>{ if(i.due - (+S.settings.lead)*60000 < Date.now()) S.fired[S.tasks[S.tasks.length-1].id]=true; }); UI.syl={text:'',items:null,course:null}; toast(`Added ${it.length} deadlines to ${courseLabel(c)}`); stack=[{s:'classes'},{s:'deadlines'}]; UI.dl='upcoming'; UI.dlCourse=c; render(); },
  // profs
  ohBook(d){ const ts=+d.id; const i=S.oh.findIndex(b=>b.prof===d.p&&b.ts===ts); if(i>=0){ S.oh.splice(i,1); toast('Slot released'); } else { S.oh.push({prof:d.p,ts}); toast(`Booked ${fTime(ts)} with Prof. ${PROFS[d.p].name.split(' ')[1]}`); } render(); },
  ohCancel(d){ S.oh=S.oh.filter(b=>!(b.prof===d.p&&b.ts===+d.id)); render(); },
  // library
  libToggle(d){ const k=d.id; if(S.library[k]){ delete S.library[k]; toast('Booking cancelled'); render(); return; } const day=k.split('|')[1]; const used=Object.keys(S.library).filter(x=>S.library[x]&&x.split('|')[1]===day).length; if(used>=2){ toast('Limit reached: 2 hours per day'); return; } S.library[k]=true; const [r,,h]=k.split('|'); toast(`Room ${r} booked for ${hm(+h*60)}`); render(); },
  checkItem(d){ S.checklist[d.id]=!S.checklist[d.id]; render(); },
  // events
  rsvp(d){ const e=S.events.find(x=>x.id===d.id); const code='AGW-'+Math.random().toString(36).slice(2,6).toUpperCase(); S.rsvps[e.id]={code,ts:Date.now(),checked:null}; e.going++; (S.attendees[e.id]=S.attendees[e.id]||[]).push({name:S.me.name,code,me:true,checked:null}); notify('events',`You’re going: ${e.title}`,`${fWhen(e.start)} · your QR ticket is ready`,{banner:false}); stack.push({s:'ticket',p:{id:e.id}}); render(); toast('RSVP confirmed'); },
  unrsvp(d){ const e=S.events.find(x=>x.id===d.id); const code=S.rsvps[e.id]?.code; delete S.rsvps[e.id]; e.going=Math.max(0,e.going-1); S.attendees[e.id]=(S.attendees[e.id]||[]).filter(a=>a.code!==code); toast('RSVP cancelled'); render(); },
  simScan(d){ checkInCode(d.id, S.rsvps[d.id].code); render(); },
  // map
  mapSel(d){ UI.map.q=''; mapSelect(d.id); if(curTop().s!=='map') go('map'); else render(); },
  mapClose(){ const M=UI.map; M.sel=null; M.room=null; M.dir=false; render(); },
  mapDir(){ mapSelect(UI.map.sel, UI.map.room, true); render(); },
  mapSteps(){ UI.map.steps=!UI.map.steps; render(); },
  mapDirEnd(){ const M=UI.map; mapSelect(M.sel, M.room); render(); },
  mapDetails(){ go('building',{id:UI.map.sel}); },
  mapTab(d){ UI.map.tab=d.v; UI.map.sugg=false; render(); $('#screen').scrollTop=0; },
  mapPick(d){ const r=placeSuggestions(d.v)[0]; if(r){ mapSelect(r.b,r.room||null,!!d.dir); UI.map.q=d.v; } render(); },
  mapSug(d){ const x=UI.map.sl[+d.i]; if(!x) return; mapSelect(x.b,x.room||null); UI.map.q=x.lbl||x.t; render(); document.activeElement?.blur?.(); },
  mapZoom(d){ UI.map.vb.w*= d.v==='in'?0.75:1/0.75; mapVB(); },
  mapHome(){ UI.map.vb={cx:300,cy:440,w:430}; mapVB(); },
  mapLayers(){ UI.map.layersOpen=!UI.map.layersOpen; render(); },
  bMap(d){ openMap({sel:d.id,dir:!!d.dir}); },
  roomPick(d){ openMap({q:d.id}); },
  jobSave(d){ const on=!S.saved[d.id]; if(on) S.saved[d.id]=true; else delete S.saved[d.id]; toast(on?'Saved':'Removed from saved'); render(); },
  jobToggle(d){ UI[d.k]=!UI[d.k]; render(); },
  jobTrack(d){ const j=JOB[d.id]; if(S.tasks.some(t=>t.job===j.id)){ toast('Already in your deadlines'); return; } const t={id:uid(),title:`Apply: ${j.title}, ${j.employer}`,course:'',type:'Application',due:j.due,remind:1440,done:false,job:j.id}; S.tasks.push(t); if(t.due-t.remind*60000<Date.now()) S.fired[t.id]=true; toast('Added to deadlines with a 1-day reminder'); render(); },
  // wallet
  payQR(){ if(UI.payQR){ UI.payQR=null; clearInterval(qrTimer); render(); return; } newPayQR(); },
  addCash(d){ const v=+d.v; S.wallet.cash+=v; S.wallet.txns.push({loc:'Weaver Cash deposit',acct:'add',amt:v,ts:Date.now()}); toast(`Added ${money(v)} (demo)`); render(); },
  payAcct(d){ UI.pay.acct=d.v; render(); },
  payBack(){ UI.pay.step='form'; render(); },
  payConfirm(){ const P=UI.pay, W=S.wallet, amt=+P.amt; if(P.acct==='swipes') W.swipes--; else W[P.acct]=+(W[P.acct]-amt).toFixed(2); W.txns.push({loc:DINING[P.loc].name,acct:P.acct,amt:P.acct==='swipes'?1:amt,ts:Date.now()}); P.step='done'; render(); },
  payAgain(){ UI.pay={step:'form',loc:UI.pay.loc,amt:'',acct:'dd'}; back(); },
  // health / safety
  healthReq(d){ UI.healthReq = UI.healthReq===d.id?null:d.id; render(); },
  walkCancel(){ walkT.forEach(clearTimeout); S.walk=null; toast('Safe Walk cancelled'); render(); },
  walkDone(){ walkT.forEach(clearTimeout); S.walk.step=4; S.walk.done=Date.now(); toast('Glad you made it. Walk completed.'); render(); },
  delExp(d){ S.budget.exp=S.budget.exp.filter(e=>e.id!==d.id); render(); },
  // clubs
  joinClub(d){ const c=CLUB[d.id]; if(c.policy==='open'){ S.clubs[c.id]='member'; c.members++; if(!S.chats.find(x=>x.club===c.id)) S.chats.push({id:'c'+uid(),name:c.name,club:c.id,members:['leo','maya'],msgs:[{who:'maya',text:`Welcome to ${c.name}! Next meetup: ${c.meets}.`,ts:Date.now()}]}); toast(`Joined ${c.name}`); } else { S.clubs[c.id]='pending'; S.requests.push({id:uid(),club:c.id,name:S.me.name,me:true,ts:Date.now()}); toast('Request sent to officers'); } render(); },
  leaveClub(d){ const was=S.clubs[d.id]; delete S.clubs[d.id]; if(was==='pending') S.requests=S.requests.filter(r=>!(r.me&&r.club===d.id)); else CLUB[d.id].members--; toast(was==='pending'?'Request withdrawn':'You left the club'); render(); },
  // social
  sayHi(d){ const p=PEER[d.id]; let ch=S.chats.find(c=>c.dm===p.id); if(!ch){ ch={id:'c'+uid(),name:p.name,dm:p.id,members:[p.id],msgs:[]}; S.chats.unshift(ch); } go('chat',{id:ch.id}); },
  roomReq(d){ S.matchReq[d.id]=Date.now(); toast(`Request sent to ${PEER[d.id].name.split(' ')[0]}`); render(); },
  vote(d){ const t=S.tips.find(x=>x.id===d.id); if(S.voted[t.id]){ t.votes--; delete S.voted[t.id]; } else { t.votes++; S.voted[t.id]=1; } render(); },
  interest(d){ const i=S.me.interests.indexOf(d.v); if(i>=0) S.me.interests.splice(i,1); else S.me.interests.push(d.v); render(); },
  editProfile(){ UI.editProfile=!UI.editProfile; render(); },
  feat(d){ if(d.id==='ticket'){ const id=Object.keys(S.rsvps)[0]; if(id){ S.staff=false; stack=[{s:'campus'},{s:'events'},{s:'ticket',p:{id}}]; render(); return; } navTo('events'); return; } navTo(d.id); },
  reset(){ if(UI.confirmReset){ try{ localStorage.removeItem(KEY); }catch(e){} S=seed(); UI.confirmReset=false; stack=[{s:'home'}]; render(); toast('Demo data reset'); } else { UI.confirmReset=true; toast('Tap again to reset all demo data'); setTimeout(()=>UI.confirmReset=false,4000); } },
  // staff
  staffOn(){ S.staff=true; stack=[{s:'staff-home'}]; render(); toast('Staff portal: Dana Whitcomb, Student Activities'); },
  staffOff(){ S.staff=false; stack=[{s:'home'}]; render(); },
  approve(d){ const r=S.requests.find(x=>x.id===d.id); S.requests=S.requests.filter(x=>x.id!==d.id); CLUB[r.club].members++; if(r.me){ S.clubs[r.club]='member'; notify('clubs',`You’re in: ${CLUB[r.club].name}`,'Your request was approved. Say hi in the club chat.',{banner:false}); if(!S.chats.find(x=>x.club===r.club)) S.chats.push({id:'c'+uid(),name:CLUB[r.club].name,club:r.club,members:['hannah','zoe'],msgs:[{who:'hannah',text:`Welcome, ${S.me.name.split(' ')[0]}! We meet ${CLUB[r.club].meets}.`,ts:Date.now()}]}); } toast(`Approved ${r.name}${r.me?' · student notified':''}`); render(); },
  deny(d){ const r=S.requests.find(x=>x.id===d.id); S.requests=S.requests.filter(x=>x.id!==d.id); if(r.me){ delete S.clubs[r.club]; notify('clubs',`${CLUB[r.club].name} is full this term`,'Officers will reach out when spots open.',{banner:false}); } toast('Request declined'); render(); },
  staffCheckin(d){ UI.staffEv=d.id; tab('staff-checkin'); },
  checkin(d){ checkInCode(UI.staffEv, d.id); render(); },
  resolveAlert(d){ const a=S.alerts.find(x=>x.id===d.id); a.active=false; a.sev='resolved'; toast('Alert resolved'); render(); },
};
function checkInCode(evId, code){
  code=String(code).trim().toUpperCase(); const A=S.attendees[evId]||[]; const a=A.find(x=>x.code===code);
  if(!a){ toast(`No RSVP with code ${code} for this event`); return false; }
  if(a.checked){ toast(`${a.name} already checked in at ${fTime(a.checked)}`); return false; }
  a.checked=Date.now(); if(a.me && S.rsvps[evId]) { S.rsvps[evId].checked=a.checked; const e=S.events.find(x=>x.id===evId); notify('events',`Checked in: ${e.title}`,'Enjoy the event!',{banner:!S.staff}); }
  toast(`${a.name} checked in`); return true;
}
let qrTimer;
function newPayQR(){ UI.payQR={code:'AGU-PAY-'+Math.random().toString(36).slice(2,8).toUpperCase(), t:30}; render(); clearInterval(qrTimer); qrTimer=setInterval(()=>{ if(!UI.payQR){ clearInterval(qrTimer); return; } UI.payQR.t--; const el=$('#qr-count'); if(UI.payQR.t<=0){ if(curTop().s==='wallet') newPayQR(); else { UI.payQR=null; clearInterval(qrTimer); } return; } if(el) el.textContent=`Refreshes in ${UI.payQR.t} s`; },1000); }

/* input / change / submit handlers */
const IN = {
  catQ:v=>{UI.catQ=v}, profQ:v=>{UI.profQ=v}, clubQ:v=>{UI.clubQ=v}, mapQ:v=>{UI.map.q=v; UI.map.sugg=true; UI.map.layersOpen=false;}, jobQ:v=>{UI.jobQ=v}, alumQ:v=>{UI.alumQ=v},
  fc:(v,el)=>{ UI.fc[el.dataset.k]=+v; },
  sylText:v=>{ UI.syl.text=v; return false; },
  payAmt:v=>{ UI.pay.amt=v; },
  rq:(v,el)=>{ S.rq[+el.dataset.i]=+v; },
};
const CH = {
  noop(){ return false; },
  setting(el){ S.settings[el.dataset.k]=el.checked; toast(`${el.checked?'On':'Off'}`); return false; },
  lead(el){ S.settings.lead=+el.value; toast('Default reminder updated'); return false; },
  dash(el){ S.dash[el.dataset.k]=el.checked; return false; },
  grade(el){ S.grades[el.dataset.id]=el.value; },
  prior(el){ S.prior[el.dataset.k]=+el.value||0; },
  tcourse(el){ timer.course=el.value; },
  sylFile(el){ const f=el.files[0]; if(!f) return false; if(/pdf$/i.test(f.name)||f.type==='application/pdf'){ toast('PDFs aren’t read in this prototype. Copy the schedule text and paste it here.'); el.value=''; return false; } const r=new FileReader(); r.onload=()=>{ UI.syl.text=String(r.result); UI.syl.items=parseSyllabus(UI.syl.text); UI.syl.course=null; render(); }; r.readAsText(f); return false; },
  sylPick(el){ UI.syl.items[+el.dataset.i].pick=el.checked; },
  sylCourse(el){ UI.syl.course=el.value; },
  lmsPick(el){ UI.lms.pick[el.dataset.id]=el.checked; },
  payLoc(el){ UI.pay.loc=el.value; UI.pay.acct=DINING[el.value].swipes?'swipes':'dd'; },
  budTotal(el){ S.budget.total=Math.max(0,+el.value||0); },
  staffEv(el){ UI.staffEv=el.value; },
  mapLayer(el){ UI.map.layers[el.dataset.k]=el.checked; },
  apFile(el){ const f=el.files[0]; if(f){ UI.apFile=f.name; toast('Résumé attached'); } },
};
const FORM = {
  task(f){ const [y,mo,d]=f.get('date').split('-').map(Number); const [h,m]=(f.get('time')||'23:59').split(':').map(Number); const due=new Date(y,mo-1,d,h,m).getTime(); const remind=+f.get('remind'); const t={id:uid(),title:f.get('title').trim(),course:f.get('course'),type:f.get('type'),due,remind,done:false}; S.tasks.push(t); if(remind && due-remind*60000<Date.now()) S.fired[t.id]=true; back(); toast(remind?`Added. Reminder ${remind>=1440?remind/1440+' day':remind/60+' h'} before.`:'Added'); },
  plan(f){ const [y,mo,d]=f.get('date').split('-').map(Number); const [h,m]=f.get('time').split(':').map(Number); S.plans.push({id:uid(),ts:new Date(y,mo-1,d,h,m).getTime(),course:f.get('course'),goal:f.get('goal').trim(),min:+f.get('min')}); toast('Session planned'); render(); },
  pay(){ const P=UI.pay; if(P.acct!=='swipes'){ const amt=+P.amt; const bal=P.acct==='dd'?S.wallet.dd:S.wallet.cash; if(!(amt>0)){ toast('Enter an amount'); return; } if(amt>bal){ toast(`Not enough balance: ${money(bal)} available`); return; } } P.step='review'; render(); },
  health(f, form){ S.healthReqs.push({id:form.dataset.id,when:f.get('when'),ts:Date.now()}); UI.healthReq=null; toast('Request sent privately'); render(); },
  walk(f){ if(f.get('from')===f.get('to')){ toast('Pick a different destination'); return; } S.walk={from:f.get('from'),to:f.get('to'),note:f.get('note'),step:0,ts:Date.now()}; notify('safety','Safe Walk requested','Dispatch is assigning the nearest escort.',{banner:false}); render(); advanceWalk(); },
  expense(f){ S.budget.exp.push({id:uid(),amt:+(+f.get('amt')).toFixed(2),cat:f.get('cat'),note:(f.get('note')||f.get('cat')).trim(),ts:Date.now()}); toast('Expense added'); render(); },
  msg(f, form){ const text=(f.get('text')||'').trim(); if(!text) return; const c=S.chats.find(x=>x.id===form.dataset.id); c.msgs.push({who:'me',text,ts:Date.now()}); render(); $('#msg-in')?.focus(); autoReply(c); },
  group(f){ const course=f.get('course'); const m=f.getAll('m'); const name=(f.get('name')||'').trim()||`${courseLabel(course)} study group`; const c={id:'c'+uid(),name,study:true,course,meets:(f.get('meets')||'').trim(),members:m,msgs:[{who:'me',text:`Started ${name}. ${f.get('meets')?'Meeting '+f.get('meets')+'.':'When works for everyone?'}`,ts:Date.now()}]}; S.chats.unshift(c); stack.pop(); go('chat',{id:c.id}); if(m.length) autoReply(c); },
  tip(f){ S.tips.unshift({id:uid(),text:f.get('text').trim(),tag:f.get('tag'),by:'First-year · Economics',ts:Date.now(),votes:1}); S.voted[S.tips[0].id]=1; UI.tipSort='new'; toast('Tip posted'); render(); },
  profile(f){ S.me.major=f.get('major'); S.me.dorm=f.get('dorm'); S.me.bio=f.get('bio'); UI.editProfile=false; toast('Profile saved'); render(); },
  interest(f){ const v=(f.get('i')||'').trim(); if(v && !S.me.interests.includes(v)) S.me.interests.push(v); render(); },
  announce(f){ const urgent=f.get('type')==='urgent'; const a={id:uid(),title:f.get('title').trim(),body:f.get('body').trim(),from:'Student Activities',aud:f.get('aud'),ts:Date.now(),reach:{'All students':3412,'First-years':868,'Larch Hall residents':212,'Kestrel Hall residents':198}[f.get('aud')]};
    S.announcements.unshift(a); if(urgent) S.alerts.unshift({id:uid(),sev:'urgent',title:a.title,body:a.body,ts:a.ts,active:true});
    const push=urgent || !!f.get('push'); notify(urgent?'safety':'announce',a.title,a.body,{banner:push}); toast(`Published to ${a.reach.toLocaleString()} students`); render(); },
  event(f){ const [y,mo,d]=f.get('date').split('-').map(Number); const tt=s=>s.split(':').map(Number); const [sh,sm]=tt(f.get('start')), [eh,em]=tt(f.get('end')); const b=f.get('bldg');
    const e={id:'e'+uid(),title:f.get('title').trim(),cat:f.get('cat'),start:new Date(y,mo-1,d,sh,sm).getTime(),end:new Date(y,mo-1,d,eh,em).getTime(),bldg:b,place:BLD[b].name,host:'Student Activities',cap:+f.get('cap')||100,going:0,desc:(f.get('desc')||'').trim()||'Details coming soon.'};
    if(e.end<=e.start){ toast('End time must be after the start'); return; }
    S.events.push(e); S.attendees[e.id]=[]; notify('events',`New event: ${e.title}`,`${fWhen(e.start)} · ${e.place}`,{banner:false}); toast('Published to the student calendar'); render(); },
  mapSearch(){ const M=UI.map; const r=placeSuggestions(M.q)[0]; document.activeElement?.blur?.(); if(!M.q.trim()){ M.sugg=false; render(); return; } if(!r){ toast(`No match for “${M.q}”`); return; } mapSelect(r.b,r.room||null); M.q=r.lbl||M.q; render(); },
  apply(f, form){ const id=form.dataset.id, j=JOB[id]; S.apps[id]={status:'Applied',ts:Date.now(),resume:UI.apFile||RESUME,note:f.get('note'),avail:f.get('avail')}; UI.apFile=null;
    notify('careers','Application sent',`${j.title} at ${j.employer}`,{banner:false}); stack.pop(); render(); toast('Application submitted');
    setTimeout(()=>{ const a=S.apps[id]; if(a&&a.status==='Applied'){ a.status='Viewed'; notify('careers',`${j.employer} viewed your application`,j.title); if(['job','jobs'].includes(curTop().s)) render({keep:true}); } },7000); },
  coffee(f, form){ const id=form.dataset.id, a=ALUM[id]; const first=a.name.split(' ')[0]; S.coffee[id]={status:'Requested',ts:Date.now(),topic:f.get('topic'),fmt:f.get('fmt'),pref:f.get('when'),msg:f.get('msg')};
    stack.pop(); render(); toast(`Request sent to ${first}`);
    setTimeout(()=>{ const c=S.coffee[id]; if(c&&c.status==='Requested'){ c.status='Accepted'; c.when=at(4,17,0); notify('careers',`${first} accepted your coffee chat`,`${fWhen(c.when)} · ${c.fmt}`); if(['alum','alumni'].includes(curTop().s)) render({keep:true}); } },8000); },
  scan(f){ const code=(f.get('code')||'').trim(); if(!code) return; checkInCode(UI.staffEv, code); render(); },
};
const REPLIES=['Sounds good to me','Same, I’m still on the second section 😩','Can someone share notes from Tuesday?','I can bring the practice problems','See you there!','Let’s do 7 instead of 6?','Good call. I’ll book a room.'];
function autoReply(c){ const who=c.members[hash(c.id+c.msgs.length)%c.members.length]; if(!who) return; setTimeout(()=>{ UI.typing=c.id; if(curTop().s==='chat'&&curTop().p.id===c.id) render({keep:true}); },700);
  setTimeout(()=>{ UI.typing=null; const text=REPLIES[hash(c.id+c.msgs.length+'r')%REPLIES.length]; c.msgs.push({who,text,ts:Date.now()}); if(curTop().s==='chat'&&curTop().p.id===c.id) render({keep:true}); else notify('chats',`${PEER[who].name.split(' ')[0]} in ${c.name}`,text); save(); },2400); }

/* ---------- delegated events ---------- */
document.addEventListener('click', e=>{
  const t=e.target.closest('[data-back],[data-tab],[data-act],[data-go]'); if(!t) return;
  if(t.tagName==='INPUT') return;
  if(t.id==='push') t.classList.remove('show');
  if(t.hasAttribute('data-back')){ back(); return; }
  if(t.dataset.tab){ tab(t.dataset.tab); return; }
  if(t.dataset.act){ const f=ACT[t.dataset.act]; if(f) f(t.dataset,t,e); return; }
  if(t.dataset.go){ const p={}; if(t.dataset.id) p.id=t.dataset.id; if(t.dataset.q) p.q=t.dataset.q; go(t.dataset.go,p); }
});
document.addEventListener('keydown', e=>{ if((e.key==='Enter'||e.key===' ') && e.target.matches('g[data-act]')){ e.preventDefault(); e.target.dispatchEvent(new MouseEvent('click',{bubbles:true})); } });
document.addEventListener('input', e=>{ const el=e.target; const k=el.dataset.in; if(!k||!IN[k]) return; if(IN[k](el.value,el)!==false) render(); });
document.addEventListener('change', e=>{ const el=e.target; const k=el.dataset.ch; if(!k||!CH[k]) return; if(CH[k](el)!==false) render(); });
document.addEventListener('submit', e=>{ const f=e.target; const k=f.dataset.form; if(!k||!FORM[k]) return; e.preventDefault(); FORM[k](new FormData(f), f); });

/* resume a safe walk in progress after reload */
if(S.walk && S.walk.step<4) advanceWalk();
render();
