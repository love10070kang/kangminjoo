'use strict';
/**
 * EDS LINE PLANNING — MAIN DASHBOARD ONLY (v2.0)
 * All figures and events below are FICTIONAL sample data for design review.
 * There are no network calls, passwords, tokens, AI APIs, or data writes.
 * Detailed pages will be implemented together, one by one.
 */

const $ = id => document.getElementById(id);
const icon = (name, cls = '') => `<svg class="${cls}" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const GROUPS = [
  {id:'line',name:'01. 라인 운영현황',icon:'factory',keys:['lines','production','capacity','equipment']},
  {id:'facility',name:'02. 설비·인프라',icon:'cpu',keys:['investment','layout','specs','hookup']},
  {id:'performance',name:'03. 생산 최적화',icon:'activity',keys:['productivity','process']},
  {id:'schedule',name:'04. 투자·일정',icon:'calendar',keys:['budget','milestones']},
  {id:'risk',name:'05. 기준·리스크',icon:'shield',keys:['safety','issues','standards']},
  {id:'decision',name:'06. 보고·의사결정',icon:'clipboard',keys:['reports']}
];
const MODULES = {
  lines:{number:'01',name:'라인 기본정보',desc:'FAB, 동·층·구역, 면적, 라인 특성 관리',icon:'factory',fields:['라인 ID','사업장 / FAB','동 / 층 / 구역','총면적 / 사용면적','운영 상태','기준일']},
  production:{number:'02',name:'생산계획',desc:'월별·제품별 생산 수요와 계획 버전 관리',icon:'calendar',fields:['계획 ID','계획 기간','제품군 / 공정','대상 라인','생산계획 물량','확정 여부']},
  capacity:{number:'03',name:'생산능력(CAPA)',desc:'공정별 CAPA·병목·필요 설비 대수 분석',icon:'chart',fields:['CAPA 산정 ID','공정 / 설비군','기준 기간','설비 가용 대수','UPH / 가동시간','산정 가정']},
  equipment:{number:'04',name:'설비현황',desc:'개별 설비의 위치·상태·모델 관리',icon:'cpu',fields:['설비 ID','설비명 / 설비군','Maker / Model','Serial No.','라인 / 설치 위치','운영 상태']},
  investment:{number:'05',name:'설비투자',desc:'설비 신규도입·증설·교체·이전 계획',icon:'box',fields:['투자계획 ID','투자 유형','도입 설비군','계획 대수','목표 가동일','진행 상태']},
  layout:{number:'06',name:'설비 Layout',desc:'설비 배치, 면적, 공간 간섭 및 동선',icon:'layout',fields:['Layout ID','라인 / 구역','설비 위치 좌표','점유면적','유지보수 공간','도면 버전']},
  specs:{number:'07',name:'설비 제원정보',desc:'전력·냉각수·열량·가스·CDA·배기·배관 통합',icon:'zap',fields:['설비 모델 ID','전력 / 최대전력','PCW 유량 / 열부하','가스 / CDA','배기 / 덕트','배관 규격 / 사양서']},
  hookup:{number:'08',name:'공사·Hook-up',desc:'설비 반입·설치·Utility 연결·검수',icon:'wrench',fields:['공사 ID','대상 설비','작업 유형','착수 / 완료 일정','담당 조직','검수 상태']},
  productivity:{number:'09',name:'생산성',desc:'UPH·가동률·OEE·손실 분석',icon:'activity',fields:['실적 ID','대상 설비','제품 / 공정','측정 기간','처리량 / 가동시간','OEE / 손실 유형']},
  process:{number:'10',name:'공정·물류',desc:'공정 Flow, 반송, 재공, 물류 병목',icon:'layers',fields:['공정 ID','제품군','Route 순서','설비군','처리시간','WIP / 물류 구간']},
  budget:{number:'11',name:'투자·예산',desc:'CAPEX·OPEX 및 예산 집행 현황',icon:'database',fields:['예산 ID','투자계획 ID','회계연도','승인 예산','집행 금액','담당 조직']},
  milestones:{number:'12',name:'일정·마일스톤',desc:'발주·반입·설치·가동·양산 일정',icon:'calendar',fields:['일정 ID','프로젝트 / 설비','마일스톤','계획일','실제 완료일','진행 상태']},
  safety:{number:'13',name:'안전·환경',desc:'설비·공사 안전성, 환경기준, 승인 현황',icon:'shield',fields:['검토 ID','검토 대상','위험 유형','적용 기준','검토 결과','승인 상태']},
  issues:{number:'14',name:'리스크·이슈',desc:'공급·공간·일정 등 이슈 및 대응 이력',icon:'alert',fields:['이슈 ID','발생일','대상 영역','중요도','조치 담당자','조치 기한']},
  standards:{number:'15',name:'기준·표준',desc:'기술 문서·사양서·업무 매뉴얼',icon:'file',fields:['문서 ID','문서명','대상 설비군','개정번호','시행일','관리 부서']},
  reports:{number:'16',name:'보고·의사결정',desc:'KPI·보고·승인·변경이력 연계',icon:'clipboard',fields:['보고 ID','보고 유형','기준 기간','관련 프로젝트','결정 요청','승인 상태']}
};
const LINES = [
  {id:'A',name:'A라인',percent:92},
  {id:'B',name:'B라인',percent:80},
  {id:'C',name:'C라인',percent:76},
  {id:'D',name:'D라인',percent:68},
  {id:'E',name:'E라인',percent:85}
];
const FORECAST = [
  {year:2026,add:100,usage:78},{year:2027,add:400,usage:85},
  {year:2028,add:300,usage:88},{year:2029,add:200,usage:90},
  {year:2030,add:150,usage:92}
];
const ALERTS = [
  {id:'a1',type:'investment',severity:'danger',text:'2027년 A라인 설비 반입 계획 검토 요청',date:'11.06',detail:'설비투자 계획 검토를 요청하는 샘플 알림입니다. 실제 승인 정보와 연결되지 않았습니다.'},
  {id:'a2',type:'space',severity:'warn',text:'B라인 잔여 공간 5% 이하 (추가 배치 검토 필요)',date:'11.05',detail:'공간 부족 경고의 표시 예시입니다. 실제 면적·배치 분석 값이 아닙니다.'},
  {id:'a3',type:'equipment',severity:'info',text:'신규 설비 제원 등록 (DEMO-AX200)',date:'11.04',detail:'설비 제원정보 신규 등록 알림 예시입니다.'},
  {id:'a4',type:'review',severity:'info',text:'냉각수 수용성 검토 의견 등록 요청',date:'11.03',detail:'Utility 수용성 검토 요청 알림 예시입니다.'},
  {id:'a5',type:'investment',severity:'info',text:'2028년 설비투자 계획 초안 갱신',date:'11.02',detail:'투자계획 버전 변경 알림 예시입니다.'}
];
const STATE={route:'dashboard',collapsed:new Set(),line:'all',view:'3d',alerts:'all',startYear:2026};

function renderNavigation(){
  let html=`<a class="nav-home ${STATE.route==='dashboard'?'active':''}" href="#/dashboard">${icon('home')}<span>홈 · 통합 대시보드</span></a>`;
  for(const group of GROUPS){
    const collapsed=STATE.collapsed.has(group.id);
    html+=`<section class="nav-group ${collapsed?'collapsed':''}"><button type="button" class="nav-section-toggle" data-toggle-group="${group.id}" aria-expanded="${!collapsed}">${icon(group.icon,'nav-group-icon')}<span>${esc(group.name)}</span>${icon('chevron','chevron')}</button><div class="nav-items">`;
    for(const key of group.keys){const m=MODULES[key];html+=`<a class="nav-link ${STATE.route===key?'active':''}" href="#/${key}">${icon(m.icon,'nav-symbol')}<span class="nav-num">${m.number}</span><span class="nav-label">${esc(m.name)}</span></a>`;}
    html+='</div></section>';
  }
  $('sideNav').innerHTML=html;
}
function kpiCard(iconName,name,number,unit,sub,color='blue',progress=false){
  return `<article class="kpi-card"><div class="kpi-icon ${color}">${icon(iconName)}</div><div class="kpi-info"><div class="kpi-name">${name}</div><div class="kpi-number">${number}<small> ${unit}</small></div>${progress?'<div class="kpi-progress"><span></span></div>':`<div class="kpi-sub">${sub}</div>`}</div></article>`;
}
function getLine(){return LINES.find(l=>l.id===STATE.line);}
function floorplanHtml(){return `<div class="floorplan" aria-label="설비 배치 2D 개념도">${LINES.map((l,i)=>`<div class="plan-zone ${STATE.line===l.id?'selected':''}"><span class="plan-zone-name">${l.name}</span><div class="plan-zone-racks">${Array.from({length:8},(_,j)=>`<span class="${i===3&&j>5?'new-rack':''}"></span>`).join('')}</div></div>`).join('')}</div>`;}
function layoutPanel(){
  const line=getLine();
  return `<section class="panel layout-card" aria-label="라인 스페이스 현황"><div class="panel-header"><h2>라인 스페이스 현황 <span style="font-weight:500;font-size:12px;color:#adc7e7">(${STATE.view==='3d'?'3D 콘셉트':'2D 개념도'})</span></h2><div class="panel-heading-meta"><span class="legend"><i class="square"></i> 운영 설비</span><span class="legend"><i class="square yellow"></i> 신규·계획 설비</span><span class="legend"><i class="square outline"></i> 잔여 공간</span></div></div><div class="layout-scene visual-${STATE.view}">${STATE.view==='2d'?floorplanHtml():''}<div class="line-filter-list">${[{id:'all',name:'전체'},...LINES].map(l=>`<button type="button" data-line="${l.id}" class="line-filter ${STATE.line===l.id?'active':''}">${l.name}</button>`).join('')}</div><div class="scene-info">${line?`${line.name} 사용률 <strong>${line.percent}%</strong>`:'A~E라인 · 배치 콘셉트'}</div></div><div class="layout-tools"><button type="button" class="tool-btn ${STATE.view==='2d'?'active':''}" data-view="2d">${icon('layout')} 2D 도면</button><button type="button" class="tool-btn ${STATE.view==='3d'?'active':''}" data-view="3d">${icon('box')} 3D 뷰</button><button type="button" class="tool-btn" data-feature="배치 시뮬레이션">${icon('grid')} 배치 시뮬레이션</button><button type="button" class="tool-btn" data-feature="공간 분석">${icon('chart')} 공간 분석</button></div></section>`;
}
function investmentChartSvg(){
  // 가독성 개선: 막대 수치는 막대 내부 하단, 사용률은 선 위에 배치해 겹침 방지
  const items=FORECAST.filter(x=>x.year>=STATE.startYear).slice(0,4);
  const left=82, right=610, top=62, bottom=300;
  const xs=[148,282,416,550];
  const maxEquipment=500, minUsage=65, maxUsage=100;
  const barScale=(bottom-top)/maxEquipment;
  const usageY=usage=>bottom-(usage-minUsage)*(bottom-top)/(maxUsage-minUsage);
  const grid=[0,100,200,300,400,500].map(n=>{
    const y=bottom-n*barScale;
    return `<line class="gridline" x1="${left}" x2="${right}" y1="${y}" y2="${y}"/><text class="tick-label" x="${left-15}" y="${y+5}" text-anchor="end">${n}</text>`;
  }).join('');
  const bars=items.map((item,i)=>{
    const x=xs[i], height=item.add*barScale, y=bottom-height;
    // 숫자를 막대 안쪽 하단에 고정: 선/퍼센트 레이블과 겹치지 않도록 함
    return `<g><rect class="bar" x="${x-29}" y="${y}" width="58" height="${height}" rx="6"><title>${item.year}년 투자 설비 ${item.add}대 (샘플)</title></rect><text class="bar-label" x="${x}" y="${bottom-13}" text-anchor="middle">+${item.add}</text><text class="year" x="${x}" y="333" text-anchor="middle">${item.year===2026?'2026 (현재)':String(item.year)}</text></g>`;
  }).join('');
  const coordinates=items.map((item,i)=>[xs[i],usageY(item.usage)]);
  const path=coordinates.map((p,i)=>`${i?'L':'M'} ${p[0]} ${p[1]}`).join(' ');
  const percentages=items.map((item,i)=>{
    const [x,y]=coordinates[i];
    return `<g><circle class="point" cx="${x}" cy="${y}" r="7"><title>${item.year}년 공간 사용률 ${item.usage}% (샘플)</title></circle><text class="util-label" x="${x}" y="${y-22}" text-anchor="middle">${item.usage}%</text></g>`;
  }).join('');
  const rightTicks=[65,70,75,80,85,90,95,100].map(n=>`<text class="tick-label" x="${right+13}" y="${usageY(n)+5}">${n}</text>`).join('');
  return `<svg class="chart-svg" role="img" aria-label="${STATE.startYear}년부터 4년간 투자 설비 대수와 공간 사용률 추이, 가상 데이터" viewBox="0 0 700 365" preserveAspectRatio="xMidYMid meet">
    <defs><linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9addff"/><stop offset="1" stop-color="#2d7de4"/></linearGradient></defs>
    <text class="axis-label" x="${left}" y="31">투자 설비 (대)</text><text class="axis-label" x="${right+15}" y="31" text-anchor="end">공간 사용률 (%)</text>
    ${grid}
    <line class="axis" x1="${left}" x2="${left}" y1="${top}" y2="${bottom}"/><line class="axis" x1="${right}" x2="${right}" y1="${top}" y2="${bottom}"/>
    ${rightTicks}${bars}<path class="util-line" d="${path}"/>${percentages}
  </svg>`;
}
function chartPanel(){return `<section class="panel chart-card"><div class="panel-header"><h2>투자 계획에 따른 공간 변화 예측</h2><div class="panel-heading-meta"><span class="legend"><i class="square"></i> 투자 설비(대)</span><span class="legend"><i class="line"></i> 공간 사용률(%)</span></div></div><div class="chart-wrap" id="investmentChart">${investmentChartSvg()}</div></section>`;}
function alertsPanel(){
  const tabs=[['all','전체'],['investment','투자계획'],['space','공간'],['equipment','설비'],['review','검토요청']];
  const items=STATE.alerts==='all'?ALERTS:ALERTS.filter(a=>a.type===STATE.alerts);
  return `<section class="panel alerts-panel" id="alertsPanel"><div class="panel-header"><h2>${icon('bell')} 주요 알림 · 이슈</h2><span style="font-size:10px;color:#7dbbe7">예시 데이터</span></div><div class="alert-tabs" role="tablist" aria-label="알림 분류">${tabs.map(([id,label])=>`<button type="button" role="tab" aria-selected="${STATE.alerts===id}" class="alert-tab ${STATE.alerts===id?'active':''}" data-alert-tab="${id}">${label}</button>`).join('')}</div><div class="alert-list">${items.length?items.map(a=>`<button type="button" class="alert-row" data-alert-id="${a.id}"><span class="alert-icon ${a.severity==='warn'?'warn':a.severity==='info'?'info':''}">${a.severity==='danger'?'!':a.severity==='warn'?'!':'i'}</span><span class="alert-text">${esc(a.text)}</span><time>${a.date}</time></button>`).join(''):'<div class="alert-empty">이 분류의 샘플 알림이 없습니다.</div>'}</div></section>`;
}
function copilotPanel(){return `<section class="panel copilot-card"><div class="copilot-head"><div class="ai-orb">${icon('sparkles')}</div><span class="copilot-title">AI Copilot</span><span class="copilot-desc">라인기획 업무 도우미</span><span class="soon-tag">연동 예정</span></div><form id="copilotForm" class="copilot-form"><label class="sr-only" for="copilotQuestion">AI 분석 질문</label><input id="copilotQuestion" name="q" maxlength="300" placeholder="예) A라인 신규 설비 50대 도입 시 공간 수용성 분석" /><button type="submit" title="분석 요청" aria-label="분석 요청">${icon('arrow')}</button></form><div class="quick-buttons"><button class="quick-btn" type="button" data-feature="제원 적합성 검토">${icon('cpu')} 제원 적합성</button><button class="quick-btn" type="button" data-feature="공간 수용성 분석">${icon('layers')} 공간 수용성</button><button class="quick-btn" type="button" data-feature="배치 시뮬레이션">${icon('layout')} 배치 시뮬레이션</button><button class="quick-btn" type="button" data-feature="설비 대수 산정">${icon('chart')} 설비 대수 산정</button></div></section>`;}
function quickStatusPanel(){return `<section class="panel quick-status-panel"><div class="panel-header"><h2>${icon('layers')} 빠른 현황</h2></div><div class="quick-status"><div class="donut" role="img" aria-label="잔여 공간 22퍼센트, 예시 데이터"><div class="donut-label"><strong>22%</strong>잔여 공간</div></div><div class="quick-values"><div class="quick-value"><span>총 수용 가능</span><b>5,560대</b></div><div class="quick-value"><span>운영·계획 배치</span><b>4,320대</b></div><div class="quick-value"><span>잔여 수용 가능</span><b>1,240대</b></div></div></div></section>`;}
function dashboard(){
  return `<div class="main-screen" id="dashboardPage"><div class="page-heading"><div><h1>라인기획 통합 대시보드 <span class="demo-badge">샘플 데이터</span></h1><p>라인 운영 · 투자계획 · 공간 수용성 · 설비 배치를 한눈에 관리합니다.</p></div><div class="heading-side"><span class="asof">기준일 2026.11.06 (금)</span><label class="period-control"><span>계획기간</span><select id="periodSelect" aria-label="투자계획 조회 기간"><option value="2026" ${STATE.startYear===2026?'selected':''}>2026 ~ 2029</option><option value="2027" ${STATE.startYear===2027?'selected':''}>2027 ~ 2030</option></select>${icon('chevron')}</label></div></div><div class="kpi-grid">${kpiCard('chart','생산라인','12','개 라인','▲ +1 (전월 대비)')}${kpiCard('cpu','운영 설비','4,320','대','▲ +120 (전월 대비)','cyan')}${kpiCard('layers','공간 사용률','78','%','','cyan',true)}${kpiCard('zap','전력 요구량','48.5','MW','▲ +2.1 MW','yellow')}${kpiCard('droplet','냉각수 요구량','7,820','m³/h','▲ +320 m³/h','cyan')}${kpiCard('calendar','확정 투자','+1,000','대','2027~2029 계획','purple')}</div><div class="content-grid">${layoutPanel()}${chartPanel()}</div><div class="bottom-grid">${copilotPanel()}${alertsPanel()}${quickStatusPanel()}</div></div>`;
}
function placeholder(key){
  const m=MODULES[key],existing=key==='equipment';
  return `<div class="main-screen placeholder-page"><div class="page-heading"><div><h1>${m.number}. ${esc(m.name)} <span class="demo-badge">다음 단계 개발</span></h1><p>${esc(m.desc)}</p></div><div class="heading-side"><button class="button" type="button" data-route="dashboard">${icon('home')} 메인화면</button></div></div><section class="placeholder-shell"><div class="placeholder-eyebrow">EDS MODULE ${m.number} · PAGE DESIGN PENDING</div><h2>${esc(m.name)}</h2><p>${esc(m.desc)}</p><p>메인 대시보드 연결은 완료되었습니다. 이 페이지의 목록·조회·등록·수정 화면은 사용자와 항목을 하나씩 협의한 후 구현합니다.</p><h3 style="margin:18px 0 6px;font-size:14px">향후 연결할 필수 데이터</h3><div class="placeholder-fields">${m.fields.map(f=>`<span class="placeholder-field">${esc(f)}</span>`).join('')}</div><div class="placeholder-note">이 페이지는 현재 저장 기능이 없으며 실데이터를 조회하거나 수정하지 않습니다.</div><div class="placeholder-actions"><button class="button button-primary" type="button" data-route="dashboard">메인 대시보드로 돌아가기</button>${existing?'<a class="button" href="./equipment.html">기존 설비현황 페이지 열기 ↗</a>':''}</div></section></div>`;
}
function setRoute(key){
  STATE.route=(key==='dashboard'||MODULES[key])?key:'dashboard';
  renderNavigation();
  $('mainContent').innerHTML=STATE.route==='dashboard'?dashboard():placeholder(STATE.route);
  document.title=(STATE.route==='dashboard'?'통합 대시보드':MODULES[STATE.route].name)+' | EDS 라인기획';
  closeSearch();closeMobile();
  window.scrollTo({top:0,behavior:'instant'});
}
function routeFromHash(){const path=location.hash.replace(/^#\/?/,'').split(/[?&]/)[0]||'dashboard';setRoute(path);}
function showDialog(title,message){$('dialogTitle').textContent=title;$('dialogBody').textContent=message;$('infoDialog').showModal();}
function showPlanned(title){showDialog(title,'이 기능은 메인 화면 콘셉트에 배치된 향후 개발 항목입니다.\n\n관련 상세 페이지와 실제 데이터 연결·계산 로직을 함께 설계한 후 활성화합니다. 현재는 실데이터 분석이나 AI 호출을 실행하지 않습니다.');}
function showSearch(q){
  q=q.trim().toLowerCase();
  if(!q){closeSearch();return;}
  const results=Object.entries(MODULES).filter(([key,m])=>[m.number,m.name,m.desc,...m.fields,key].join(' ').toLowerCase().includes(q)).slice(0,8);
  $('searchResults').innerHTML=`<div class="search-title">메뉴 검색 결과 · ${results.length}건</div>`+(results.length?results.map(([key,m])=>`<button class="search-result" type="button" data-result="${key}">${icon(m.icon)}<span>${esc(m.name)}</span><small>${esc(m.number)} · 메뉴로 이동</small></button>`).join(''):'<div class="search-empty">일치하는 메뉴가 없습니다. 실제 사내 데이터 통합 검색은 추후 연결됩니다.</div>');
  $('searchResults').hidden=false;
}
function closeSearch(){$('searchResults').hidden=true;}
function closeMobile(){$('sidebar').classList.remove('open');$('mobileBackdrop').hidden=true;}
function focusAlerts(){if(STATE.route!=='dashboard'){location.hash='#/dashboard';requestAnimationFrame(()=>setTimeout(focusAlerts,80));return;}$('alertsPanel')?.scrollIntoView({block:'center',behavior:'smooth'});}

document.addEventListener('click',event=>{
  const toggle=event.target.closest('[data-toggle-group]');
  if(toggle){const id=toggle.dataset.toggleGroup;STATE.collapsed.has(id)?STATE.collapsed.delete(id):STATE.collapsed.add(id);renderNavigation();return;}
  const line=event.target.closest('[data-line]');
  if(line){STATE.line=line.dataset.line;const el=$('mainContent');el.innerHTML=dashboard();return;}
  const mode=event.target.closest('[data-view]');
  if(mode){STATE.view=mode.dataset.view;const layout=el=>el.querySelector('.layout-card');const container=layout($('mainContent'));if(container){const newPanel=document.createElement('template');newPanel.innerHTML=layoutPanel();container.replaceWith(newPanel.content.firstElementChild);}return;}
  const alertTab=event.target.closest('[data-alert-tab]');
  if(alertTab){STATE.alerts=alertTab.dataset.alertTab;$('alertsPanel').outerHTML=alertsPanel();return;}
  const alert=event.target.closest('[data-alert-id]');
  if(alert){const record=ALERTS.find(a=>a.id===alert.dataset.alertId);if(record)showDialog('알림 상세 · 가상 데이터',`${record.text}\n\n${record.detail}`);return;}
  const result=event.target.closest('[data-result]');
  if(result){location.hash='#/'+result.dataset.result;return;}
  const feat=event.target.closest('[data-feature]');
  if(feat){showPlanned(feat.dataset.feature);return;}
  const route=event.target.closest('[data-route]');
  if(route){location.hash='#/'+route.dataset.route;return;}
  if(!event.target.closest('#searchWrap'))closeSearch();
});

$('globalSearch').addEventListener('input',e=>showSearch(e.target.value));
$('globalSearch').addEventListener('keydown',e=>{
  if(e.key==='Enter'){const first=$('searchResults').querySelector('[data-result]');if(first){e.preventDefault();location.hash='#/'+first.dataset.result;}}
  if(e.key==='Escape'){closeSearch();e.target.blur();}
});
$('menuToggle').addEventListener('click',()=>{$('sidebar').classList.add('open');$('mobileBackdrop').hidden=false;});
$('mobileBackdrop').addEventListener('click',closeMobile);
$('dialogClose').addEventListener('click',()=>$('infoDialog').close());
$('dialogOk').addEventListener('click',()=>$('infoDialog').close());
$('helpBtn').addEventListener('click',()=>showDialog('메인 대시보드 사용법','왼쪽 16개 메뉴로 이동할 수 있습니다. 상단 검색은 메뉴 이름과 데이터 항목을 찾습니다. 라인 공간 화면에서 A~E라인을 선택하거나 2D/3D 시안을 전환할 수 있습니다.\n\n현재 수치·알림·차트는 가상 데이터이며 각 상세 업무 페이지는 협의 후 개발합니다.'));
$('accountBtn').addEventListener('click',()=>showDialog('계정·권한 관리 안내','상단의 “라인기획팀” 표시는 디자인용 예시입니다.\n\n현재 로그인·권한 검증은 구현되지 않았습니다. 사내 GitHub 환경의 인증 방식과 배포 접근 범위를 확인한 후 연결해야 합니다.'));
$('aiRequest').addEventListener('click',()=>showPlanned('AI 분석 요청'));
$('notificationsBtn').addEventListener('click',focusAlerts);
$('mainContent').addEventListener('change',e=>{
  if(e.target.id==='periodSelect'){STATE.startYear=Number(e.target.value);const chart=$('investmentChart');if(chart)chart.innerHTML=investmentChartSvg();}
});
$('mainContent').addEventListener('submit',e=>{
  if(e.target.id==='copilotForm'){e.preventDefault();const q=$('copilotQuestion').value.trim();if(!q){$('copilotQuestion').focus();return;}showDialog('AI Copilot · 연동 예정',`입력한 질문:\n“${q}”\n\n현재 버전에는 AI 분석 서버가 연결되지 않았습니다. 요청을 전송하거나 분석 결과를 생성하지 않습니다.`);}
});
document.addEventListener('keydown',e=>{
  if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement?.tagName)&&!$('infoDialog').open){e.preventDefault();$('globalSearch').focus();}
  if(e.key==='Escape')closeSearch();
});
window.addEventListener('hashchange',routeFromHash);
$('currentDate').textContent='기준 2026.11.06';
routeFromHash();
