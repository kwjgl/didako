/* 넓은 지도 장소의 원본은 note/img/map/wide-places.json, 바꾸면 둘 다 고친다. */
/* 말씀 지도 시안의 "오늘의 질문 <-> 장소" 짝. 글·장절·짝은 모두 AI 초안이고 교역자 확인 전이다. 화면에는 보이지 않는 기록이다.
   질문 키는 note/questions-data.js의 그림 파일 이름(예: "advent-01")이다. 질문 409개를 하나씩 보고(ref와 bg 글) 정했다.
   - 장소를 단 질문: 141개 (Q_PLACES). 장소가 분명하고 지도 안(옛칸 36x46)인 것만 달았다.
   - 지도 밖 장소로 적은 질문: 83개 (Q_PLACES_OUT). 에덴·이집트·시내산·바벨론·로마 등. 지도를 넓힐 때 쓴다. 편지는 받는 곳 이름으로 적었다.
   - 짝 없는 질문: 185개. 시편·잠언·서신서·예언서 대부분처럼 일어난 곳이 정해지지 않은 것, 비유만 있는 것, 위치가 분명하지 않은 것.
   (합 409. 예루살렘 안의 곳(성전·겟세마네·골고다·베데스다·다락방 등)은 모두 jerusalem이다.)
   판단 기준: 일이 일어난 곳이 ref와 bg 글에서 분명할 때만 달았다. 예언자의 말씀이 그곳을 언급할 뿐이면 달지 않았다.
   장소 키는 prototype/scripture-map/index.html의 마을 19곳·이야기 터 12곳 키를 먼저 썼고, 그 31곳에 없는 지도 안의 곳은 Q_PLACES_NEW(6곳)로 더했다. */
window.Q_PLACES_NEW = {
  caesareaphilippi: { name: "가이사랴 빌립보", x: 25, y: 6, region: "갈릴리 북쪽" },
  gerasa: { name: "거라사", x: 24, y: 17, region: "요단 동편" },
  samaria: { name: "사마리아 성", x: 13, y: 25, region: "사마리아" },
  caesarea: { name: "가이사랴", x: 6, y: 20, region: "해안" },
  emmaus: { name: "엠마오 길", x: 10, y: 35, region: "유다" },
  moab: { name: "모압 평지", x: 24, y: 34, region: "요단 동편" }
};

