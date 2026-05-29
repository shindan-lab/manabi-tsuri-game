const MAX_LEVEL = 10;
const QUESTIONS_PER_LEVEL = 5;
const STORAGE_KEY = "manabi-tsuri-save-v1";

const subjectInfo = {
  math: { label: "さんすう", icon: "+", progressKey: "math" },
  roma: { label: "ローマじ", icon: "A", progressKey: "roma" },
  word: { label: "ことば", icon: "あ", progressKey: "word" },
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
  [["あさ", "asa"], ["うみ", "umi"], ["かさ", "kasa"], ["ほし", "hoshi"], ["ゆき", "yuki"]],
  [["あおい そら", "aoi sora"], ["あかい はな", "akai hana"], ["しろい くも", "shiroi kumo"], ["おおきい いぬ", "ookii inu"], ["かわいい ねこ", "kawaii neko"]],
  [["ぼくは つる", "bokuha tsuru"], ["さかなが いる", "sakanaga iru"], ["うみに いく", "umini iku"], ["えさを もつ", "esawo motsu"], ["ふねに のる", "funeni noru"]],
  [["すいか", "suika"], ["たいこ", "taiko"], ["らっぱ", "rappa"], ["きって", "kitte"], ["がっこう", "gakkou"]],
  [["きょうは つりに いく", "kyouha tsurini iku"], ["おおきな さかなを つる", "ookina sakanawo tsuru"], ["みんなで うみに いく", "minnade umini iku"], ["にじいろの さかな", "nijiiro no sakana"], ["また あした あそぼう", "mata ashita asobou"]],
];

