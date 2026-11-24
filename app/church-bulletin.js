/* 디다코 교회 주보(2026-11-24). 교회 [이번 주] 맨 위의 주보 카드, 주보 읽기(#bulletin), 편집(#bulletin-edit-…), 인쇄(#bulletin-print-…)를 그린다.
   화면 모양은 사용자가 2026-11-24에 고른 시안(week-differ/bulletin-*.png)을 따른다. 서버는 supabase/028_didako_church_bulletin.sql 이다.
   서버와 데모의 저장은 index.html이 store로 넘겨 준다(load·save·status·remove). 여기는 그리기와 고치기만 한다.
   주보 글은 교회 모두가 읽는 글이라 서버에 잠그지 않고 둔다. 이름·연락처·개인 사정은 쓰지 않는다는 안내를 편집 화면에 둔다. 성경은 장절만 적는다. */
(() => {
'use strict';
const BL = window.ChurchBulletin = {};
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const ic = (n, c) => `<svg class="ic ${c || ''}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
const nl = s => esc(s).replace(/\n/g, '<br>');
let X = null;                       // index.html이 넘겨 주는 것: store, canWrite, churchName, toast, rerender, tip
const S = { loaded: false, loading: false, err: '', items: [] };
let EDIT = null;                    // 고치는 중인 주보(저장하기 전의 사본). 다른 화면에 다녀와도 남는다
const PIC = '../note/img/w/';       // 표지 그림은 디다코 노트의 이번 주 그림 52장을 함께 쓴다
const PIC_N = 52;
const DOW = ['일', '월', '화', '수', '목', '금', '토'];
const p2 = n => String(n).padStart(2, '0');
const ymd = d => `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())}`;
const parseYmd = s => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ''); return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null; };
const dayText = s => { const d = parseYmd(s); return d ? `${d.getMonth() + 1}월 ${d.getDate()}일${d.getDay() === 0 ? ' 주일' : `(${DOW[d.getDay()]})`}` : ''; };
const dotText = s => { const d = parseYmd(s); return d ? `${d.getFullYear()}.${p2(d.getMonth() + 1)}.${p2(d.getDate())}` : ''; };
const thisSunday = () => { const d = new Date(); d.setDate(d.getDate() + ((7 - d.getDay()) % 7)); return ymd(d); };
const arr = v => (Array.isArray(v) ? v : []);
const cut = (v, n) => String(v == null ? '' : v).slice(0, n);
const uid = () => 'b' + Math.random().toString(36).slice(2, 9);

// ── 칸(블록)의 종류. 표는 칸 이름표(cols)대로 줄을 쌓는다 ──
const KINDS = {
  cover: { name: '표지', hint: '그림, 한 줄, 담임목사, 절기를 넣어요.' },
  worship: { name: '예배 안내', cols: ['예배', '시간', '장소'], add: ['', '', ''] },
  order: { name: '예배 순서', cols: ['순서', '맡은이'], add: ['', ''] },
  news: { name: '교회 소식' },
  people: { name: '섬기는 이들', cols: ['맡은 일', '이름'], add: ['', ''] },
  way: { name: '오시는 길' },
  free: { name: '자유 글' }
};
const LIM = { rows: 20, items: 12, lines: 8, blocks: 40 };
function cleanBlock(b) {
  b = b && typeof b === 'object' ? b : {};
  const k = KINDS[b.k] ? b.k : 'free', K = KINDS[k];
  const o = { id: cut(b.id, 12) || uid(), k, face: b.face === 'out' ? 'out' : 'in', col: Math.min(3, Math.max(1, parseInt(b.col, 10) || 1)), title: cut(b.title, 30) || K.name };
  if (k === 'cover') Object.assign(o, { img: /^weekly-\d{2}$/.test(b.img || '') ? b.img : '', pos: ['l', 'c', 'r'].includes(b.pos) ? b.pos : 'c', verse: cut(b.verse, 30), line: cut(b.line, 80), pastor: cut(b.pastor, 20), sub: cut(b.sub, 30) });
  else if (K.cols) o.rows = arr(b.rows).slice(0, LIM.rows).map(r => K.cols.map((_, i) => cut(arr(r)[i], 40)));
  else if (k === 'news') o.items = arr(b.items).slice(0, LIM.items).map(i => ({ t: cut(i && i.t, 40), x: cut(i && i.x, 300) }));
  else if (k === 'way') o.lines = arr(b.lines).slice(0, LIM.lines).map(l => cut(l, 80));
  else o.text = cut(b.text, 1200);
  return o;
}
function cleanItem(r) {
  r = r && typeof r === 'object' ? r : {};
  const n = parseInt(r.no, 10);
  return { id: r.id ? String(r.id) : '', no: n >= 1 && n <= 9999 ? n : null, date: parseYmd(r.date) ? String(r.date) : thisSunday(), title: cut(r.title, 40), layout: Number(r.layout) === 2 ? 2 : 3,
    blocks: arr(r.blocks).slice(0, LIM.blocks).map(cleanBlock), status: r.status === 'open' ? 'open' : 'draft', pubAt: r.pubAt || '', editedAt: r.editedAt || '' };
}
const blank = (k, face, col) => { const b = cleanBlock({ k, face, col }); if (KINDS[k].add) b.rows = [KINDS[k].add.slice()]; else if (k === 'news') b.items = [{ t: '', x: '' }]; else if (k === 'way') b.lines = ['']; return b; };
function template(layout) {
  const B = (k, face, col, extra) => Object.assign(blank(k, face, col), extra || {});
  const people = B('people', 'out', 1, { rows: [['담임목사', ''], ['교육 전도사', '']] });
  const worship = B('worship', 'in', 1, { rows: [['주일예배', '', ''], ['수요예배', '', '']] });
  const bl = layout === 2
    ? [B('way', 'out', 1), people, B('cover', 'out', 2), worship, B('news', 'in', 2)]
    : [people, B('way', 'out', 2), B('cover', 'out', 3), worship, B('news', 'in', 2), B('free', 'in', 3, { title: '이번 주 기도' })];
  return bl;
}
const colOf = (b, layout) => Math.min(b.col, layout);
const faceCols = (it, face) => [1, 2, 3].slice(0, it.layout).map(c => it.blocks.filter(b => b.face === face && colOf(b, it.layout) === c));
const coverOf = it => it.blocks.find(b => b.k === 'cover');
const sumOf = b => b.k === 'cover' ? (b.line || b.verse || '그림과 한 줄') : b.rows ? `${b.rows.filter(r => r.some(Boolean)).length}줄` : b.items ? `${b.items.filter(i => i.t || i.x).length}개 ${b.items[0] && b.items[0].t ? '(' + b.items[0].t + ' 외)' : ''}` : b.lines ? b.lines.filter(Boolean).join(', ') : (b.text || '');
const visible = b => b.k === 'cover' || (b.rows ? b.rows.some(r => r.some(Boolean)) : b.items ? b.items.some(i => i.t || i.x) : b.lines ? b.lines.some(Boolean) : !!b.text);

// ── 칸 그리기(읽기·인쇄 같이) ──
function bodyHtml(b) {
  if (b.k === 'worship') return `<table class="bl-t"><tr>${KINDS.worship.cols.map(c => `<th>${c}</th>`).join('')}</tr>${b.rows.filter(r => r.some(Boolean)).map(r => `<tr><td><b>${esc(r[0])}</b></td><td>${nl(r[1])}</td><td>${esc(r[2])}</td></tr>`).join('')}</table>`;
  if (b.k === 'order') return `<table class="bl-t"><tr>${KINDS.order.cols.map(c => `<th>${c}</th>`).join('')}</tr>${b.rows.filter(r => r.some(Boolean)).map(r => `<tr><td><b>${esc(r[0])}</b></td><td>${esc(r[1])}</td></tr>`).join('')}</table>`;
  if (b.k === 'people') return `<div class="bl-who">${b.rows.filter(r => r.some(Boolean)).map(r => `<div><b>${esc(r[0])}</b><span>${esc(r[1])}</span></div>`).join('')}</div>`;
  if (b.k === 'news') return `<ol class="bl-news">${b.items.filter(i => i.t || i.x).map((i, n) => `<li><span class="n"><i>${p2(n + 1)}</i>${esc(i.t)}</span>${i.x ? `<p>${nl(i.x)}</p>` : ''}</li>`).join('')}</ol>`;
  if (b.k === 'way') return `<div class="bl-way">${b.lines.filter(Boolean).map(l => `<span>${esc(l)}</span>`).join('')}</div>`;
  return `<p class="bl-free">${nl(b.text)}</p>`;
}
function coverHtml(b, it, fill) {
  const pic = b.img ? `<img src="${PIC}${b.img}.webp" alt="" style="object-position:${b.pos === 'l' ? 'left' : b.pos === 'r' ? 'right' : 'center'} center">` : '';
  return `<div class="bl-cover${fill ? ' fill' : ''}${b.img ? '' : ' nopic'}">${pic}
    <div class="bl-cv-row"><span>${it.no ? `제${it.no}호` : ''}</span><span>${esc(dotText(it.date))}</span></div>
    <div class="bl-cv-mid">${b.line ? `<h2>${nl(b.line)}</h2>` : ''}${b.verse ? `<span>${esc(b.verse)}</span>` : ''}</div>
    <div class="bl-cv-foot"><b>${esc(X.churchName())}</b>${b.pastor ? `<p>담임목사 ${esc(b.pastor)}</p>` : ''}${b.sub ? `<p>${esc(b.sub)}</p>` : ''}</div></div>`;
}
const blockHtml = (b, it, fill) => b.k === 'cover' ? coverHtml(b, it, fill)
  : `<section class="bl-blk-r"><div class="bl-h"><span>${esc(b.title || KINDS[b.k].name)}</span></div><div class="bl-b">${bodyHtml(b)}</div></section>`;
function sheetHtml(it, face) {
  return `<div class="bl-sheet c${it.layout}">${faceCols(it, face).map(col => `<div class="bl-col">${col.filter(visible).map(b => blockHtml(b, it, true)).join('')}</div>`).join('')}</div>`;
}
// 휴대폰은 한 줄로: 표지, 속면 단 순서, 겉면의 나머지
function stackHtml(it) {
  const list = [], put = b => { if (!list.includes(b) && visible(b)) list.push(b); };
  it.blocks.filter(b => b.k === 'cover').forEach(put);
  faceCols(it, 'in').forEach(c => c.forEach(put)); faceCols(it, 'out').forEach(c => c.forEach(put));
  return list.map(b => b.k === 'cover' ? `<section class="card bl-pcard">${coverHtml(b, it, false)}</section>` : `<section class="card bl-pcard">${blockHtml(b, it, false)}</section>`).join('');
}
const titleOf = it => it.title || `${dayText(it.date)} 주보`;

// ── 불러오기 ──
async function ensure(force) {
  if (!X || S.loading || (S.loaded && !force)) return;
  S.loading = true; S.err = '';
  try { const r = await X.store.load(); S.items = arr(r.items).map(cleanItem); S.loaded = true; }
  catch (e) { S.err = e && e.message ? e.message : '주보를 불러오지 못했어요.'; S.loaded = true; }
  S.loading = false;
  X.repaint();
}
const current = () => S.items.find(i => i.status === 'open') || null;   // 서버가 날짜 순으로 준다. 회원에게는 공개한 한 호뿐
const writable = () => !!(X && X.canWrite());
BL.init = deps => { X = deps; };
BL.reset = () => { S.loaded = false; S.loading = false; S.items = []; S.err = ''; EDIT = null; };

// ── 이번 주 맨 위 카드 ──
BL.cardHtml = () => {
  if (!X) return '';
  const w = writable(), cur = current(), draft = S.items.find(i => i.status !== 'open');
  if (!S.loaded) { ensure(); return w ? `<section class="card bl-main" aria-busy="true"><span class="walk-kicker">이번 주 주보</span><p class="fine">불러오는 중이에요.</p></section>` : ''; }
  if (!cur) {
    if (!w) return '';
    return `<section class="card bl-main calm" aria-label="이번 주 주보"><span class="walk-kicker">이번 주 주보</span>
      <p class="calm-t">${draft ? '준비 중인 주보가 있어요' : '아직 올린 주보가 없어요'}</p>
      <p class="fine" style="margin:0">${draft ? '이어서 쓰고 [올리기]를 누르면 교회 모두에게 보여요.' : '표지, 예배 안내, 교회 소식을 담은 주보를 만들어 올려 보세요. 인쇄도 할 수 있어요.'}</p>
      <div class="act-row"><a class="btn" href="#bulletin-edit-${draft ? draft.id : 'new'}">${draft ? '이어서 쓰기' : '주보 만들기'}</a></div></section>`;
  }
  const cv = coverOf(cur), cover = cv && cv.img ? `<img class="bl-thumb" src="${PIC}${cv.img}.webp" alt="">` : '';
  const glance = [];
  const wk = cur.blocks.find(b => b.k === 'worship' && b.rows.some(r => r.some(Boolean)));
  if (wk) { const r = wk.rows.find(x => x.some(Boolean)); glance.push(['예배', [r[0], r[1].replace(/\n/g, ', ')].filter(Boolean).join(' ')]); }
  const nw = cur.blocks.find(b => b.k === 'news' && b.items.some(i => i.t));
  if (nw) { const t = nw.items.filter(i => i.t); glance.push(['소식', t[0].t + (t.length > 1 ? ` 외 ${t.length - 1}` : '')]); }
  const old = (() => { const d = parseYmd(cur.date); return d && Date.now() - d.getTime() > 8 * 864e5; })();
  const chips = cur.blocks.filter(b => b.k !== 'cover' && visible(b)).slice(0, 5).map(b => `<a href="#bulletin">${esc(b.title)}</a>`).join('');
  return `<section class="card bl-main" aria-label="이번 주 주보"><div class="bl-main-top"><span class="walk-kicker">${old ? '지난 주보' : '이번 주 주보'}</span><span class="wk-aside">${cur.no ? `<span class="walk-tag">제${cur.no}호</span>` : ''}<span class="walk-tag">${esc(dayText(cur.date))}</span></span></div>
    <div class="bl-main-grid"><div class="bl-main-body">${cover}<div>${titleOf(cur) ? `<h2 class="lesson-title">${esc(cur.title || dayText(cur.date))}</h2>` : ''}${cv && cv.verse ? `<span class="passage-chip">${esc(cv.verse)}</span>` : ''}${cv && cv.line ? `<p class="fine">${esc(cv.line)}</p>` : ''}</div></div>
      <div>${glance.length ? `<div class="bl-glance">${glance.map(g => `<div><b>${esc(g[0])}</b><span>${esc(g[1])}</span></div>`).join('')}</div>` : ''}${chips ? `<div class="bl-chips" aria-label="주보 바로가기">${chips}</div>` : ''}</div></div>
    <div class="act-row"><a class="btn" href="#bulletin">주보 보기</a><a class="btn ghost" href="#bulletin-print-${cur.id}">${ic('print')} 인쇄</a>${w ? `<a class="btn ghost" href="#bulletin-edit-${cur.id}">${ic('edit')} 편집</a>` : ''}</div>
    ${w && S.items.some(i => i.status !== 'open') ? `<p class="fine bl-note">준비 중인 주보도 있어요. <a class="quiet-link" href="#bulletin-edit-${S.items.find(i => i.status !== 'open').id}">이어서 쓰기 ›</a></p>` : ''}</section>`;
};

// ── 읽기 ──
const pdfBar = (it, id) => `<div class="bl-bar"><a class="btn ghost" href="#bulletin-print-${id}">${ic('print')} 인쇄</a>${writable() ? `<a class="btn ghost" href="#bulletin-edit-${id}">${ic('edit')} 편집</a>` : ''}</div>`;
BL.readPage = arg => {
  ensure();
  const back = `<a class="back-link" href="#week">${ic('back')}<span>이번 주</span></a>`;
  if (!S.loaded) return `${back}<div class="page-top"><h1>주보</h1></div><p class="fine">불러오는 중이에요.</p>`;
  const it = (arg && S.items.find(i => i.id === arg)) || current() || (writable() && S.items[0]);
  if (!it) return `${back}<div class="page-top"><h1>주보</h1></div><section class="card calm"><p class="calm-t">${S.err ? esc(S.err) : '아직 올라온 주보가 없어요'}</p><a class="btn ghost" href="#week">이번 주로</a></section>`;
  const draft = it.status !== 'open';
  return `${back}<p class="eyebrow top-eyebrow">${esc(X.churchName())}</p>
    <div class="bl-head"><div class="page-top" style="margin:0"><h1>${it.no ? `주보 제${it.no}호` : '주보'}</h1></div>${draft ? '<span class="walk-tag">준비 중</span>' : `<span class="walk-tag bl-ph-only">${esc(dayText(it.date))}</span>`}</div>
    <p class="fine bl-sub">${esc(dayText(it.date))}${it.title ? ` ${esc(it.title)}` : ''}</p>${pdfBar(it, it.id)}
    ${draft ? '<p class="fine bl-note">준비 중인 주보예요. 올리기 전에는 쓰는 사람에게만 보여요.</p>' : ''}
    <div class="bl-pc"><p class="bl-face">겉면</p>${sheetHtml(it, 'out')}<p class="bl-face">속면</p>${sheetHtml(it, 'in')}</div>
    <div class="bl-ph bl-stack">${stackHtml(it)}</div>`;
};

// ── 인쇄: A4 가로 한 장의 앞뒤. 쪽 크기는 이 화면에 있는 동안만 가로로 바꾼다 ──
let pageStyle = null;
const pageOn = on => {
  if (on && !pageStyle) { pageStyle = document.createElement('style'); pageStyle.textContent = '@page { size: A4 landscape; margin: 0; }'; document.head.appendChild(pageStyle); }
  if (!on && pageStyle) { pageStyle.remove(); pageStyle = null; }
};
BL.leave = () => pageOn(false);
BL.printPage = arg => {
  ensure();
  const id = arg.replace(/^print-/, ''), it = S.items.find(i => i.id === id), back = `<a class="back-link" href="#bulletin">${ic('back')}<span>주보</span></a>`;
  if (!S.loaded || !it) { pageOn(false); return `${back}<div class="page-top"><h1>인쇄</h1></div><p class="fine">${S.loaded ? '주보를 찾지 못했어요.' : '불러오는 중이에요.'}</p>`; }
  pageOn(true);
  const pg = (face, label) => `<div class="bl-pgwrap"><p class="paper-cap">${label}</p><div class="bl-pg">${sheetHtml(it, face)}</div></div>`;
  return `<a class="back-link" href="#bulletin">${ic('back')}<span>주보</span></a><p class="eyebrow top-eyebrow">${esc(X.churchName())}</p><div class="page-top"><h1>인쇄</h1></div>
    <div class="pp-layout"><aside class="pp-side"><div class="print-bar"><div class="pb-btns"><button class="btn" type="button" data-bl="print">인쇄하기</button>${writable() ? `<a class="btn ghost" href="#bulletin-edit-${it.id}">${ic('edit')} 고치기</a>` : ''}</div></div>
      <p class="hint">A4 가로 한 장의 앞뒤예요. 양면 인쇄로 겉면과 속면을 뽑아 접으세요. 뒷면이 거꾸로 나오면 인쇄 창에서 양면의 넘김 방향을 바꿔 보세요. PDF로 저장해서 인쇄소에 보내도 돼요.</p></aside>
    <div class="pp-main"><div class="print-area bl-print-area" id="blArea">${pg('out', '겉면')}${pg('in', '속면')}</div></div></div>`;
};

// ── 편집 ──
const dirtyMark = () => { const b = $('[data-bl="save"]'); if (b) b.textContent = EDIT && EDIT.dirty ? '저장' : '저장했어요'; const s = $('#blDirty'); if (s) s.hidden = !(EDIT && EDIT.dirty); };
const seg = (items, on, attr) => `<div class="seg" role="radiogroup" style="--n:${items.length}">${items.map(([v, t]) => `<button type="button" role="radio" class="${String(v) === String(on) ? 'on' : ''}" aria-checked="${String(v) === String(on)}" ${attr}="${v}">${t}</button>`).join('')}</div>`;
function startEdit(arg) {
  const id = arg.replace(/^edit-/, '');
  if (EDIT && EDIT.key === id) return;
  if (id === 'new') {
    const prev = S.items[0];
    EDIT = { key: id, dirty: true, face: 'out', sel: '', delArm: false, item: cleanItem({ id: '', no: prev && prev.no ? prev.no + 1 : null, date: thisSunday(), title: '', layout: 3, blocks: template(3), status: 'draft' }) };
    EDIT.item.id = '';
    return;
  }
  const it = S.items.find(i => i.id === id); if (!it) { EDIT = null; return; }
  EDIT = { key: id, dirty: false, face: 'out', sel: '', delArm: false, item: JSON.parse(JSON.stringify(it)) };
}
function blockCard(b, it, n, i, count) {
  const colN = colOf(b, it.layout);
  return `<div class="bl-blk${EDIT.sel === b.id ? ' sel' : ''}" data-id="${b.id}"><div class="bl-h" data-bl="sel" data-id="${b.id}" role="button" tabindex="0" aria-label="${esc(b.title)} 고치기"><span>${esc(b.title || KINDS[b.k].name)}</span>
    <span class="bl-tools"><button type="button" data-bl="mv" data-id="${b.id}" data-d="-1" aria-label="위로" ${i === 0 ? 'disabled' : ''}>${ic('up')}</button><button type="button" data-bl="mv" data-id="${b.id}" data-d="1" aria-label="아래로" ${i === count - 1 ? 'disabled' : ''}>${ic('down')}</button>
    <button type="button" data-bl="col" data-id="${b.id}" data-d="-1" aria-label="왼쪽 단으로" ${colN === 1 ? 'disabled' : ''}>${ic('back')}</button><button type="button" data-bl="col" data-id="${b.id}" data-d="1" aria-label="오른쪽 단으로" ${colN === it.layout ? 'disabled' : ''}>${ic('chev')}</button>
    <button type="button" data-bl="del-blk" data-id="${b.id}" aria-label="이 칸 지우기">${ic('trash')}</button></span></div>
    <div class="bl-b" data-bl="sel" data-id="${b.id}">${esc(sumOf(b)) || '<span class="fine">비어 있어요</span>'}</div></div>`;
}
function editSheet() {
  const it = EDIT.item;
  return `<div class="bl-sheet edit c${it.layout}">${faceCols(it, EDIT.face).map((col, c) => `<div class="bl-col"><div class="bl-colh">${c + 1}단</div>${col.map((b, i) => blockCard(b, it, c, i, col.length)).join('') || '<p class="fine bl-empty">비어 있어요</p>'}</div>`).join('')}</div>`;
}
function textField(label, f, v, max, extra) { return `<div class="bl-fld"><label>${label}</label><input class="field" type="text" data-f="${f}" value="${esc(v)}" maxlength="${max}" ${extra || ''}></div>`; }
function inspector() {
  const it = EDIT.item, b = it.blocks.find(x => x.id === EDIT.sel);
  if (!b) return `<section class="card bl-ins bl-ins-empty"><p class="fine">고칠 칸을 눌러 보세요. 칸 제목 줄을 누르면 여기서 글을 고칠 수 있어요.</p></section>`;
  const K = KINDS[b.k];
  let f = `<div class="bl-ins-h"><h3>${esc(K.name)} 고치기</h3><button class="bl-x" type="button" data-bl="desel" aria-label="닫기">${ic('x')}</button></div>`;
  if (b.k !== 'cover') f += textField('칸 제목', 'title', b.title, 30);
  f += `<div class="bl-fld"><label>놓을 곳</label><div class="bl-pair">${seg([['out', '겉면'], ['in', '속면']], b.face, 'data-face')}${seg([1, 2, 3].slice(0, it.layout).map(n => [n, n + '단']), colOf(b, it.layout), 'data-colset')}</div></div>`;
  if (b.k === 'cover') {
    f += `<div class="bl-fld"><label>표지 그림</label><div class="bl-pics"><button type="button" class="bl-pic none${b.img ? '' : ' on'}" data-bl="pic" data-v="">없음</button>${Array.from({ length: PIC_N }, (_, i) => { const n = `weekly-${p2(i + 1)}`; return `<button type="button" class="bl-pic${b.img === n ? ' on' : ''}" data-bl="pic" data-v="${n}" aria-label="그림 ${i + 1}"><img src="${PIC}${n}.webp" alt="" loading="lazy"></button>`; }).join('')}</div></div>
      <div class="bl-fld"><label>그림 위치</label>${seg([['l', '왼쪽'], ['c', '가운데'], ['r', '오른쪽']], b.pos, 'data-pos')}<p class="fine">세로로 긴 표지 칸에는 그림이 일부만 보여요. 보이는 쪽을 골라요.</p></div>`
      + textField('한 줄(교회가 직접 쓴 글)', 'line', b.line, 80) + textField('말씀 장절(본문은 적지 않아요)', 'verse', b.verse, 30, 'placeholder="예: 시편 23:1"')
      + textField('담임목사 이름', 'pastor', b.pastor, 20) + textField('절기나 주일 이름', 'sub', b.sub, 30, 'placeholder="예: 대림절 첫째 주일"');
  } else if (b.rows) {
    f += `<div class="bl-fld"><label>${K.cols.join(' · ').replace(/ · /g, ', ')}</label>${b.rows.map((r, i) => `<div class="item bl-row${K.cols.length === 3 ? ' c3' : ''}">${K.cols.map((c, j) => `<input class="field" type="text" data-r="${i}.${j}" value="${esc(r[j])}" maxlength="40" placeholder="${c}" aria-label="${i + 1}번째 줄 ${c}">`).join('')}<button type="button" class="bl-x" data-bl="row-del" data-i="${i}" aria-label="이 줄 지우기">${ic('x')}</button></div>`).join('')}</div>
      ${b.rows.length < LIM.rows ? `<button class="btn ghost small" type="button" data-bl="row-add">${ic('plus')} 줄 더하기</button>` : ''}`;
  } else if (b.items) {
    f += b.items.map((i, n) => `<div class="item"><div class="bl-fld"><label>항목 ${n + 1} 제목</label><div class="bl-inl"><input class="field" type="text" data-n="${n}.t" value="${esc(i.t)}" maxlength="40"><button type="button" class="bl-x" data-bl="item-del" data-i="${n}" aria-label="이 항목 지우기">${ic('x')}</button></div></div>
      <div class="bl-fld"><label>글</label><textarea class="field" rows="3" data-n="${n}.x" maxlength="300">${esc(i.x)}</textarea></div></div>`).join('')
      + (b.items.length < LIM.items ? `<button class="btn ghost small" type="button" data-bl="item-add">${ic('plus')} 항목 더하기</button>` : '');
  } else if (b.lines) {
    f += `<div class="bl-fld"><label>줄마다 하나씩</label>${b.lines.map((l, i) => `<div class="bl-inl"><input class="field" type="text" data-l="${i}" value="${esc(l)}" maxlength="80" aria-label="${i + 1}번째 줄"><button type="button" class="bl-x" data-bl="line-del" data-i="${i}" aria-label="이 줄 지우기">${ic('x')}</button></div>`).join('')}</div>
      ${b.lines.length < LIM.lines ? `<button class="btn ghost small" type="button" data-bl="line-add">${ic('plus')} 줄 더하기</button>` : ''}`;
  } else {
    f += `<div class="bl-fld"><label>글</label><textarea class="field" rows="6" data-f="text" maxlength="1200">${esc(b.text)}</textarea></div>`;
  }
  return `<section class="card bl-ins">${f}</section>`;
}
BL.editPage = arg => {
  ensure();
  const back = `<a class="back-link" href="#week" data-bl="leave">${ic('back')}<span>이번 주</span></a>`;
  if (!writable()) return `${back}<div class="page-top"><h1>주보 편집</h1></div><section class="card calm"><p class="calm-t">교회 관리자와 교역자가 쓰는 화면이에요</p><a class="btn ghost" href="#week">이번 주로</a></section>`;
  if (!S.loaded) return `${back}<div class="page-top"><h1>주보 편집</h1></div><p class="fine">불러오는 중이에요.</p>`;
  startEdit(arg);
  if (!EDIT) return `${back}<div class="page-top"><h1>주보 편집</h1></div><section class="card calm"><p class="calm-t">주보를 찾지 못했어요</p><a class="btn ghost" href="#week">이번 주로</a></section>`;
  const it = EDIT.item, others = S.items.filter(i => i.id && i.id !== it.id), open = it.status === 'open';
  return `${back}<p class="eyebrow top-eyebrow">${esc(X.churchName())}</p>
    <div class="bl-head"><div class="page-top" style="margin:0"><h1>주보 편집</h1></div>
      <div class="bl-bar" style="margin:0"><button class="btn ghost" type="button" data-bl="view">미리 보기</button><button class="btn ghost" type="button" data-bl="prn">${ic('print')} 인쇄</button><button class="btn" type="button" data-bl="save">${EDIT.dirty ? '저장' : '저장했어요'}</button></div></div>
    <p class="fine bl-note" id="blDirty" ${EDIT.dirty ? '' : 'hidden'}>저장하지 않은 고침이 있어요.</p>
    <section class="card bl-meta"><div class="bl-meta-g">
      <div class="bl-fld"><label>호수</label><input class="field" type="number" min="1" max="9999" inputmode="numeric" data-m="no" value="${it.no || ''}" placeholder="비워도 돼요"></div>
      <div class="bl-fld"><label>날짜</label><input class="field" type="date" data-m="date" value="${esc(it.date)}"></div>
      <div class="bl-fld bl-wide"><label>제목(비워도 돼요)</label><input class="field" type="text" data-m="title" maxlength="40" value="${esc(it.title)}" placeholder="예: 대림절 첫째 주일"></div>
      <div class="bl-fld"><label>판형</label>${seg([[2, '2단'], [3, '3단']], it.layout, 'data-layout')}</div>
      <div class="bl-fld"><label>공개</label><p class="status-row"><span class="pill ${open ? '' : 'pill-p'}"><b>${open ? '모두에게 공개 중' : '준비 중'}</b></span><button class="quiet-link" type="button" data-bl="${open ? 'close' : 'open'}">${open ? '내리기 ›' : '올리기 ›'}</button></p></div>
    </div>
    ${open ? '<p class="fine">공개 중인 주보를 고치고 [저장]을 누르면 교회 모두에게 바로 바뀌어 보여요.</p>' : '<p class="fine">준비 중에는 교회 관리자와 교역자에게만 보여요. 다 쓰면 [올리기]를 눌러요.</p>'}
    <div class="bl-warn">${ic('lock')}<span>회원의 이름, 연락처, 개인 사정은 쓰지 말아 주세요. 이 글은 교회 모두가 읽고, 서버에 잠그지 않고 저장돼요. 성경은 본문 대신 장절만 적거나 직접 풀어 써 주세요(번역본 저작권).</span></div></section>
    <div class="bl-edit"><div class="bl-pal"><p class="bl-pl">칸 더하기</p>${Object.entries(KINDS).map(([k, K]) => `<button type="button" data-bl="add" data-k="${k}" ${k === 'cover' && it.blocks.some(b => b.k === 'cover') ? 'disabled' : ''}>${ic('plus')} ${K.name}</button>`).join('')}
      ${others.length ? `<p class="bl-pl">지난 주보에서</p><select class="field" id="blFrom" aria-label="가져올 주보">${others.map(o => `<option value="${o.id}">${esc(o.no ? `제${o.no}호 ` : '')}${esc(dayText(o.date))}</option>`).join('')}</select><button type="button" data-bl="copy">${ic('copy')} 이 주보를 복사해서 쓰기</button>` : ''}</div>
      <div class="bl-mid"><div class="bl-faces">${seg([['out', '겉면'], ['in', '속면']], EDIT.face, 'data-faceview')}<p class="fine">${EDIT.face === 'out' ? '접으면 바깥쪽에 나오는 면이에요. 표지는 보통 오른쪽 단에 놓아요.' : '펼치면 안쪽에 나오는 면이에요.'}</p></div><div id="blSheet">${editSheet()}</div></div>
      <div class="bl-side" id="blIns">${inspector()}</div></div>
    ${it.id ? `<p class="bl-danger"><button class="quiet-link" type="button" data-bl="del">${EDIT.delArm ? '정말 지울까요? 한 번 더 누르면 지워져요' : '이 주보 지우기'}</button></p>` : ''}`;
};

// ── 눌림과 입력 ──
const redraw = (what) => {
  if (what !== 'ins') { const s = $('#blSheet'); if (s) s.innerHTML = editSheet(); }
  if (what !== 'sheet') { const i = $('#blIns'); if (i) i.innerHTML = inspector(); }
  const side = $('#blIns'); if (side) side.classList.toggle('open', !!EDIT.sel);
};
const selBlk = () => EDIT && EDIT.item.blocks.find(b => b.id === EDIT.sel);
const touch = () => { EDIT.dirty = true; dirtyMark(); };
async function save() {
  if (!EDIT) return null;
  const it = EDIT.item;
  if (!parseYmd(it.date)) { X.toast('주보 날짜를 정해 주세요.'); return null; }
  try {
    const r = cleanItem(await X.store.save(it));
    const keep = it.status; EDIT.item = JSON.parse(JSON.stringify(r)); EDIT.item.status = r.status || keep;
    const at = S.items.findIndex(i => i.id === r.id); if (at >= 0) S.items[at] = r; else S.items.unshift(r);
    S.items.sort((a, b) => (b.date > a.date ? 1 : b.date < a.date ? -1 : 0));
    EDIT.key = r.id; EDIT.dirty = false; if (location.hash.endsWith('edit-new')) history.replaceState(null, '', '#bulletin-edit-' + r.id);
    X.toast('저장했어요.'); return r;
  } catch (e) { X.toast(e && e.message ? e.message : '저장하지 못했어요. 잠시 뒤 다시 해 주세요.'); return null; }
}
const acts = {
  async save() { if (await save()) X.repaint(); },
  async view() { const r = EDIT.dirty ? await save() : EDIT.item; if (r) location.hash = '#bulletin-' + (r.id || EDIT.item.id); },
  async prn() { const r = EDIT.dirty ? await save() : EDIT.item; if (r) location.hash = '#bulletin-print-' + (r.id || EDIT.item.id); },
  async open() { const r = EDIT.dirty || !EDIT.item.id ? await save() : EDIT.item; if (!r) return; try { const s = cleanItem(await X.store.status(r.id, true)); EDIT.item.status = 'open'; const at = S.items.findIndex(i => i.id === s.id); if (at >= 0) S.items[at] = s; X.toast('올렸어요. 교회 모두에게 보여요.'); X.repaint(); } catch (e) { X.toast(e && e.message ? e.message : '올리지 못했어요.'); } },
  async close() { if (EDIT.dirty && !(await save())) return; try { const s = cleanItem(await X.store.status(EDIT.item.id, false)); EDIT.item.status = 'draft'; const at = S.items.findIndex(i => i.id === s.id); if (at >= 0) S.items[at] = s; X.toast('내렸어요. 쓰는 사람에게만 보여요.'); X.repaint(); } catch (e) { X.toast(e && e.message ? e.message : '내리지 못했어요.'); } },
  async del() {
    if (!EDIT.delArm) { EDIT.delArm = true; X.repaint(); setTimeout(() => { if (EDIT && EDIT.delArm) { EDIT.delArm = false; if (location.hash.startsWith('#bulletin-edit')) X.repaint(); } }, 5000); return; }
    try { await X.store.remove(EDIT.item.id); S.items = S.items.filter(i => i.id !== EDIT.item.id); EDIT = null; X.toast('주보를 지웠어요.'); location.hash = '#week'; } catch (e) { EDIT.delArm = false; X.toast(e && e.message ? e.message : '지우지 못했어요.'); X.repaint(); }
  },
  leave(e) { if (EDIT && EDIT.dirty && !window.confirm('저장하지 않은 고침이 있어요. 그래도 나갈까요? (고친 것은 이 화면을 다시 열면 이어서 볼 수 있어요)')) e.preventDefault(); },
  add(e, el) {
    const k = el.dataset.k, it = EDIT.item; if (it.blocks.length >= LIM.blocks) { X.toast('칸이 너무 많아요.'); return; }
    const cols = faceCols(it, EDIT.face).map(c => c.length), col = cols.indexOf(Math.min(...cols)) + 1;
    const b = blank(k, EDIT.face, col); it.blocks.push(b); EDIT.sel = b.id; touch(); X.repaint(); const t = $('#blIns'); if (t) t.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  },
  copy() {
    const o = S.items.find(i => i.id === ($('#blFrom') || {}).value); if (!o) return;
    const had = EDIT.item.blocks.some(visible);
    if (had && !window.confirm('지금 고치는 내용이 사라지고 고른 주보가 복사돼요. 계속할까요?')) return;
    const d = parseYmd(o.date) || new Date(); d.setDate(d.getDate() + 7);
    EDIT.item.layout = o.layout; EDIT.item.blocks = o.blocks.map(b => Object.assign(JSON.parse(JSON.stringify(b)), { id: uid() }));
    EDIT.item.date = ymd(d); EDIT.item.no = o.no ? o.no + 1 : null; EDIT.item.title = ''; EDIT.sel = ''; touch(); X.toast('복사했어요. 날짜와 글을 고쳐 주세요.'); X.repaint();
  },
  sel(e, el) { if (e.target.closest('.bl-tools')) return; EDIT.sel = el.dataset.id; redraw(); const i = $('#blIns'); if (i && matchMedia('(max-width: 899px)').matches) i.querySelector('input,textarea') && i.querySelector('input,textarea').focus({ preventScroll: true }); },
  desel() { EDIT.sel = ''; redraw(); },
  mv(e, el) {
    const it = EDIT.item, b = it.blocks.find(x => x.id === el.dataset.id), d = Number(el.dataset.d); if (!b) return;
    const same = it.blocks.filter(x => x.face === b.face && colOf(x, it.layout) === colOf(b, it.layout)), at = same.indexOf(b), to = same[at + d]; if (!to) return;
    const i1 = it.blocks.indexOf(b), i2 = it.blocks.indexOf(to); it.blocks[i1] = to; it.blocks[i2] = b; touch(); redraw('sheet');
  },
  col(e, el) { const it = EDIT.item, b = it.blocks.find(x => x.id === el.dataset.id); if (!b) return; b.col = Math.min(it.layout, Math.max(1, colOf(b, it.layout) + Number(el.dataset.d))); touch(); redraw(); },
  'del-blk'(e, el) { const it = EDIT.item, b = it.blocks.find(x => x.id === el.dataset.id); if (!b) return; if (b.k !== 'cover' && visible(b) && !window.confirm(`'${b.title}' 칸을 지울까요?`)) return; it.blocks = it.blocks.filter(x => x !== b); if (EDIT.sel === b.id) EDIT.sel = ''; touch(); X.repaint(); },
  pic(e, el) { const b = selBlk(); if (!b) return; b.img = el.dataset.v; touch(); redraw(); },
  'row-add'() { const b = selBlk(); if (!b || !b.rows) return; b.rows.push(KINDS[b.k].add.slice()); touch(); redraw('ins'); },
  'row-del'(e, el) { const b = selBlk(); if (!b || !b.rows) return; b.rows.splice(Number(el.dataset.i), 1); if (!b.rows.length) b.rows.push(KINDS[b.k].add.slice()); touch(); redraw(); },
  'item-add'() { const b = selBlk(); if (!b || !b.items) return; b.items.push({ t: '', x: '' }); touch(); redraw('ins'); },
  'item-del'(e, el) { const b = selBlk(); if (!b || !b.items) return; b.items.splice(Number(el.dataset.i), 1); if (!b.items.length) b.items.push({ t: '', x: '' }); touch(); redraw(); },
  'line-add'() { const b = selBlk(); if (!b || !b.lines) return; b.lines.push(''); touch(); redraw('ins'); },
  'line-del'(e, el) { const b = selBlk(); if (!b || !b.lines) return; b.lines.splice(Number(el.dataset.i), 1); if (!b.lines.length) b.lines.push(''); touch(); redraw(); },
  async print() { const imgs = $$('#blArea img'); await Promise.race([Promise.all(imgs.map(im => im.complete ? 0 : new Promise(r => { im.onload = im.onerror = r; }))), new Promise(r => setTimeout(r, 10000))]); window.print(); }
};
document.addEventListener('click', e => {
  const el = e.target.closest('[data-bl],[data-face],[data-colset],[data-pos],[data-layout],[data-faceview]'); if (!el || !X) return;
  if (!$('#view').contains(el)) return;
  if (el.dataset.bl) { const fn = acts[el.dataset.bl]; if (fn) fn(e, el); return; }
  if (!EDIT) return;
  const b = selBlk(), it = EDIT.item;
  if (el.dataset.faceview) { EDIT.face = el.dataset.faceview; EDIT.sel = ''; X.repaint(); return; }
  if (el.dataset.layout) { it.layout = Number(el.dataset.layout) === 2 ? 2 : 3; it.blocks.forEach(x => { x.col = Math.min(x.col, it.layout); }); touch(); X.repaint(); return; }
  if (!b) return;
  if (el.dataset.face) { b.face = el.dataset.face === 'in' ? 'in' : 'out'; touch(); X.repaint(); return; }
  if (el.dataset.colset) { b.col = Math.min(it.layout, Number(el.dataset.colset)); touch(); X.repaint(); return; }
  if (el.dataset.pos) { b.pos = el.dataset.pos; touch(); redraw(); }
});
document.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('.bl-h[data-bl="sel"]')) { e.preventDefault(); acts.sel(e, e.target); }
});
document.addEventListener('input', e => {
  const t = e.target; if (!EDIT || !X || !t.closest || !t.closest('#view')) return;
  const b = selBlk(), it = EDIT.item;
  if (t.dataset.m) { const k = t.dataset.m; if (k === 'no') it.no = parseInt(t.value, 10) > 0 ? parseInt(t.value, 10) : null; else if (k === 'date') it.date = t.value; else it.title = t.value; touch(); return; }
  if (!b) return;
  if (t.dataset.f) { b[t.dataset.f] = t.value; if (t.dataset.f === 'title' && !t.value) b.title = ''; touch(); return; }
  if (t.dataset.r) { const [i, j] = t.dataset.r.split('.').map(Number); if (b.rows && b.rows[i]) { b.rows[i][j] = t.value; touch(); } return; }
  if (t.dataset.n) { const [i, f] = t.dataset.n.split('.'); if (b.items && b.items[Number(i)]) { b.items[Number(i)][f] = t.value; touch(); } return; }
  if (t.dataset.l) { if (b.lines) { b.lines[Number(t.dataset.l)] = t.value; touch(); } }
});
// 입력을 끝내면(칸을 벗어나면) 가운데 칸 요약을 새로 그린다. 입력 중에는 다시 그리지 않아 글자 위치를 지킨다
document.addEventListener('change', e => { const t = e.target; if (EDIT && t.closest && t.closest('#blIns')) redraw('sheet'); });
})();
