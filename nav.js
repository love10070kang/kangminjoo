/**
 * EDS shared sidebar v4.3. Single source of truth for both index.html and line-info.html.
 * No network calls, logins or GitHub writes. Do not fork the 16-menu list in other pages.
 */
(function(){
  'use strict';
  const groups=[
    {id:'line',name:'라인 운영현황',icon:'folder',items:[
      ['01','라인 기본정보','lines','layers'],['02','생산계획','production','calendar'],
      ['03','생산능력(CAPA)','capacity','chart'],['04','설비현황','equipment','cpu']]},
    {id:'facility',name:'설비 · 인프라',icon:'folder',items:[
      ['05','설비투자','investment','database'],['06','설비 Layout','layout','layout'],
      ['07','설비 제원정보','specs','settings'],['08','공사 · Hook-up','hookup','wrench']]},
    {id:'performance',name:'생산 최적화',icon:'sliders',items:[
      ['09','생산성','productivity','trend'],['10','공정 · 물류','process','box']]},
    {id:'schedule',name:'투자 · 일정',icon:'calendar',items:[
      ['11','투자 · 예산','budget','coins'],['12','일정 · 마일스톤','milestones','calendar']]},
    {id:'risk',name:'기준 · 리스크',icon:'shield',items:[
      ['13','안전 · 환경','safety','shield'],['14','리스크 · 이슈','issues','alert'],
      ['15','기준 · 표준','standards','file']]},
    {id:'decision',name:'보고 · 의사결정',icon:'report',items:[
      ['16','보고 · 의사결정','reports','monitor']]}
  ];
  const paths={
    home:'<path d="m3 10 9-7 9 7v10H4V10z"/><path d="M9 20v-7h6v7"/>',
    folder:'<path d="M3 6h6l2 2h10v11H3z"/>',
    layers:'<path d="m12 2 10 5-10 5L2 7zM2 12l10 5 10-5M2 17l10 5 10-5"/>',
    calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 2v6M17 2v6M3 10h18"/>',
    chart:'<path d="M3 21V4M3 21h18M7 17v-5h3v5M12 17V8h3v9M17 17V4h3v13"/>',
    cpu:'<rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4"/>',
    database:'<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 2 4 3 9 3s9-1 9-3V5M3 12c0 4 18 4 18 0"/>',
    layout:'<rect x="2" y="2" width="20" height="20" rx="2"/><path d="M10 2v20M10 10h12M2 15h8"/>',
    settings:'<circle cx="12" cy="12" r="3"/><path d="M4 9 2 12l2 3 1 4 4 1 3 2 3-2 4-1 1-4 2-3-2-3-1-4-4-1-3-2-3 2-4 1z"/>',
    wrench:'<path d="M14 4a6 6 0 0 0-7 7L2 16l6 6 5-5a6 6 0 0 0 7-7l-5 4-5-5z"/>',
    trend:'<path d="M3 19h18M4 15l5-5 4 3 7-9M15 4h5v5"/>',
    box:'<path d="m12 2 9 5-9 5-9-5zM3 7v10l9 5 9-5V7M12 12v10"/>',
    coins:'<circle cx="8" cy="8" r="5"/><path d="M8 6v4M5 8h6M13 16a5 5 0 1 0 0-1M12 15v4"/>',
    shield:'<path d="M12 2 21 6v6c0 6-4 9-9 11-5-2-9-5-9-11V6zM8 12l3 3 5-6"/>',
    alert:'<path d="M12 3 2 21h20zM12 9v5M12 18h.01"/>',
    file:'<path d="M6 2h8l5 5v15H6zM14 2v5h5M9 12h7M9 16h7"/>',
    report:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 8h10M7 12h10M7 16h6"/>',
    monitor:'<rect x="2" y="3" width="20" height="15" rx="2"/><path d="M8 22h8M12 18v4"/>',
    sliders:'<path d="M4 6h16M4 12h16M4 18h16M9 3v6M15 9v6M9 15v6"/>',
    collapse:'<path d="m15 5-7 7 7 7M21 12H8"/>',
    expand:'<path d="m9 5 7 7-7 7M3 12h13"/>',
    chevron:'<path d="m6 9 6 6 6-6"/>'
  };
  const icon=(key)=>`<svg class="eds-ico" viewBox="0 0 24 24" aria-hidden="true">${paths[key]||paths.file}</svg>`;
  const closed=new Set();
  try{const saved=JSON.parse(sessionStorage.getItem('eds-menu-closed-v43')||'[]');if(Array.isArray(saved))saved.forEach(x=>closed.add(x));}catch(e){}
  let active='dashboard';
  function href(key){return key==='dashboard'?'./index.html#/dashboard':key==='lines'?'./line-info.html':`./index.html#/${key}`;}
  function navHtml(){
    let html=`<a href="${href('dashboard')}" class="eds-nav-home${active==='dashboard'?' active':''}" ${active==='dashboard'?'aria-current="page"':''}>${icon('home')}<span class="eds-nav-home-text">홈 · 통합 대시보드</span></a>`;
    groups.forEach((g,i)=>{
      const isClosed=closed.has(g.id),items=g.items;
      html+=`<section class="eds-nav-group${isClosed?' closed':''}" data-eds-group="${g.id}">`;
      html+=`<button type="button" class="eds-nav-group-head" data-eds-toggle="${g.id}" aria-expanded="${!isClosed}" title="${g.name} ${items.length}개 메뉴">${icon(g.icon)}<span class="eds-nav-group-title">${g.name}</span><span class="eds-nav-count">(${items.length})</span>${icon('chevron')}</button>`;
      html+='<div class="eds-nav-items">';
      items.forEach(([num,name,key,ico])=>{
        html+=`<a href="${href(key)}" class="eds-nav-link${active===key?' active':''}" title="${num}. ${name}" ${active===key?'aria-current="page"':''}>${icon(ico)}<span class="eds-nav-link-text">${num}. ${name}</span></a>`;
      });
      html+='</div></section>';
    });
    return html;
  }
  function render(rootId='sideNav',key=active){
    active=key;
    const nav=document.getElementById(rootId);
    if(nav){const savedScroll=nav.scrollTop;nav.innerHTML=navHtml();nav.scrollTop=savedScroll;}
  }
  function compact(val){
    document.body.classList.toggle('nav-compact',val);
    const b=document.getElementById('sidebarCollapse');
    if(b){b.setAttribute('aria-expanded',String(!val));b.innerHTML=icon(val?'expand':'collapse')+`<span>${val?'메뉴 펼치기':'메뉴 접기'}</span>`;}
  }
  function mount(){
    const root=document.getElementById('edsSideMount');
    if(!root)return;
    root.innerHTML=`<a class="eds-brand" href="${href('dashboard')}" title="EDS 통합 대시보드"><span class="eds-brand-logo">EDS</span><span class="eds-brand-copy"><strong>EDS</strong><small>Semiconductor<br>Line-Planning Platform</small></span></a><nav id="sideNav" class="eds-nav" aria-label="EDS 16개 업무 메뉴"></nav><div class="eds-nav-foot"><button type="button" id="sidebarCollapse" class="eds-nav-minify" aria-expanded="true">${icon('collapse')}<span>메뉴 접기</span></button></div>`;
    root.addEventListener('click',e=>{
      const toggle=e.target.closest('[data-eds-toggle]');
      if(toggle){const group=toggle.dataset.edsToggle;closed.has(group)?closed.delete(group):closed.add(group);try{sessionStorage.setItem('eds-menu-closed-v43',JSON.stringify([...closed]));}catch(e){}render();return;}
      if(e.target.closest('#sidebarCollapse')){compact(!document.body.classList.contains('nav-compact'));}
    });
    render('sideNav',document.body.dataset.edsRoute||'dashboard');
  }
  window.EDS_NAV={groups,render,mount,href};
  mount();
})();