window.Q_PLACES = {
  // jerusalem (67)
  "advent-07": "jerusalem",
  "advent-08": "jerusalem",
  "advent-12": "jerusalem",
  "advent-18": "jerusalem",
  "advent-22": "jerusalem",
  "christmas-03": "jerusalem",
  "christmas-04": "jerusalem",
  "christmas-10": "jerusalem",
  "christmas-11": "jerusalem",
  "epiphany-01": "jerusalem",
  "epiphany-10": "jerusalem",
  "epiphany-13": "jerusalem",
  "epiphany-25": "jerusalem",
  "lent-28": "jerusalem",
  "lent-31": "jerusalem",
  "lent-33": "jerusalem",
  "lent-36": "jerusalem",
  "lent-39": "jerusalem",
  "lent-40": "jerusalem",
  "lent-41": "jerusalem",
  "lent-42": "jerusalem",
  "lent-44": "jerusalem",
  "lent-45": "jerusalem",
  "easter-01": "jerusalem",
  "easter-02": "jerusalem",
  "easter-08": "jerusalem",
  "easter-09": "jerusalem",
  "easter-10": "jerusalem",
  "easter-11": "jerusalem",
  "easter-18": "jerusalem",
  "easter-39": "jerusalem",
  "easter-40": "jerusalem",
  "easter-42": "jerusalem",
  "easter-44": "jerusalem",
  "easter-45": "jerusalem",
  "easter-46": "jerusalem",
  "easter-47": "jerusalem",
  "easter-48": "jerusalem",
  "easter-50": "jerusalem",
  "after-pentecost-01": "jerusalem",
  "after-pentecost-02": "jerusalem",
  "after-pentecost-10": "jerusalem",
  "after-pentecost-30": "jerusalem",
  "after-pentecost-41": "jerusalem",
  "after-pentecost-42": "jerusalem",
  "after-pentecost-43": "jerusalem",
  "after-pentecost-45": "jerusalem",
  "after-pentecost-51": "jerusalem",
  "after-pentecost-62": "jerusalem",
  "after-pentecost-64": "jerusalem",
  "after-pentecost-66": "jerusalem",
  "after-pentecost-76": "jerusalem",
  "after-pentecost-84": "jerusalem",
  "after-pentecost-87": "jerusalem",
  "after-pentecost-89": "jerusalem",
  "after-pentecost-91": "jerusalem",
  "after-pentecost-92": "jerusalem",
  "after-pentecost-93": "jerusalem",
  "after-pentecost-96": "jerusalem",
  "after-pentecost-102": "jerusalem",
  "after-pentecost-108": "jerusalem",
  "after-pentecost-128": "jerusalem",
  "after-pentecost-153": "jerusalem",
  "after-pentecost-163": "jerusalem",
  "after-pentecost-170": "jerusalem",
  "after-pentecost-171": "jerusalem",
  "after-pentecost-195": "jerusalem",
  // bethlehem (6)
  "advent-05": "bethlehem",
  "christmas-02": "bethlehem",
  "after-pentecost-15": "bethlehem",
  "after-pentecost-17": "bethlehem",
  "after-pentecost-99": "bethlehem",
  "special-days-01": "bethlehem",
  // bethany (4)
  "lent-23": "bethany",
  "lent-34": "bethany",
  "lent-43": "bethany",
  "easter-17": "bethany",
  // jericho (2)
  "lent-35": "jericho",
  "after-pentecost-08": "jericho",
  // hebron (3)
  "advent-03": "hebron",
  "epiphany-54": "hebron",
  "after-pentecost-85": "hebron",
  // shiloh (3)
  "advent-06": "shiloh",
  "after-pentecost-21": "shiloh",
  "after-pentecost-94": "shiloh",
  // carmel (2)
  "advent-09": "carmel",
  "after-pentecost-50": "carmel",
  // gilead (1)
  "after-pentecost-78": "gilead",
  // baptism (7)
  "advent-20": "baptism",
  "advent-21": "baptism",
  "epiphany-02": "baptism",
  "epiphany-03": "baptism",
  "epiphany-04": "baptism",
  "epiphany-05": "baptism",
  "after-pentecost-54": "baptism",
  // nazareth (2)
  "advent-23": "nazareth",
  "epiphany-62": "nazareth",
  // shechem (2)
  "epiphany-11": "shechem",
  "after-pentecost-88": "shechem",
  // capernaum (9)
  "epiphany-12": "capernaum",
  "epiphany-22": "capernaum",
  "epiphany-51": "capernaum",
  "epiphany-63": "capernaum",
  "epiphany-64": "capernaum",
  "lent-16": "capernaum",
  "lent-18": "capernaum",
  "lent-25": "capernaum",
  "easter-36": "capernaum",
  // shore (5)
  "epiphany-23": "shore",
  "easter-12": "shore",
  "easter-13": "shore",
  "easter-15": "shore",
  "easter-16": "shore",
  // bethsaida (1)
  "epiphany-48": "bethsaida",
  // storm (2)
  "epiphany-26": "storm",
  "lent-11": "storm",
  // jonah (1)
  "lent-07": "jonah",
  // sarepta (1)
  "after-pentecost-49": "sarepta",
  // dothan (1)
  "after-pentecost-18": "dothan",
  // tabor (1)
  "after-pentecost-20": "tabor",
  // elah (1)
  "after-pentecost-28": "elah",
  // engedi (1)
  "after-pentecost-35": "engedi",
  // caesareaphilippi (2)
  "lent-06": "caesareaphilippi",
  "lent-09": "caesareaphilippi",
  // gerasa (1)
  "epiphany-31": "gerasa",
  // samaria (3)
  "after-pentecost-59": "samaria",
  "after-pentecost-61": "samaria",
  "after-pentecost-97": "samaria",
  // caesarea (4)
  "after-pentecost-14": "caesarea",
  "after-pentecost-34": "caesarea",
  "after-pentecost-68": "caesarea",
  "after-pentecost-79": "caesarea",
  // emmaus (5)
  "easter-03": "emmaus",
  "easter-04": "emmaus",
  "easter-05": "emmaus",
  "easter-06": "emmaus",
  "easter-07": "emmaus",
  // moab (4)
  "lent-05": "moab",
  "lent-13": "moab",
  "lent-20": "moab",
  "after-pentecost-03": "moab"
};

