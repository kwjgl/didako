// 제본용 PDF(2026-11-26): 교재 한 권을 B5 책 한 권의 본문과 표지(표1~표4, 책등)로 엮는다.
// 이 파일은 글을 얹을 HTML과 CSS만 만든다. 화면(DOM)은 건드리지 않는다. 앱 관리자 화면(#bind-교재)이 부르고,
// 쪽 나누기와 인쇄는 book-print.html이 한다(vendor/paged.polyfill.min.js, 쪽 나누기 도구). 본문은 시범 PDF와 같은 모양이다.
window.DidakoBookPrint = (() => {
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const cssStr = s => String(s == null ? '' : s).replace(/[\\"\n\r]/g, ' ');
  const COLORS = { green: '#2B6A62', amber: '#A9561B', blue: '#2F5D95', rose: '#A8435C', ink: '#33332F', paper: '#6B4A2E' };
  const PAGE = { w: 176, h: 250, bleed: 3 };   // B5
  // 책 정보의 처음 값. 서버에 맡긴 값(info)이 있으면 그것이 우선이다
  const INFO_DEFAULT = { publisher: '', madeAt: '', isbn: '', blurb: '', review: false, guide: true, lines: 2, spine: '' };
  // 교재마다 처음부터 들어 있는 표4 소개 글. 서버에 맡긴 글이 있으면 그것이 우선이다
  const BLURB = {
    'hebrew-eyes': '성경이 처음 들렸던 세계의 사람들은 하나님과 세상과 사람을 어떻게 보았을까요?\n그 눈을 하나씩 빌려 구약 성경을 다시 읽어 봅니다.'
  };
  const infoOf = (bookId, saved) => {
    const i = Object.assign({}, INFO_DEFAULT, saved || {});
    if (!String(i.blurb || '').trim() && BLURB[bookId]) i.blurb = BLURB[bookId];
    i.lines = [0, 2, 3].includes(Number(i.lines)) ? Number(i.lines) : 2;
    return i;
  };
  const splitTitle = t => { const m = String(t || '').split(/:\s+/); return m.length > 1 ? [m[0], m.slice(1).join(': ')] : [String(t || ''), '']; };
  const splitHead = h => { const m = String(h || '').split(/\s·\s/); return m.length > 1 ? [m[0], m.slice(1).join(' · ')] : ['', h || '']; };
  const todayText = d => `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;

  // ── ISBN과 바코드(EAN-13) ──
  const digits = s => String(s || '').replace(/\D/g, '');
  const ean13Ok = d => d.length === 13 && ((10 - d.slice(0, 12).split('').reduce((a, c, i) => a + Number(c) * (i % 2 ? 3 : 1), 0) % 10) % 10) === Number(d[12]);
  // 입력한 ISBN에서 바코드에 쓸 13자리를 뽑는다. 하이픈·공백·'ISBN' 글자는 무시하고, 10자리 옛 번호는 978을 붙여 13자리로 바꾸며,
  // 13자리 뒤에 부가기호(5자리 등)가 붙어 있으면 앞 13자리만 쓴다. 올바른 번호가 아니면 빈 글자를 돌려준다
  const isbn13 = s => {
    const t = String(s || '').replace(/isbn/gi, '').replace(/[\s-]/g, '');
    if (/^\d{9}[\dXx]$/.test(t)) {
      const sum = t.split('').reduce((a, c, i) => a + (/x/i.test(c) ? 10 : Number(c)) * (10 - i), 0);
      if (sum % 11) return '';
      const b = '978' + t.slice(0, 9);
      return b + ((10 - b.split('').reduce((a, c, i) => a + Number(c) * (i % 2 ? 3 : 1), 0) % 10) % 10);
    }
    const d = digits(t).slice(0, 13);
    return ean13Ok(d) && /^97[89]/.test(d) ? d : '';
  };
  const isbnOk = s => !!isbn13(s);
  const L = ['0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011'];
  const G = ['0100111', '0110011', '0011011', '0100001', '0011101', '0111001', '0000101', '0010001', '0001001', '0010111'];
  const R = ['1110010', '1100110', '1101100', '1000010', '1011100', '1001110', '1010000', '1000100', '1001000', '1110100'];
  const PAR = ['LLLLLL', 'LLGLGG', 'LLGGLG', 'LLGGGL', 'LGLLGG', 'LGGLLG', 'LGGGLL', 'LGLGLG', 'LGLGGL', 'LGGLGL'];
  function barcodeSvg(isbn) {
    const d = isbn13(isbn); if (!d) return '';
    let bits = '101';
    for (let i = 0; i < 6; i++) bits += (PAR[d[0]][i] === 'L' ? L : G)[d[i + 1]];
    bits += '01010';
    for (let i = 0; i < 6; i++) bits += R[d[i + 7]];
    bits += '101';
    const guard = new Set([0, 1, 2, 45, 46, 47, 48, 49, 92, 93, 94]);
    let bars = '';
    for (let i = 0; i < bits.length; i++) if (bits[i] === '1') bars += `<rect x="${i + 11}" y="4" width="1" height="${guard.has(i) ? 58 : 52}"/>`;
    return `<svg viewBox="0 0 117 74" xmlns="http://www.w3.org/2000/svg"><rect width="117" height="74" fill="#fff"/><g fill="#000">${bars}</g>`
      + `<g font-family="IBM Plex Sans KR, sans-serif" font-size="8.4" fill="#000"><text x="2" y="69">${d[0]}</text><text x="${11 + 3}" y="69" textLength="42" lengthAdjust="spacing">${d.slice(1, 7)}</text><text x="${11 + 50}" y="69" textLength="42" lengthAdjust="spacing">${d.slice(7)}</text></g></svg>`;
  }
  // 책등 폭(mm): 직접 정한 값이 있으면 그것, 없으면 종이 한 장(2쪽) 0.1mm와 표지 0.4mm로 셈한다(모조지 80g 가정)
  const spineOf = (pages, info) => { const n = Number(info.spine); return n > 0 ? n : Math.max(3, +(pages / 2 * 0.1 + 0.4).toFixed(1)); };

  // ── 본문 ──
  // opts: { book, lessons: [{no,name,ref,intro,wrap,stages,triple}], info, md(text→html), imgBase, today, memo, logoHtml, symbolSrc }
  function body(opts) {
    const { book, lessons, md, imgBase, logoHtml } = opts, info = infoOf(book.id, opts.info), memo = Number(opts.memo) || 0;
    const color = COLORS[(book.cover || {}).color] || COLORS.amber;
    const titleText = cssStr(book.title);
    const lines = info.lines > 0 ? `<div class="lines" style="--n:${info.lines}"></div>` : '';
    const vsHtml = vs => (Array.isArray(vs) && vs.filter(x => String(x || '').trim()).length ? `<p class="vs">${esc(vs.filter(x => String(x || '').trim()).join(', '))}</p>` : '');
    const pieces = q => {
      const paragraphs = String(q.t || '').replace(/\r\n?/g, '\n').split('\n\n'), placed = new Map(), out = [];
      (Array.isArray(q.imgs) ? q.imgs.slice(0, 6) : []).forEach(img => {
        if (!img || !/^[a-z0-9-]{1,60}\.(jpg|png)$/.test(img.src || '') || !(img.w >= 100 && img.h >= 100)) return;
        const pos = Math.min(Math.max(0, Math.trunc(Number(img.after) || 0)), paragraphs.length);
        if (!placed.has(pos)) placed.set(pos, []); placed.get(pos).push(img);
      });
      for (let i = 0; i <= paragraphs.length; i++) {
        if (i) out.push(md(paragraphs[i - 1]));
        (placed.get(i) || []).forEach(img => out.push(`<figure style="--r:${(img.w / img.h).toFixed(4)}"><img src="${esc(imgBase + img.src)}" alt="${esc(img.alt || '')}">${img.cap ? `<figcaption>${esc(img.cap)}</figcaption>` : ''}</figure>`));
      }
      return out.join('');
    };
    let anyNotes = false, anyTriple = false;
    const lessonHtml = Ls => {
      const [main, sub] = splitTitle(Ls.name);
      let qn = 0, notes = '';
      const stages = (Ls.stages || []).map(st => {
        const items = (st.qs || []).map(q => {
          if (!String(q.t || '').trim()) return '';
          if (q.kind === 'read') {
            if (q.h === '각주') { notes = md(q.t); anyNotes = true; return ''; }
            const [lab, title] = splitHead(q.h);
            return `<section class="read">${lab ? `<p class="lab">${esc(lab)}</p>` : ''}${title ? `<h3>${esc(title)}</h3>` : ''}<div class="md">${pieces(q)}</div>${vsHtml(q.vs)}</section>`;
          }
          qn += 1;
          return `<div class="q"><span class="n">${qn}</span><div><p class="t">${esc(q.t)}</p>${q.sub ? `<p class="help">${esc(q.sub)}</p>` : ''}${vsHtml(q.vs)}${lines}</div></div>`;
        }).join('');
        return items.trim() ? `<h4 class="stage">${esc(st.name)}</h4>${items}` : '';
      }).join('');
      const tri = (Ls.triple || []).filter(t => String(t.t || '').trim());
      if (tri.length) anyTriple = true;
      const triple = tri.length ? `<h4 class="stage">깊이 묵상하기</h4><p class="deep-lead">오늘 말씀에서 삼위일체 하나님을 묵상해요.</p>${tri.map(t => `<div class="q tri"><span class="who">${esc(t.who)}</span><div><p class="t">${esc(t.t)}</p>${lines}</div></div>`).join('')}` : '';
      const wrap = String(Ls.wrap || '').trim() ? `<div class="wrap"><p class="lab">마무리</p><p>${esc(Ls.wrap)}</p></div>` : '';
      return `<section class="lesson" id="L${Ls.no}">
        <header class="opener"><p class="no">제 ${Ls.no} 과</p><h2>${esc(main)}</h2>${sub ? `<p class="sub">${esc(sub)}</p>` : ''}${String(Ls.ref || '').trim() ? `<p class="ref">${esc(Ls.ref)}</p>` : ''}${String(Ls.intro || '').trim() ? `<p class="intro">${esc(Ls.intro)}</p>` : ''}</header>
        ${stages}${triple}${wrap}${notes ? `<div class="notes"><p class="lab">각주</p>${notes}</div>` : ''}</section>`;
    };
    const lessonsHtml = lessons.map(lessonHtml).join('');
    const toc = `<section class="toc"><h1>차례</h1><ol>${lessons.map(Ls => { const [main, sub] = splitTitle(Ls.name); return `<li><span class="tn">제${Ls.no}과</span><span class="tt">${esc(main)}${sub ? `<small>${esc(sub)}</small>` : ''}${String(Ls.ref || '').trim() ? `<small>${esc(Ls.ref)}</small>` : ''}</span><a class="tp2" href="#L${Ls.no}"></a></li>`; }).join('')}</ol></section>`;
    const stageNames = ((lessons[0] && lessons[0].stages) || []).filter(s => (s.qs || []).some(q => String(q.t || '').trim())).map(s => s.name);
    const guide = info.guide ? `<section class="guide"><h1>이 책을 읽는 법</h1><ol>
      <li><span><b>성경을 곁에 펴 놓고 읽어요.</b> 이 책은 성경 본문을 싣지 않고 장절만 알려 드려요. 과의 제목 밑에 있는 본문을 먼저 직접 읽어요.</span></li>
      ${stageNames.length ? `<li><span><b>한 과는 이렇게 이어져요.</b> ${esc(stageNames.join(', '))} 순서로 읽어 가요.</span></li>` : ''}
      <li><span><b>질문은 먼저 스스로 생각해요.</b> ${info.lines > 0 ? '질문 밑 줄에 떠오른 생각을 적어도 좋고, 모임에서 나누어도 좋아요.' : '떠오른 생각을 모임에서 나누어도 좋아요.'} 맞는 답을 찾는 시험이 아니에요.</span></li>
      ${anyTriple ? '<li><span><b>깊이 묵상하기는 천천히 해요.</b> 과마다 끝에 아버지, 아들, 성령 하나님을 따라 말씀을 묵상하는 세 질문이 있어요.</span></li>' : ''}
      </ol>${anyNotes ? '<p class="small">각주는 과 끝에 모아 두었어요. 더 읽고 싶을 때 책 이름을 찾아보세요.</p>' : ''}</section>` : '';
    const madeAt = String(info.madeAt || '').trim() || todayText(opts.today || new Date());
    const rightsLines = [
      `<p><b>${esc(book.title)}</b></p>`, '<div class="sep"></div>',
      '<p>성경 본문은 싣지 않았습니다. 각 과의 본문은 각자 성경에서 펴서 읽습니다.</p>',
      info.review ? '<p>이 책은 감수 전 시범 인쇄본입니다.</p>' : '', '<div class="sep"></div>',
      String(info.publisher || '').trim() ? `<p>펴낸 곳 ${esc(info.publisher)}</p>` : '', `<p>만든 날 ${esc(madeAt)}</p>`,
      String(info.isbn || '').trim() ? `<p>ISBN ${esc(info.isbn)}</p>` : ''
    ].join('');
    const front = `
      <section class="front half"><h1>${esc(book.title)}</h1></section>
      <section class="front tpage"><div class="tp"><div class="top"><h1>${esc(book.title)}</h1></div><img class="sym" src="${esc(opts.symbolSrc || '')}" alt=""><div class="logo">${logoHtml || ''}</div></div></section>
      <section class="front rights"><div class="rr">${rightsLines}</div></section>`;
    const memoHtml = Array.from({ length: memo }, () => '<section class="memo"><p>메모</p><div class="grid"></div></section>').join('');
    const pageRules = `
@page { size: ${PAGE.w}mm ${PAGE.h}mm; margin: 22mm 16mm 24mm 22mm;
  @top-left { content: ""; font: 400 7.6pt 'IBM Plex Sans KR'; color: #8a8378; vertical-align: bottom; padding-bottom: 6mm; }
  @top-right { content: ""; font: 400 7.6pt 'IBM Plex Sans KR'; color: #8a8378; vertical-align: bottom; padding-bottom: 6mm; }
  @bottom-left { content: ""; font: 500 8.4pt 'IBM Plex Sans KR'; color: #6b6458; vertical-align: top; padding-top: 7mm; }
  @bottom-right { content: ""; font: 500 8.4pt 'IBM Plex Sans KR'; color: #6b6458; vertical-align: top; padding-top: 7mm; } }
@page :left { margin-left: 16mm; margin-right: 22mm; }
@page :right { margin-left: 22mm; margin-right: 16mm; }
@page lesson:left { @top-left { content: "${titleText}"; } @bottom-left { content: counter(page); } }
@page lesson:right { @top-right { content: string(lt); } @bottom-right { content: counter(page); } }
@page lesson:first { @top-right { content: ""; } }
@page memo:left { @bottom-left { content: counter(page); } }
@page memo:right { @bottom-right { content: counter(page); } }`;   // 과의 첫 쪽은 늘 오른쪽 쪽이라 :first 하나로 충분하다. 첫 쪽에는 머리말만 빼고 쪽 번호는 넣는다(2026-11-26, 사용자). 메모 쪽도 쪽 번호를 넣는다
    const css = `${pageRules}
:root { --ac: ${color}; --ink: #1d1a16; --mut: #5f594f; --line: #cfc7b8; --tint: color-mix(in srgb, ${color} 9%, #fff); }
* { box-sizing: border-box; }
html { font: 400 10.4pt/1.88 'Gowun Batang', serif; color: var(--ink); -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; }
p { margin: 0; }
.lab { break-after: avoid; font: 600 7.8pt/1.4 'IBM Plex Sans KR'; letter-spacing: .12em; color: var(--ac); margin: 0 0 1.4mm; }
.front { page: front; break-before: page; }
.half { display: flex; flex-direction: column; justify-content: center; height: 196mm; text-align: center; break-before: auto; }
.half h1 { font: 700 17pt/1.5 'Gowun Batang'; word-break: keep-all; margin: 0; }
.tpage { break-before: right; }
.tp { height: 196mm; display: flex; flex-direction: column; text-align: center; }
.tp .top { margin-top: 48mm; }
.tp h1 { font: 700 26pt/1.4 'Gowun Batang'; margin: 0; word-break: keep-all; text-wrap: balance; }
.tp .sym { width: 34mm; height: 34mm; margin: 14mm auto 0; object-fit: contain; }
.tp .logo { margin-top: auto; color: #33332f; display: flex; justify-content: center; align-items: center; gap: 2.6mm; }
.logo .k { width: 8.5mm; height: 8.5mm; } .logo .wm { height: 3.1mm; width: auto; }
.rights .rr { height: 196mm; display: flex; flex-direction: column; justify-content: flex-end; font: 400 8.4pt/1.85 'IBM Plex Sans KR'; color: var(--mut); }
.rights b { color: var(--ink); font-weight: 600; }
.rights .sep { height: .5mm; width: 12mm; background: var(--ac); margin: 4mm 0; }
.toc { page: front; break-before: right; }
.toc h1, .guide h1 { font: 700 15pt 'Gowun Batang'; margin: 0 0 8mm; }
.toc ol { list-style: none; margin: 0; padding: 0; }
.toc li { display: grid; grid-template-columns: 14mm 1fr auto; column-gap: 2mm; align-items: baseline; padding: 2.1mm 0; border-bottom: .2mm solid var(--line); break-inside: avoid; }
.toc .tn { font: 600 8.4pt 'IBM Plex Sans KR'; color: var(--ac); }
.toc .tt { font: 700 10pt/1.5 'Gowun Batang'; word-break: keep-all; }
.toc .tt small { display: block; font: 400 8.2pt/1.4 'IBM Plex Sans KR'; color: var(--mut); margin-top: .6mm; }
.toc .tp2 { font: 500 8.4pt 'IBM Plex Sans KR'; color: var(--mut); text-decoration: none; }
.toc .tp2::after { content: target-counter(attr(href), page); }
.guide { page: front; break-before: right; }
.guide ol { margin: 0 0 6mm; padding: 0; list-style: none; counter-reset: s; }
.guide li { counter-increment: s; display: grid; grid-template-columns: 8mm 1fr; margin: 0 0 3.4mm; font-size: 10pt; line-height: 1.75; }
.guide li::before { content: counter(s); font: 600 9pt 'IBM Plex Sans KR'; color: var(--ac); }
.guide .small { font: 400 8.8pt/1.8 'IBM Plex Sans KR'; color: var(--mut); border-top: .2mm solid var(--line); padding-top: 4mm; }
.lesson { page: lesson; break-before: right; }
.opener { padding: 12mm 0 6mm; }
.opener .no { font: 600 8.6pt 'IBM Plex Sans KR'; letter-spacing: .32em; color: var(--ac); }
.opener .no::after { content: ''; display: block; width: 12mm; height: .5mm; background: var(--ac); margin-top: 3.4mm; }
.opener h2 { font: 700 21pt/1.4 'Gowun Batang'; margin: 7mm 0 0; word-break: keep-all; text-wrap: balance; string-set: lt content(text); }
.opener .sub { font: 400 13.2pt/1.5 'Gowun Batang'; color: var(--mut); margin-top: 1.6mm; word-break: keep-all; }
.opener .ref { font: 700 10.4pt 'Gowun Batang'; color: var(--ac); margin-top: 5mm; }
.opener .intro { font: 400 9.8pt/1.85 'Gowun Batang'; color: var(--mut); margin-top: 3mm; word-break: keep-all; }
h4.stage { font: 600 8.4pt/1.4 'IBM Plex Sans KR'; letter-spacing: .14em; color: var(--ac); margin: 9mm 0 3.4mm; padding-bottom: 1.6mm; border-bottom: .3mm solid var(--ac); break-after: avoid; }
.q { display: grid; grid-template-columns: 8mm 1fr; margin: 4.6mm 0 0; break-inside: avoid; }
.q .n { font: 700 10.4pt 'Gowun Batang'; color: var(--ac); }
.q .who { font: 600 8.4pt/2 'IBM Plex Sans KR'; color: var(--ac); white-space: nowrap; }
.q.tri { grid-template-columns: 14mm 1fr; }
.q .t { font-weight: 700; word-break: keep-all; line-height: 1.7; }
.q .help { font: 400 8.6pt/1.65 'IBM Plex Sans KR'; color: var(--mut); margin-top: .8mm; word-break: keep-all; }
.vs { font: 500 8.4pt/1.6 'IBM Plex Sans KR'; color: var(--ac); margin-top: .8mm; }
.vs::before { content: '읽을 곳  '; color: var(--mut); font-weight: 400; }
.lines { height: calc(var(--n) * 8mm); margin-top: 1mm; background-image: repeating-linear-gradient(to bottom, transparent 0 7.7mm, #bdb5a6 7.7mm 8mm); }
.deep-lead { font: 400 9.6pt 'Gowun Batang'; color: var(--mut); margin-bottom: 1mm; }
.read { margin: 5.4mm 0 0; }
.read h3 { font: 700 11pt/1.55 'Gowun Batang'; margin: 0 0 1.6mm; break-after: avoid; word-break: keep-all; }
.md p { text-align: justify; word-break: keep-all; orphans: 2; widows: 2; }
.md p + p { text-indent: 1em; }
.md strong { font-weight: 700; }
.md em { font-style: normal; font-weight: 400; background: linear-gradient(transparent 62%, color-mix(in srgb, var(--ac) 18%, transparent) 62%); }
.md blockquote { margin: 2.4mm 0; padding: .6mm 0 .6mm 4mm; border-left: .6mm solid var(--ac); color: #3d382f; }
.md ul, .md ol { margin: 1.6mm 0; padding-left: 5.4mm; } .md li { margin: .6mm 0; }
.md h4 { font: 700 10.4pt 'Gowun Batang'; margin: 3mm 0 1mm; }
.md table { width: 100%; border-collapse: collapse; margin: 3mm 0; font: 400 8.8pt/1.6 'IBM Plex Sans KR'; }
.md th { background: var(--tint); font-weight: 600; text-align: left; }
.md th, .md td { border: .2mm solid var(--line); padding: 1.5mm 2.2mm; vertical-align: top; word-break: keep-all; }
.md tr { break-inside: avoid; }
.md .md-tw { overflow: visible; break-inside: avoid; }   /* 표가 쪽 끝에서 갈라지면 표 전체를 다음 쪽으로 넘긴다(2026-11-27, 사용자) */
.md table { break-inside: avoid; }
figure { margin: 4.4mm auto; text-align: center; break-inside: avoid; }
figure img { display: block; margin: 0 auto; width: min(100%, calc(100mm * var(--r)), 138mm); height: auto; max-height: 104mm; object-fit: contain; }
figcaption { font: 400 8.2pt/1.6 'IBM Plex Sans KR'; color: var(--mut); margin-top: 1.8mm; }
.wrap { margin: 8mm 0 0; padding: 3.4mm 4.4mm; background: var(--tint); border-left: .8mm solid var(--ac); break-inside: avoid; }
.wrap p:last-child { font: 400 9.6pt/1.8 'Gowun Batang'; word-break: keep-all; }
.notes { break-inside: avoid; margin-top: 8mm; padding-top: 3mm; border-top: .2mm solid var(--line); font: 400 7.9pt/1.7 'IBM Plex Sans KR'; color: var(--mut); }
.notes p { text-align: left; }
.notes ol { margin: 0; padding-left: 4.6mm; } .notes li { margin: 0 0 1mm; text-align: left; }
.notes em { background: none; font-style: italic; }
.memo { page: memo; break-before: page; }
.memo .grid { height: 186mm; background-image: repeating-linear-gradient(to bottom, transparent 0 7.7mm, #d9d2c5 7.7mm 8mm); }
.memo p { font: 600 8.4pt 'IBM Plex Sans KR'; letter-spacing: .14em; color: var(--ac); margin-bottom: 4mm; }`;
    return { css, html: `${front}${toc}${guide}${lessonsHtml}${memoHtml}`, title: `${book.title} 본문 B5` };
  }

  // ── 표지: 표4, 책등, 표1이 이어진 바깥 펼침면과 표2, 표3이 이어진 안쪽 펼침면 ──
  // opts: { book, info, pages, logoHtml, symbolSrc, guides(보기용 재단선·안내) }
  function cover(opts) {
    const { book, logoHtml } = opts, info = infoOf(book.id, opts.info), W = PAGE.w, H = PAGE.h, B = PAGE.bleed;
    const A = COLORS[(book.cover || {}).color] || COLORS.amber;
    const spine = spineOf(opts.pages, info), spreadW = +(B + W + spine + W + B).toFixed(1), spreadH = H + 2 * B;
    const [tMain, tSub] = splitTitle(book.title);
    const bar = barcodeSvg(info.isbn), isbnText = String(info.isbn || '').trim().replace(/^isbn[\s:]*/i, '');
    const g = true;   // 보기용 재단선·표 이름·바코드 자리는 화면에만 보이고 인쇄에서는 빠진다
    const st = Math.min(13, Math.max(8, spine * 1.3)).toFixed(1);
    const css = `
@page { size: ${spreadW}mm ${spreadH}mm; margin: 0; }
* { box-sizing: border-box; } html, body { margin: 0; } p { margin: 0; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; font-family: 'Gowun Batang', serif; }
.spread { position: relative; width: ${spreadW}mm; height: ${spreadH}mm; break-after: page; overflow: hidden; background: color-mix(in srgb, ${A} 16%, #F7F8F6); }
.spread:last-child { break-after: auto; }
.panel { position: absolute; top: 0; height: ${spreadH}mm; overflow: hidden; }
.pL { left: 0; width: ${B + W}mm; } .pS { left: ${B + W}mm; width: ${spine}mm; } .pR { left: ${(B + W + spine).toFixed(1)}mm; width: ${W + B}mm; }
.f1 .name { position: absolute; left: 12%; right: 12%; top: ${B + 26}mm; text-align: center; color: #2E261C; }
.f1 h1 { font: 700 34pt/1.38 'Gowun Batang'; margin: 0; word-break: keep-all; text-wrap: balance; color: color-mix(in srgb, ${A} 72%, #1b1b1b); }
.f1 .st { font: 400 13pt/1.6 'Gowun Batang'; margin-top: 7mm; color: #4a4137; }
.f1 img { position: absolute; left: 25%; width: 52%; top: 42%; }
.f1 .brand { position: absolute; left: 12%; right: 12%; bottom: ${B + 14}mm; display: flex; justify-content: center; align-items: center; gap: 3mm; color: #33332f; }
.k { width: 9mm; height: 9mm; } .wm { height: 3.4mm; width: auto; }
.f4 .blurb { position: absolute; left: ${B + 20}mm; right: 28mm; top: ${B + 56}mm; font: 400 11pt/2 'Gowun Batang'; color: #2E261C; word-break: keep-all; }
.f4 .blurb .q1 { font: 700 15pt/1.7 'Gowun Batang'; color: color-mix(in srgb, ${A} 72%, #1b1b1b); display: block; margin-bottom: 7mm; word-break: keep-all; }
.f4 .brand { position: absolute; left: ${B + 20}mm; bottom: ${B + 14}mm; display: flex; align-items: center; gap: 2.4mm; color: #33332f; }
.f4 .brand .k { width: 7.4mm; height: 7.4mm; } .f4 .brand .wm { height: 2.8mm; }
.f4 .bc { position: absolute; right: 26mm; bottom: ${B + 14}mm; width: 46mm; height: 29mm; }
.f4 .bc svg { display: block; width: 100%; height: 100%; }
.f4 .bt { position: absolute; right: 26mm; bottom: ${B + 14 + 30.5}mm; width: 70mm; text-align: right; font: 500 7.6pt/1.4 'IBM Plex Sans KR'; color: #33332f; letter-spacing: .02em; }
.f4 .bcg { position: absolute; right: 26mm; bottom: ${B + 14}mm; width: 46mm; height: 26mm; border: .3mm dashed #a69c8c; display: grid; place-items: center; font: 400 7pt/1.5 'IBM Plex Sans KR'; color: #a69c8c; text-align: center; }
.pS { background: color-mix(in srgb, ${A} 52%, #F7F8F6); }
.spine-t { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%) rotate(90deg); white-space: nowrap; font: 700 ${st}pt 'Gowun Batang'; color: #2E1A0C; }
.spine-k { position: absolute; left: 50%; bottom: ${B + 10}mm; transform: translateX(-50%); width: ${Math.min(7, Math.max(2, spine - 2)).toFixed(1)}mm; color: #2E1A0C; }
.spine-k .k { width: 100%; height: auto; } .spine-k .wm { display: none; }
.in { background: color-mix(in srgb, ${A} 7%, #fff); }
.in .brand { position: absolute; left: 0; right: 0; bottom: ${B + 14}mm; display: flex; justify-content: center; align-items: center; gap: 2.4mm; color: #8a8378; }
.in .brand .k { width: 7mm; height: 7mm; } .in .brand .wm { height: 2.6mm; }
.in .tag { position: absolute; left: 0; right: 0; top: ${B + 14}mm; text-align: center; font: 600 7.6pt 'IBM Plex Sans KR'; letter-spacing: .3em; color: ${A}; }
.g { position: absolute; pointer-events: none; }
@media print { .g, .tag, .bcg { display: none !important; } }`;
    const guideHtml = `<div class="g" style="left:${B}mm;top:${B}mm;width:${spreadW - 2 * B}mm;height:${H}mm;outline:.25mm dashed #e11"></div><div class="g" style="left:${B + W}mm;top:0;width:0;height:100%;border-left:.25mm dashed #36c"></div><div class="g" style="left:${(B + W + spine).toFixed(1)}mm;top:0;width:0;height:100%;border-left:.25mm dashed #36c"></div>`;
    const blurb = String(info.blurb || '').trim();
    const bl = blurb.split(/\n+/).filter(Boolean);
    const outside = `<section class="spread">
      <div class="panel pL f4"><div class="blurb">${bl.length ? `<span class="q1">${esc(bl[0])}</span>${bl.slice(1).map(x => `<p>${esc(x)}</p>`).join('')}` : ''}</div>
        <div class="brand">${logoHtml || ''}</div>${isbnText ? `<p class="bt">ISBN ${esc(isbnText)}</p>` : ''}${bar ? `<div class="bc">${bar}</div>` : g ? `<div class="bcg">${isbnText ? '입력한 ISBN이 올바르지 않아 바코드를 그리지 않았어요.<br>끝자리(확인 숫자)를 다시 봐 주세요.' : 'ISBN과 바코드 자리'}</div>` : ''}</div>
      <div class="panel pS"><div class="spine-t">${esc(book.title)}</div><div class="spine-k">${logoHtml || ''}</div></div>
      <div class="panel pR f1"><div class="name"><h1>${esc(tMain)}</h1>${tSub ? `<p class="st">${esc(tSub)}</p>` : ''}</div>
        ${opts.symbolSrc ? `<img src="${esc(opts.symbolSrc)}" alt="">` : ''}<div class="brand">${logoHtml || ''}</div></div>${g ? guideHtml : ''}</section>`;
    const inside = `<section class="spread in">
      <div class="panel pL in">${g ? '<p class="tag">표 2</p>' : ''}</div>
      <div class="panel pS" style="background:color-mix(in srgb, ${A} 14%, #fff)"></div>
      <div class="panel pR in">${g ? '<p class="tag">표 3</p>' : ''}<div class="brand">${logoHtml || ''}</div></div>${g ? guideHtml : ''}</section>`;
    return { css, html: outside + inside, title: `${book.title} 표지 B5`, spine, spreadW, spreadH };
  }

  return { body, cover, infoOf, spineOf, isbnOk, isbn13, barcodeSvg, splitTitle, INFO_DEFAULT };
})();
