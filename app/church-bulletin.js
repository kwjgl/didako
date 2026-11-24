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
// 표지 그림은 디다코 노트에 있는 그림을 함께 쓴다(올리는 길은 없다). 이번 주 그림 52장(weekly-01~52), 절기별 질문 그림 409장(q/절기-번호), 66권 표지 82장(walk/cover-이름)
const IMG = '../note/img/';
const PIC_N = 52;
const SEASONS = [['advent', '대림절', 28], ['christmas', '성탄절기', 12], ['epiphany', '주현절', 64], ['lent', '사순절', 46], ['easter', '부활절기', 50], ['after-pentecost', '성령강림 후 절기', 206], ['special-days', '특별한 날', 3]];
// [그림 이름, 책 이름, 표지 장수, 구약이면 true]. 장수가 2 이상이면 이름 뒤에 -1, -2…가 붙는다
const BOOKS = [['genesis', '창세기', 4, 1], ['exodus', '출애굽기', 2, 1], ['leviticus', '레위기', 1, 1], ['numbers', '민수기', 1, 1], ['deuteronomy', '신명기', 1, 1], ['joshua', '여호수아', 1, 1], ['judges', '사사기', 1, 1], ['ruth', '룻기', 1, 1],
  ['1samuel', '사무엘상', 1, 1], ['2samuel', '사무엘하', 1, 1], ['1kings', '열왕기상', 1, 1], ['2kings', '열왕기하', 1, 1], ['1chronicles', '역대상', 1, 1], ['2chronicles', '역대하', 1, 1], ['ezra', '에스라', 1, 1], ['nehemiah', '느헤미야', 1, 1], ['esther', '에스더', 1, 1],
  ['job', '욥기', 1, 1], ['psalms', '시편', 5, 1], ['proverbs', '잠언', 1, 1], ['ecclesiastes', '전도서', 1, 1], ['song', '아가', 1, 1], ['isaiah', '이사야', 2, 1], ['jeremiah', '예레미야', 1, 1], ['lamentations', '예레미야애가', 1, 1], ['ezekiel', '에스겔', 1, 1], ['daniel', '다니엘', 1, 1],
  ['hosea', '호세아', 1, 1], ['joel', '요엘', 1, 1], ['amos', '아모스', 1, 1], ['obadiah', '오바댜', 1, 1], ['jonah', '요나', 1, 1], ['micah', '미가', 1, 1], ['nahum', '나훔', 1, 1], ['habakkuk', '하박국', 1, 1], ['zephaniah', '스바냐', 1, 1], ['haggai', '학개', 1, 1], ['zechariah', '스가랴', 1, 1], ['malachi', '말라기', 1, 1], ['elijah', '엘리야 이야기', 1, 1],
  ['matthew', '마태복음', 2, 0], ['mark', '마가복음', 3, 0], ['luke', '누가복음', 2, 0], ['john', '요한복음', 2, 0], ['acts', '사도행전', 2, 0], ['romans', '로마서', 1, 0], ['1corinthians', '고린도전서', 1, 0], ['2corinthians', '고린도후서', 1, 0], ['galatians', '갈라디아서', 1, 0], ['ephesians', '에베소서', 1, 0],
  ['philippians', '빌립보서', 1, 0], ['colossians', '골로새서', 1, 0], ['1thessalonians', '데살로니가전서', 1, 0], ['2thessalonians', '데살로니가후서', 1, 0], ['1timothy', '디모데전서', 1, 0], ['2timothy', '디모데후서', 1, 0], ['titus', '디도서', 1, 0], ['philemon', '빌레몬서', 1, 0], ['hebrews', '히브리서', 1, 0],
  ['james', '야고보서', 1, 0], ['1peter', '베드로전서', 1, 0], ['2peter', '베드로후서', 1, 0], ['1john', '요한일서', 1, 0], ['2john', '요한이서', 1, 0], ['3john', '요한삼서', 1, 0], ['jude', '유다서', 1, 0], ['revelation', '요한계시록', 1, 0]];