window.Q_PLACES_OUT = {
  "advent-01": "에덴동산",
  "advent-10": "수산(페르시아 왕궁)",
  "advent-13": "바벨론",
  "advent-14": "바벨론",
  "christmas-05": "로마(편지 받은 곳)",
  "christmas-09": "이집트",
  "epiphany-20": "호렙 산",
  "epiphany-21": "호렙 산",
  "epiphany-27": "시내 광야",
  "epiphany-32": "홍해",
  "epiphany-35": "이집트",
  "epiphany-37": "홍해",
  "epiphany-40": "아람 나하라임(하란 가까이)",
  "epiphany-42": "마라",
  "epiphany-45": "이집트",
  "epiphany-47": "르비딤",
  "epiphany-50": "이집트",
  "epiphany-52": "호렙 산",
  "epiphany-55": "이집트",
  "epiphany-60": "시내 광야",
  "lent-01": "니느웨",
  "lent-04": "가데스 바네아",
  "lent-10": "광야",
  "lent-12": "니느웨",
  "lent-17": "광야",
  "lent-24": "가데스(므리바)",
  "easter-14": "로마(편지 받은 곳)",
  "easter-23": "로마(편지 받은 곳)",
  "easter-24": "로마(편지 받은 곳)",
  "easter-25": "고린도(편지 받은 곳)",
  "easter-26": "고린도(편지 받은 곳)",
  "easter-27": "로마(편지 받은 곳)",
  "easter-28": "고린도(편지 받은 곳)",
  "easter-29": "고린도(편지 받은 곳)",
  "easter-30": "고린도(편지 받은 곳)",
  "easter-31": "고린도(편지 받은 곳)",
  "easter-32": "고린도(편지 받은 곳)",
  "easter-33": "고린도(편지 받은 곳)",
  "easter-35": "로마(편지 받은 곳)",
  "easter-49": "바벨론",
  "after-pentecost-07": "에베소",
  "after-pentecost-26": "다메섹",
  "after-pentecost-38": "이집트",
  "after-pentecost-47": "루스드라",
  "after-pentecost-53": "호렙 산",
  "after-pentecost-55": "빌립보",
  "after-pentecost-60": "아덴",
  "after-pentecost-65": "수산(페르시아 왕궁)",
  "after-pentecost-69": "수산(페르시아 왕궁)",
  "after-pentecost-70": "수산(페르시아 왕궁)",
  "after-pentecost-72": "다메섹",
  "after-pentecost-73": "수산(페르시아 왕궁)",
  "after-pentecost-74": "수산(페르시아 왕궁)",
  "after-pentecost-82": "시글락(남쪽 광야)",
  "after-pentecost-103": "수산(페르시아 왕궁)",
  "after-pentecost-106": "고린도(편지 받은 곳)",
  "after-pentecost-109": "고린도(편지 받은 곳)",
  "after-pentecost-112": "갈라디아(편지 받은 곳)",
  "after-pentecost-117": "에베소(편지 받은 곳)",
  "after-pentecost-122": "로마(편지 받은 곳)",
  "after-pentecost-124": "니느웨",
  "after-pentecost-125": "고린도(편지 받은 곳)",
  "after-pentecost-126": "바벨론",
  "after-pentecost-127": "골로새(편지 받은 곳)",
  "after-pentecost-133": "로마(편지 받은 곳)",
  "after-pentecost-135": "갈라디아(편지 받은 곳)",
  "after-pentecost-138": "데살로니가(편지 받은 곳)",
  "after-pentecost-141": "고린도(편지 받은 곳)",
  "after-pentecost-146": "고린도(편지 받은 곳)",
  "after-pentecost-149": "로마(편지 받은 곳)",
  "after-pentecost-158": "갈라디아(편지 받은 곳)",
  "after-pentecost-159": "바벨론",
  "after-pentecost-162": "고린도(편지 받은 곳)",
  "after-pentecost-165": "바벨론",
  "after-pentecost-168": "로마(편지 받은 곳)",
  "after-pentecost-176": "데살로니가(편지 받은 곳)",
  "after-pentecost-183": "바벨론",
  "after-pentecost-186": "갈라디아(편지 받은 곳)",
  "after-pentecost-187": "고린도(편지 받은 곳)",
  "after-pentecost-193": "에돔(보스라)",
  "after-pentecost-194": "데살로니가(편지 받은 곳)",
  "after-pentecost-204": "바벨론",
  "after-pentecost-205": "로마(편지 받은 곳)"
};

