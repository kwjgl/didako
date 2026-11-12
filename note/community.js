// 디다코 공동체: 아직 화면 뼈대. 책장(질문으로 묵상하기 연재)과 함께 나누기는 다음 PR에서 더한다.
(() => {
  const CFG=window.DIDAKO_CONFIG||{}, q=new URLSearchParams(location.search);
  const scene=q.get('as')||'', explicitDemo=q.has('demo'), demo=explicitDemo||!CFG.SUPABASE_URL;
  const S={page:'load',list:[],places:3,info:null,peek:null,invite:q.get('invite')||'',sheet:'',busy:false,
    error:'',msg:'',months:3,limited:false,loginProviders:['kakao'],id:'',joinError:'',sheetError:'',draftName:'',draftPerson:'',draftJoin:''};
  const $=id=>document.getElementById(id), esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
  const nick=()=>{try{return localStorage.getItem('didako-community-name')||'';}catch(e){return '';}};
  const remember=s=>{try{localStorage.setItem('didako-community-name',s);}catch(e){}};
  const err=e=>(e&&e.message)||'다시 시도해 주세요.';
  let demoLoad=null;
  async function fake(){
    if(window.didakoCommunityDemo)return window.didakoCommunityDemo;
    if(!demoLoad)demoLoad=new Promise((ok,no)=>{
      const s=document.createElement('script');s.src='community-demo.js';
      s.onload=()=>ok(window.didakoCommunityDemo);s.onerror=()=>no({code:'net',message:'데모를 불러오지 못했어요.'});document.head.appendChild(s);
    });return demoLoad;
  }
  async function kApi(name,args){if(!demo)throw {code:'off',message:'디다코 공동체는 곧 열려요.'};return (await fake()).call(name,args||{});}
  const nday=()=>new Date(new Date().toLocaleString('en-US',{timeZone:'Asia/Seoul'}));
  const ymd=d=>[d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');
  const addMonthsStr=m=>{const d=nday(),n=d.getDate();d.setDate(1);d.setMonth(d.getMonth()+m);d.setDate(Math.min(n,new Date(d.getFullYear(),d.getMonth()+1,0).getDate()));return ymd(d)};
  const krday=d=>{if(!d)return '';const a=String(d).slice(0,10).split('-').map(Number);return a[1]+'월 '+a[2]+'일'};
  const days=d=>{if(!d)return null;const a=String(d).slice(0,10),today=ymd(nday());return Math.round((Date.parse(a+'T00:00:00Z')-Date.parse(today+'T00:00:00Z'))/864e5)};
  const endText=e=>e?', '+krday(e)+'까지':'';
  const finishText=e=>e?krday(e)+'까지':'끝나는 날 없이 계속해요';
  const agree=()=>'<div class="agree"><p>공동체 이름과 내 이름은 공동체 사람들과 함께 봐요.</p><p>내 질문과 묵상 기록은 공동체에 보내지 않아요.</p></div>';
  const banner=()=>demo?'<div class="demo-banner"><span>데모 모드예요</span><button class="link" data-a="reset">데모 데이터 지우기</button></div>':'';
  const MARK = '<svg class="mk" viewBox="0 0 16 16"><use href="#i-didako"/></svg>';
  const head=()=>'<header class="topbar"><div class="inner"><a href="index.html'+(explicitDemo?'?demo':'')+'" class="brand"><span class="brand-mark">'+MARK+'</span>디다코</a><a href="index.html'+(explicitDemo?'?demo':'')+'" class="badge-btn badge-link">디다코 공동체</a></div></header>';
  const notice=()=>S.msg?'<p class="hint" role="status">'+esc(S.msg)+'</p>':'';
  const error=()=>S.error?'<p class="error" role="alert">'+esc(S.error)+'</p>':'';
  const layout=inner=>banner()+head()+'<main class="wrap">'+inner+'</main>'+sheet();
  function login(){
    return '<div class="card" style="max-width:460px;margin:45px auto;align-items:center;text-align:center">'+
      '<span class="wl-mark" aria-hidden="true">'+MARK+'</span><h1>디다코 공동체</h1>'+
      '<div style="width:100%;display:grid;gap:8px">'+S.loginProviders.map(k=>'<button class="btn sso-btn sso-'+k+'" data-a="oauth" data-v="'+k+'">'+((window.KoideSb&&window.KoideSb.logos||{})[k]||'')+
      '<span>'+({kakao:'카카오로 계속',google:'Google로 계속',apple:'Apple로 계속'}[k]||'로그인')+'</span></button>').join('')+'</div>'+error()+'</div>';
  }
  const chip=(label,extra='')=>'<span class="role-chip'+(extra?' '+extra:'')+'">'+esc(label)+'</span>';
  function list(){
    return '<h1>디다코 공동체</h1>'+error()+notice()+
      (S.list.length?'<div class="mlist">'+S.list.map(c=>{
        const closed=c.state!=='열림',wait=c.status==='요청',leader=c.role==='모임장';
        return '<button class="mrow" data-a="'+(wait||closed?'none':'open')+'" data-v="'+esc(c.id)+'"'+(wait||closed?' disabled':'')+'><span>'+
          '<b class="name-chips">'+esc(c.name)+(leader?chip('모임장'):'')+'</b><small>'+
          (closed?'끝난 공동체예요':wait?'모임장의 승인을 기다려요':c.n+'명'+endText(c.endsOn))+
          '</small></span><span class="row mrow-end">'+(leader&&c.asks?chip('신청 '+c.asks,'ask-chip'):'')+
          (wait||closed?'':'<span aria-hidden="true">›</span>')+'</span></button>';
      }).join('')+'</div>':
      '<div class="card"><p>아직 함께하는 공동체가 없어요.</p></div>')+
      (S.places>0?'<button class="btn new-community" data-a="new">+ 공동체 만들기</button>':'<p class="hint">세 곳이 다 찼어요.</p>');
  }
  const inviteUrl=t=>location.origin+location.pathname+(demo?'?demo&invite=':'?invite=')+encodeURIComponent(t);
  function inviteCard(){
    const c=S.info;if(c.role!=='모임장')return '';
    const dead=!c.expires||Date.parse(c.expires)<=Date.now();
    const addr=c.token?inviteUrl(c.token):'';
    return '<section class="card"><h2>초대 링크를 카톡으로 보내요</h2>'+
      (dead?'<p class="hint">링크가 닫혔어요.</p>':
      '<input class="field" readonly aria-label="초대 링크" value="'+esc(addr)+'">'+
      '<div class="row"><button class="btn ghost" data-a="copy">복사</button>'+
      (navigator.share?'<button class="btn ghost" data-a="share">보내기</button>':'')+'</div>'+
      '<p class="hint">'+krday(c.expires)+'까지 열려 있어요.</p>')+
      '<button class="link" data-a="renew">새 링크 만들기</button></section>';
  }
  // 디다코 노트 서가에서 가져왔다: 성경 책 순서와 연재 표지·이름
  const BOOKS = [['창세기', '창'], ['출애굽기', '출'], ['레위기', '레'], ['민수기', '민'], ['신명기', '신'], ['여호수아', '수'], ['사사기', '삿'], ['룻기', '룻'], ['사무엘상', '삼상'], ['사무엘하', '삼하'], ['열왕기상', '왕상'], ['열왕기하', '왕하'], ['역대상', '대상'], ['역대하', '대하'], ['에스라', '스'], ['느헤미야', '느'], ['에스더', '에'], ['욥기', '욥'], ['시편', '시'], ['잠언', '잠'], ['전도서', '전'], ['아가', '아'], ['이사야', '사'], ['예레미야', '렘'], ['예레미야애가', '애'], ['에스겔', '겔'], ['다니엘', '단'], ['호세아', '호'], ['요엘', '욜'], ['아모스', '암'], ['오바댜', '옵'], ['요나', '욘'], ['미가', '미'], ['나훔', '나'], ['하박국', '합'], ['스바냐', '습'], ['학개', '학'], ['스가랴', '슥'], ['말라기', '말'],
    ['마태복음', '마'], ['마가복음', '막'], ['누가복음', '눅'], ['요한복음', '요'], ['사도행전', '행'], ['로마서', '롬'], ['고린도전서', '고전'], ['고린도후서', '고후'], ['갈라디아서', '갈'], ['에베소서', '엡'], ['빌립보서', '빌'], ['골로새서', '골'], ['데살로니가전서', '살전'], ['데살로니가후서', '살후'], ['디모데전서', '딤전'], ['디모데후서', '딤후'], ['디도서', '딛'], ['빌레몬서', '몬'], ['히브리서', '히'], ['야고보서', '약'], ['베드로전서', '벧전'], ['베드로후서', '벧후'], ['요한일서', '요일'], ['요한이서', '요이'], ['요한삼서', '요삼'], ['유다서', '유'], ['요한계시록', '계']];
  const walkCover = w => (w.cover ? `<img class="wk-cover" src="${esc(w.cover)}" alt="" width="1200" height="675" decoding="async">` : '');
  // 한 책을 여러 부로 나눈 연재는 "마가복음 2부"처럼 부르고, 한 부짜리는 책 이름만 쓴다(S-67)
  const walkPart = w => { const m = /-(\d+)$/.exec(w.id); return m && (window.WALKS || []).filter(x => x.book === w.book).length > 1 ? Number(m[1]) : 0; };
  const walkName = w => w.book + (walkPart(w) ? ` ${walkPart(w)}부` : '');
  // 연재가 다루는 장: 첫 편과 마지막 편 장절의 첫 "○장"으로 "1~4장"(장으로 셀 수 없는 책은 빈칸)
  const walkRange = w => { const ch = r => { const m = /(\d+)장/.exec(r || ''); return m ? Number(m[1]) : 0; }; const a = ch(w.eps[0] && w.eps[0].ref), b = ch(w.eps.length ? w.eps[w.eps.length - 1].ref : ''); return a && b ? (a === b ? `${a}장` : `${a}~${b}장`) : ''; };
  const allWalks=()=>window.WALKS||[];
  const selectedWalk=()=>allWalks().find(w=>w.id===S.info?.book);
  const bookIndex=book=>{const i=BOOKS.findIndex(([n])=>n===book);return i<0?BOOKS.length:i;};
  const walkHref=w=>'index.html'+(explicitDemo?'?demo':'')+'#/explore/walk/'+encodeURIComponent(w.id);
  // 디다코 노트 서가에서 가져왔다: 권별 목록과 부별 접힘
  function pickShelf(){
    const all=allWalks(),cur=S.info?.book,books=[...new Set(all.map(w=>w.book))].sort((a,b)=>bookIndex(a)-bookIndex(b));
    const choice=w=>'<button class="xrow wk-pt" type="button" data-a="setbook" data-v="'+esc(w.id)+'"><span class="wk-tt"><span style="display:block">'+(walkPart(w)?walkPart(w)+'부 ':'')+esc(w.title)+'</span><span class="sm">'+esc(walkRange(w))+'</span></span>'+(w.id===cur?chip('지금'):'<span class="xch" aria-hidden="true">›</span>')+'</button>';
    const row=book=>{
      const ws=all.filter(w=>w.book===book).sort((a,b)=>walkPart(a)-walkPart(b)),cover=ws.find(w=>w.cover);
      const thumb=cover?'<img class="wk-th" src="'+esc(cover.cover)+'" alt="" width="128" height="72" decoding="async">':'<span class="wk-th" aria-hidden="true"></span>';
      if(ws.length===1){
        const w=ws[0];return '<button class="card xrow wk-bk" type="button" data-a="setbook" data-v="'+esc(w.id)+'">'+thumb+'<span class="wk-tt"><span style="display:block">'+esc(book)+'</span><span class="sm">'+esc(w.title)+'</span></span>'+(w.id===cur?chip('지금'):'<span class="xch" aria-hidden="true">›</span>')+'</button>';
      }
      return '<details class="card wk-bk"'+(ws.some(w=>w.id===cur)?' open':'')+'><summary class="xrow">'+thumb+'<span class="wk-tt"><span style="display:block">'+esc(book)+'</span><span class="sm">'+ws.length+'부로 나눠 읽어요.</span></span><span class="xch" aria-hidden="true">›</span></summary>'+ws.map(choice).join('')+'</details>';
    };
    const shelf=old=>{const bs=books.filter(book=>(bookIndex(book)<39)===old);return bs.length?'<div class="xlb">'+(old?'구약':'신약')+'</div>'+bs.map(row).join(''):'';};
    return shelf(true)+shelf(false);
  }
  function bookCard(){
    const c=S.info,w=selectedWalk(),leader=c.role==='모임장';
    if(!w)return '<section class="card cb"><div class="xlb">함께 걷는 책</div>'+(leader?'<button class="btn ghost" data-a="pick">책 고르기</button>':'<p class="hint">모임장이 책을 고르면 여기에 보여요.</p>')+'</section>';
    const ep=w.eps.find(x=>x.n===Number(c.ep))||w.eps[0],current=Number(ep.n);
    return '<section class="card cb"><div class="xlb">함께 걷는 책</div>'+
      '<div class="xcard">'+walkCover(w)+'<div class="sm">'+esc(walkName(w))+'</div><div class="sf xct" style="margin-top:4px">'+esc(w.title)+'</div></div>'+
      '<div class="xlb">지금 함께 읽는 편</div><div class="sf">'+current+'편 '+esc(ep.title)+'</div><div class="wk-meta"><span class="ref-pill">'+esc(ep.ref)+'</span></div>'+
      '<a class="btn ghost cb-read" href="'+walkHref(w)+'">혼자 묵상하기</a>'+
      (leader?'<div class="row">'+(current<w.eps.length?'<button class="btn" data-a="next-ep">다음 편으로</button>':'')+'<button class="link" data-a="pick">책 바꾸기</button></div>':'')+
      '<details class="cb-episodes"><summary class="link">편 목록</summary><div class="mlist">'+w.eps.map(e=>{
        const label='<span class="wk-tt"><span style="display:block">'+e.n+'편 '+esc(e.title)+'</span><span class="sm">'+esc(e.ref)+'</span></span>'+(Number(e.n)===current?chip('지금'):'');
        return leader?'<button class="xrow wk-row" data-a="setep" data-v="'+e.n+'">'+label+'</button>':'<div class="xrow wk-row">'+label+'</div>';
      }).join('')+'</div></details></section>';
  }
  function detail(){
    const c=S.info;return '<button class="link" data-a="back">‹ 목록으로</button><h1>'+esc(c.name)+'</h1>'+
      '<p class="hint" style="margin-bottom:16px">'+c.members.length+'명'+(c.state==='열림'?endText(c.endsOn):', 끝난 공동체예요')+'</p>'+
      error()+notice()+inviteCard()+bookCard()+
      '<section class="card">'+
      '<div class="mlist">'+c.members.map(m=>'<div class="mrow"><span class="name-chips"><b>'+esc(m.name)+'</b>'+(m.role==='모임장'?chip('모임장'):'')+(m.own?chip('나'):'')+'</span></div>').join('')+'</div></section>'+
      (c.role==='모임장'&&c.asks?.length?'<button class="btn ghost" data-a="asks">신청 '+c.asks.length+'명 확인하기</button>':'')+
      '';
  }
  function invite(){
    const p=S.peek;return '<button class="link" data-a="back">‹ 목록으로</button><h1>'+esc(p.name)+'</h1>'+
      '<p class="hint" style="margin-bottom:18px">모임장 '+esc(p.lead||'')+(p.endsOn?', '+esc(krday(p.endsOn))+'까지':'')+'</p>'+
      '<div class="card">'+agree()+'<label class="label" for="join-person">공동체에서 쓸 내 이름</label>'+
      '<input class="field" id="join-person" maxlength="10" autocomplete="name" value="'+esc(S.draftJoin||nick())+'" placeholder="이름을 적어 주세요">'+
      (S.joinError?'<p class="error">'+esc(S.joinError)+'</p>':'')+
      '<button class="btn" data-a="join"'+(S.busy?' disabled':'')+'>동의하고 함께하기 신청</button>'+
      '<button class="link" data-a="back">나중에 할게요</button></div>';
  }
  const waiting=()=>'<div class="card"><h1>함께하기를 신청했어요</h1><p>모임장이 승인하면 들어갈 수 있어요.</p><button class="btn ghost" data-a="back">목록으로</button></div>';
  const failed=()=>'<div class="card"><h1>초대 링크를 열 수 없어요</h1>'+error()+'<button class="btn ghost" data-a="back">목록으로</button></div>';
  function sheet(){
    if(!S.sheet)return '';
    if(S.sheet==='pick'){
      return '<div class="sheet-back" data-a="close"><section class="sheet cb" role="dialog" aria-modal="true" aria-label="함께 걷는 책 고르기" data-stop>'+
        '<h2>함께 걷는 책 고르기</h2>'+pickShelf()+
        '<p class="sm" style="margin-top:18px;line-height:1.6;word-break:keep-all">풀이는 STEP Bible 자료에서 확인한 원어를 바탕으로, 여러 교회가 함께 받아들이는 읽기를 따라 AI가 작성하고 사람이 확인한 묵상 글이에요. 다르게 읽히는 곳은 의견 보내기로 알려 주세요.</p>'+
        (S.sheetError?'<p class="error" role="alert">'+esc(S.sheetError)+'</p>':'')+
        '<button class="btn ghost" data-a="close">닫기</button></section></div>';
    }
    if(S.sheet==='create'){
      return '<div class="sheet-back" data-a="close"><section class="sheet" role="dialog" aria-modal="true" aria-label="새 공동체" data-stop>'+
        '<h2>새 공동체</h2><label class="label" for="create-name">공동체 이름</label>'+
        '<input class="field" id="create-name" maxlength="16" value="'+esc(S.draftName)+'" placeholder="금요 말씀 모임">'+
        '<label class="label" for="create-person">공동체에서 쓸 내 이름</label>'+
        '<input class="field" id="create-person" maxlength="10" value="'+esc(S.draftPerson||nick())+'" placeholder="이름을 적어 주세요">'+
        '<div class="row"><span>끝나는 날 정하기</span><button class="switch'+(S.limited?' on':'')+'" data-a="limit" role="switch" aria-checked="'+S.limited+'"><span></span></button></div>'+
        (S.limited?'<div class="seg">'+[1,3,6,12].map(m=>'<button data-a="months" data-v="'+m+'" class="'+(S.months===m?'on':'')+'">'+m+'개월<small>'+krday(addMonthsStr(m))+'까지</small></button>').join('')+'</div>':'')+
        agree()+(S.sheetError?'<p class="error" role="alert">'+esc(S.sheetError)+'</p>':'')+
        '<div class="row"><button class="btn ghost" data-a="close">취소</button><button class="btn" data-a="create"'+(S.busy?' disabled':'')+'>동의하고 만들기</button></div></section></div>';
    }
    if(S.sheet==='asks'){
      return '<div class="sheet-back" data-a="close"><section class="sheet" role="dialog" aria-modal="true" aria-label="함께하기 신청" data-stop>'+
        '<h2>함께하기 신청</h2><div class="mlist">'+(S.info?.asks||[]).map(m=>'<div class="mrow"><span><b>'+esc(m.name)+'</b></span>'+
        '<span class="row"><button class="btn ghost" data-a="reject" data-v="'+esc(m.id)+'">거절</button><button class="btn" data-a="approve" data-v="'+esc(m.id)+'">승인</button></span></div>').join('')+'</div>'+
        (S.sheetError?'<p class="error" role="alert">'+esc(S.sheetError)+'</p>':'')+
        '<button class="btn ghost" data-a="close">닫기</button></section></div>';
    }
    return '';
  }
  function render(){
    let inside='';
    if(S.page==='off')inside='<div class="card"><h1>디다코 공동체는 곧 열려요.</h1><a class="btn ghost" href="index.html">디다코 노트로</a></div>';
    else if(S.page==='login')inside=login();
    else if(S.page==='list')inside=list();
    else if(S.page==='info')inside=detail();
    else if(S.page==='invite')inside=invite();
    else if(S.page==='waiting')inside=waiting();
    else if(S.page==='error')inside=failed();
    else inside='<h1>디다코 공동체</h1><p class="hint">불러오는 중이에요…</p>'+error();
    $('root').innerHTML=layout(inside);
  }
  function clearInvite(){
    S.invite='';S.peek=null;S.joinError='';
    const u=new URL(location.href);u.searchParams.delete('invite');history.replaceState(null,'',u.pathname+u.search+u.hash);
  }
  async function loadList(){
    S.page='load';S.error='';render();
    try{const a=await kApi('community_mine');S.list=a.list||[];S.places=a.places??3;S.page='list';}
    catch(e){if(e.code==='login'&&!demo){S.page='login';S.loginProviders=await window.KoideSb.providers();}
      else{S.page='list';S.error=err(e);}}
    render();
  }
  async function open(id){
    S.page='load';S.error='';render();
    try{S.info=await kApi('community_info',{p_id:id});S.id=id;S.page='info';}
    catch(e){S.page='list';S.error=err(e);}render();
  }
  async function loadInvite(){
    if(!S.invite)return loadList();
    S.page='load';S.error='';render();
    try{
      const p=await kApi('community_peek',{p_token:S.invite});S.peek=p;
      if(p.mine==='함께'){
        // SQL peek에는 공동체 id가 없다. 이미 함께인 경우 join은 새 요청을 만들지 않고 id와 status만 돌려준다.
        const mine=await kApi('community_join',{p_token:S.invite,p_person:''});
        clearInvite();return open(mine.id);
      }
      S.page=p.mine==='요청'?'waiting':'invite';
      if(S.page==='waiting')clearInvite();
    }catch(e){if(e.code==='login'&&!demo){S.page='login';S.loginProviders=await window.KoideSb.providers();}
      else{S.page='error';S.error=err(e);}}
    render();
  }
  async function busy(run,where=''){
    if(S.busy)return;S.busy=true;S.sheetError='';S.joinError='';S.error='';render();
    try{await run();}catch(e){
      if(e.code==='login'&&!demo){S.page='login';S.sheet='';S.loginProviders=await window.KoideSb.providers();}
      else if(where==='sheet')S.sheetError=err(e);else if(where==='join')S.joinError=err(e);else S.error=err(e);
    }finally{S.busy=false;render();}
  }
  const $v=id=>$(id)?.value||'';
  async function init(){
    const mode=scene==='off'?'off':scene==='login'?'login':null;
    if(mode==='off'){S.page='off';return render();}
    if(!demo&&!(CFG.COMMUNITY==='on'&&window.KoideSb&&window.KoideSb.ready())){S.page='off';return render();}
    if(demo){
      const d=await fake();
      if(scene==='invite'||scene==='expired')S.invite=d.initialInvite();
      if(mode==='login'){S.page='login';return render();}
      return S.invite?loadInvite():loadList();
    }
    try{const session=await window.KoideSb.session();
      if(!session){S.page='login';S.loginProviders=await window.KoideSb.providers();return render();}
      try{localStorage.removeItem('didako-community-resume');}catch(e){}
      const u=new URL(location.href);
      if(['code','error','error_code','error_description'].some(k=>u.searchParams.has(k))){
        ['code','error','error_code','error_description'].forEach(k=>u.searchParams.delete(k));
        history.replaceState(null,'',u.pathname+u.search+u.hash);
      }
      if(!S.invite&&u.searchParams.has('error_description'))S.error='로그인이 끝나지 않았어요.';
      return S.invite?loadInvite():loadList();
    }catch(e){S.page='login';S.error=err(e);S.loginProviders=await window.KoideSb.providers();render();}
  }
  document.addEventListener('input',ev=>{const id=ev.target.id;if(id==='create-name')S.draftName=ev.target.value;else if(id==='create-person')S.draftPerson=ev.target.value;else if(id==='join-person')S.draftJoin=ev.target.value;});
  document.addEventListener('click',async ev=>{
    const b=ev.target.closest('[data-a]');if(!b)return;
    if(ev.target.closest('[data-stop]')&&!b.closest('[data-stop]'))return;
    const a=b.dataset.a,v=b.dataset.v;
    if(a==='none')return;
    if(a==='close'){if(ev.target.closest('[data-stop]')&&!b.closest('[data-stop]'))return;S.sheet='';S.sheetError='';return render();}
    if(a==='back'){clearInvite();S.sheet='';return loadList();}
    if(a==='new'){S.sheet='create';S.sheetError='';S.limited=false;S.draftName='';S.draftPerson=nick();return render();}
    if(a==='limit'){S.limited=!S.limited;return render();}
    if(a==='months'){S.months=Number(v);return render();}
    if(a==='open')return open(v);
    if(a==='asks'){S.sheet='asks';return render();}
    if(a==='pick'&&S.info?.role==='모임장'){S.sheet='pick';S.sheetError='';return render();}
    if(a==='setbook'&&S.info?.role==='모임장'){
      return busy(async()=>{await kApi('community_book',{p_id:S.id,p_book:v});S.info=await kApi('community_info',{p_id:S.id});S.sheet='';},'sheet');
    }
    if((a==='setep'||a==='next-ep')&&S.info?.role==='모임장'){
      const ep=a==='next-ep'?Number(S.info.ep||1)+1:Number(v);
      return busy(async()=>{await kApi('community_ep',{p_id:S.id,p_ep:ep});S.info=await kApi('community_info',{p_id:S.id});});
    }
    if(a==='oauth')return busy(async()=>window.KoideSb.oauth(v));
    if(a==='reset'){(await fake()).reset();clearInvite();return loadList();}
    if(a==='create'){
      const name=$v('create-name'),person=$v('create-person');
      return busy(async()=>{
      const res=await kApi('community_create',{p_name:name,p_person:person,p_months:S.limited?S.months:null});
      remember(person.trim());S.draftName='';S.draftPerson='';S.sheet='';await open(res.id);
    },'sheet'); }
    if(a==='join'){
      const person=$v('join-person');
      return busy(async()=>{
      const res=await kApi('community_join',{p_token:S.invite,p_person:person});
      remember(person.trim());S.draftJoin='';clearInvite();
      if(res.status==='함께')return open(res.id);
      S.page='waiting';
    },'join'); }
    if(a==='copy')return busy(async()=>{await navigator.clipboard.writeText(inviteUrl(S.info.token));S.msg='초대 링크를 복사했어요.';});
    if(a==='share')return busy(async()=>{try{await navigator.share({title:S.info.name,url:inviteUrl(S.info.token)});}catch(e){if(e.name!=='AbortError')throw e;}});
    if(a==='renew'){if(!confirm('새 링크를 만들면 예전 링크로는 들어올 수 없어요. 새로 만들까요?'))return;
      return busy(async()=>{const r=await kApi('community_renew',{p_id:S.id});S.info.token=r.token;S.info.expires=r.expires;S.msg='새 초대 링크를 만들었어요.';});}
    if(a==='approve'||a==='reject'){
      if(a==='reject'&&!confirm('함께하기 신청을 거절할까요?'))return;
      return busy(async()=>{await kApi('community_decide',{p_id:S.id,p_member:v,p_ok:a==='approve'});
        S.info=await kApi('community_info',{p_id:S.id});S.sheet=S.info.asks?.length?'asks':'';S.msg=a==='approve'?'함께하기를 승인했어요.':'신청을 거절했어요.';},'sheet');
    }
  });
  init();
})();