const SEASON_IDS = SEASONS.map(x => x[0]).join('|');
const PIC_RE = new RegExp(`^(weekly-\\d{2}|q/(?:${SEASON_IDS})-\\d{2,3}|walk/cover-[a-z0-9-]+)$`);
const picUrl = id => !id ? '' : id.startsWith('q/') ? `${IMG}q/${id.slice(2)}.webp` : id.startsWith('walk/') ? `${IMG}walk/${id.slice(5)}.webp` : `${IMG}w/${id}.webp`;
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

// ── 표지 그림 고르기 도우미 ──
const weeklyIds = () => Array.from({ length: PIC_N }, (_, i) => `weekly-${p2(i + 1)}`);
const seasonIds = id => { const x = SEASONS.find(e => e[0] === id); return x ? Array.from({ length: x[2] }, (_, i) => `q/${id}-${p2(i + 1)}`) : []; };
const bookIds = ot => BOOKS.filter(b => !!b[3] === ot).flatMap(b => b[2] > 1 ? Array.from({ length: b[2] }, (_, i) => [`walk/cover-${b[0]}-${i + 1}`, `${b[1]} ${i + 1}`]) : [[`walk/cover-${b[0]}`, b[1]]]);
const picLabel = id => {
  if (!id) return '';
  if (id.startsWith('q/')) { const m = /^q\/(.+)-(\d+)$/.exec(id), x = m && SEASONS.find(e => e[0] === m[1]); return x ? `${x[1]} 그림 ${+m[2]}` : '절기 그림'; }
  if (id.startsWith('walk/')) { const k = id.slice(11), b = BOOKS.find(e => k === e[0] || k.startsWith(e[0] + '-')); return b ? `${b[1]}${b[2] > 1 ? ' ' + k.slice(b[0].length + 1) : ''} 표지` : '책 표지'; }
  return `이번 주 그림 ${+id.slice(7)}`;
};
// 주보 날짜가 교회력의 어느 절기인지(그림 추천에만 쓴다). 부활절은 서양 달력 계산식
function easterOf(y) {
  const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mo = Math.floor((h + l - 7 * m + 114) / 31), da = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(y, mo - 1, da);
}
function seasonOf(dateStr) {
  const d = parseYmd(dateStr) || new Date(), y = d.getFullYear(), t = d.getTime(), day = 864e5;
  const E = easterOf(y).getTime(), adv = (() => { const n = new Date(y, 10, 27); n.setDate(27 + ((7 - n.getDay()) % 7)); return n.getTime(); })();
  const id = t >= adv ? (d.getMonth() === 11 && d.getDate() >= 25 ? 'christmas' : 'advent')
    : t < new Date(y, 0, 6).getTime() ? 'christmas'
    : t < E - 46 * day ? 'epiphany' : t < E ? 'lent' : t <= E + 49 * day ? 'easter' : 'after-pentecost';
  return SEASONS.find(e => e[0] === id);
}
// 그 절기의 그림 여섯 장. 날짜와 '다른 그림 보기' 횟수에 따라 같은 자리에서 고르므로 화면을 다시 그려도 바뀌지 않는다
function recommend(season, dateStr, seed) {
  const all = seasonIds(season[0]), n = all.length, d = parseYmd(dateStr) || new Date();
  if (n <= 6) return all;
  const step = Math.floor(n / 6), start = (Math.floor(d.getTime() / 864e5 / 7) * 7 + seed * 5) % n;
  return Array.from({ length: 6 }, (_, i) => all[(start + i * step) % n]);
}

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
  if (k === 'cover') Object.assign(o, { img: PIC_RE.test(b.img || '') ? b.img : '', pos: ['l', 'c', 'r'].includes(b.pos) ? b.pos : 'c', verse: cut(b.verse, 30), line: cut(b.line, 80), pastor: cut(b.pastor, 20), sub: cut(b.sub, 30) });
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
const ORDER_ROWS = ['묵상기도', '찬송', '신앙고백', '대표기도', '성경봉독', '말씀', '봉헌', '광고', '축도'].map(x => [x, '']);
const TPL = [
  { id: 'basic', name: '기본 주보', layout: 3, hint: '표지, 예배 안내, 교회 소식, 섬기는 이들, 오시는 길을 한 장에 담아요.', make: () => template(3) },
  { id: 'order', name: '예배 순서가 있는 주보', layout: 3, hint: '속면에 예배 순서와 교회 소식, 이번 주 기도가 들어가요.', make: () => {
    const B = (k, face, col, extra) => Object.assign(blank(k, face, col), extra || {});
    return [B('way', 'out', 1), B('people', 'out', 2, { rows: [['담임목사', ''], ['교육 전도사', '']] }), B('cover', 'out', 3),
      B('order', 'in', 1, { rows: ORDER_ROWS.map(r => r.slice()) }), B('worship', 'in', 2, { rows: [['주일예배', '', ''], ['수요예배', '', '']] }), B('news', 'in', 2), B('free', 'in', 3, { title: '이번 주 기도' })];
  } },
  { id: 'two', name: '간단한 한 장', layout: 2, hint: '2단으로 단순하게. 표지와 예배 안내, 교회 소식만 있어요.', make: () => template(2) },
  { id: 'event', name: '절기·행사 안내', layout: 2, hint: '절기 인사와 행사 안내, 준비물을 알리는 한 장이에요.', make: () => {
    const B = (k, face, col, extra) => Object.assign(blank(k, face, col), extra || {});
    return [B('free', 'out', 1, { title: '인사 말씀' }), B('cover', 'out', 2), B('news', 'in', 1, { title: '행사 안내', items: [{ t: '', x: '' }, { t: '', x: '' }, { t: '', x: '' }] }),
      B('worship', 'in', 2, { rows: [['', '', '']] }), B('free', 'in', 2, { title: '준비물과 알림' })];
  } },
  { id: 'cover', name: '표지만 있는 빈 주보', layout: 3, hint: '표지 한 칸만 있어요. 필요한 칸을 직접 더해 만들어요.', make: () => [Object.assign(blank('cover', 'out', 3), {})] }
];
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
  const pic = b.img ? `<img src="${picUrl(b.img)}" alt="" style="object-position:${b.pos === 'l' ? 'left' : b.pos === 'r' ? 'right' : 'center'} center">` : '';
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
  const cv = coverOf(cur), cover = cv && cv.img ? `<img class="bl-thumb" src="${picUrl(cv.img)}" alt="">` : '';
  const glance = [];
  const wk = cur.blocks.find(b => b.k === 'worship' && b.rows.some(r => r.some(Boolean)));
  if (wk) { const r = wk.rows.find(x => x.some(Boolean)); glance.push(['예배', [r[0], r[1].replace(/\n/g, ', ')].filter(Boolean).join(' ')]); }
  const nw = cur.blocks.find(b => b.k === 'news' && b.items.some(i => i.t));
  if (nw) { const t = nw.items.filter(i => i.t); glance.push(['소식', t[0].t + (t.length > 1 ? ` 외 ${t.length - 1}` : '')]); }
  const old = (() => { const d = parseYmd(cur.date); return d && Date.now() - d.getTime() > 8 * 864e5; })();
  const chips = cur.blocks.filter(b => b.k !== 'cover' && visible(b)).slice(0, 5).map(b => `<a href="#bulletin">${esc(b.title)}</a>`).join('');
  return `<section class="card bl-main" aria-label="이번 주 주보"><div class="bl-main-top"><span class="walk-kicker">${old ? '지난 주보' : '이번 주 주보'}</span><span class="wk-aside">${cur.no ? `<span class="walk-tag">제${cur.no}호</span>` : ''}<span class="walk-tag">${esc(dayText(cur.date))}</span></span></div>
    <div class="bl-main-grid"><div class="bl-main-body">${cover}<div>${titleOf(cur) ? `<h2 class="lesson-title">${esc(cur.title || dayText(cur.date))}</h2>` : ''}${cv && cv.verse ? `<span class="passage-chip">${esc(cv.verse)}</span>${X.bibleUrl && X.bibleUrl(cv.verse) ? ` <a class="quiet-link" href="${esc(X.bibleUrl(cv.verse))}" target="_blank" rel="noopener" aria-label="${esc(cv.verse)} 성경 펴기 (새 창)">성경 펴기 ›</a>` : ''}` : ''}${cv && cv.line ? `<p class="fine">${esc(cv.line)}</p>` : ''}</div></div>
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
    EDIT = { key: id, dirty: true, pickTpl: true, face: 'out', sel: '', delArm: false, item: cleanItem({ id: '', no: prev && prev.no ? prev.no + 1 : null, date: thisSunday(), title: '', layout: 3, blocks: [], status: 'draft' }) };
    EDIT.item.id = '';
    return;
  }
  const it = S.items.find(i => i.id === id); if (!it) { EDIT = null; return; }
  EDIT = { key: id, dirty: false, face: 'out', sel: '', delArm: false, item: JSON.parse(JSON.stringify(it)) };
}
function wire(blocks, layout) {
  const fake = { layout, blocks };
  const face = f => `<div class="bl-wf c${layout}">${faceCols(fake, f).map(col => `<div>${col.map(b => `<i class="${b.k === 'cover' ? 'cv' : ''}">${esc(b.k === 'cover' ? '표지' : b.title || KINDS[b.k].name)}</i>`).join('')}</div>`).join('')}</div>`;
  return `<div class="bl-wires"><span>겉면</span>${face('out')}<span>속면</span>${face('in')}</div>`;
}
function chooser() {
  const back = `<a class="back-link" href="#week">${ic('back')}<span>이번 주</span></a>`, others = S.items.filter(i => i.id);
  return `${back}<p class="eyebrow top-eyebrow">${esc(X.churchName())}</p><div class="page-top"><h1>주보 만들기</h1></div>
    <p class="fine bl-sub">어떤 틀로 시작할까요? 칸이 미리 만들어지고, 글과 칸은 나중에 모두 고칠 수 있어요.</p>
    <div class="bl-tpls">${TPL.map(t => `<button type="button" class="card bl-tpl" data-bl="tpl" data-t="${t.id}"><b>${esc(t.name)}</b><span class="fine">${esc(t.hint)}</span>${wire(t.make(), t.layout)}<span class="bl-tpl-go">이 틀로 시작 ›</span></button>`).join('')}</div>
    ${others.length ? `<section class="card bl-tpl-copy"><b>지난 주보에서 시작하기</b><p class="fine">고른 주보의 칸과 글을 그대로 복사해요. 날짜는 한 주 뒤로, 호수는 하나 올라가요.</p>
      <div class="bl-inl"><select class="field" id="blFrom" aria-label="가져올 주보">${others.map(o => `<option value="${o.id}">${esc(o.no ? `제${o.no}호 ` : '')}${esc(dayText(o.date))}</option>`).join('')}</select><button class="btn" type="button" data-bl="tpl-copy">복사해서 시작</button></div></section>` : ''}`;
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
// 표지 그림 고르기: 위에 지금 고른 그림, 아래에 네 갈래(추천, 절기, 성경 책, 조용한 방). 한 번에 몇 장만 보여 줘서 고르기 쉽게 한다
const PK_TABS = [['rec', '추천'], ['season', '절기'], ['book', '성경 책'], ['room', '조용한 방']];
const pk = () => (EDIT.pick = EDIT.pick || { tab: 'rec', seed: 0, season: '', more: 12, ot: 1 });
const pickBtn = (b, id, label, cap) => `<button type="button" class="bl-pic${b.img === id ? ' on' : ''}" data-bl="pic" data-v="${id}" aria-label="${esc(label)}" title="${esc(label)}"><img src="${picUrl(id)}" alt="" loading="lazy">${cap ? `<i>${esc(cap)}</i>` : ''}</button>`;
const curPic = b => b.img ? `<div class="bl-cur"><img src="${picUrl(b.img)}" alt=""><div><b>고른 그림</b><span>${esc(picLabel(b.img))}</span><button type="button" class="quiet-link" data-bl="pic" data-v="">그림 빼기 ›</button></div></div>` : `<p class="fine bl-cur-none">아직 그림을 고르지 않았어요. 그림 없이도 괜찮아요.</p>`;
function pickGrid() {
  const it = EDIT.item, b = it.blocks.find(x => x.id === EDIT.sel), P = pk(), more = ids => ids.length > P.more ? `<button class="btn ghost small" type="button" data-bl="pk-more">그림 더 보기 (${ids.length - P.more}장 남음)</button>` : '';
  if (P.tab === 'rec') { const se = seasonOf(it.date); return `<p class="fine">${esc(dayText(it.date))}은 <b>${se[1]}</b>에 들어가요. 이 절기에 어울리는 그림을 골라 놨어요.</p><div class="bl-pics">${recommend(se, it.date, P.seed).map(id => pickBtn(b, id, picLabel(id))).join('')}</div><button class="btn ghost small" type="button" data-bl="pk-seed">다른 그림 보기</button>`; }
  if (P.tab === 'season') {
    const sid = P.season || seasonOf(it.date)[0], ids = seasonIds(sid);
    return `<div class="bl-chips2">${SEASONS.map(x => `<button type="button" class="${x[0] === sid ? 'on' : ''}" data-bl="pk-season" data-v="${x[0]}">${x[1]}</button>`).join('')}</div><div class="bl-pics">${ids.slice(0, P.more).map(id => pickBtn(b, id, picLabel(id))).join('')}</div>${more(ids)}`;
  }
  if (P.tab === 'book') {
    const list = bookIds(!!P.ot);
    return `<div class="bl-chips2">${[[1, '구약'], [0, '신약']].map(x => `<button type="button" class="${!!x[0] === !!P.ot ? 'on' : ''}" data-bl="pk-test" data-v="${x[0]}">${x[1]}</button>`).join('')}</div><div class="bl-pics books">${list.map(([id, name]) => pickBtn(b, id, `${name} 표지`, name)).join('')}</div>`;
  }
  const ids = weeklyIds();
  return `<p class="fine">탁자와 창가 같은 조용한 방 그림이에요. 어느 주에나 어울려요.</p><div class="bl-pics">${ids.slice(0, P.more).map(id => pickBtn(b, id, picLabel(id))).join('')}</div>${more(ids)}`;
}
function pickerHtml(b) {
  const P = pk();
  return `<div class="bl-picker"><div data-pk-cur>${curPic(b)}</div><div class="bl-tabs2" role="tablist">${PK_TABS.map(([v, t]) => `<button type="button" role="tab" class="${P.tab === v ? 'on' : ''}" aria-selected="${P.tab === v}" data-bl="pk-tab" data-v="${v}">${t}</button>`).join('')}</div><div data-pk-grid>${pickGrid()}</div>
    <p class="fine">그림은 AI로 만든 앱 안의 그림이에요. 사진을 올리는 길은 아직 없어요.</p></div>`;
}
function inspector() {
  const it = EDIT.item, b = it.blocks.find(x => x.id === EDIT.sel);
  if (!b) return `<section class="card bl-ins bl-ins-empty"><p class="fine">고칠 칸을 눌러 보세요. 칸 제목 줄을 누르면 여기서 글을 고칠 수 있어요.</p></section>`;
  const K = KINDS[b.k];
  let f = `<div class="bl-ins-h"><h3>${esc(K.name)} 고치기</h3><button class="bl-x" type="button" data-bl="desel" aria-label="닫기">${ic('x')}</button></div>`;
  if (b.k !== 'cover') f += textField('칸 제목', 'title', b.title, 30);
  const place = `<div class="bl-fld"><label>놓을 곳</label><div class="bl-pair">${seg([['out', '겉면'], ['in', '속면']], b.face, 'data-face')}${seg([1, 2, 3].slice(0, it.layout).map(n => [n, n + '단']), colOf(b, it.layout), 'data-colset')}</div></div>`;
  if (b.k !== 'cover') f += place;
  if (b.k === 'cover') {
    f += `<div class="bl-fld"><label>표지 그림</label>${pickerHtml(b)}</div>
      <div class="bl-fld"><label>그림 위치</label>${seg([['l', '왼쪽'], ['c', '가운데'], ['r', '오른쪽']], b.pos, 'data-pos')}<p class="fine">세로로 긴 표지 칸에는 그림이 일부만 보여요. 보이는 쪽을 골라요.</p></div>`
      + textField('한 줄(교회가 직접 쓴 글)', 'line', b.line, 80) + textField('말씀 장절(본문은 적지 않아요)', 'verse', b.verse, 30, 'placeholder="예: 시편 23:1"')
      + textField('담임목사 이름', 'pastor', b.pastor, 20) + textField('절기나 주일 이름', 'sub', b.sub, 30, 'placeholder="예: 대림절 첫째 주일"') + place;
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
    f += `<div class="bl-fld"><label>글</label><textarea class="field" rows="6" data-f="text" maxlength="1200">${esc(b.text)}</textarea><p class="fine">성경 본문을 그대로 옮기지 말고 장절이나 풀어 쓴 글로 적어 주세요(번역본 저작권).</p></div>`;
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
  if (EDIT.pickTpl) return chooser();
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
    <div class="bl-warn">${ic('lock')}<span>회원의 이름, 연락처, 개인 사정은 쓰지 말아 주세요. 이 글은 교회 모두가 읽고, 서버에 잠그지 않고 저장돼요. 성경 번역본은 대한성서공회가 저작권을 가지고 있어서, 본문을 그대로 옮기려면 공회의 사용 허락이 필요할 수 있어요. 본문 대신 장절만 적거나 직접 풀어 써 주세요. 올린 글의 책임은 글을 쓴 교회에 있어요.</span></div></section>
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
function applyCopy(o) {
  const d = parseYmd(o.date) || new Date(); d.setDate(d.getDate() + 7);
  EDIT.item.layout = o.layout; EDIT.item.blocks = o.blocks.map(b => Object.assign(JSON.parse(JSON.stringify(b)), { id: uid() }));
  EDIT.item.date = ymd(d); EDIT.item.no = o.no ? o.no + 1 : null; EDIT.item.title = ''; EDIT.sel = ''; touch(); X.toast('복사했어요. 날짜와 글을 고쳐 주세요.'); X.repaint();
}
// 성경 본문을 옮겨 적은 듯한 글(장절 표시가 있고 길다)을 찾아 올리기 전에 한 번 알려 준다. 번역본은 저작권이 있다
const QUOTE_REF = /(\d+\s*장\s*\d+\s*절|[가-힣]{1,6}\s*\d+\s*[:：]\s*\d+)/;
const looksQuoted = it => it.blocks.some(b => { const t = b.k === 'free' ? b.text : b.k === 'news' ? b.items.map(i => i.x).join('\n') : ''; return t && t.length >= 90 && QUOTE_REF.test(t); });
const acts = {
  async save() { if (await save()) X.repaint(); },
  async view() { const r = EDIT.dirty ? await save() : EDIT.item; if (r) location.hash = '#bulletin-' + (r.id || EDIT.item.id); },
  async prn() { const r = EDIT.dirty ? await save() : EDIT.item; if (r) location.hash = '#bulletin-print-' + (r.id || EDIT.item.id); },
  async open() { if (looksQuoted(EDIT.item) && !window.confirm('성경 본문을 그대로 옮겨 적은 글이 있는 것 같아요. 번역본은 대한성서공회가 저작권을 가지고 있어서, 본문을 옮기려면 공회의 사용 허락이 필요할 수 있어요. 장절만 적거나 직접 풀어 쓰는 쪽을 권해요. 그래도 올릴까요?')) return; const r = EDIT.dirty || !EDIT.item.id ? await save() : EDIT.item; if (!r) return; try { const s = cleanItem(await X.store.status(r.id, true)); EDIT.item.status = 'open'; const at = S.items.findIndex(i => i.id === s.id); if (at >= 0) S.items[at] = s; X.toast('올렸어요. 교회 모두에게 보여요.'); X.repaint(); } catch (e) { X.toast(e && e.message ? e.message : '올리지 못했어요.'); } },
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
    applyCopy(o);
  },
  tpl(e, el) {
    const t = TPL.find(x => x.id === el.dataset.t); if (!t) return;
    EDIT.item.layout = t.layout; EDIT.item.blocks = t.make().map(cleanBlock); EDIT.pickTpl = false; EDIT.sel = ''; touch(); X.repaint(); window.scrollTo(0, 0);
  },
  'tpl-copy'() { const o = S.items.find(i => i.id === ($('#blFrom') || {}).value); if (!o) return; EDIT.pickTpl = false; applyCopy(o); window.scrollTo(0, 0); },
  sel(e, el) { if (e.target.closest('.bl-tools')) return; EDIT.sel = el.dataset.id; redraw(); const i = $('#blIns'); if (i && matchMedia('(max-width: 899px)').matches) i.querySelector('input,textarea') && i.querySelector('input,textarea').focus({ preventScroll: true }); },
  desel() { EDIT.sel = ''; redraw(); },
  mv(e, el) {
    const it = EDIT.item, b = it.blocks.find(x => x.id === el.dataset.id), d = Number(el.dataset.d); if (!b) return;
    const same = it.blocks.filter(x => x.face === b.face && colOf(x, it.layout) === colOf(b, it.layout)), at = same.indexOf(b), to = same[at + d]; if (!to) return;
    const i1 = it.blocks.indexOf(b), i2 = it.blocks.indexOf(to); it.blocks[i1] = to; it.blocks[i2] = b; touch(); redraw('sheet');
  },
  col(e, el) { const it = EDIT.item, b = it.blocks.find(x => x.id === el.dataset.id); if (!b) return; b.col = Math.min(it.layout, Math.max(1, colOf(b, it.layout) + Number(el.dataset.d))); touch(); redraw(); },
  'del-blk'(e, el) { const it = EDIT.item, b = it.blocks.find(x => x.id === el.dataset.id); if (!b) return; if (b.k !== 'cover' && visible(b) && !window.confirm(`'${b.title}' 칸을 지울까요?`)) return; it.blocks = it.blocks.filter(x => x !== b); if (EDIT.sel === b.id) EDIT.sel = ''; touch(); X.repaint(); },
  pic(e, el) {
    const b = selBlk(); if (!b) return; b.img = el.dataset.v; touch(); redraw('sheet');
    const ins = $('#blIns'); if (!ins) return;
    $$('.bl-pic', ins).forEach(x => x.classList.toggle('on', x.dataset.v === b.img));
    const cur = $('[data-pk-cur]', ins); if (cur) cur.innerHTML = curPic(b);
  },
  'pk-tab'(e, el) { const P = pk(); P.tab = el.dataset.v; P.more = 12; redraw('ins'); },
  'pk-season'(e, el) { const P = pk(); P.season = el.dataset.v; P.more = 12; redraw('ins'); },
  'pk-test'(e, el) { pk().ot = Number(el.dataset.v) ? 1 : 0; redraw('ins'); },
  'pk-more'() { pk().more += 12; redraw('ins'); },
  'pk-seed'() { pk().seed += 1; redraw('ins'); },
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
