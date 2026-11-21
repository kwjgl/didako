// 디다코 교회(Supabase)의 응답을 디다코 교회 화면(index.html)이 아는 옛 Apps Script 모양으로 바꾼다(코이데 app/church-api.js와 같은 방식, 3단계-1).
// CHURCH_BACKEND가 'supabase'일 때만 index.html이 부른다(app/config.js, docs/setup.md 3-6, 3-7). 서버 함수는 supabase/009_didako_church_core.sql(앱 함수 12개)과
// supabase/011_didako_church_book.sql(교재와 배포, 앱 함수 8개), 012(관리), 013(연도 개편·옮기기·합치기), 014(기록과 요청)이다.
// 옛 응답 모양은 apps-script/Code.js의 start_·me_·roomsWithFamilies_·deptsWithRooms_·requestLink_·pendingView_·decide_·approveAll_·unlink_·setupAdmin_·booksView_
//  ·bookSave_·bookClose_·bookCopy_·basicImport_·lessonSave_·lessonStatus_·lessonDelete_다.
//   액션 → 서버 함수(화면이 부르는 이름 그대로)
//   start · me → didako_ch_me (+ 연결 전이면 didako_ch_depts: 부서·사랑방 목록과 초대 링크가 가리키는 곳)
//   rooms → didako_ch_depts
//   requestLink → didako_ch_link_staff(교역자) · didako_ch_link_new(새로 왔어요) · didako_ch_link_name(이름 써서 찾기) · didako_ch_link_pick(목록에서 고르기) 뒤 didako_ch_me
//   pending · approve · reject · approveAll · unlink → didako_ch_pending · didako_ch_decide · didako_ch_approve_all · didako_ch_unlink
//   setupAdmin → didako_ch_admin_accept 뒤 didako_ch_me (설치 코드 = SQL Editor의 didako_ch_setup_invite가 준 값)
//   applyState·applySend·applyCancel·applyClaim(교회 신청, 2026-11-20) → church_apply_open·church_apply_mine · church_apply_send(p_app 'didako') · church_apply_cancel · didako_ch_apply_claim(supabase/021)
//   where(옛 기본 서버가 하던 "내 교회 찾기") → didako_ch_me의 교회 소속 · join(옛 기본 서버의 교회 코드로 들어가기) → church_join(코이데 공용 함수)
//   logout → DidakoSb.signOut(로그인 세션을 끊는다. 노트·공동체도 같은 세션이라 함께 로그아웃된다)
//   books → didako_ch_books_view (보는 사람에 맞게 서버가 걸러서 준다: 회원은 '모두' 과만 리더 칸·진행 안내 없이, 쓰는 사람은 준비 중·보관까지)
//   bookSave → didako_ch_book_save · bookClose → didako_ch_book_close · bookCopy → didako_ch_book_copy · basicImport → didako_ch_basic_import
//   lessonSave → didako_ch_lesson_save · lessonStatus → didako_ch_lesson_status · lessonDelete → didako_ch_lesson_delete
//   baseList(새 길에만 있는 일) → didako_base_list(supabase/005·007, 디다코 공동체와 같은 함수): 디다코 기본 교재 가져오기 목록이 앱 관리자의 숨김·삭제·고친 판을 따르게 한다
//   관리 화면(3단계-4가, supabase/012): adCtx → didako_ch_ops_ctx · adRoster → didako_ch_roster · adPending → didako_ch_pending(부서) · adInvites → didako_ch_invites
//    · adDecide·adApproveAll·adUnlink → didako_ch_decide·approve_all·unlink(부서) · adRoomSave → didako_ch_room_save · adPersonAdd·adPeopleAdd → didako_ch_person_add·people_add
//    · adRole·adMove·adLeave·adUnleave·adAdminFlag → didako_ch_roster_role·move·leave·unleave·admin · adRoleSet(교재 담당) → didako_ch_role_set
//    · adInviteRenew → didako_ch_invite_renew · adStaffSave·adStaffEnd → didako_ch_staff_save·end · adGroup → didako_ch_group_name
//    · adOverview → didako_ch_overview · adDeptSave·adDeptState → didako_ch_dept_save·dept_state · adAdminInvite·adAdminRemove → didako_ch_admin_invite·admin_remove
//    · adRooms(사랑방 전체 보기) → didako_ch_dept_rooms. 관리 액션은 옛 Apps Script에 없던 새 이름이라 응답을 바꾸지 않고 서버 모양 그대로 돌려준다(index.html adlApply…가 읽는다)
//   연도 개편·부서 옮기기·결혼 합치기(3단계-4나, supabase/013): adReorg·adReorgSave·adReorgCancel → didako_ch_reorg·reorg_save·reorg_cancel
//    · adFind(합칠·옮길 사람 찾기) → didako_ch_dept_find · adDeptMove·adMoveUndo·adMoveRecent → didako_ch_dept_move·dept_move_undo·move_recent
//    · adMoveView(교회 전체의 가정 다른 부서로 보내기 목록) → didako_ch_move_view · adMarry·adMarryUndo·adMarryRecent → didako_ch_marry_save·marry_undo·marry_recent
//   기록과 요청(3단계-4다, supabase/014): adChanges → didako_ch_changes(부서, all이면 교회 전체) · adOpsView → didako_ch_ops_view(앱 상태·개인정보 요청·의견함) · adAppStatus → didako_ch_app_status(교회 전체의 앱 상태, 020)
//    · lessonOpen(연결된 사람이 과를 펼쳤다고 알림, 분석의 "이번 과를 연 사람" 합계용, supabase/019) → didako_ch_lesson_open
//    · adFeedbackRead → didako_ch_feedback_read · adEraseFamily·adKeepFamily → didako_ch_erase_family·keep_family · adAnalysis → didako_ch_analysis(명단 숫자만)
//    · feedbackSend(더보기 › 의견 보내기) → didako_ch_feedback_send · eraseAsked·eraseRequest → didako_ch_erase_asked·erase_request · churchLeave → didako_ch_leave
//    (eraseAsked·eraseRequest는 더보기 사랑방 카드 아래 "기록 지우기 요청" 줄이 쓴다(2026-11-19). churchLeave는 서버만 있고 화면 단추는 두지 않는다: 코이데도 단추가 없다.
//     서버의 교회 나가기(015)는 나가는 사람의 명단 이름·연결을 바로 지우고, 디다코 노트는 지우지 않는다)
//   잇지 않은 액션은 '아직 쓸 수 없는 기능' 오류(화면은 토스트로 알린다)
// 옛 응답과 다른 곳: ① approve·reject·approveAll·unlink의 body.kakaoId(와 응답 속 requests[].kakaoId·families[].linked[].kakaoId)는 이제
//   연결 줄의 id(uuid)다(옛 서버는 카카오 회원번호). 화면은 data-k를 그대로 넘기고, 내 연결인지 비교하는 me.kakaoId도 내 연결 줄의 id로 맞춘다
//   ② 시험 교회(종류 '테스트')는 연결 요청이 바로 연결된다(옛 시험 서버 AUTO_APPROVE와 같다)
//   ③ me.roles(교재 담당)는 빈 배열, me.version은 없다(교재 담당 맡은 일은 3-4에서 그 표와 함께 잇는다) ④ 서버 스위치가 꺼졌을 때의 글은 '코이데 교회' 대신 '디다코 교회'로 바꿔 보인다
//   ⑤ 로그인은 카카오 REST가 아니라 Supabase 로그인(DidakoSb)이다. hub의 login·ticketLogin은 부르지 않는다
//   ⑥ 교재 id는 옛 서버의 'B…' 글이 아니라 uuid다(화면은 id를 그대로 넘기고 주소 조각으로만 쓴다). 교재·과를 만들고 고친 기록(변경 기록)은 3-4에서 남긴다
//   ⑦ 서버가 막는 말(권한 없음·못 찾음 등)은 옛 'forbidden'·'notfound' 코드가 아니라 모두 code 'bad'와 쉬운 글로 온다(화면은 글만 토스트로 보인다)
window.didakoChurchApi = (() => {
  const SOON = '교회 새 서버에서는 아직 쓸 수 없는 기능이에요. 곧 열려요.';
  const err = (code, message) => ({ code, message });
  const rpc = (name, args) => window.DidakoSb.rpc(name, args || {});
  const str = v => String(v == null ? '' : v);   // 서버에서 온 이름 글은 문자열로만 다듬는다(화면이 esc()를 거쳐 그린다)
  const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const uuid = (v, msg) => { if (!UUID.test(str(v))) throw err('bad', msg); return str(v); };
  const deptOf = v => (v == null || v === '' ? null : uuid(v, '대상 부서를 다시 골라 주세요.'));   // 대상 부서: 비우면 교회 전체
  const dept = b => uuid(b.dept, '맡은 부서가 아니에요.');   // 관리 화면이 보고 있는 부서
  const fam = b => uuid(b.fam, '지금 편성에서 찾지 못했어요.');   // 가정
  const lessonNo = v => { const n = Number(v); if (!Number.isInteger(n) || n < 1) throw err('bad', '과를 찾지 못했어요.'); return n; };
  // 디다코 교재 목록(didako_base_list의 줄: {id, data, hidden, removed})을 가져오기 목록이 쓰는 모양으로 바꾼다.
  // 공동체의 cm-api.js toBase와 같은 규칙이다: data가 있는 줄은 앱 관리자가 고친 판, data 없이 hidden이면 숨김, removed면 삭제. 모르는 칸은 버리고 글은 문자열로만 다듬는다(화면이 esc()를 거쳐 그린다)
  const isObj = v => !!v && typeof v === 'object' && !Array.isArray(v);
  const arr = v => (Array.isArray(v) ? v : []);
  const bid = v => (/^[a-z0-9][a-z0-9-]{0,63}$/.test(str(v)) ? str(v) : '');
  const qid = (v, d) => (/^[A-Za-z0-9_-]{1,64}$/.test(str(v)) ? str(v) : d);
  const vsOf = v => arr(v).map(str).slice(0, 20);
  function baseQ(q, d) {
    const o = { id: qid(q.id, d), t: str(q.t), vs: vsOf(q.vs) };
    if (q.kind === 'read') { o.kind = 'read'; o.h = str(q.h); } else { o.sub = str(q.sub); o.lead = str(q.lead); }
    // 읽을 글의 앱 파일 그림 칸(D-74): 그대로 들고 온다. 그릴 때(readImages)와 교회 서버(018)가 규칙으로 다시 거른다
    if (o.kind === 'read' && Array.isArray(q.imgs)) o.imgs = q.imgs.filter(isObj).slice(0, 6);
    return o;
  }
  function baseOf(rows) {
    const out = { hidden: [], removed: [], shown: [], books: [], guides: {} };
    arr(rows).filter(isObj).forEach(row => {
      const id = bid(row.id);
      if (!id) return;
      if (row.hidden === true) out.hidden.push(id);
      if (row.removed === true) out.removed.push(id);
      if (row.hidden === false && row.removed !== true) out.shown.push(id);   // 공개했거나 고친 교재(앱 파일의 "처음엔 숨김" 교재는 이 줄이 있어야 보인다)
      if (!isObj(row.data)) return;
      const d = row.data, cv = isObj(d.cover) ? d.cover : {}, gm = isObj(d.guides) ? d.guides : {};
      const lessons = arr(d.lessons).filter(isObj).slice(0, 100).map(L => ({ no: Number(L.no), name: str(L.name), ref: str(L.ref), intro: str(L.intro), body: str(L.body), wrap: str(L.wrap) }))
        .filter(L => Number.isInteger(L.no) && L.no >= 1 && L.no <= 999);
      out.books.push({ id, title: str(d.title), kind: str(d.kind) || 'GBS', coverName: str(d.coverName), range: str(d.range), lessons,
        cover: { motif: /^[a-z0-9-]{1,32}$/.test(str(cv.motif)) ? str(cv.motif) : 'cord', color: /^[a-z0-9-]{1,32}$/.test(str(cv.color)) ? str(cv.color) : 'paper' } });
      lessons.forEach(L => {
        const g = isObj(gm[L.no]) ? gm[L.no] : null;
        if (!g) return;
        out.guides[id + ':' + L.no] = { guide: str(g.guide),
          stages: arr(g.stages).filter(isObj).slice(0, 30).map((st, i) => ({ name: str(st.name), qs: arr(st.qs).filter(isObj).slice(0, 100).map((q, j) => baseQ(q, 'q' + L.no + '-' + i + '-' + j)) })),
          triple: arr(g.triple).filter(isObj).slice(0, 6).map((t, i) => ({ id: qid(t.id, 't' + L.no + '-' + i), who: str(t.who), t: str(t.t) })) };
      });
    });
    return out;
  }
  // 이름은 로그인 계정의 표시 이름(user_metadata)에서 고른다. 서버는 auth.users를 읽지 않는다. 비어도 된다
  const nameOf = s => { const m = (s && s.user && s.user.user_metadata) || {}; return str(m.name || m.full_name || m.nickname || m.preferred_username).trim(); };
  async function ident() { const s = await window.DidakoSb.session(); return { nick: nameOf(s), uid: s && s.user ? s.user.id : '' }; }
  // didako_ch_me의 {church, ops, link}를 화면이 아는 옛 me 모양(meInfo_와 같은 모양)으로 편다
  async function meOf(r) {
    r = r || await rpc('didako_ch_me');
    const id = await ident(), L = r.link || null;
    const me = { nick: id.nick, uid: id.uid, church: r.church || null, ops: r.ops || null, roles: [],
      link: L ? { status: str(L.status), familyId: L.familyId, person: str(L.person), since: str(L.since) } : null };
    if (L && (L.status === '요청' || L.notLinked)) { me.familyName = str(L.familyName); me.staff = !!L.staff; }   // 기다리는 화면이 읽는다
    if (L && L.notLinked) me.notLinked = str(L.notLinked);                                                    // 연결은 됐지만 아직 들어올 수 없는 까닭
    if (L && L.status === '연결' && !L.notLinked) Object.assign(me, { kakaoId: str(L.linkId), person: str(L.person), familyId: L.familyId,
      roomId: L.roomId || '', roomName: str(L.roomName), deptId: L.deptId || '', dept: L.dept || null, role: str(L.role) || '회원', admin: !!L.admin });   // 옛 memberFrom_ 모양
    if (L && L.status === '연결' && !L.notLinked && L.staff) Object.assign(me, { staff: true, label: str(L.label) });
    return me;
  }
  // 서버가 값으로 알리는 실패({ok:false, code, message})를 화면이 아는 오류로 바꿔 던진다
  const okOrThrow = (r, msg) => { if (!r || r.ok === false) throw err((r && r.code) || 'bad', (r && r.message) || msg); return r; };
  // 부서·사랑방·가정 이름은 문자열로만 다듬는다. 서버가 준 모양({depts, join})을 옛 응답 모양(depts 목록과 join)으로 나눈다
  const deptsOf = r => (Array.isArray(r && r.depts) ? r.depts : []).map(d => ({ id: d.id, name: str(d.name), group: str(d.group) || '사랑방', unit: d.unit === '개인' ? '개인' : '가정', closed: !!d.closed,
    hasStaff: !!d.hasStaff, rooms: (Array.isArray(d.rooms) ? d.rooms : []).map(x => Object.assign({ id: x.id, name: str(x.name), deptId: x.deptId },
      Array.isArray(x.families) ? { families: x.families.map(f => ({ id: f.id, name: str(f.name) })) } : {})) }));
  const joinOf = r => (r && r.join ? (r.join.bad ? { bad: true } : { deptId: r.join.deptId, roomId: r.join.roomId || '' }) : undefined);
  async function start(body) {
    const me = await meOf();
    if (me.link) return { me };   // 연결 중이거나 요청 중이면 나만(연결은 됐지만 올해 편성에 없는 사람의 까닭도 me.notLinked에 담겨 온다)
    if (!me.church) throw err('bad', '먼저 교회 코드로 교회에 들어가 주세요.');
    const r = await rpc('didako_ch_depts', body && body.join ? { p_token: str(body.join) } : {});
    return { me, depts: deptsOf(r), join: joinOf(r) };
  }
  async function handle(body) {
    switch (body.action) {
      case 'start': return start(body);
      case 'me': return meOf();
      case 'rooms': return deptsOf(await rpc('didako_ch_depts')).flatMap(d => d.rooms);
      // 옛 기본 서버가 하던 일: 내 교회 찾기(이미 코드로 들어와 있으면 교회를 알려 주고, 없으면 church가 null)
      case 'where': { const r = await rpc('didako_ch_me'); return { church: r.church ? { id: r.church.id, name: str(r.church.name), kind: str(r.church.kind) } : null }; }
      // 옛 기본 서버의 교회 코드로 들어가기: 못 찾은 코드는 예외가 아니라 값으로 온다(예외면 서버가 틀린 횟수를 되돌린다). 여기서 오류로 바꿔 던진다
      case 'join': {
        const r = await rpc('church_join', { p_code: str(body.code) });
        okOrThrow(r, '맞는 교회 코드가 없어요. 받은 코드를 다시 확인해 주세요.');
        return { church: { id: r.church.id, name: str(r.church.name), kind: str(r.church.kind) } };
      }
      // 교회 신청(코이데 035·043, 디다코 021). applyState는 던지지 않는다(교회 코드 화면은 이 값이 없어도 지금 모양 그대로 그려진다): 신청을 받는지(open)와 내 신청(mine), 로그인 이름(nick)
      case 'applyState': {
        let open = false, mine = null;
        try { open = !!(await rpc('church_apply_open')); } catch (e) { open = false; }
        try { const r = await rpc('church_apply_mine'); mine = (r && r.apply) || null; } catch (e) { mine = null; }
        return { open, mine, nick: (await ident()).nick };
      }
      case 'applySend': return rpc('church_apply_send', { p_region: str(body.region), p_name: str(body.name), p_denom: str(body.denom), p_pastor: str(body.pastor),
        p_contact: str(body.contact), p_size: str(body.size), p_site: str(body.site), p_agree: body.agree === true, p_app: 'didako' });
      case 'applyCancel': return rpc('church_apply_cancel');
      // 신청한 교회가 만들어진 뒤 [첫 관리자로 시작하기]: 같은 거래에서 디다코 교회 관리자가 되고 교회에 들어간다. 끝나면 나의 정보를 돌려준다(설치 코드와 같다)
      case 'applyClaim': {
        okOrThrow(await rpc('didako_ch_apply_claim', { p_name: str(body.name) }), '시작하지 못했어요. 잠시 뒤에 다시 해 주세요.');
        return meOf();
      }
      case 'requestLink': {
        let r;
        if (body.staff) r = await rpc('didako_ch_link_staff', { p_dept: uuid(body.deptId, '부서를 다시 골라 주세요.'), p_person: str(body.person) });
        else if (body.newFamily) { const f = body.newFamily; r = await rpc('didako_ch_link_new', { p_room: uuid(body.roomId, '이름과 사랑방을 확인해 주세요.'), p_a: str(f.a), p_b: str(f.b), p_kids: str(f.kids) }); }
        else if (body.byName) r = await rpc('didako_ch_link_name', { p_room: uuid(body.roomId, '소그룹을 다시 골라 주세요.'), p_person: str(body.person) });
        else r = await rpc('didako_ch_link_pick', { p_family: uuid(body.familyId, '가정과 사람을 다시 골라 주세요.'), p_person: str(body.person) });
        okOrThrow(r, '신청하지 못했어요.');
        return meOf(r.me);
      }
      case 'pending': return rpc('didako_ch_pending');
      case 'approve': case 'reject': return rpc('didako_ch_decide', { p_link: uuid(body.kakaoId, '요청을 찾지 못했어요.'), p_ok: body.action === 'approve' });
      case 'approveAll': return rpc('didako_ch_approve_all', { p_links: (Array.isArray(body.kakaoIds) ? body.kakaoIds : []).filter(x => UUID.test(str(x))).map(str) });
      case 'unlink': return rpc('didako_ch_unlink', { p_link: uuid(body.kakaoId, '연결을 찾지 못했어요.') });
      case 'setupAdmin': {
        okOrThrow(await rpc('didako_ch_admin_accept', { p_token: str(body.code), p_name: str(body.name) }), '설치 코드를 쓸 수 없어요.');
        return meOf();
      }
      // 교재와 배포(3단계-2): 서버(011)가 옛 응답 모양 그대로 돌려준다. 빠진 열쇠만 채운다
      case 'books': {
        const r = await rpc('didako_ch_books_view') || {};
        return { books: Array.isArray(r.books) ? r.books : [], guides: r.guides && typeof r.guides === 'object' && !Array.isArray(r.guides) ? r.guides : {},
          hold: Array.isArray(r.hold) ? r.hold : [], writer: r.writer === true, depts: Array.isArray(r.depts) ? r.depts : [] };
      }
      // 교재 만들기·고치기. 대상 부서 ''는 교회 전체(null). body.deptId를 보내지 않으면 고칠 때 있던 대상 부서를 그대로 둔다(옛 bookSave_와 같다)
      case 'bookSave': {
        const id = body.id == null || body.id === '' ? null : uuid(body.id, '교재를 찾지 못했어요.');
        const deptSet = body.deptId !== undefined && body.deptId !== null;
        return rpc('didako_ch_book_save', { p_id: id, p_title: str(body.title), p_kind: str(body.kind), p_dept: deptSet ? deptOf(body.deptId) : null, p_dept_set: deptSet,
          p_meta: { cover: body.cover, coverName: body.coverName, range: body.range, period: body.period, start: body.start } });   // 보내지 않은 칸(undefined)은 빠져서 서버가 있던 값을 지킨다
      }
      case 'bookClose': return rpc('didako_ch_book_close', { p_id: uuid(body.id, '교재를 찾지 못했어요.'), p_closed: body.closed !== false });
      case 'bookCopy': return rpc('didako_ch_book_copy', { p_id: uuid(body.id, '교재를 찾지 못했어요.') });
      case 'basicImport': return rpc('didako_ch_basic_import', { p_dept: deptOf(body.deptId), p_book: body.book && typeof body.book === 'object' ? body.book : {}, p_lessons: Array.isArray(body.lessons) ? body.lessons : [] });
      case 'lessonSave': return rpc('didako_ch_lesson_save', { p_book: uuid(body.bookId, '교재를 찾지 못했어요.'), p_no: body.no == null || body.no === '' ? null : lessonNo(body.no),
        p_lesson: body.lesson && typeof body.lesson === 'object' ? body.lesson : null });
      case 'lessonStatus': return rpc('didako_ch_lesson_status', { p_book: uuid(body.bookId, '교재를 찾지 못했어요.'), p_no: lessonNo(body.no), p_status: str(body.status) });
      case 'lessonDelete': return rpc('didako_ch_lesson_delete', { p_book: uuid(body.bookId, '교재를 찾지 못했어요.'), p_no: lessonNo(body.no) });
      // 디다코 기본 교재 가져오기 목록: 앱 관리자가 서버에서 숨기거나 지운 교재와 고친 판(공동체와 같은 didako_base_list). 화면이 앱 파일 판과 맞춘다
      case 'baseList': return baseOf(await rpc('didako_base_list'));
      case 'logout': await window.DidakoSb.signOut(); return {};
      // 관리 화면(3단계-4가, supabase/012). dept는 보고 있는 부서 id, fam은 가정 id, link는 연결 줄 id, room은 사랑방 id(모두 uuid)
      case 'adCtx': return rpc('didako_ch_ops_ctx', { p_dept: body.dept ? uuid(body.dept, '맡은 부서가 아니에요.') : null });
      case 'adRoster': return rpc('didako_ch_roster', { p_dept: dept(body) });
      case 'adPending': return rpc('didako_ch_pending', { p_dept: dept(body) });
      case 'adInvites': return rpc('didako_ch_invites', { p_dept: dept(body) });
      case 'adDecide': return rpc('didako_ch_decide', { p_link: uuid(body.link, '요청을 찾지 못했어요.'), p_ok: body.ok === true, p_dept: dept(body) });
      case 'adApproveAll': return rpc('didako_ch_approve_all', { p_links: arr(body.links).filter(x => UUID.test(str(x))).map(str), p_dept: dept(body) });
      case 'adUnlink': return rpc('didako_ch_unlink', { p_link: uuid(body.link, '연결을 찾지 못했어요.'), p_dept: dept(body) });
      case 'adRoomSave': return rpc('didako_ch_room_save', { p_dept: dept(body), p_op: str(body.op), p_room: body.room ? uuid(body.room, '찾지 못했어요.') : null, p_name: str(body.name) });
      case 'adPersonAdd': return rpc('didako_ch_person_add', { p_dept: dept(body), p_room: uuid(body.room, '이름과 사랑방을 확인해 주세요.'), p_a: str(body.a), p_b: str(body.b), p_force: body.force === true });
      case 'adPeopleAdd': return rpc('didako_ch_people_add', { p_dept: dept(body), p_room: uuid(body.room, '이름과 사랑방을 확인해 주세요.'),
        p_people: arr(body.people).filter(isObj).slice(0, 60).map(x => ({ a: str(x.a), b: str(x.b) })) });
      case 'adRole': return rpc('didako_ch_roster_role', { p_dept: dept(body), p_household: fam(body), p_role: str(body.role) });
      case 'adMove': return rpc('didako_ch_roster_move', { p_dept: dept(body), p_household: fam(body), p_room: uuid(body.room, '옮길 곳을 골라 주세요.') });
      case 'adLeave': return rpc('didako_ch_roster_leave', { p_dept: dept(body), p_household: fam(body) });
      case 'adUnleave': return rpc('didako_ch_roster_unleave', { p_dept: dept(body), p_household: fam(body) });
      case 'adAdminFlag': return rpc('didako_ch_roster_admin', { p_dept: dept(body), p_household: fam(body), p_on: body.on === true });
      case 'adRoleSet': return rpc('didako_ch_role_set', { p_dept: dept(body), p_household: fam(body), p_role: str(body.role), p_on: body.on === true });
      case 'adInviteRenew': return rpc('didako_ch_invite_renew', { p_dept: dept(body), p_room: body.room ? uuid(body.room, '우리 부서 소그룹이 아니에요.') : null });
      case 'adStaffSave': return rpc('didako_ch_staff_save', { p_dept: dept(body), p_household: body.fam ? fam(body) : null, p_a: str(body.a), p_b: str(body.b), p_title: str(body.title) || '목사님', p_label: str(body.label) });
      case 'adStaffEnd': return rpc('didako_ch_staff_end', { p_dept: dept(body), p_household: fam(body) });
      case 'adGroup': return rpc('didako_ch_group_name', { p_dept: dept(body), p_group: str(body.group), p_rename: body.rename === true });
      case 'adOverview': return rpc('didako_ch_overview');
      // 부서 만들기·고치기와 닫기는 교회 전체 일이라 보고 있는 부서(dept)가 아니라 id로 고른다(id 없음 = 새 부서)
      case 'adDeptSave': return rpc('didako_ch_dept_save', { p_name: str(body.name), p_group: str(body.group), p_unit: str(body.unit), p_dept: body.id ? uuid(body.id, '부서를 찾지 못했어요.') : null });
      case 'adDeptState': return rpc('didako_ch_dept_state', { p_dept: uuid(body.id, '부서를 찾지 못했어요.'), p_close: body.close === true });
      case 'adAdminInvite': return rpc('didako_ch_admin_invite');
      case 'adAdminRemove': return rpc('didako_ch_admin_remove', body.token ? { p_token: str(body.token) } : { p_admin: uuid(body.id, '뺄 수 있는 사람이 아니에요.') });
      case 'adRooms': return rpc('didako_ch_dept_rooms', { p_dept: body.dept ? uuid(body.dept, '부서를 찾지 못했어요.') : null });
      // 연도 개편·부서 옮기기·결혼 합치기(3단계-4나, supabase/013)
      case 'adReorg': return rpc('didako_ch_reorg', { p_dept: dept(body) });
      case 'adReorgSave': return rpc('didako_ch_reorg_save', { p_dept: dept(body), p_start: str(body.start), p_leader_from: str(body.leaderFrom), p_member_from: str(body.memberFrom),
        p_rooms: arr(body.rooms).map(str).slice(0, 200),
        p_rows: arr(body.rows).filter(isObj).slice(0, 1000).map(x => (UUID.test(str(x.familyId)) ? { room: str(x.room), familyId: str(x.familyId), role: str(x.role) } : { room: str(x.room), name: str(x.name), role: str(x.role) })),
        p_leave: arr(body.leave).filter(x => UUID.test(str(x))).map(str), p_hold: arr(body.hold).filter(x => UUID.test(str(x))).map(str) });
      case 'adReorgCancel': return rpc('didako_ch_reorg_cancel', { p_dept: dept(body) });
      case 'adFind': return rpc('didako_ch_dept_find', { p_q: str(body.q).slice(0, 20) });
      case 'adDeptMove': return rpc('didako_ch_dept_move', { p_household: fam(body), p_room: uuid(body.room, '받는 사랑방을 골라 주세요.'), p_confirmed: body.ok === true });
      case 'adMoveUndo': return rpc('didako_ch_dept_move_undo', { p_household: fam(body) });
      case 'adMoveRecent': return rpc('didako_ch_move_recent', { p_dept: dept(body) });
      case 'adMoveView': return rpc('didako_ch_move_view');
      case 'adMarry': return rpc('didako_ch_marry_save', { p_old: arr(body.old).filter(x => UUID.test(str(x))).map(str).slice(0, 2), p_new_person: str(body.newPerson),
        p_name: str(body.name), p_room: uuid(body.room, '새 가정이 들어갈 사랑방을 골라 주세요.'), p_confirmed: body.ok === true, p_inherit: body.inherit !== false,
        p_links: arr(body.links).filter(x => isObj(x) && UUID.test(str(x.link))).slice(0, 20).map(x => ({ link: str(x.link), to: str(x.to) })) });
      case 'adMarryUndo': return rpc('didako_ch_marry_undo', { p_household: fam(body) });
      case 'adMarryRecent': return rpc('didako_ch_marry_recent', { p_dept: dept(body) });
      // 기록과 요청(3단계-4다, supabase/014)
      case 'adChanges': return rpc('didako_ch_changes', body.all === true ? { p_dept: null, p_all: true } : { p_dept: dept(body), p_all: false });
      case 'adOpsView': return rpc('didako_ch_ops_view', { p_dept: dept(body) });
      case 'adAppStatus': return rpc('didako_ch_app_status');   // 교회 전체 화면의 앱 상태(supabase/020): 전체 범위 교회 관리자만 서버 번호를 받는다
      case 'adFeedbackRead': return rpc('didako_ch_feedback_read', { p_dept: dept(body), p_id: uuid(body.id, '의견을 찾지 못했어요.'), p_read: body.read !== false });
      case 'adEraseFamily': return rpc('didako_ch_erase_family', { p_dept: dept(body), p_household: fam(body), p_name: str(body.name).slice(0, 40) });
      case 'adKeepFamily': return rpc('didako_ch_keep_family', { p_dept: dept(body), p_household: fam(body) });
      case 'lessonOpen': return rpc('didako_ch_lesson_open', { p_book: uuid(body.bookId, '교재를 찾지 못했어요.'), p_no: lessonNo(body.no) });
      case 'adAnalysis': return rpc('didako_ch_analysis', body.all === true ? { p_dept: null, p_all: true } : { p_dept: dept(body), p_all: false });
      case 'feedbackSend': return rpc('didako_ch_feedback_send', { p_kind: str(body.kind), p_text: str(body.text).slice(0, 500), p_named: body.named === true,
        p_ver: str(body.ver).slice(0, 20), p_width: str(body.width) });
      case 'eraseAsked': return rpc('didako_ch_erase_asked');
      case 'eraseRequest': return rpc('didako_ch_erase_request', { p_on: body.on === true });
      case 'churchLeave': return rpc('didako_ch_leave');
      default: throw err('bad', SOON);
    }
  }
  async function call(body) {
    try { return { ok: true, data: await handle(body || {}) }; }
    catch (e) {
      if (e && e.ok === false) return e;
      // 스위치가 꺼진 글은 코이데 글이라 디다코에 맞게 바꿔 보인다
      if (!(e && e.code)) console.error(e);   // 서버가 준 오류가 아니면(코드 실수 등) 기기 콘솔에만 남기고 화면에는 쉬운 글만 보인다
      const m = (e && e.code && e.message) ? String(e.message).replace(/코이데 교회/g, '디다코 교회') : '교회 서버에 연결하지 못했어요. 잠시 뒤 다시 해 주세요.';
      return { ok: false, code: (e && e.code) || 'bad', message: m };
    }
  }
  return { call };
})();