// 노트와 지도가 함께 쓰는 장소 이름·이야기. 시안의 마을 19곳·이야기 터 12곳을 그대로 옮겼다.
window.MAP_TOWNS = {
  sarepta: { name: "사르밧", region: "해안", x: 14, y: 2, stories: [
    { ref: "왕상 17:8~16", era: "proph", t: "엘리야가 한 과부의 집에 머문 이야기" },
    { ref: "눅 4:25~26", era: "jesus", t: "엘리야 때 사르밧 과부를 돌보신 일을 떠올리신 말씀" }
  ] },
  tyre: { name: "두로", region: "해안", x: 13, y: 6, stories: [
    { ref: "왕상 5:1~12", era: "king", t: "히람이 솔로몬에게 나무를 보내 준 이야기" },
    { ref: "겔 27:1~3", era: "proph", t: "무역으로 이름난 두로를 노래한 글" },
    { ref: "막 7:24~30", era: "jesus", t: "두로 지방에서 있었던 한 어머니의 이야기" }
  ] },
  capernaum: { name: "가버나움", region: "갈릴리", x: 22, y: 13, stories: [
    { ref: "막 2:1~12", era: "jesus", t: "친구들이 지붕을 뚫고 사람을 내려 보낸 이야기" },
    { ref: "마 8:5~13", era: "jesus", t: "백부장의 종 이야기" },
    { ref: "창 8:6~12", era: "pat", t: "노아의 방주에서 날려 보낸 비둘기 이야기" }
  ] },
  shore: { name: "갈릴리 호숫가", region: "갈릴리", x: 20, y: 15, stories: [
    { ref: "마 4:18~22", era: "jesus", t: "호숫가에서 어부들이 부름을 받은 이야기" },
    { ref: "막 4:35~41", era: "jesus", t: "호수 위 폭풍 이야기" },
    { ref: "요 21:1~14", era: "jesus", t: "밤새 그물을 던진 어부들 이야기" }
  ] },
  cana: { name: "가나", region: "갈릴리", x: 17, y: 16, stories: [
    { ref: "요 2:1~11", era: "jesus", t: "혼인 잔치 이야기" },
    { ref: "요 4:46~54", era: "jesus", t: "왕의 신하가 아들을 위해 찾아온 이야기" }
  ] },
  nazareth: { name: "나사렛", region: "갈릴리", x: 15, y: 18, stories: [
    { ref: "눅 1:26~27", era: "jesus", t: "마리아가 놀라운 소식을 들은 이야기" },
    { ref: "눅 4:16", era: "jesus", t: "자라신 마을 회당에서 있었던 일" },
    { ref: "창 22:3", era: "pat", t: "아브라함이 먼 산으로 길을 나선 이야기" }
  ] },
  dothan: { name: "도단", region: "사마리아", x: 14, y: 23, stories: [
    { ref: "창 37:17~28", era: "pat", t: "요셉이 형들을 찾아 도단까지 온 이야기" },
    { ref: "왕하 6:13~17", era: "proph", t: "엘리사와 불말 이야기" },
    { ref: "창 24:10", era: "pat", t: "아브라함의 종이 신붓감을 찾으러 길을 떠난 이야기" }
  ] },
  shechem: { name: "세겜", region: "사마리아", x: 15, y: 27, stories: [
    { ref: "창 12:6~7", era: "pat", t: "아브라함이 처음 제단을 쌓은 곳" },
    { ref: "수 24:1", era: "exo", t: "이스라엘 지파들이 모인 곳" },
    { ref: "요 4:4~6", era: "jesus", t: "우물가에서 한 여인을 만난 이야기" }
  ] },
  gilead: { name: "길르앗", region: "요단 동편", x: 27, y: 22, stories: [
    { ref: "창 37:25", era: "pat", t: "길르앗에서 오는 상인들의 낙타 행렬" },
    { ref: "삿 11:1~3", era: "exo", t: "길르앗 사람 입다의 이야기" },
    { ref: "렘 8:22", era: "proph", t: "길르앗의 유향을 말한 예언자의 글" }
  ] },
  joppa: { name: "욥바", region: "해안", x: 3, y: 30, stories: [
    { ref: "대하 2:16", era: "king", t: "성전 나무를 뗏목으로 욥바까지 보낸 이야기" },
    { ref: "행 9:36~43", era: "church", t: "다비다를 기억하는 이야기" },
    { ref: "욘 1:3", era: "proph", t: "요나가 배를 탄 곳" }
  ] },
  jerusalem: { name: "예루살렘", region: "유다", x: 13, y: 36, stories: [
    { ref: "왕상 6:1", era: "king", t: "솔로몬이 성전 짓기를 시작한 이야기" },
    { ref: "왕상 10:1~10", era: "king", t: "남쪽 나라 여왕이 솔로몬을 찾아온 이야기" },
    { ref: "행 2:1~4", era: "church", t: "제자들이 한곳에 모였던 오순절 이야기" }
  ] },
  bethany: { name: "베다니", region: "유다", x: 15, y: 36, stories: [
    { ref: "요 11:1~44", era: "jesus", t: "나사로의 집 이야기" },
    { ref: "요 12:1~8", era: "jesus", t: "식사 자리에서 향유를 부은 이야기" }
  ] },
  inn: { name: "여관", region: "유다", x: 17, y: 35, stories: [
    { ref: "눅 10:30~37", era: "jesus", t: "강도 만난 사람을 돌본 이웃 이야기" }
  ] },
  jericho: { name: "여리고", region: "유다", x: 19, y: 34, stories: [
    { ref: "수 6:1~20", era: "exo", t: "여리고 성이 무너진 이야기" },
    { ref: "눅 19:1~10", era: "jesus", t: "뽕나무에 올라간 삭개오 이야기" },
    { ref: "막 10:46~52", era: "jesus", t: "길가에 앉은 한 사람 이야기" }
  ] },
  bethlehem: { name: "베들레헴", region: "유다", x: 13, y: 38, stories: [
    { ref: "룻 1:22", era: "exo", t: "룻과 나오미가 보리 거두는 때에 돌아온 이야기" },
    { ref: "삼상 16:1~13", era: "king", t: "다윗이 기름 부음을 받은 이야기" },
    { ref: "마 2:1", era: "jesus", t: "동방에서 온 사람들이 찾아온 마을" }
  ] },
  elah: { name: "엘라 골짜기", region: "유다", x: 8, y: 38, stories: [
    { ref: "삼상 17:1~3", era: "king", t: "이스라엘과 블레셋이 마주 선 골짜기" },
    { ref: "삼상 17:17~18", era: "king", t: "다윗이 형들에게 먹을 것을 가져간 이야기" }
  ] },
  hebron: { name: "헤브론", region: "유다", x: 11, y: 41, stories: [
    { ref: "창 23:17~20", era: "pat", t: "아브라함이 가족 묘지를 산 이야기" },
    { ref: "삼하 2:1~4", era: "king", t: "다윗이 유다의 왕으로 세워진 이야기" }
  ] },
  engedigate: { name: "엔게디 어귀", region: "유다", x: 16, y: 43, stories: [
    { ref: "삼상 24:1~2", era: "king", t: "사울이 다윗을 쫓아 엔게디 광야로 온 이야기" },
    { ref: "대하 20:2", era: "king", t: "엔게디에 대군이 모였다는 소식" }
  ] },
  engedi: { name: "엔게디", region: "유다", x: 18, y: 43, stories: [
    { ref: "삼상 24:1~7", era: "king", t: "다윗이 동굴에서 사울을 살려 준 이야기" },
    { ref: "아 1:14", era: "king", t: "엔게디 포도원의 꽃을 노래한 글" }
  ] }
};
window.MAP_SPOTS = {
  carmel: { name: "갈멜산", region: "해안", x: 9, y: 12, ref: "왕상 18:19~20", era: "proph", line: "엘리야가 바알의 예언자들과 마주 섰던 산이에요." },
  tabor: { name: "다볼산", region: "갈릴리", x: 19, y: 20, ref: "삿 4:6", era: "exo", line: "드보라와 바락이 군사를 모았던 산이라네." },
  gilboa: { name: "길보아산", region: "사마리아", x: 17, y: 22, ref: "삼상 31:1", era: "king", line: "사울 왕이 마지막 싸움을 한 산이에요." },
  bethsaida: { name: "벳새다 들판", region: "갈릴리", x: 24, y: 14, ref: "눅 9:10~17", era: "jesus", line: "떡 다섯 개와 물고기 두 마리로 많은 사람이 먹은 들판이지." },
  storm: { name: "호수 한가운데", region: "갈릴리", x: 22, y: 16, ref: "막 4:35~41", era: "jesus", line: "바로 이 물 위에서 거센 바람이 잠잠해졌다네." },
  bethel: { name: "벧엘", region: "사마리아", x: 14, y: 33, ref: "창 28:10~19", era: "pat", line: "야곱이 돌베개를 베고 꿈을 꾼 곳이에요." },
  shiloh: { name: "실로", region: "사마리아", x: 15, y: 29, ref: "삼상 1:9~11", era: "king", line: "한나가 아들을 달라고 기도했던 성막이 있던 곳이에요." },
  baptism: { name: "요단 세례터", region: "요단", x: 21, y: 33, ref: "마 3:13~17", era: "jesus", line: "요단강 이 물가에서 세례를 받으셨다네." },
  beersheba: { name: "브엘세바", region: "광야", x: 11, y: 44, ref: "창 21:31~33", era: "pat", line: "아브라함이 우물을 파고 맹세한 곳이에요." },
  adullam: { name: "아둘람 굴", region: "유다", x: 7, y: 41, ref: "삼상 22:1~2", era: "king", line: "다윗이 숨었던 굴일세. 힘든 사람들이 그에게 모여들었지." },
  saltpillar: { name: "소금 기둥", region: "사해", x: 18, y: 45, ref: "창 19:26", era: "pat", line: "뒤를 돌아본 롯의 아내 이야기가 전해지는 곳이에요." },
  jonah: { name: "큰 물고기", region: "해안", x: 0, y: 29, ref: "욘 1:17", era: "proph", line: "요나를 삼킨 큰 물고기 이야기, 들어 보셨지요?" }
};
window.MAP_NAMES = Object.fromEntries(Object.entries({ ...MAP_TOWNS, ...MAP_SPOTS, ...Q_PLACES_NEW }).map(([key, p]) => [key, p.name]));
window.MAP_STORIES = Object.fromEntries(Object.entries({ ...MAP_TOWNS, ...MAP_SPOTS, ...Q_PLACES_NEW }).map(([key, p]) => [key, p.stories || (p.ref ? [{ ref: p.ref, t: p.line }] : [])]));

