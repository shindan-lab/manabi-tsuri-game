const MAX_LEVEL = 10;
const QUESTIONS_PER_LEVEL = 5;
const STORAGE_KEY = "manabi-tsuri-save-v1";
const TEST_MODE = new URLSearchParams(location.search).get("test") === "1";

const subjectInfo = {
  math: { label: "さんすう", icon: "+", progressKey: "math" },
  roma: { label: "ローマじ", icon: "A", progressKey: "roma" },
  word: { label: "とけい", icon: "と", progressKey: "word" },
};

const places = [
  "はじまりのいけ",
  "はじまりのいけ",
  "きらきらがわ",
  "きらきらがわ",
  "みどりのみずうみ",
  "みどりのみずうみ",
  "あおぞらかいがん",
  "あおぞらかいがん",
  "ふしぎなしんかい",
  "にじいろつりば",
];

const outfits = [
  "#8fc7ff",
  "#7dd89b",
  "#ffd166",
  "#ff9f7d",
  "#9bd4d9",
  "#b69cff",
  "#f6a6c9",
  "#5cc8a7",
  "#4f83d1",
  "#f6c445",
];

const itemColors = [
  "#f6c445",
  "#7dd89b",
  "#ff9f7d",
  "#7ec8ff",
  "#ffd166",
  "#b69cff",
  "#f6a6c9",
  "#52b788",
  "#5f6caf",
  "#f8ef6d",
];

const buddyColors = [
  "#89ddff",
  "#8be8c4",
  "#ffd166",
  "#ffb3ba",
  "#baffc9",
  "#bae1ff",
  "#d7baff",
  "#f6d365",
  "#73d2de",
  "#fff176",
];

const romajiLevels = [
  [["あ", "a"], ["い", "i"], ["う", "u"], ["え", "e"], ["お", "o"]],
  [["か", "ka"], ["さ", "sa"], ["た", "ta"], ["な", "na"], ["は", "ha"]],
  [["ま", "ma"], ["や", "ya"], ["ら", "ra"], ["わ", "wa"], ["ん", "n"]],
  [["いぬ", "inu"], ["ねこ", "neko"], ["さかな", "sakana"], ["やま", "yama"], ["そら", "sora"]],
  [["くるま", "kuruma"], ["つみき", "tsumiki"], ["みかん", "mikan"], ["ひこうき", "hikouki"], ["おにぎり", "onigiri"]],
  [["すいとう", "suitou"], ["えんぴつ", "enpitsu"], ["ともだち", "tomodachi"], ["たからばこ", "takarabako"], ["あさごはん", "asagohan"]],
  [["あかちゃん", "akachan"], ["らっぱ", "rappa"], ["きって", "kitte"], ["でんしゃ", "densha"], ["きんぎょ", "kingyo"]],
  [["あさ", "asa"], ["うみ", "umi"], ["かさ", "kasa"], ["ほし", "hoshi"], ["ゆき", "yuki"]],
  [["すいか", "suika"], ["たいこ", "taiko"], ["らっぱ", "rappa"], ["きって", "kitte"], ["がっこう", "gakkou"]],
  [["オーストラリア", "oosutoraria"], ["うんどうかい", "undoukai"], ["たんじょうび", "tanjoubi"], ["しょうがっこう", "shougakkou"], ["かいすいよく", "kaisuiyoku"]],
];

