// 계정 탈퇴(공동체 앱: 더보기 › 앱 설정 › 계정과 동기화 › 계정 탈퇴)의 서버 부르기와 문구. 화면 그리기는 index.html이 하고, 글은 모두 이 파일 한 곳에 둔다(2026-11-20, 코이데 app/account-delete.js를 본떴다).
//  서버 함수는 코이데 supabase/029(account_delete_check·account_delete)와 033이다. 디다코와 코이데는 같은 계정을 써서 한 번에 함께 지워진다.
//  디다코 쪽 요약은 디다코 supabase/008·010의 didako_account_check가 will.didako에 싣는다(noteVault·communities·leaderOf·church{link, admin}).
//  rpc는 DidakoSb.rpc 모양(rpc(이름, 인자) → 값, 실패하면 {code, message}를 던진다)을 넘겨 받는다.
window.DidakoAcctDel = (() => {
  // 탈퇴가 끝나면 index.html이 localStorage에 이 이름의 표시({h} 글자. 계정을 모르면 '1')를 남긴다. 디다코 노트(note/index.html)가 다음에 열릴 때 이 기기에 남은 그 계정의 노트를 지운다
  const wipeHint = 'didako-wipe-note';
  // 지워지기 전 요약. 막힘이 있으면 {ok:false, blockers:[{code,msg}]}, 없으면 {ok:true, will, lines}
  async function check(rpc) {
    const r = await rpc('account_delete_check');
    if (!r || r.ok === false) return { ok: false, blockers: (r && r.blockers) || [] };
    return { ok: true, will: r.will || {}, lines: lines(r.will || {}) };
  }
  // 지워지는 것 목록(글만. 화면에서 esc를 거친다). 서버가 알려 준 칸만 쓴다: 칸이 없는 옛 서버여도 돈다
  function lines(will) {
    const w = will || {}, d = w.didako || {}, out = [];
    if (d.noteVault) out.push('서버에 맡긴 디다코 노트 보관함');
    if (d.communities > 0) out.push('디다코 공동체 ' + d.communities + '곳에서 나가요' + (d.leaderOf > 0 ? ' (그중 ' + d.leaderOf + '곳은 모임장이에요)' : ''));
    const c = d.church || {};
    if (c.link === '연결') out.push('사랑방 연결이 풀려요(명단의 이름은 교회가 정한 것이라 교회에 남아요)');
    else if (c.link === '요청') out.push('사랑방 연결 요청이 취소돼요');
    if (c.admin) out.push('교회 관리자 자리가 없어져요');
    // 같은 계정으로 코이데도 쓰고 있다면 코이데 기록도 함께 지워진다
    if (w.noteVault) out.push('서버에 맡긴 코이데 노트 보관함');
    if (w.communities > 0) out.push('코이데 공동체 ' + w.communities + '곳에서 나가요' + (w.leaderOf > 0 ? ' (그중 ' + w.leaderOf + '곳은 모임장이에요)' : ''));
    if (w.church) {
      const m = w.churchMode;
      if (m === 'erase') out.push('코이데 ' + w.church + ' 가정 기록(우리 가정의 기도제목 포함)');
      else if (m === 'name') out.push('코이데 ' + w.church + ' 가정에서 내 이름만 빠져요(가정 기도제목은 남아요)');
      else if (m === 'request') out.push('코이데 ' + w.church + ' 가정 연결 요청이 취소돼요');
    }
    if (w.apply === '대기') out.push('코이데 교회 신청서가 취소되고 적어 주신 내용이 지워져요');
    else if (w.apply === '만듦') out.push('신청한 코이데 교회는 이미 만들어졌어요. 탈퇴하면 그 교회의 첫 관리자가 비어요. 먼저 앱에서 첫 관리자로 시작하세요');
    out.push('이 휴대폰에 저장된 이 계정의 디다코 노트');
    return out;
  }
  // 막힘 이유(서버 글) 아래에 보여 줄 할 일. 코드는 코이데 029 account_blockers의 code 값
  function todo(code) {
    return {
      church_admin: '다른 교회 관리자에게 관리자에서 빼 달라고 부탁해 주세요.',
      last_admin: '교회 전체 › 교회 관리자 초대로 한 분을 더 세운 뒤 해 주세요.',
      app_admin: '앱 운영자(koinobia.admin@gmail.com)에게 알려 주세요.'
    }[code] || '';
  }
  // 탈퇴. 확인 글은 서버도 검사한다
  const run = (rpc, text) => rpc('account_delete', { p_confirm: text });
  return { check, lines, todo, run, wipeHint };
})();