// 넓은 지도: x·y는 3456×2016 원화의 픽셀 좌표다.
window.WIDE_PLACES = {
  "rome": {
    "name": "로마",
    "x": 91,
    "y": 120,
    "kind": "town"
  },
  "athens": {
    "name": "아덴",
    "x": 1112,
    "y": 547,
    "kind": "town"
  },
  "corinth": {
    "name": "고린도",
    "x": 1035,
    "y": 555,
    "kind": "town"
  },
  "philippi": {
    "name": "빌립보",
    "x": 1163,
    "y": 217,
    "kind": "town"
  },
  "thessalonica": {
    "name": "데살로니가",
    "x": 1040,
    "y": 257,
    "kind": "town"
  },
  "ephesus": {
    "name": "에베소",
    "x": 1441,
    "y": 551,
    "kind": "town"
  },
  "colossae": {
    "name": "골로새",
    "x": 1615,
    "y": 569,
    "kind": "town"
  },
  "lystra": {
    "name": "루스드라",
    "x": 1896,
    "y": 588,
    "kind": "town"
  },
  "galatia": {
    "name": "갈라디아",
    "x": 1943,
    "y": 335,
    "kind": "region"
  },
  "damascus": {
    "name": "다메섹",
    "x": 2255,
    "y": 1034,
    "kind": "town"
  },
  "haran": {
    "name": "하란",
    "x": 2504,
    "y": 668,
    "kind": "town"
  },
  "nineveh": {
    "name": "니느웨",
    "x": 2878,
    "y": 724,
    "kind": "town"
  },
  "babylon": {
    "name": "바벨론",
    "x": 2994,
    "y": 1140,
    "kind": "town"
  },
  "susa": {
    "name": "수산",
    "x": 3342,
    "y": 1178,
    "kind": "town"
  },
  "goshen": {
    "name": "이집트(고센)",
    "x": 1846,
    "y": 1329,
    "kind": "town"
  },
  "memphis": {
    "name": "이집트(멤피스)",
    "x": 1796,
    "y": 1433,
    "kind": "town"
  },
  "redsea": {
    "name": "홍해",
    "x": 1914,
    "y": 1422,
    "kind": "sea"
  },
  "marah": {
    "name": "마라",
    "x": 1946,
    "y": 1493,
    "kind": "region"
  },
  "rephidim": {
    "name": "르비딤",
    "x": 2010,
    "y": 1558,
    "kind": "region"
  },
  "horeb": {
    "name": "호렙 산",
    "x": 2044,
    "y": 1576,
    "kind": "mountain"
  },
  "kadesh": {
    "name": "가데스 바네아",
    "x": 2085,
    "y": 1346,
    "kind": "town"
  },
  "bozrah": {
    "name": "에돔(보스라)",
    "x": 2192,
    "y": 1337,
    "kind": "town"
  },
  "ziklag": {
    "name": "시글락",
    "x": 2110,
    "y": 1264,
    "kind": "town"
  }
};
window.WIDE_CANAAN = {"x": 2064, "y": 1035, "w": 165, "h": 273};
// 광야·에덴동산은 자리를 만들지 않는다. 편지는 받는 곳에 잇는다.
{
  const places = {
    "고린도(편지 받은 곳)": "corinth",
    "로마(편지 받은 곳)": "rome",
    "바벨론": "babylon",
    "수산(페르시아 왕궁)": "susa",
    "이집트": "goshen",
    "호렙 산": "horeb",
    "시내 광야": "horeb",
    "갈라디아(편지 받은 곳)": "galatia",
    "니느웨": "nineveh",
    "데살로니가(편지 받은 곳)": "thessalonica",
    "홍해": "redsea",
    "다메섹": "damascus",
    "아람 나하라임(하란 가까이)": "haran",
    "마라": "marah",
    "르비딤": "rephidim",
    "가데스 바네아": "kadesh",
    "가데스(므리바)": "kadesh",
    "에베소": "ephesus",
    "에베소(편지 받은 곳)": "ephesus",
    "루스드라": "lystra",
    "빌립보": "philippi",
    "아덴": "athens",
    "시글락(남쪽 광야)": "ziklag",
    "골로새(편지 받은 곳)": "colossae",
    "에돔(보스라)": "bozrah"
  };
  window.Q_WIDE = Object.fromEntries(Object.entries(window.Q_PLACES_OUT).flatMap(([key, name]) => places[name] ? [[key, places[name]]] : []));
}
Object.entries(window.WIDE_PLACES).forEach(([key, p]) => { window.MAP_NAMES[key] = p.name; });