const clockLevels = [
  [clockQ(1, 0), clockQ(2, 0), clockQ(3, 0), clockQ(4, 0), clockQ(5, 0)],
  [clockQ(6, 0), clockQ(7, 0), clockQ(8, 0), clockQ(9, 0), clockQ(10, 0)],
  [clockQ(1, 30), clockQ(2, 30), clockQ(3, 30), clockQ(4, 30), clockQ(5, 30)],
  [clockQ(6, 30), clockQ(7, 30), clockQ(8, 30), clockQ(9, 30), clockQ(10, 30)],
  [clockQ(1, 0, "この とけいの 1じかんごは？", 2, 0), clockQ(3, 0, "この とけいの 1じかんごは？", 4, 0), clockQ(5, 0, "この とけいの 1じかんごは？", 6, 0), clockQ(7, 0, "この とけいの 1じかんごは？", 8, 0), clockQ(9, 0, "この とけいの 1じかんごは？", 10, 0)],
  [clockQ(1, 15), clockQ(2, 45), clockQ(4, 15), clockQ(5, 45), clockQ(7, 15)],
  [clockQ(1, 5), clockQ(2, 10), clockQ(3, 20), clockQ(4, 25), clockQ(5, 55)],
  [clockQ(8, 10), clockQ(9, 25), clockQ(10, 35), clockQ(11, 40), clockQ(12, 50)],
  [clockQ(2, 0, "この とけいの 1じかんごは？", 3, 0), clockQ(4, 30, "この とけいの 1じかんごは？", 5, 30), clockQ(6, 15, "この とけいの 1じかんごは？", 7, 15), clockQ(8, 45, "この とけいの 1じかんごは？", 9, 45), clockQ(10, 20, "この とけいの 1じかんごは？", 11, 20)],
  [clockQ(6, 0, "あさの つりは？"), clockQ(12, 0, "おひるの つりは？"), clockQ(3, 30, "おやつの じかんは？"), clockQ(5, 0, "ゆうがたの つりは？"), clockQ(7, 30, "よるの じかんは？")],
];

const fishList = [
  fish("medaka", "メダカ", "よくでる", "#7ec8ff", 1, 0.2),
  fish("koi", "コイ", "よくでる", "#f4a261", 1, 0.18),
  fish("aji", "アジ", "よくでる", "#9bd4d9", 2, 0.16),
  fish("kingyo", "キンギョ", "たまにでる", "#ff7b54", 3, 0.11),
  fish("yamame", "ヤマメ", "たまにでる", "#9fd7ca", 3, 0.1),
  fish("nijimasu", "ニジマス", "たまにでる", "#b69cff", 4, 0.09),
  fish("kasago", "カサゴ", "たまにでる", "#d95d39", 5, 0.08),
  fish("rare_nijimasu", "きらきらニジマス", "レア", "#8be8c4", 5, 0.055, "./assets/fish/rare_nijimasu.png"),
  fish("rare_ayu", "ぎんいろアユ", "レア", "#e8f7ff", 6, 0.05, "./assets/fish/rare_ayu.png"),
  fish("rare_ishidai", "しましまイシダイ", "レア", "#d7d2c6", 7, 0.045, "./assets/fish/rare_ishidai.png"),
  fish("rare_tobiuo", "あおぞらトビウオ", "レア", "#5cc8ff", 8, 0.04, "./assets/fish/rare_tobiuo.png"),
  fish("rare_kingyo", "こがねキンギョ", "レア", "#f6c445", 8, 0.035, "./assets/fish/rare_kingyo.png"),
  fish("legend_koi", "にじいろコイ", "でんせつ", "#f6a6c9", 9, 0.025, "./assets/fish/legend_koi.png"),
  fish("legend_tai", "おうごんタイ", "でんせつ", "#ffd166", 10, 0.02, "./assets/fish/legend_tai.png"),
  fish("legend_coelacanth", "まぼろしシーラカンス", "でんせつ", "#5f6caf", 10, 0.015, "./assets/fish/legend_coelacanth.png"),
];

let state = loadState();
let activeSubject = "math";
let selectedLevels = { math: 1, roma: 1, word: 1 };
let quiz = null;
let selectedChoice = "";
let resetArmed = false;
let fishingBusy = false;
let pendingCatch = null;

function qChoice(prompt, topic, choices, answer) {
  return { type: "choice", prompt, topic, choices, answer };
}

function clockQ(hour, minute, prompt = "この とけいは？", answerHour = hour, answerMinute = minute) {
  const answer = timeLabel(answerHour, answerMinute);
  return {
    type: "clock",
    prompt,
    topic: clockSvg(hour, minute),
    choices: timeChoices(answerHour, answerMinute),
    answer,
  };
}

function timeLabel(hour, minute) {
  if (minute === 0) return `${hour}じ`;
  if (minute === 30) return `${hour}じはん`;
  return `${hour}じ${minute}ふん`;
}

