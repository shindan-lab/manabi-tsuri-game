const MAX_LEVEL = 10;
const QUESTIONS_PER_LEVEL = 5;
const STORAGE_KEY = "manabi-tsuri-save-v1";
const TEST_MODE = new URLSearchParams(location.search).get("test") === "1";

const subjectInfo = {
  math: { label: "さんすう", icon: "+", progressKey: "math" },
  roma: { label: "ローマじ", icon: "A", progressKey: "roma" },
  word: { label: "いきもの", icon: "い", progressKey: "word" },
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

const creatureLevels = [
  [
    qChoice("おなじ えを えらぼう", "さかな", ["さかな", "ねこ", "くるま", "ほし"], "さかな"),
    qChoice("おなじ えを えらぼう", "かに", ["かに", "いぬ", "ふね", "はな"], "かに"),
    qChoice("おなじ えを えらぼう", "かめ", ["かめ", "くつ", "そら", "いす"], "かめ"),
    qChoice("おなじ えを えらぼう", "えび", ["えび", "かさ", "みず", "つき"], "えび"),
    qChoice("おなじ えを えらぼう", "たこ", ["たこ", "やま", "ぱん", "あめ"], "たこ"),
  ],
  [
    qChoice("みずの なかに いるのは？", "さかな", ["さかな", "うさぎ", "とり", "ねこ"], "さかな"),
    qChoice("こうらが あるのは？", "かめ", ["かめ", "いぬ", "りんご", "くも"], "かめ"),
    qChoice("はさみが あるのは？", "かに", ["かに", "ふね", "はな", "くるま"], "かに"),
    qChoice("ながい からだの さかなは？", "うなぎ", ["うなぎ", "すいか", "いす", "ぼうし"], "うなぎ"),
    qChoice("あしが たくさん あるのは？", "たこ", ["たこ", "ほし", "かさ", "やま"], "たこ"),
  ],
  [
    qChoice("さかなの なかまは どれ？", "なかま", ["こい", "ねこ", "くつ", "でんしゃ"], "こい"),
    qChoice("みずべに いるのは どれ？", "みずべ", ["かえる", "えんぴつ", "くるま", "ぼうし"], "かえる"),
    qChoice("うみの いきものは どれ？", "うみ", ["いるか", "うま", "にわとり", "くま"], "いるか"),
    qChoice("かわに いる さかなは？", "かわ", ["あゆ", "ぞう", "ぱん", "つくえ"], "あゆ"),
    qChoice("からだが かたいのは？", "から", ["かに", "ねずみ", "とり", "いぬ"], "かに"),
  ],
  [
    qChoice("おおきい さかなは どれ？", "おおきい", ["くじら", "めだか", "あり", "かたつむり"], "くじら"),
    qChoice("ちいさい さかなは どれ？", "ちいさい", ["めだか", "くじら", "ぞう", "うし"], "めだか"),
    qChoice("はやく およぎそうなのは？", "はやい", ["まぐろ", "かめ", "かたつむり", "なまけもの"], "まぐろ"),
    qChoice("ゆっくり うごきそうなのは？", "ゆっくり", ["かめ", "まぐろ", "いるか", "とびうお"], "かめ"),
    qChoice("ながい からだは どれ？", "ながい", ["うなぎ", "ふぐ", "かに", "えび"], "うなぎ"),
  ],
  [
    qChoice("こい、めだか、あゆ", "なかまは？", ["さかな", "とり", "むし", "のりもの"], "さかな"),
    qChoice("かに、えび、やどかり", "なかまは？", ["こうら", "くだもの", "ふく", "どうぐ"], "こうら"),
    qChoice("かえる、かめ、さかな", "すきな ばしょは？", ["みずべ", "そら", "すなば", "へや"], "みずべ"),
    qChoice("いるか、くじら、まぐろ", "いる ばしょは？", ["うみ", "やま", "まち", "そら"], "うみ"),
    qChoice("あゆ、こい、めだか", "いる ばしょは？", ["かわ", "つくえ", "くも", "ほん"], "かわ"),
  ],
  [
    qChoice("しまもようの さかなは？", "しま", ["しましまうお", "まめさかな", "ながぐつ", "あきかん"], "しましまうお"),
    qChoice("まるい さかなは？", "まるい", ["まるぷく", "あゆ", "かに", "えび"], "まるぷく"),
    qChoice("ひかる さかなは？", "ひかる", ["きらきらマス", "ふぐ", "こい", "たこ"], "きらきらマス"),
    qChoice("ながい さかなは？", "ながい", ["うなぎ", "ふぐ", "かに", "かめ"], "うなぎ"),
    qChoice("とげが ありそうなのは？", "とげ", ["ふぐ", "めだか", "こい", "あゆ"], "ふぐ"),
  ],
  [
    qChoice("つりで つかうものは？", "どうぐ", ["つりざお", "まくら", "おさら", "くつした"], "つりざお"),
    qChoice("さかなが たべるものは？", "えさ", ["えさ", "ぼうし", "ほん", "つみき"], "えさ"),
    qChoice("さかなを いれるものは？", "いれもの", ["バケツ", "テレビ", "いす", "かさ"], "バケツ"),
    qChoice("くらい ところで つかうものは？", "あかり", ["ランタン", "おにぎり", "くつ", "ふく"], "ランタン"),
    qChoice("とおくを みるものは？", "みる", ["そうがんきょう", "えんぴつ", "はさみ", "のり"], "そうがんきょう"),
  ],
  [
    qChoice("さかなは みずの なかを およぎます。どこを およぐ？", "よんで えらぼう", ["みず", "そら", "つち", "ひ"], "みず"),
    qChoice("かには はさみを もちます。なにを もつ？", "よんで えらぼう", ["はさみ", "つばさ", "くつ", "ほん"], "はさみ"),
    qChoice("かめは こうらを もちます。なにを もつ？", "よんで えらぼう", ["こうら", "つりざお", "はな", "パン"], "こうら"),
    qChoice("あゆは かわに います。どこに いる？", "よんで えらぼう", ["かわ", "そら", "へや", "みち"], "かわ"),
    qChoice("いるかは うみで はねます。どこで はねる？", "よんで えらぼう", ["うみ", "やま", "いえ", "くるま"], "うみ"),
  ],
  [
    qChoice("めだかは ちいさな さかなです。どんな さかな？", "よんで えらぼう", ["ちいさい", "とても おおきい", "そらを とぶ", "からい"], "ちいさい"),
    qChoice("ふぐは ぷくっと ふくらみます。どうなる？", "よんで えらぼう", ["ふくらむ", "なくなる", "ねむる", "ころがる"], "ふくらむ"),
    qChoice("たこは あしが たくさん あります。なにが たくさん？", "よんで えらぼう", ["あし", "はね", "みみ", "つの"], "あし"),
    qChoice("くじらは とても おおきいです。どんな いきもの？", "よんで えらぼう", ["おおきい", "ちいさい", "ほそい", "かるい"], "おおきい"),
    qChoice("とびうおは みずの うえを とびます。どこを とぶ？", "よんで えらぼう", ["みずの うえ", "つちの なか", "へやの なか", "くもの なか"], "みずの うえ"),
  ],
  [
    qChoice("あさ、いけで うきが ゆれました。さかなが えさを たべたようです。なにが ゆれた？", "よんで えらぼう", ["うき", "くつ", "ぼうし", "くも"], "うき"),
    qChoice("かわの みずは つめたいです。あゆが すいすい およぎます。なにが およぐ？", "よんで えらぼう", ["あゆ", "ねこ", "とり", "うま"], "あゆ"),
    qChoice("うみで おおきな くじらを みました。しおを ふきました。なにを みた？", "よんで えらぼう", ["くじら", "めだか", "かえる", "かに"], "くじら"),
    qChoice("よるの つりばで ランタンを つけました。みずが きらきら しました。なにを つけた？", "よんで えらぼう", ["ランタン", "テレビ", "ぼうし", "つくえ"], "ランタン"),
    qChoice("にじいろの さかなは、ずかんの さいごに のりました。なにに のった？", "よんで えらぼう", ["ずかん", "かばん", "くつ", "ふとん"], "ずかん"),
  ],
];

const fishList = [
  fish("pond_a", "まめさかな", "よくでる", "#7ec8ff", 1, 0.22),
  fish("pond_b", "しましまうお", "よくでる", "#ffd166", 1, 0.18),
  fish("river_a", "きらきらマス", "たまにでる", "#8be8c4", 3, 0.13),
  fish("river_b", "あかひれ", "たまにでる", "#ff9f7d", 3, 0.11),
  fish("lake_a", "まるぷく", "たまにでる", "#baffc9", 5, 0.1),
  fish("lake_b", "みどりこい", "レア", "#52b788", 5, 0.07),
  fish("sea_a", "そらいろタイ", "レア", "#5cc8ff", 7, 0.06),
  fish("sea_b", "なみのこ", "レア", "#b69cff", 7, 0.05),
  fish("deep_a", "ほしあんこう", "レア", "#fff176", 9, 0.04),
  fish("legend_a", "にじいろキング", "でんせつ", "#f6a6c9", 10, 0.025),
  fish("boot", "ながぐつ", "はずれ", "#9aa7ad", 1, 0.035, true),
  fish("can", "あきかん", "はずれ", "#b8c1c7", 1, 0.025, true),
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

function fish(id, name, rarity, color, minLevel, weight, junk = false) {
  return { id, name, rarity, color, minLevel, weight, junk };
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
  const math = clampLevel(state.levels.math);
  const roma = clampLevel(state.levels.roma);
  const word = clampLevel(state.levels.word);
  const avatar = document.getElementById("avatar");
  const buddy = document.getElementById("buddy");
  const scale = 0.78 + math * 0.035;
  const elder = math === MAX_LEVEL && roma === MAX_LEVEL && word === MAX_LEVEL;
  avatar.style.transform = `translateX(-50%) scale(${scale})`;
  const itemClass = roma >= 9 ? "item__head--star" : roma >= 7 ? "item__head--map" : roma >= 4 ? "item__head--net" : "item__head--bucket";
  const bodyRadius = math >= 8 ? 14 : math >= 5 ? 18 : 24;
  avatar.innerHTML = `
    <div class="person" style="--outfit:${outfits[roma - 1]};--item:${itemColors[roma - 1]}">
      <div class="hair" style="height:${elder ? 24 : 28 + math * 2}px;background:${elder ? "#f7f7f7" : "#5b3a2b"}"></div>
      <div class="head"></div>
      <div class="eye eye--l"></div>
      <div class="eye eye--r"></div>
      <div class="mouth"></div>
      <div class="body" style="height:${70 + math * 3}px;border-radius:${bodyRadius}px ${bodyRadius}px 12px 12px"></div>
      <div class="body-mark"></div>
      <div class="level-badge">L${Math.max(math, roma)}</div>
      <div class="arm arm--l"></div>
      <div class="arm arm--r"></div>
      <div class="leg leg--l"></div>
      <div class="leg leg--r"></div>
      <div class="item"><div class="item__head ${itemClass}"></div></div>
    </div>
  `;
  buddy.style.transform = `scale(${0.76 + word * 0.035})`;
  buddy.innerHTML = `
    <div class="buddy-creature" style="--buddy:${buddyColors[word - 1]}">
      ${word >= 4 ? '<div class="buddy-fin"></div>' : ''}
      ${word >= 7 ? '<div class="buddy-horn"></div>' : ''}
      <div class="buddy-eye buddy-eye--l"></div>
      <div class="buddy-eye buddy-eye--r"></div>
    </div>
  `;
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
  return creatureLevels[level - 1];
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
  document.getElementById("quiz-subtitle").textContent = subjectInfo[quiz.subject].label;
  document.getElementById("quiz-title").textContent = `れべる ${quiz.level}`;
  document.getElementById("question-count").textContent = quiz.index + 1;
  const guide = q.type === "choice" ? q.prompt : q.topic || questionGuide(quiz.subject);
  const prompt = q.type === "choice" && q.topic ? q.topic : q.prompt;
  document.getElementById("question-guide").textContent = guide;
  document.getElementById("question-box").innerHTML = q.hint ? `${prompt}<br><small>${q.hint}</small>` : prompt;
  document.getElementById("feedback").textContent = "";
  document.getElementById("check-answer").hidden = false;
  document.getElementById("next-question").hidden = true;
  setResultButtons(false);
  const answerBox = document.getElementById("answer-box");
  if (q.type === "choice") {
    answerBox.innerHTML = `<div class="choice-grid">${q.choices.map((choice) => `<button class="choice" data-choice="${choice}">${choice}</button>`).join("")}</div>`;
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
  const value = q.type === "choice"
    ? selectedChoice
    : document.getElementById("answer-input").value.trim().toLowerCase().replace(/\s+/g, " ");
  if (!value) {
    document.getElementById("feedback").textContent = "こたえをいれてね。";
    return;
  }
  const ok = q.answers ? q.answers.includes(normalizeAnswer(value)) : value === q.answer;
  if (ok) quiz.correct += 1;
  quiz.locked = true;
  document.getElementById("feedback").textContent = ok ? "せいかい！" : "ちがうよ。こたえは " + q.answer;
  document.getElementById("check-answer").hidden = true;
  document.getElementById("next-question").hidden = false;
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
      selectedLevels[quiz.subject] = state.levels[quiz.subject];
    }
    state.tickets += 1;
    feedback.textContent = "すごい！ぜんぶできた！つりけんをもらったよ。";
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
}

function setResultButtons(show, subject = activeSubject, finishedLevel = selectedLevels[activeSubject], maxLevel = state.levels[activeSubject]) {
  const retry = document.getElementById("retry-level");
  const next = document.getElementById("next-level");
  const fish = document.getElementById("go-fishing");
  retry.hidden = !show;
  fish.hidden = !show;
  next.hidden = !show || finishedLevel >= maxLevel;
  retry.dataset.subject = subject;
  retry.dataset.level = String(finishedLevel);
  next.dataset.subject = subject;
  next.dataset.level = String(Math.min(finishedLevel + 1, MAX_LEVEL));
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
  wrap.innerHTML = fishSvg(fishItem);
  stage.appendChild(wrap);
}

function renderFishBook() {
  const book = document.getElementById("fish-book");
  book.innerHTML = fishList.map((item) => {
    const count = state.fish[item.id] || 0;
    const locked = count === 0;
    return `
      <article class="fish-card ${locked ? "is-locked" : ""}">
        <div class="fish-thumb">${fishSvg(item)}</div>
        <strong>${locked ? "？？？" : item.name}</strong>
        <span>${locked ? "まだだよ" : `${item.rarity} ${count}`}</span>
      </article>
    `;
  }).join("");
}

function fishSvg(item) {
  if (item.junk) {
    return `<svg class="fish-svg" viewBox="0 0 160 90" role="img" aria-label="${item.name}">
      <path d="M68 28h38l8 42H58z" fill="${item.color}" stroke="#344" stroke-width="5" />
      <path d="M78 26c4-16 26-16 30 0" fill="none" stroke="#344" stroke-width="5" />
    </svg>`;
  }
  return `<svg class="fish-svg" viewBox="0 0 180 95" role="img" aria-label="${item.name}">
    <path d="M18 48l34-24v48z" fill="${item.color}" stroke="#234" stroke-width="5" />
    <ellipse cx="98" cy="48" rx="58" ry="32" fill="${item.color}" stroke="#234" stroke-width="5" />
    <path d="M94 20l18-16 12 24" fill="${item.color}" stroke="#234" stroke-width="5" />
    <circle cx="132" cy="40" r="5" fill="#182633" />
    <path d="M144 53q-12 10-25 0" fill="none" stroke="#234" stroke-width="4" stroke-linecap="round" />
    <path d="M68 34h32M62 48h44M70 62h30" stroke="rgba(255,255,255,.65)" stroke-width="5" stroke-linecap="round" />
  </svg>`;
}

document.addEventListener("click", (event) => {
  if (!event.target.closest("#reset-button")) resetArmed = false;

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
  const level = Number(document.getElementById("next-level").dataset.level);
  selectLevel(level);
});
document.getElementById("go-fishing").addEventListener("click", () => setView("fish"));
document.querySelectorAll(".reset-control").forEach((control) => control.addEventListener("click", () => {
  const button = control;
  if (!resetArmed) {
    resetArmed = true;
    document.querySelectorAll(".reset-control").forEach((item) => {
      item.textContent = "ほんとう？";
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
