// 교재 표지: 색 바탕 위에 상징 하나. 상징 묶음 × 색 테마 6가지를 조합한다. 글자는 넣지 않는다(2026-11-10).
// img가 있으면 수채화 그림을, 없으면 svg 선 그림을 쓴다.
window.DIDAKO_COVERS = {
  colors: [
    ['green', '#2B6A62', '초록'],
    ['amber', '#A9561B', '주황'],
    ['blue', '#2F5D95', '파랑'],
    ['rose', '#A8435C', '장미'],
    ['ink', '#33332F', '먹색'],
    ['paper', '#6B4A2E', '종이']
  ],
  groups: [
    {
      id: 'basic', name: '기본', items: [
        { id: 'cord', img: 'img/covers/cord.webp', name: '세 겹 끈', svg: '<circle cx="24" cy="9" r="3"/><path d="M24 12v3M24 15c-7 4-8 7-5 11s10 7 5 12M24 15c7 4 8 7 5 11s-10 7-5 12M24 15c0 5-6 7-3 12s6 5 3 11"/><path d="M19 38l-4 3M24 38v4M29 38l4 3"/>' },
        { id: 'wave', img: 'img/covers/wave.webp', name: '물결', svg: '<path d="M8 17c5-5 11-5 16 0s11 5 16 0M8 25c5-5 11-5 16 0s11 5 16 0M8 33c5-5 11-5 16 0s11 5 16 0"/>' },
        { id: 'rays', img: 'img/covers/rays.webp', name: '빛살', svg: '<circle cx="24" cy="24" r="7"/><path d="M24 7v7M24 34v7M7 24h7M34 24h7M12 12l5 5M31 31l5 5M36 12l-5 5M17 31l-5 5"/>' },
        { id: 'leaf', img: 'img/covers/leaf.webp', name: '잎', svg: '<path d="M10 38C10 19 20 9 38 9c0 19-10 29-28 29Z"/><path d="M11 37c8-10 16-16 25-25M21 26l-1-9M27 21l9 1"/>' },
        { id: 'lattice', img: 'img/covers/lattice.webp', name: '창살', svg: '<rect x="10" y="9" width="28" height="30" rx="2"/><path d="M19 9v30M29 9v30M10 19h28M10 29h28"/>' },
        { id: 'star', img: 'img/covers/star.webp', name: '별', svg: '<path d="M24 7l5 11 12 2-9 8 2 12-10-6-10 6 2-12-9-8 12-2Z"/>' }
      ]
    },
    {
      id: 'fruit', name: '성령의 열매', items: [
        { id: 'love', img: 'img/covers/love.webp', name: '사랑', svg: '<circle cx="19" cy="24" r="11"/><circle cx="29" cy="24" r="11"/><path d="M24 24c-4-5-9 1 0 7 9-6 4-12 0-7Z"/>' },
        { id: 'joy', img: 'img/covers/joy.webp', name: '희락', svg: '<path d="M7 34h34M13 34a11 11 0 0 1 22 0M24 9v7M10 15l5 5M38 15l-5 5M7 25l6 2M41 25l-6 2"/>' },
        { id: 'peace', img: 'img/covers/peace.webp', name: '화평', svg: '<path d="M11 39C19 31 27 20 37 10"/><path d="M14 35c-6 0-7-5-6-9 6 0 9 4 6 9ZM18 30c-1-7 3-9 7-9 1 6-2 9-7 9ZM23 24c-1-6 3-9 7-9 0 6-2 9-7 9ZM28 19c-1-6 3-8 7-8 0 5-2 8-7 8ZM16 32c6-2 9 1 10 5-6 2-9 0-10-5ZM25 22c5-1 8 2 8 6-5 1-8-1-8-6Z"/>' },
        { id: 'patience', img: 'img/covers/patience.webp', name: '오래 참음', svg: '<path d="M8 36h32M14 40l6-4M34 40l-6-4M24 36V21M24 24c-8 0-11-6-11-11 8 0 11 5 11 11ZM24 19c0-8 5-11 11-11 0 8-5 11-11 11Z"/><path d="M21 38q3 4 6 0"/>' },
        { id: 'kindness', img: 'img/covers/kindness.webp', name: '자비', svg: '<path d="M10 30q14-5 28 0l-4 11H14Z"/><path d="M12 34q12 6 24 0"/><path d="M18 12c-4 6-4 9 0 11 4-2 4-5 0-11ZM30 8c-4 6-4 9 0 11 4-2 4-5 0-11Z"/>' },
        { id: 'goodness', img: 'img/covers/goodness.webp', name: '양선', svg: '<path d="M8 33c1-6 8-10 16-10s15 4 16 10l-3 5H11Z"/><path d="M16 28l-3 5M25 26l-3 6M34 28l-3 5M11 38h26"/><path d="M19 19c-3-3 3-4 0-7M29 19c-3-3 3-4 0-7"/>' },
        { id: 'faithfulness', img: 'img/covers/faithfulness.webp', name: '충성', svg: '<circle cx="24" cy="10" r="3"/><path d="M24 13v26M16 21h16M7 29c0 7 7 12 17 12s17-5 17-12M7 29l7-2M7 29l2 7M41 29l-7-2M41 29l-2 7"/>' },
        { id: 'gentleness', img: 'img/covers/gentleness.webp', name: '온유', svg: '<path d="M12 29c-6-1-5-10 1-11-1-7 8-10 12-5 5-6 13-1 12 5 7 2 6 10 0 12 2 7-5 11-9 7-5 5-11 2-11-3-5 1-8-1-5-5Z"/><path d="M31 19c4-5 10-3 10 2s-5 7-9 4M37 23q3 4 4 0M16 35l-2 5M28 37l-2 3"/><circle cx="37" cy="19" r=".6"/>' },
        { id: 'self-control', img: 'img/covers/self-control.webp', name: '절제', svg: '<path d="M33 30c0 6-9 9-17 6l-6-5 9-7h13l6 4-5 2Z"/><path d="M10 31l5 2M32 24c5-5 10-2 9 2-1 3-4 3-7 2"/><path d="M12 38h21M10 31l-2-1"/><path d="M10 24c-3-4-1-7 1-11 4 5 4 8-1 11ZM10 24v6"/>' }
      ]
    },
    {
      id: 'armor', name: '전신갑주', items: [
        { id: 'belt', img: 'img/covers/belt.webp', name: '진리의 허리띠', svg: '<path d="M8 18h32v14H8Z"/><rect x="19" y="20" width="12" height="10" rx="2"/><path d="M25 20v10M8 25h11M31 25h9"/>' },
        { id: 'breastplate', img: 'img/covers/breastplate.webp', name: '의의 호심경', svg: '<path d="M15 8h18l7 9-4 23H12L8 17Z"/><path d="M15 8l9 8 9-8M24 16v24M11 23h26M16 32h16"/>' },
        { id: 'shoes', img: 'img/covers/shoes.webp', name: '복음의 신', svg: '<path d="M12 8h15v16l7 5 7 3v7H7v-8l5-6Z"/><path d="M12 15h15M12 22h15M18 16l9 8M19 23l8-7M7 34h34"/>' },
        { id: 'shield', img: 'img/covers/shield.webp', name: '믿음의 방패', svg: '<path d="M11 17c0-6 6-9 13-9s13 3 13 9v8c0 9-7 14-13 17-6-3-13-8-13-17Z"/><path d="M24 13v23M14 22h20"/>' },
        { id: 'helmet', img: 'img/covers/helmet.webp', name: '구원의 투구', svg: '<path d="M9 27v-5c0-11 6-16 15-16s15 5 15 16v5H9Z"/><path d="M11 27v9l8 5V28M37 27v9l-8 5V28M19 29h10M24 27v12"/><path d="M19 7v10M24 6v11M29 7v10"/>' },
        { id: 'sword', img: 'img/covers/sword.webp', name: '성령의 검', svg: '<path d="M24 6l4 5v22h-8V11Z"/><path d="M24 9v24M12 33h24M24 33v9M21 42h6"/>' }
      ]
    },
    {
      id: 'season', name: '교회력', items: [
        { id: 'advent', img: 'img/covers/advent.webp', name: '대림', svg: '<path d="M24 8c-5 6-4 10 0 13 4-3 5-7 0-13ZM24 21v4"/><path d="M17 26h14v15H17Z"/><path d="M16 26h16M14 41h20"/>' },
        { id: 'christmas', img: 'img/covers/christmas.webp', name: '성탄', svg: '<path d="M24 7l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z"/><path d="M10 31h28l-5 10H15Z"/><path d="M12 31l12-6 12 6M17 36h14"/>' },
        { id: 'epiphany', img: 'img/covers/epiphany.webp', name: '주현', svg: '<path d="M24 20l-5-8-9-4 6 15 8 5 8-5 6-15-9 4Z"/><path d="M24 20c1-5 5-7 8-5l3 4-3 3M24 28l-4 5M24 28l4 5M32 15l4-1"/><path d="M8 37q8-3 16 0t16 0M8 42q8-3 16 0t16 0"/>' },
        { id: 'lent', img: 'img/covers/lent.webp', name: '사순', svg: '<ellipse cx="24" cy="24" rx="17" ry="8" transform="rotate(-18 24 24)"/><path d="M9 26c8-8 22-10 31-9M9 29c9-8 21-10 31-9"/><path d="M11 22l-3-5M18 17l-1-6M27 15l2-6M36 17l5-3M37 28l4 4M29 32l2 6M19 34l-2 6M11 30l-5 3"/>' },
        { id: 'easter', img: 'img/covers/easter.webp', name: '부활', svg: '<path d="M8 39V25c0-10 7-17 16-17s16 7 16 17v14"/><path d="M13 39V26c0-8 5-13 11-13s11 5 11 13v13M17 39V27c0-5 3-8 7-8s7 3 7 8v12"/><path d="M7 41h25"/><circle cx="35" cy="34" r="6"/>' },
        { id: 'pentecost', img: 'img/covers/pentecost.webp', name: '성령강림', svg: '<path d="M24 7c3 9 12 12 12 22 0 8-5 13-12 13S12 37 12 29c0-8 7-13 7-20 4 4 5 9 5 12 3-4 3-9 0-14Z"/><path d="M24 24c2 5 6 7 6 11 0 4-3 7-6 7s-6-3-6-7c0-4 4-6 6-11Z"/>' }
      ]
    }
  ]
};