function timeChoices(hour, minute) {
  const answer = timeLabel(hour, minute);
  const choices = new Set([answer]);
  const offsets = minute === 0 ? [1, 2, 3, -1, -2] : [5, 10, -5, -10, 15, -15];
  for (const offset of offsets) {
    if (choices.size >= 4) break;
    if (minute === 0) {
      choices.add(timeLabel(wrapHour(hour + offset), 0));
    } else {
      const total = (hour % 12) * 60 + minute + offset;
      const nextHour = wrapHour(Math.floor(total / 60));
      const nextMinute = ((total % 60) + 60) % 60;
      choices.add(timeLabel(nextHour, nextMinute));
    }
  }
  return shuffle([...choices]).slice(0, 4);
}

function wrapHour(hour) {
  const wrapped = ((hour - 1) % 12 + 12) % 12 + 1;
  return wrapped;
}

function clockSvg(hour, minute) {
  const hourAngle = (hour % 12) * 30 + minute * 0.5;
  const minuteAngle = minute * 6;
  const marks = Array.from({ length: 12 }, (_, index) => {
    const value = index + 1;
    const angle = (value * 30 - 90) * Math.PI / 180;
    const x = 100 + Math.cos(angle) * 72;
    const y = 100 + Math.sin(angle) * 72;
    return `<text x="${x}" y="${y + 6}" text-anchor="middle">${value}</text>`;
  }).join("");
  return `
    <svg class="clock-face" viewBox="0 0 200 200" role="img" aria-label="とけい">
      <circle cx="100" cy="100" r="88"></circle>
      <circle cx="100" cy="100" r="5" class="clock-center"></circle>
      <g class="clock-numbers">${marks}</g>
      <line x1="100" y1="100" x2="100" y2="48" class="clock-hand clock-hand--hour" transform="rotate(${hourAngle} 100 100)"></line>
      <line x1="100" y1="100" x2="100" y2="28" class="clock-hand clock-hand--minute" transform="rotate(${minuteAngle} 100 100)"></line>
    </svg>
  `;
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function fish(id, name, rarity, color, minLevel, weight, image = "") {
  return { id, name, rarity, color, minLevel, weight, image };
}

function defaultState() {
  return {
    levels: { math: 1, roma: 1, word: 1 },
    tickets: 0,
    bait: 0,
    fish: {},
  };
}

function loadState() {
  try {
    return { ...defaultState(), ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
  } catch {
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function clampLevel(level) {
  return Math.max(1, Math.min(MAX_LEVEL, level));
}

function currentBestLevel() {
  return Math.max(state.levels.math, state.levels.roma, state.levels.word);
}

function render() {
  renderAvatar();
  renderStatus();
  renderHome();
  renderSubjectPicker();
  renderLevelPicker();
  renderFishBook();
  document.getElementById("place-name").textContent = places[currentBestLevel() - 1];
}

function renderAvatar() {
  const snapshot = avatarSnapshot();
  const avatar = document.getElementById("avatar");
  const buddy = document.getElementById("buddy");
  const redBuddy = document.getElementById("red-buddy");
  avatar.innerHTML = `
    <img class="character-sprite hero-sprite" src="${snapshot.hero.src}" alt="しゅじんこう" />
    <span class="sprite-level">L${snapshot.hero.level}</span>
  `;
  redBuddy.innerHTML = `
    <img class="character-sprite red-buddy-sprite" src="${snapshot.red.src}" alt="とけいのあいぼう" />
    <span class="sprite-level buddy-level">L${snapshot.red.level}</span>
  `;
  buddy.innerHTML = `
    <img class="character-sprite buddy-sprite" src="${snapshot.blue.src}" alt="ローマじのあいぼう" />
    <span class="sprite-level buddy-level">L${snapshot.blue.level}</span>
  `;
}

function avatarSnapshot() {
  const math = clampLevel(state.levels.math);
  const roma = clampLevel(state.levels.roma);
  const word = clampLevel(state.levels.word);
  const elder = math === MAX_LEVEL && roma === MAX_LEVEL && word === MAX_LEVEL;
  const heroLevel = elder ? 10 : Math.min(9, math);
  return {
    hero: { key: "hero", level: heroLevel, src: heroAsset(heroLevel), name: "しゅじんこう" },
    blue: { key: "blue", level: roma, src: buddyAsset(roma), name: "あおい あいぼう" },
    red: { key: "red", level: word, src: redBuddyAsset(word), name: "あかい あいぼう" },
  };
}

function heroAsset(level) {
  if (level >= 10) return "./assets/characters/hero_lv10.png";
  if (level >= 8) return "./assets/characters/hero_lv09.png";
  if (level >= 4) return "./assets/characters/hero_lv05.png";
  return "./assets/characters/hero_lv01.png";
}

function buddyAsset(level) {
  if (level >= 8) return "./assets/buddy/buddy_lv10.png";
  if (level >= 4) return "./assets/buddy/buddy_lv05.png";
  return "./assets/buddy/buddy_lv01.png";
}

function redBuddyAsset(level) {
  if (level >= 8) return "./assets/buddy/red_buddy_lv10.png";
  if (level >= 4) return "./assets/buddy/red_buddy_lv05.png";
  return "./assets/buddy/red_buddy_lv01.png";
}

function renderStatus() {
  document.getElementById("ticket-count").textContent = state.tickets;
  document.getElementById("bait-count").textContent = state.bait;
  document.getElementById("fish-count").textContent = Object.keys(state.fish).length;
}

function renderHome() {
  for (const key of Object.keys(subjectInfo)) {
    const level = state.levels[key];
    document.getElementById(`${key}-level`).textContent = level;
    document.getElementById(`${key}-meter`).style.width = `${level * 10}%`;
  }
  const allMax = Object.values(state.levels).every((level) => level === MAX_LEVEL);
  document.getElementById("story-text").textContent = allMax
    ? "ぜんぶできた！さいごは、にこにこおじいちゃん。"
    : "すきなもんだいをえらんで、ぜんぶせいかいをめざそう。";
}

function renderSubjectPicker() {
  const picker = document.getElementById("subject-picker");
  picker.innerHTML = Object.entries(subjectInfo)
    .map(([key, info]) => `
      <button class="subject-choice ${key === activeSubject ? "is-active" : ""}" data-subject="${key}">
        ${info.icon} ${info.label}
        <span>いま れべる ${state.levels[key]}</span>
      </button>
    `)
    .join("");
}

function renderLevelPicker() {
  const picker = document.getElementById("level-picker");
  const currentMax = TEST_MODE ? MAX_LEVEL : state.levels[activeSubject];
  picker.innerHTML = Array.from({ length: MAX_LEVEL }, (_, index) => {
    const level = index + 1;
    const locked = level > currentMax;
    const active = level === selectedLevels[activeSubject];
    return `
      <button class="level-choice ${active ? "is-active" : ""} ${locked ? "is-locked" : ""}" data-level="${level}" ${locked ? "disabled" : ""}>
        ${level}
      </button>
    `;
  }).join("");
}

function setView(view) {
  document.querySelectorAll(".view").forEach((el) => el.classList.remove("is-active"));
  document.getElementById(`${view}-view`).classList.add("is-active");
  document.querySelectorAll(".tab").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === view);
  });
}

function startQuiz(subject) {
  activeSubject = subject;
  selectedChoice = "";
  const max = TEST_MODE ? MAX_LEVEL : state.levels[subject];
  selectedLevels[subject] = Math.min(clampLevel(selectedLevels[subject]), max);
  const level = selectedLevels[subject];
  quiz = {
    subject,
    level,
    index: 0,
    correct: 0,
    questions: buildQuestions(subject, level),
    locked: false,
  };
  renderSubjectPicker();
  renderLevelPicker();
  renderQuestion();
}

function selectLevel(level) {
  const max = TEST_MODE ? MAX_LEVEL : state.levels[activeSubject];
  selectedLevels[activeSubject] = Math.min(clampLevel(level), max);
  startQuiz(activeSubject);
}

function buildQuestions(subject, level) {
  if (subject === "math") return buildMathQuestions(level);
  if (subject === "roma") {
    return romajiLevels[level - 1].map(([kana, roma]) => ({
      type: "typing",
      prompt: kana,
      topic: "ローマじで うとう",
      hint: level <= 7 ? roma : "",
      answer: roma,
      answers: romajiAnswers(roma),
    }));
  }
  return clockLevels[level - 1];
}

function buildMathQuestions(level) {
  const specs = [
    () => add(1, 8, 1, 8, false),
    () => add(4, 9, 4, 9, true),
    () => sub(2, 10, 1, 9),
    () => add(8, 19, 1, 9, true),
    () => sub(11, 20, 1, 10),
    () => add(10, 89, 1, 9, true),
    () => sub(20, 50, 1, 9),
    () => add(10, 40, 10, 20, false),
    () => sub(21, 60, 10, 20),
    () => Math.random() > 0.5 ? add(20, 80, 1, 20, true) : sub(30, 80, 1, 20),
  ];
  return Array.from({ length: QUESTIONS_PER_LEVEL }, specs[level - 1]);
}

function romajiAnswers(base) {
  const parts = base.split(" ");
  const variants = parts.map(romajiWordVariants);
  return combineVariants(variants).map(normalizeAnswer);
}

function romajiWordVariants(word) {
  const map = {
    tsu: ["tsu", "tu"],
    shi: ["shi", "si"],
    chi: ["chi", "ti"],
    fu: ["fu", "hu"],
    ji: ["ji", "zi"],
    ja: ["ja", "zya"],
    ju: ["ju", "zyu"],
    jo: ["jo", "zyo"],
    sha: ["sha", "sya"],
    shu: ["shu", "syu"],
    sho: ["sho", "syo"],
    cha: ["cha", "tya"],
    chu: ["chu", "tyu"],
    cho: ["cho", "tyo"],
    gyo: ["gyo", "gilyo"],
    kyo: ["kyo", "kilyo"],
    ppa: ["ppa", "ltupa", "xtupa"],
    tte: ["tte", "ltute", "xtute"],
    kou: ["kou", "koo"],
    kyou: ["kyou", "kyoo"],
    shou: ["shou", "syou", "shoo", "syoo"],
    ou: ["ou", "oo"],
    wo: ["wo"],
  };
  let variants = [word];
  for (const [from, tos] of Object.entries(map)) {
    const next = new Set(variants);
    for (const current of variants) {
      if (!current.includes(from)) continue;
      for (const to of tos) next.add(current.split(from).join(to));
    }
    variants = [...next];
  }
  if (word.endsWith("n")) {
    variants.push(`${word}n`);
  }
  return [...new Set(variants)];
}

function combineVariants(groups) {
  return groups.reduce((acc, group) => {
    const next = [];
    for (const prefix of acc) {
      for (const item of group) {
        next.push(prefix ? `${prefix} ${item}` : item);
      }
    }
    return next;
  }, [""]);
}

function normalizeAnswer(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function add(aMin, aMax, bMin, bMax, carry) {
  let a;
  let b;
  do {
    a = rand(aMin, aMax);
    b = rand(bMin, bMax);
  } while (!carry && (a % 10) + (b % 10) >= 10);
  return { type: "number", prompt: `${a} + ${b} = ?`, answer: String(a + b) };
}

function sub(aMin, aMax, bMin, bMax) {
  const a = rand(aMin, aMax);
  const b = rand(bMin, Math.min(bMax, a));
  return { type: "number", prompt: `${a} - ${b} = ?`, answer: String(a - b) };
}

function renderQuestion() {
  const q = quiz.questions[quiz.index];
  selectedChoice = "";
  quiz.locked = false;
  document.getElementById("answer-mark").className = "answer-mark";
  document.getElementById("quiz-subtitle").textContent = subjectInfo[quiz.subject].label;
  document.getElementById("quiz-title").textContent = `れべる ${quiz.level}`;
  document.getElementById("question-count").textContent = quiz.index + 1;
  const guide = q.type === "clock" || q.type === "choice" ? q.prompt : q.topic || questionGuide(quiz.subject);
  const prompt = q.type === "clock" || q.type === "choice" && q.topic ? q.topic : q.prompt;
  document.getElementById("question-guide").textContent = guide;
  document.getElementById("question-box").innerHTML = q.hint ? `${prompt}<br><small>${q.hint}</small>` : prompt;
  document.getElementById("feedback").textContent = "";
  document.getElementById("check-answer").hidden = false;
  document.getElementById("next-question").hidden = true;
  setResultButtons(false);
  const answerBox = document.getElementById("answer-box");
  if (q.type === "choice" || q.type === "clock") {
    answerBox.innerHTML = `<div class="choice-grid">${shuffle(q.choices).map((choice) => `<button class="choice" data-choice="${choice}">${choice}</button>`).join("")}</div>`;
  } else {
    answerBox.innerHTML = `<input id="answer-input" class="answer-input" inputmode="${q.type === "number" ? "numeric" : "latin"}" autocomplete="off" />`;
    document.getElementById("answer-input").focus();
  }
}

function questionGuide(subject) {
  if (subject === "math") return "こたえを すうじで いれよう";
  if (subject === "roma") return "ローマじで うとう";
  return "あうものを えらぼう";
}

function checkAnswer() {
  if (!quiz || quiz.locked) return;
  const q = quiz.questions[quiz.index];
  const value = q.type === "choice" || q.type === "clock"
    ? selectedChoice
    : document.getElementById("answer-input").value.trim().toLowerCase().replace(/\s+/g, " ");
  if (!value) {
    document.getElementById("feedback").textContent = "こたえをいれてね。";
    return;
  }
  const ok = q.answers ? q.answers.includes(normalizeAnswer(value)) : value === q.answer;
  if (ok) quiz.correct += 1;
  quiz.locked = true;
  showAnswerMark(ok);
  document.getElementById("feedback").textContent = ok ? "せいかい！" : "ちがうよ。こたえは " + q.answer;
  document.getElementById("check-answer").hidden = true;
  document.getElementById("next-question").hidden = false;
}

function showAnswerMark(ok) {
  const mark = document.getElementById("answer-mark");
  mark.textContent = ok ? "○" : "×";
  mark.className = `answer-mark ${ok ? "is-correct" : "is-wrong"} is-showing`;
  setTimeout(() => {
    mark.classList.remove("is-showing");
  }, 900);
}

function nextQuestion() {
  if (!quiz) return;
  if (quiz.index < QUESTIONS_PER_LEVEL - 1) {
    quiz.index += 1;
    renderQuestion();
    return;
  }
  finishQuiz();
}

function finishQuiz() {
  const clear = quiz.correct === QUESTIONS_PER_LEVEL;
  const feedback = document.getElementById("feedback");
  const beforeAvatar = avatarSnapshot();
  document.getElementById("check-answer").hidden = true;
  document.getElementById("next-question").hidden = true;
  document.getElementById("answer-box").innerHTML = "";
  document.getElementById("question-box").textContent = `${quiz.correct}/5`;
  const finishedSubject = quiz.subject;
  const finishedLevel = quiz.level;
  if (clear) {
    const clearedLatestLevel = quiz.level === state.levels[quiz.subject];
    if (clearedLatestLevel && state.levels[quiz.subject] < MAX_LEVEL) {
      state.levels[quiz.subject] += 1;
    }
    const reward = ticketReward(finishedLevel);
    state.tickets += reward;
    feedback.textContent = `すごい！ぜんぶできた！つりけんを ${reward}まい もらったよ。`;
    setResultButtons(true, finishedSubject, finishedLevel, state.levels[finishedSubject]);
  } else {
    state.bait += 1;
    while (state.bait >= 3) {
      state.bait -= 3;
      state.tickets += 1;
    }
    feedback.textContent = resultMessage(quiz.correct);
    setResultButtons(true, finishedSubject, finishedLevel, state.levels[finishedSubject]);
  }
  saveState();
  render();
  if (clear) showEvolutionIfChanged(beforeAvatar, avatarSnapshot());
}

function ticketReward(level) {
  if (level >= 10) return 5;
  if (level >= 7) return 3;
  if (level >= 4) return 2;
  return 1;
}

function showEvolutionIfChanged(before, after) {
  const changed = ["hero", "blue", "red"].find((key) => before[key].src !== after[key].src);
  if (!changed) return;
  const modal = document.getElementById("evolution-modal");
  document.getElementById("evolution-before").src = before[changed].src;
  document.getElementById("evolution-after").src = after[changed].src;
  document.getElementById("evolution-title").textContent = `${after[changed].name}が ぱわーあっぷ！`;
  document.getElementById("evolution-message").textContent = `れべる ${after[changed].level} の すがたに なったよ。`;
  modal.hidden = false;
  modal.classList.remove("is-closing");
}

function setResultButtons(show, subject = activeSubject, finishedLevel = selectedLevels[activeSubject], maxLevel = state.levels[activeSubject]) {
  const retry = document.getElementById("retry-level");
  const next = document.getElementById("next-level");
  const fish = document.getElementById("go-fishing");
  retry.hidden = !show;
  fish.hidden = !show;
  next.hidden = !show || finishedLevel >= maxLevel;
  retry.dataset.subject = subject;
  retry.dataset.retryLevel = String(finishedLevel);
  next.dataset.subject = subject;
  next.dataset.nextLevel = String(Math.min(finishedLevel + 1, MAX_LEVEL));
  delete retry.dataset.level;
  delete next.dataset.level;
}

function resultMessage(correct) {
  if (correct === 4) return "おしい！あとすこし！もういちどちゃれんじしてみよう！";
  if (correct === 3) return "いいかんじ！つぎはもっとできるよ！";
  if (correct > 0) return "だいじょうぶ！ゆっくりやってみよう！";
  return "はじめてのもんだいはむずかしいね。いっしょにもういちど！";
}

function goFishing() {
  const message = document.getElementById("fishing-message");
  const button = document.getElementById("fish-button");
  const stage = document.getElementById("fishing-stage");
  if (pendingCatch) {
    finishFishing(pendingCatch);
    return;
  }
  if (fishingBusy) return;
  if (state.tickets <= 0) {
    message.textContent = "つりけんがないよ。まなびにいこう。";
    return;
  }
  fishingBusy = true;
  state.tickets -= 1;
  const caught = pickFish();
  saveState();
  render();
  stage.querySelector(".caught-fish")?.remove();
  stage.querySelector(".splash")?.remove();
  stage.classList.remove("is-rare");
  message.textContent = "うきが ゆれてるよ...";
  button.textContent = "まってね";
  button.disabled = true;

  setTimeout(() => {
    stage.classList.add("is-biting");
    const splash = document.createElement("div");
    splash.className = "splash";
    stage.appendChild(splash);
    const rare = isRareFish(caught);
    if (rare) stage.classList.add("is-rare");
    message.textContent = rare ? "すごい ひきだ！ひっぱれ！" : "きた！ひっぱれ！";
    button.textContent = "ひっぱる";
    button.disabled = false;
    pendingCatch = caught;
  }, 900 + Math.random() * 700);
}

function finishFishing(caught) {
  const message = document.getElementById("fishing-message");
  const button = document.getElementById("fish-button");
  const stage = document.getElementById("fishing-stage");
  stage.classList.remove("is-biting");
  stage.querySelector(".splash")?.remove();
  state.fish[caught.id] = (state.fish[caught.id] || 0) + 1;
  message.textContent = isRareFish(caught) ? `${caught.name} だ！やったね！` : `${caught.name} がつれた！`;
  showCaughtFish(caught);
  saveState();
  render();
  button.textContent = "つる";
  fishingBusy = false;
  pendingCatch = null;
}

function isRareFish(item) {
  return item.rarity === "レア" || item.rarity === "でんせつ";
}

function pickFish() {
  const level = currentBestLevel();
  const available = fishList.filter((item) => item.minLevel <= level);
  const total = available.reduce((sum, item) => sum + item.weight, 0);
  let draw = Math.random() * total;
  for (const item of available) {
    draw -= item.weight;
    if (draw <= 0) return item;
  }
  return available[0];
}

function showCaughtFish(fishItem) {
  const stage = document.getElementById("fishing-stage");
  stage.querySelector(".caught-fish")?.remove();
  const wrap = document.createElement("div");
  wrap.className = `caught-fish ${isRareFish(fishItem) ? "is-rare" : ""}`;
  wrap.innerHTML = fishArt(fishItem);
  stage.appendChild(wrap);
}

function renderFishBook() {
  const book = document.getElementById("fish-book");
  book.innerHTML = fishList.map((item) => {
    const count = state.fish[item.id] || 0;
    const locked = count === 0;
    return `
      <article class="fish-card ${locked ? "is-locked" : ""}">
        <div class="fish-thumb">${fishArt(item)}</div>
        <strong>${locked ? "？？？" : item.name}</strong>
        <span>${locked ? "まだだよ" : `${item.rarity} ${count}`}</span>
      </article>
    `;
  }).join("");
}

function fishArt(item) {
  if (item.image) {
    return `<img class="fish-img" src="${item.image}" alt="${item.name}" />`;
  }
  return fishSvg(item);
}

function fishSvg(item) {
  const rare = isRareFish(item);
  return `<svg class="fish-svg" viewBox="0 0 180 95" role="img" aria-label="${item.name}">
    <path d="M18 48l34-24v48z" fill="${item.color}" stroke="#234" stroke-width="5" />
    <ellipse cx="98" cy="48" rx="58" ry="32" fill="${item.color}" stroke="#234" stroke-width="5" />
    <path d="M94 20l18-16 12 24" fill="${item.color}" stroke="#234" stroke-width="5" />
    <circle cx="132" cy="40" r="5" fill="#182633" />
    <path d="M144 53q-12 10-25 0" fill="none" stroke="#234" stroke-width="4" stroke-linecap="round" />
    <path d="M68 34h32M62 48h44M70 62h30" stroke="rgba(255,255,255,.65)" stroke-width="5" stroke-linecap="round" />
    ${rare ? '<path d="M92 12l8 14 15 2-11 10 3 15-15-7-14 7 3-15-11-10 15-2z" fill="#fff176" stroke="#234" stroke-width="3" />' : ''}
  </svg>`;
}

document.addEventListener("click", (event) => {
  if (!event.target.closest(".reset-control")) resetArmed = false;

  const tab = event.target.closest(".tab");
  if (tab) setView(tab.dataset.view);

  const go = event.target.closest("[data-go]");
  if (go) setView(go.dataset.go);

  const subject = event.target.closest("[data-subject]");
  if (subject) startQuiz(subject.dataset.subject);

  const level = event.target.closest("[data-level]");
  if (level) selectLevel(Number(level.dataset.level));

  const choice = event.target.closest("[data-choice]");
  if (choice) {
    selectedChoice = choice.dataset.choice;
    document.querySelectorAll(".choice").forEach((button) => button.classList.remove("is-selected"));
    choice.classList.add("is-selected");
  }
});

document.getElementById("check-answer").addEventListener("click", checkAnswer);
document.getElementById("next-question").addEventListener("click", nextQuestion);
document.getElementById("fish-button").addEventListener("click", goFishing);
document.getElementById("retry-level").addEventListener("click", () => {
  selectedLevels[activeSubject] = quiz ? quiz.level : selectedLevels[activeSubject];
  startQuiz(activeSubject);
});
document.getElementById("next-level").addEventListener("click", () => {
  const level = Number(document.getElementById("next-level").dataset.nextLevel);
  selectLevel(level);
});
document.getElementById("go-fishing").addEventListener("click", () => setView("fish"));
document.getElementById("close-evolution").addEventListener("click", () => {
  const modal = document.getElementById("evolution-modal");
  modal.classList.add("is-closing");
  setTimeout(() => {
    modal.hidden = true;
    modal.classList.remove("is-closing");
  }, 180);
});
document.querySelectorAll(".reset-control").forEach((control) => control.addEventListener("click", () => {
  const button = control;
  if (!resetArmed) {
    resetArmed = true;
    document.querySelectorAll(".reset-control").forEach((item) => {
      item.textContent = "データをけしていいの？";
    });
    setTimeout(() => {
      if (!resetArmed) return;
      resetArmed = false;
      document.querySelectorAll(".reset-control").forEach((item) => {
        item.textContent = "さいしょから";
      });
    }, 2200);
    return;
  }
  resetArmed = false;
  document.querySelectorAll(".reset-control").forEach((item) => {
    item.textContent = "さいしょから";
  });
  state = defaultState();
  selectedLevels = { math: 1, roma: 1, word: 1 };
  quiz = null;
  saveState();
  startQuiz(activeSubject);
  render();
}));

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && document.getElementById("study-view").classList.contains("is-active")) {
    if (!document.getElementById("check-answer").hidden) checkAnswer();
    else if (!document.getElementById("next-question").hidden) nextQuestion();
  }
});

render();
startQuiz("math");