const wordLevels = [
  [
    qChoice("あ", ["あ", "め", "ぬ", "ね"], "あ"),
    qChoice("い", ["こ", "い", "り", "に"], "い"),
    qChoice("う", ["う", "つ", "し", "へ"], "う"),
    qChoice("え", ["そ", "え", "て", "る"], "え"),
    qChoice("お", ["お", "よ", "は", "ほ"], "お"),
  ],
  [
    qChoice("さ か な", ["さかな", "なかさ", "かなさ", "さなか"], "さかな"),
    qChoice("ね こ", ["こね", "ねこ", "けの", "ねけ"], "ねこ"),
    qChoice("く も", ["もく", "くも", "こむ", "むこ"], "くも"),
    qChoice("い ぬ", ["ぬい", "いぬ", "にう", "うに"], "いぬ"),
    qChoice("そ ら", ["らそ", "そら", "さら", "そろ"], "そら"),
  ],
  [
    qChoice("りんご の つぎ", ["ごりら", "さかな", "くるま", "ねこ"], "ごりら"),
    qChoice("ねこ の つぎ", ["こま", "いぬ", "そら", "つき"], "こま"),
    qChoice("くつ の つぎ", ["つみき", "さる", "たこ", "かさ"], "つみき"),
    qChoice("いす の つぎ", ["すいか", "しま", "きつね", "めだか"], "すいか"),
    qChoice("たこ の つぎ", ["こい", "いか", "かめ", "くま"], "こい"),
  ],
  [
    qChoice("おおきい の はんたい", ["ちいさい", "あかい", "ながい", "たかい"], "ちいさい"),
    qChoice("あつい の はんたい", ["さむい", "ひろい", "まるい", "はやい"], "さむい"),
    qChoice("ながい の はんたい", ["みじかい", "からい", "つよい", "あおい"], "みじかい"),
    qChoice("うえ の はんたい", ["した", "よこ", "まえ", "なか"], "した"),
    qChoice("はやい の はんたい", ["おそい", "やすい", "あまい", "ほそい"], "おそい"),
  ],
  [
    qChoice("りんご、みかん、ぶどう", ["くだもの", "のりもの", "いきもの", "どうぐ"], "くだもの"),
    qChoice("いぬ、ねこ、うさぎ", ["いきもの", "たべもの", "いろ", "かず"], "いきもの"),
    qChoice("あか、あお、きいろ", ["いろ", "さかな", "ふく", "ばしょ"], "いろ"),
    qChoice("ふね、くるま、でんしゃ", ["のりもの", "くだもの", "からだ", "てんき"], "のりもの"),
    qChoice("えんぴつ、けしごむ、のり", ["どうぐ", "うみ", "やさい", "からだ"], "どうぐ"),
  ],
  [
    qChoice("アイス", ["アイス", "イスア", "スアイ", "アイシ"], "アイス"),
    qChoice("バナナ", ["ナバナ", "バナナ", "バナバ", "ナナバ"], "バナナ"),
    qChoice("テレビ", ["テビレ", "ビテレ", "テレビ", "レテビ"], "テレビ"),
    qChoice("カメラ", ["ラメカ", "カメラ", "メカラ", "カラメ"], "カメラ"),
    qChoice("パン", ["パン", "ンパ", "バン", "パナ"], "パン"),
  ],
  [
    qChoice("さかな", ["🐟", "🚗", "🍎", "⭐"], "🐟"),
    qChoice("くるま", ["🍙", "🚗", "🌙", "🐱"], "🚗"),
    qChoice("ほし", ["⭐", "🐶", "🎒", "🍌"], "⭐"),
    qChoice("ねこ", ["🛟", "🍓", "🐱", "🚢"], "🐱"),
    qChoice("ふね", ["🚢", "☂️", "🌸", "🐟"], "🚢"),
  ],
  [
    qChoice("ねこが いすの うえに います", ["うえ", "した", "そと", "なか"], "うえ"),
    qChoice("いぬが みずを のみます", ["みず", "パン", "あめ", "くつ"], "みず"),
    qChoice("ぼくは うみに いきます", ["うみ", "やま", "まち", "そら"], "うみ"),
    qChoice("あかい はなが さいた", ["あかい", "あおい", "しろい", "くろい"], "あかい"),
    qChoice("さかなが ぴょんと はねた", ["さかな", "ねこ", "とり", "うし"], "さかな"),
  ],
  [
    qChoice("つりざおを もって いく", ["つりざお", "まくら", "くつした", "おさら"], "つりざお"),
    qChoice("あめが ふったら かさを さす", ["かさ", "ふね", "えさ", "はこ"], "かさ"),
    qChoice("よるに ほしが ひかる", ["ほし", "はな", "いす", "みず"], "ほし"),
    qChoice("おにぎりを たべた", ["おにぎり", "えんぴつ", "ぼうし", "さかな"], "おにぎり"),
    qChoice("かわで さかなを みた", ["かわ", "そら", "へや", "みち"], "かわ"),
  ],
  [
    qChoice("あさ、ぼくは つりばへ いきました。なにを しに いった？", ["つり", "おひるね", "そうじ", "おえかき"], "つり"),
    qChoice("さかなが うきの ちかくで はねました。どこで はねた？", ["うきの ちかく", "やまの うえ", "へやの なか", "くもの うえ"], "うきの ちかく"),
    qChoice("あいぼうは えさを もって きました。なにを もって きた？", ["えさ", "くつ", "ほん", "かさ"], "えさ"),
    qChoice("ゆうがた、そらが あかく なりました。いつのこと？", ["ゆうがた", "あさ", "ひる", "よる"], "ゆうがた"),
    qChoice("にじいろの さかなを ずかんに のせました。なにに のせた？", ["ずかん", "ふく", "いす", "みず"], "ずかん"),
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
let quiz = null;
let selectedChoice = "";
let resetArmed = false;

function qChoice(prompt, choices, answer) {
  return { type: "choice", prompt, choices, answer };
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
  avatar.innerHTML = `
    <div class="person" style="--outfit:${outfits[roma - 1]};--item:${itemColors[roma - 1]}">
      <div class="hair" style="height:${elder ? 24 : 30 + math}px;background:${elder ? "#f7f7f7" : "#5b3a2b"}"></div>
      <div class="head"></div>
      <div class="eye eye--l"></div>
      <div class="eye eye--r"></div>
      <div class="mouth"></div>
      <div class="body"></div>
      <div class="arm arm--l"></div>
      <div class="arm arm--r"></div>
      <div class="leg leg--l"></div>
      <div class="leg leg--r"></div>
      <div class="item"></div>
    </div>
  `;
  buddy.style.transform = `scale(${0.76 + word * 0.035})`;
  buddy.innerHTML = `
    <div class="buddy-creature" style="--buddy:${buddyColors[word - 1]}">
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
        <span>れべる ${state.levels[key]}</span>
      </button>
    `)
    .join("");
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
  const level = clampLevel(state.levels[subject]);
  quiz = {
    subject,
    level,
    index: 0,
    correct: 0,
    questions: buildQuestions(subject, level),
    locked: false,
  };
  renderSubjectPicker();
  renderQuestion();
}

function buildQuestions(subject, level) {
  if (subject === "math") return buildMathQuestions(level);
  if (subject === "roma") return romajiLevels[level - 1].map(([kana, roma]) => ({ type: "typing", prompt: kana, hint: level <= 5 ? roma : "", answer: roma }));
  return wordLevels[level - 1];
}

function buildMathQuestions(level) {
  const specs = [
    () => add(1, 8, 1, 8, false),
    () => add(4, 9, 4, 9, true),
    () => sub(2, 10, 1, 9),
    () => add(8, 19, 1, 9, true),
    () => sub(11, 20, 1, 10),
    () => add(10, 89, 1, 9, true),
    () => sub(20, 99, 1, 9),
    () => add(10, 79, 10, 19, true),
    () => sub(30, 99, 10, 29),
    () => Math.random() > 0.5 ? add(100, 299, 10, 99, true) : sub(100, 299, 10, 99),
  ];
  return Array.from({ length: QUESTIONS_PER_LEVEL }, specs[level - 1]);
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
  } while (!carry && a + b >= 10);
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
  document.getElementById("question-box").innerHTML = q.hint ? `${q.prompt}<br><small>${q.hint}</small>` : q.prompt;
  document.getElementById("feedback").textContent = "";
  document.getElementById("check-answer").hidden = false;
  document.getElementById("next-question").hidden = true;
  const answerBox = document.getElementById("answer-box");
  if (q.type === "choice") {
    answerBox.innerHTML = `<div class="choice-grid">${q.choices.map((choice) => `<button class="choice" data-choice="${choice}">${choice}</button>`).join("")}</div>`;
  } else {
    answerBox.innerHTML = `<input id="answer-input" class="answer-input" inputmode="${q.type === "number" ? "numeric" : "latin"}" autocomplete="off" />`;
    document.getElementById("answer-input").focus();
  }
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
  const ok = value === q.answer;
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
  if (clear) {
    if (state.levels[quiz.subject] < MAX_LEVEL) state.levels[quiz.subject] += 1;
    state.tickets += 1;
    feedback.textContent = "すごい！ぜんぶできた！つりけんをもらったよ。";
  } else {
    state.bait += 1;
    while (state.bait >= 3) {
      state.bait -= 3;
      state.tickets += 1;
    }
    feedback.textContent = resultMessage(quiz.correct);
  }
  saveState();
  render();
  setTimeout(() => startQuiz(quiz.subject), 1600);
}

