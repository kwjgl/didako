// 예시 데이터만 쓰는 공동체 데모. 장면 주소는 이 창에서만 변경하고 기기에 남기지 않는다.
window.didakoCommunityDemo = (() => {
  const q = new URLSearchParams(location.search), scene = q.get('as') || '';
  const key = 'didako-demo-community', transient = !!scene;
  const err = msg => { throw { code: 'bad', message: msg }; };
  const day = () => new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  const date = d => [d.getFullYear(), String(d.getMonth()+1).padStart(2,'0'), String(d.getDate()).padStart(2,'0')].join('-');
  const add = (m, d = day()) => {
    const k = d.getDate(); d.setDate(1); d.setMonth(d.getMonth() + m);
    d.setDate(Math.min(k, new Date(d.getFullYear(), d.getMonth()+1, 0).getDate()));
    return date(d);
  };
  const id = () => Math.random().toString(36).slice(2) + Date.now().toString(36);
  const token = () => id().replace(/[^a-z0-9]/g, '') + id();
  const me = '새봄';
  let memory = null;
  const seeds = () => {
    const c1 = {id:'demo-a', name:'금요 말씀 모임',book:'mark-1',ep:3,months:null,endsOn:null,state:'열림',token:token(),expires:new Date(Date.now()+7*864e5).toISOString(),
      members:['새봄','가람','나래','다온','보람','하늘'].map((n,i)=>({id:'a-'+i,name:n,role:i?'회원':'모임장',own:!i,status:'함께',at:new Date(Date.now()-i*864e5).toISOString()}))
        .concat(['이슬','한결'].map((n,i)=>({id:'ask-'+i,name:n,role:'회원',own:false,status:'요청',at:new Date(Date.now()-i*864e5).toISOString()})))};
    const c2 = {id:'demo-b',name:'대학 동기 모임',book:null,ep:1,months:3,endsOn:add(3),state:'열림',token:token(),expires:new Date(Date.now()+7*864e5).toISOString(),
      members:['다온','새봄','유진','지우'].map((n,i)=>({id:'b-'+i,name:n,role:i?'회원':'모임장',own:n===me,status:'함께',at:new Date(Date.now()-i*864e5).toISOString()}))};
    const c3 = {id:'demo-c',name:'동네 이웃 모임',book:null,ep:1,months:null,endsOn:null,state:'열림',token:token(),expires:new Date(Date.now()+7*864e5).toISOString(),
      members:[{id:'c-0',name:'현우',role:'모임장',status:'함께',own:false,at:new Date().toISOString()}]};
    const data={rooms:[c1,c2,c3],last:''};
    if(scene==='empty')data.rooms=[];
    if(scene==='full') c3.members.push({id:'c-me',name:me,role:'회원',status:'요청',own:true,at:new Date().toISOString()});
    if(scene==='invite'||scene==='expired'){
      data.rooms=[c3];
      if(scene==='expired')c3.expires=new Date(Date.now()-864e5).toISOString();
      data.invite=c3.token;
    }
    return data;
  };
  function read() {
    if (memory) return memory;
    try { if(!transient) memory=JSON.parse(localStorage.getItem(key)||'null'); }catch(e) {/* 새로 */}
    return memory || (memory=seeds());
  }
  function save(d) {memory=d;if(!transient)try{localStorage.setItem(key,JSON.stringify(d));}catch(e){/* 메모리만 */}}
  function reset(){memory=seeds();if(!transient)try{localStorage.removeItem(key)}catch(e){};return memory;}
  const norm = s => String(s||'').trim().replace(/\s+/g,' ');
  const live = c => c.state==='열림'&&(!c.endsOn||c.endsOn>=date(day()));
  const own = c => c.members.find(m=>m.own);
  const count = c => c.members.filter(m=>m.status==='함께').length;
  const used = d => d.rooms.filter(c=>live(c)&&!!own(c)).length;
  function room(d,p_id){const c=d.rooms.find(x=>x.id===p_id);if(!c)err('공동체를 찾을 수 없어요.');return c;}
  function lead(c){if(!own(c)||own(c).role!=='모임장'||own(c).status!=='함께'||!live(c))err('모임장만 할 수 있어요.')}
  function peek(d,t){
    const c=d.rooms.find(x=>x.token===t);
    if(!c||Date.parse(c.expires)<=Date.now()||!live(c))err('이 초대 링크는 쓸 수 없어요. 모임장에게 새 링크를 받아 주세요.');
    return c;
  }
  async function call(name,a={}){
    const d=read();let c,m,n;
    switch(name) {
      case 'community_mine': {
        const list=d.rooms.filter(c=>own(c)).map(c=>({id:c.id,name:c.name,role:own(c).role,status:own(c).status,n:count(c),
          endsOn:c.endsOn,state:c.state==='열림'&&c.endsOn<date(day())?'끝남':c.state,
          asks:own(c).role==='모임장'?c.members.filter(m=>m.status==='요청').length:0}));
        return {list,places:Math.max(0,3-used(d))};
      }
      case 'community_create':
        n=norm(a.p_name);m=norm(a.p_person);
        if(n.length<1||n.length>16||m.length<1||m.length>10)err('공동체 이름은 1~16자, 내 이름은 1~10자로 적어 주세요.');
        if(a.p_months!=null&&![1,3,6,12].includes(Number(a.p_months)))err('끝나는 날은 1·3·6·12개월 중에서 골라 주세요.');
        if(used(d)>=3)err('디다코 공동체는 세 곳까지 함께할 수 있어요. 다른 곳에서 나온 뒤 신청해 주세요.');
        c={id:id(),name:n,book:null,ep:1,months:a.p_months==null?null:Number(a.p_months),endsOn:a.p_months==null?null:add(Number(a.p_months)),
          state:'열림',token:token(),expires:new Date(Date.now()+7*864e5).toISOString(),
          members:[{id:id(),name:m,role:'모임장',status:'함께',own:true,at:new Date().toISOString()}]};
        d.rooms.push(c);save(d);return {id:c.id,token:c.token,expires:c.expires};
      case 'community_peek':
        c=peek(d,a.p_token);return {name:c.name,lead:c.members.find(m=>m.role==='모임장')?.name||'',n:count(c),
          max:12,endsOn:c.endsOn,used:used(d),mine:own(c)?.status||null};
      case 'community_join':
        c=peek(d,a.p_token);if(own(c))return {id:c.id,status:own(c).status};
        m=norm(a.p_person);if(m.length<1||m.length>10)err('내 이름을 1~10자로 적어 주세요.');
        if(used(d)>=3)err('디다코 공동체는 세 곳까지 함께할 수 있어요. 다른 곳에서 나온 뒤 신청해 주세요.');
        c.members.push({id:id(),name:m,role:'회원',status:'요청',own:true,at:new Date().toISOString()});
        save(d);return {id:c.id,status:'요청'};
      case 'community_info':
        c=room(d,a.p_id);m=own(c);if(!m||m.status!=='함께')err('이 공동체를 볼 수 없어요.');
        return {id:c.id,name:c.name,role:m.role,book:c.book??null,ep:c.ep??1,endsOn:c.endsOn,months:c.months,
          state:c.state==='열림'&&c.endsOn<date(day())?'끝남':c.state,
          members:c.members.filter(x=>x.status==='함께').map(x=>({id:x.id,name:x.name,role:x.role,own:x.own})),
          asks:m.role==='모임장'?c.members.filter(x=>x.status==='요청').map(x=>({id:x.id,name:x.name,at:x.at})):null,
          token:m.role==='모임장'?c.token:null,expires:m.role==='모임장'?c.expires:null};
      case 'community_book':
        c=room(d,a.p_id);lead(c);
        if(a.p_book!=null&&!(window.WALKS||[]).some(w=>w.id===a.p_book))err('그 책은 없어요.');
        c.book=a.p_book??null;c.ep=1;save(d);return {ok:true};
      case 'community_ep':
        c=room(d,a.p_id);lead(c);
        const w=(window.WALKS||[]).find(w=>w.id===c.book);
        n=Number(a.p_ep);
        if(!w||!Number.isInteger(n)||n<1||n>w.eps.length)err('그 편은 없어요.');
        c.ep=n;save(d);return {ok:true};
      case 'community_decide':
        c=room(d,a.p_id);lead(c);m=c.members.find(x=>x.id===a.p_member&&x.status==='요청');
        if(!m)err('승인 요청을 찾을 수 없어요.');
        if(a.p_ok){if(count(c)>=12)err('12명이 다 찼어요.');m.status='함께';}
        else c.members=c.members.filter(x=>x!==m);
        save(d);return {ok:true};
      case 'community_remove':
        c=room(d,a.p_id);lead(c);m=c.members.find(x=>x.id===a.p_member&&!x.own);
        if(!m)err('이 사람을 내보낼 수 없어요.');c.members=c.members.filter(x=>x!==m);save(d);return {ok:true};
      case 'community_rename':
        c=room(d,a.p_id);lead(c);n=norm(a.p_name);if(n.length<1||n.length>16)err('이름은 1~16자로 적어 주세요.');
        c.name=n;save(d);return {ok:true};
      case 'community_renew':
        c=room(d,a.p_id);lead(c);c.token=token();c.expires=new Date(Date.now()+7*864e5).toISOString();
        save(d);return {token:c.token,expires:c.expires};
      default:err('아직 이 기능은 없어요.');
    }
  }
  return {call,reset,scene,initialInvite:()=>read().invite||'',seedToken:()=>read().rooms[0]?.token||''};
})();