function resultMessage(correct) {
  if (correct === 4) return "おしい！あとすこし！もういちどちゃれんじしてみよう！";
  if (correct === 3) return "いいかんじ！つぎはもっとできるよ！";
  if (correct > 0) return "だいじょうぶ！ゆっくりやってみよう！";
  return "はじめてのもんだいはむずかしいね。いっしょにもういちど！";
}

function goFishing() {
  const message = document.getElementById("fishing-message");
  if (state.tickets <= 0) {
    message.textContent = "つりけんがないよ。まなびにいこう。";
    return;
  }
  state.tickets -= 1;
  const caught = pickFish();
  state.fish[caught.id] = (state.fish[caught.id] || 0) + 1;
  message.textContent = `${caught.name} がつれた！`;
  showCaughtFish(caught);
  saveState();
  render();
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
  wrap.className = "caught-fish";
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
document.getElementById("reset-button").addEventListener("click", () => {
  const button = document.getElementById("reset-button");
  if (!resetArmed) {
    resetArmed = true;
    button.textContent = "ほんとう？";
    setTimeout(() => {
      if (!resetArmed) return;
      resetArmed = false;
      button.textContent = "さいしょから";
    }, 2200);
    return;
  }
  resetArmed = false;
  button.textContent = "さいしょから";
  state = defaultState();
  saveState();
  startQuiz(activeSubject);
  render();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && document.getElementById("study-view").classList.contains("is-active")) {
    if (!document.getElementById("check-answer").hidden) checkAnswer();
    else if (!document.getElementById("next-question").hidden) nextQuestion();
  }
});

render();
startQuiz("math");
