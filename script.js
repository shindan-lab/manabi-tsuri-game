const MAX_LEVEL = 10;
const QUESTIONS_PER_LEVEL = 5;
const STORAGE_KEY = "manabi-tsuri-save-v1";
const TEST_MODE = new URLSearchParams(location.search).get("test") === "1";

const subjectInfo = {
  math: { label: "さんすう", icon: "+", progressKey: "math" },
  roma: { label: "ローマじ", icon: "A", progressKey: "roma" },
  word: { label: "とけい", icon: "と", progressKey: "word" },
  world: { label: "えいご・せかい", icon: "E", progressKey: "world" },
  animal: { label: "いきもの", icon: "む", progressKey: "animal" },
  quiz: { label: "なぞなぞ", icon: "?", progressKey: "quiz" },
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
  [["オーストラリア", "o-sutoraria"], ["うんどうかい", "undoukai"], ["たんじょうび", "tanjoubi"], ["しょうがっこう", "shougakkou"], ["かいすいよく", "kaisuiyoku"]],
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

const worldLevels = [
  [
    qChoice("えいごで どれ？", "ねこ", ["cat", "dog", "fish", "bird"], "cat"),
    qChoice("えいごで どれ？", "いぬ", ["dog", "cat", "sun", "book"], "dog"),
    qChoice("えいごで どれ？", "さかな", ["fish", "milk", "pen", "rain"], "fish"),
    qChoice("えいごで どれ？", "とり", ["bird", "car", "moon", "cake"], "bird"),
    qChoice("えいごで どれ？", "りんご", ["apple", "orange", "banana", "grape"], "apple"),
  ],
  [
    qChoice("えいごで どれ？", "あか", ["red", "blue", "green", "yellow"], "red"),
    qChoice("えいごで どれ？", "あお", ["blue", "red", "black", "white"], "blue"),
    qChoice("えいごで どれ？", "みどり", ["green", "pink", "orange", "gray"], "green"),
    qChoice("えいごで どれ？", "きいろ", ["yellow", "purple", "brown", "black"], "yellow"),
    qChoice("えいごで どれ？", "しろ", ["white", "red", "blue", "green"], "white"),
  ],
  [
    qChoice("えいごで どれ？", "1", ["one", "two", "three", "four"], "one"),
    qChoice("えいごで どれ？", "2", ["two", "one", "five", "ten"], "two"),
    qChoice("えいごで どれ？", "3", ["three", "six", "seven", "nine"], "three"),
    qChoice("えいごで どれ？", "4", ["four", "five", "one", "eight"], "four"),
    qChoice("えいごで どれ？", "5", ["five", "two", "six", "ten"], "five"),
  ],
  [
    qChoice("どこの はた？", "🇯🇵", ["にほん", "アメリカ", "ブラジル", "フランス"], "にほん"),
    qChoice("どこの はた？", "🇺🇸", ["アメリカ", "にほん", "イタリア", "インド"], "アメリカ"),
    qChoice("どこの はた？", "🇫🇷", ["フランス", "ドイツ", "カナダ", "かんこく"], "フランス"),
    qChoice("どこの はた？", "🇮🇹", ["イタリア", "スペイン", "イギリス", "にほん"], "イタリア"),
    qChoice("どこの はた？", "🇧🇷", ["ブラジル", "アメリカ", "ドイツ", "インド"], "ブラジル"),
  ],
  [
    qChoice("えいごで どれ？", "たいよう", ["sun", "moon", "star", "rain"], "sun"),
    qChoice("えいごで どれ？", "つき", ["moon", "sun", "cloud", "snow"], "moon"),
    qChoice("えいごで どれ？", "ほし", ["star", "rain", "wind", "sky"], "star"),
    qChoice("えいごで どれ？", "あめ", ["rain", "sun", "sea", "tree"], "rain"),
    qChoice("えいごで どれ？", "ゆき", ["snow", "wind", "moon", "river"], "snow"),
  ],
  [
    qChoice("えいごで どれ？", "ほん", ["book", "desk", "cup", "bag"], "book"),
    qChoice("えいごで どれ？", "えんぴつ", ["pencil", "apple", "milk", "chair"], "pencil"),
    qChoice("えいごで どれ？", "つくえ", ["desk", "book", "car", "ball"], "desk"),
    qChoice("えいごで どれ？", "いす", ["chair", "bag", "pen", "fish"], "chair"),
    qChoice("えいごで どれ？", "かばん", ["bag", "cup", "desk", "dog"], "bag"),
  ],
  [
    qChoice("どこの はた？", "🇬🇧", ["イギリス", "フランス", "ドイツ", "カナダ"], "イギリス"),
    qChoice("どこの はた？", "🇩🇪", ["ドイツ", "イタリア", "ブラジル", "にほん"], "ドイツ"),
    qChoice("どこの はた？", "🇨🇦", ["カナダ", "アメリカ", "インド", "スペイン"], "カナダ"),
    qChoice("どこの はた？", "🇰🇷", ["かんこく", "にほん", "ちゅうごく", "タイ"], "かんこく"),
    qChoice("どこの はた？", "🇮🇳", ["インド", "カナダ", "ドイツ", "フランス"], "インド"),
  ],
  [
    qChoice("えいごで どれ？", "おはよう", ["good morning", "good night", "thank you", "hello"], "good morning"),
    qChoice("えいごで どれ？", "ありがとう", ["thank you", "sorry", "hello", "yes"], "thank you"),
    qChoice("えいごで どれ？", "こんにちは", ["hello", "bye", "no", "good night"], "hello"),
    qChoice("えいごで どれ？", "おやすみ", ["good night", "good morning", "thank you", "please"], "good night"),
    qChoice("えいごで どれ？", "はい", ["yes", "no", "bye", "sorry"], "yes"),
  ],
  [
    qChoice("どこの はた？", "🇪🇸", ["スペイン", "イタリア", "ドイツ", "ブラジル"], "スペイン"),
    qChoice("どこの はた？", "🇦🇺", ["オーストラリア", "カナダ", "アメリカ", "インド"], "オーストラリア"),
    qChoice("どこの はた？", "🇹🇭", ["タイ", "かんこく", "にほん", "フランス"], "タイ"),
    qChoice("どこの はた？", "🇲🇽", ["メキシコ", "スペイン", "ブラジル", "カナダ"], "メキシコ"),
    qChoice("どこの はた？", "🇸🇪", ["スウェーデン", "ドイツ", "イギリス", "インド"], "スウェーデン"),
  ],
  [
    qChoice("えいごで どれ？", "みず", ["water", "milk", "juice", "tea"], "water"),
    qChoice("えいごで どれ？", "ぎゅうにゅう", ["milk", "water", "rice", "bread"], "milk"),
    qChoice("えいごで どれ？", "ごはん", ["rice", "fish", "apple", "cake"], "rice"),
    qChoice("えいごで どれ？", "パン", ["bread", "rice", "water", "egg"], "bread"),
    qChoice("えいごで どれ？", "たまご", ["egg", "milk", "fish", "book"], "egg"),
  ],
];

const animalLevels = [
  [
    qChoice("どの いきもの？", "にゃーと なくよ", ["ねこ", "いぬ", "うし", "とり"], "ねこ"),
    qChoice("どの いきもの？", "わんわんと なくよ", ["いぬ", "ねこ", "さる", "かめ"], "いぬ"),
    qChoice("どの いきもの？", "みずのなかを およぐよ", ["さかな", "うま", "ぞう", "へび"], "さかな"),
    qChoice("どの いきもの？", "そらを とぶよ", ["とり", "かに", "ねこ", "うし"], "とり"),
    qChoice("どの いきもの？", "こうらが あるよ", ["かめ", "いぬ", "さる", "とり"], "かめ"),
  ],
  [
    qChoice("どの いきもの？", "ながい はなが あるよ", ["ぞう", "きりん", "うさぎ", "かえる"], "ぞう"),
    qChoice("どの いきもの？", "くびが ながいよ", ["きりん", "ぞう", "らいおん", "ねこ"], "きりん"),
    qChoice("どの いきもの？", "ぴょんぴょん はねるよ", ["うさぎ", "さかな", "へび", "かに"], "うさぎ"),
    qChoice("どの いきもの？", "がおーと なくよ", ["らいおん", "うし", "うさぎ", "かめ"], "らいおん"),
    qChoice("どの いきもの？", "きに のぼるのが とくい", ["さる", "ぞう", "きりん", "かめ"], "さる"),
  ],
  [
    qChoice("どの むし？", "はねに もようが あるよ", ["ちょう", "あり", "かぶとむし", "とんぼ"], "ちょう"),
    qChoice("どの むし？", "つのが かっこいいよ", ["かぶとむし", "ちょう", "だんごむし", "あり"], "かぶとむし"),
    qChoice("どの むし？", "みんなで あるくよ", ["あり", "とんぼ", "かまきり", "せみ"], "あり"),
    qChoice("どの むし？", "めが おおきくて とぶよ", ["とんぼ", "あり", "かぶとむし", "だんごむし"], "とんぼ"),
    qChoice("どの むし？", "おなかを まるめるよ", ["だんごむし", "せみ", "ちょう", "あり"], "だんごむし"),
  ],
  [
    qChoice("どの いきもの？", "ジャンプが とくい", ["かえる", "へび", "かに", "うし"], "かえる"),
    qChoice("どの いきもの？", "からだが ながいよ", ["へび", "かめ", "とり", "ねこ"], "へび"),
    qChoice("どの いきもの？", "よこに あるくよ", ["かに", "さかな", "うさぎ", "ぞう"], "かに"),
    qChoice("どの いきもの？", "はさみが あるよ", ["かに", "かえる", "へび", "とり"], "かに"),
    qChoice("どの いきもの？", "あめのひに げんき", ["かえる", "らいおん", "きりん", "うし"], "かえる"),
  ],
  [
    qChoice("なにを たべる？", "パンダ", ["ささ", "さかな", "にんじん", "みかん"], "ささ"),
    qChoice("なにを たべる？", "うさぎ", ["にんじん", "さかな", "にく", "パン"], "にんじん"),
    qChoice("なにを たべる？", "ねこ", ["さかな", "ささ", "くさ", "どんぐり"], "さかな"),
    qChoice("なにを たべる？", "りす", ["どんぐり", "にく", "さかな", "ささ"], "どんぐり"),
    qChoice("なにを たべる？", "うし", ["くさ", "どんぐり", "さかな", "にんじん"], "くさ"),
  ],
  [
    qChoice("どこに すむ？", "さかな", ["みず", "そら", "き", "すな"], "みず"),
    qChoice("どこに すむ？", "とり", ["そら", "みず", "つち", "ゆき"], "そら"),
    qChoice("どこに すむ？", "もぐら", ["つち", "そら", "みず", "き"], "つち"),
    qChoice("どこに すむ？", "ペンギン", ["さむい ところ", "あつい すな", "きのうえ", "かわ"], "さむい ところ"),
    qChoice("どこに すむ？", "らくだ", ["すな", "うみ", "ゆき", "きのうえ"], "すな"),
  ],
  [
    qChoice("どれが ただしい？", "ちょう", ["たまごから うまれる", "いしから うまれる", "みずに とける", "つのが 2ほん"], "たまごから うまれる"),
    qChoice("どれが ただしい？", "せみ", ["なつに よく なく", "ふゆに こおる", "うみで およぐ", "くびが ながい"], "なつに よく なく"),
    qChoice("どれが ただしい？", "かまきり", ["かまのような てが ある", "こうらが ある", "みずを ふく", "つのが 3ほん"], "かまのような てが ある"),
    qChoice("どれが ただしい？", "はち", ["はなに あつまる", "うみに すむ", "こうらが ある", "にんじんが すき"], "はなに あつまる"),
    qChoice("どれが ただしい？", "あり", ["ちいさくて みんなで はこぶ", "そらで ねる", "さかなを つる", "くびが ながい"], "ちいさくて みんなで はこぶ"),
  ],
  [
    qChoice("なかまは どれ？", "ねこ", ["らいおん", "かえる", "かに", "とんぼ"], "らいおん"),
    qChoice("なかまは どれ？", "いぬ", ["おおかみ", "さかな", "ちょう", "かめ"], "おおかみ"),
    qChoice("なかまは どれ？", "うま", ["しまうま", "へび", "あり", "かに"], "しまうま"),
    qChoice("なかまは どれ？", "かえる", ["おたまじゃくし", "ねこ", "とり", "ぞう"], "おたまじゃくし"),
    qChoice("なかまは どれ？", "ちょう", ["ようちゅう", "さかな", "うさぎ", "きりん"], "ようちゅう"),
  ],
  [
    qChoice("どの いきもの？", "しろと くろの もよう", ["パンダ", "ぞう", "らいおん", "うさぎ"], "パンダ"),
    qChoice("どの いきもの？", "しましま もよう", ["しまうま", "ぞう", "かえる", "かに"], "しまうま"),
    qChoice("どの いきもの？", "ふくろで こどもを そだてる", ["カンガルー", "ねこ", "とり", "さかな"], "カンガルー"),
    qChoice("どの いきもの？", "さむい うみで およぐ とり", ["ペンギン", "すずめ", "かも", "はと"], "ペンギン"),
    qChoice("どの いきもの？", "からだに とげが ある", ["ハリネズミ", "うし", "きりん", "さる"], "ハリネズミ"),
  ],
  [
    qChoice("どれが ただしい？", "くじら", ["ほにゅうるい", "むし", "とり", "はな"], "ほにゅうるい"),
    qChoice("どれが ただしい？", "こうもり", ["そらを とぶ ほにゅうるい", "さかな", "むし", "かえる"], "そらを とぶ ほにゅうるい"),
    qChoice("どれが ただしい？", "たこ", ["あしが 8ほん", "はねが 4まい", "くびが ながい", "こうらが ある"], "あしが 8ほん"),
    qChoice("どれが ただしい？", "いるか", ["うみで いきをする", "きに のぼる", "つのが ある", "はなを すう"], "うみで いきをする"),
    qChoice("どれが ただしい？", "くらげ", ["からだが やわらかい", "つのが ある", "あしが 2ほん", "そらを とぶ"], "からだが やわらかい"),
  ],
];

const quizLevels = [
  [
    qChoice("なぞなぞ", "あさに のぼる まるいものは？", ["たいよう", "つき", "さかな", "かさ"], "たいよう"),
    qChoice("なぞなぞ", "あめのひに つかうものは？", ["かさ", "ぼうし", "くつした", "ほん"], "かさ"),
    qChoice("なぞなぞ", "はくと あるけるものは？", ["くつ", "ぼうし", "てぶくろ", "かばん"], "くつ"),
    qChoice("なぞなぞ", "よるに でる ひかるものは？", ["ほし", "りんご", "いす", "さかな"], "ほし"),
    qChoice("なぞなぞ", "みずを のむときに つかうものは？", ["コップ", "くつ", "ふとん", "えんぴつ"], "コップ"),
  ],
  [
    qChoice("どれが ただしい？", "そとから かえったら", ["てを あらう", "ねる", "テレビを みる", "くつを はく"], "てを あらう"),
    qChoice("どれが ただしい？", "あかしんごうでは", ["とまる", "はしる", "ねる", "およぐ"], "とまる"),
    qChoice("どれが ただしい？", "はを みがくのは", ["あさと よる", "つりのあとだけ", "ねるまえだけ", "しない"], "あさと よる"),
    qChoice("どれが ただしい？", "ごはんの まえには", ["てを あらう", "くつを はく", "かさを さす", "ねる"], "てを あらう"),
    qChoice("どれが ただしい？", "どうろを わたるとき", ["みぎひだりを みる", "めを とじる", "はしりつづける", "すわる"], "みぎひだりを みる"),
  ],
  [
    qChoice("なぞなぞ", "きると あたたかいものは？", ["ふく", "こおり", "みず", "さかな"], "ふく"),
    qChoice("なぞなぞ", "すわるものは？", ["いす", "かさ", "くつ", "りんご"], "いす"),
    qChoice("なぞなぞ", "かくときに つかうものは？", ["えんぴつ", "コップ", "かさ", "ぼうし"], "えんぴつ"),
    qChoice("なぞなぞ", "よむものは？", ["ほん", "くつ", "さかな", "かぎ"], "ほん"),
    qChoice("なぞなぞ", "ねるときに つかうものは？", ["ふとん", "かさ", "いす", "えんぴつ"], "ふとん"),
  ],
  [
    qChoice("どれが ただしい？", "あつい なべは", ["さわらない", "なめる", "かぶる", "ける"], "さわらない"),
    qChoice("どれが ただしい？", "けがを したら", ["おとなに いう", "かくす", "はしる", "わらう"], "おとなに いう"),
    qChoice("どれが ただしい？", "しらない ひとには", ["ついていかない", "ついていく", "おかしを もらう", "いえを おしえる"], "ついていかない"),
    qChoice("どれが ただしい？", "かみなりが なったら", ["たかい きから はなれる", "きのしたに いく", "うみで およぐ", "そとで あそぶ"], "たかい きから はなれる"),
    qChoice("どれが ただしい？", "はさみを つかうとき", ["きをつける", "なげる", "はしる", "くちに いれる"], "きをつける"),
  ],
  [
    qChoice("なぞなぞ", "からだに ふたつある みるところは？", ["め", "みみ", "あし", "て"], "め"),
    qChoice("なぞなぞ", "おとを きくところは？", ["みみ", "め", "くち", "ひざ"], "みみ"),
    qChoice("なぞなぞ", "ごはんを たべるところは？", ["くち", "め", "みみ", "あし"], "くち"),
    qChoice("なぞなぞ", "あるくとき つかうところは？", ["あし", "くち", "め", "みみ"], "あし"),
    qChoice("なぞなぞ", "ものを もつところは？", ["て", "あし", "くち", "みみ"], "て"),
  ],
  [
    qChoice("どれが ただしい？", "ともだちが こまっていたら", ["こえを かける", "わらう", "かくれる", "おこる"], "こえを かける"),
    qChoice("どれが ただしい？", "ありがとうを いわれたら", ["どういたしまして", "いやだ", "しらない", "だめ"], "どういたしまして"),
    qChoice("どれが ただしい？", "あそぶまえに", ["やくそくを まもる", "おもちゃを なげる", "ひとりじめする", "かえる"], "やくそくを まもる"),
    qChoice("どれが ただしい？", "おもちゃを かりるとき", ["かしてと いう", "だまって とる", "かくす", "こわす"], "かしてと いう"),
    qChoice("どれが ただしい？", "まちがえたら", ["ごめんねと いう", "にげる", "わらう", "かくす"], "ごめんねと いう"),
  ],
  [
    qChoice("なぞなぞ", "みずを いれると かるくなるものは？", ["あな", "コップ", "かばん", "くつ"], "あな"),
    qChoice("なぞなぞ", "きっても きっても なくならないものは？", ["トランプ", "パン", "かみ", "えんぴつ"], "トランプ"),
    qChoice("なぞなぞ", "はしるけど あしがないものは？", ["みず", "いぬ", "ねこ", "うさぎ"], "みず"),
    qChoice("なぞなぞ", "あたまに のせるものは？", ["ぼうし", "くつ", "コップ", "ふとん"], "ぼうし"),
    qChoice("なぞなぞ", "かぎが なくても あくものは？", ["め", "ドア", "はこ", "くるま"], "め"),
  ],
  [
    qChoice("どれが ただしい？", "やさいは どれ？", ["にんじん", "りんご", "みかん", "ぶどう"], "にんじん"),
    qChoice("どれが ただしい？", "くだものは どれ？", ["りんご", "きゅうり", "ねぎ", "だいこん"], "りんご"),
    qChoice("どれが ただしい？", "あまい のみものは？", ["ジュース", "みず", "おちゃ", "くうき"], "ジュース"),
    qChoice("どれが ただしい？", "あさに いう ことばは？", ["おはよう", "おやすみ", "いただきます", "ごちそうさま"], "おはよう"),
    qChoice("どれが ただしい？", "ごはんの まえに いうことばは？", ["いただきます", "おはよう", "おやすみ", "ただいま"], "いただきます"),
  ],
  [
    qChoice("なぞなぞ", "さんかくで のりがある たべものは？", ["おにぎり", "パン", "みかん", "うどん"], "おにぎり"),
    qChoice("なぞなぞ", "からいと なみだが でる やさいは？", ["たまねぎ", "にんじん", "じゃがいも", "きゅうり"], "たまねぎ"),
    qChoice("なぞなぞ", "あめのあとに でる きれいな はしは？", ["にじ", "かわ", "みち", "やま"], "にじ"),
    qChoice("なぞなぞ", "ふくろの なかで ねる どうぐは？", ["ねぶくろ", "かばん", "コップ", "くつ"], "ねぶくろ"),
    qChoice("なぞなぞ", "あかくて まるい くだものは？", ["りんご", "にんじん", "トマト", "いちご"], "りんご"),
  ],
  [
    qChoice("どれが ただしい？", "じしんで ゆれたら", ["あたまを まもる", "そとへ とびだす", "まどを たたく", "はしりまわる"], "あたまを まもる"),
    qChoice("どれが ただしい？", "ひが でたら", ["おとなに しらせる", "ちかづく", "かくれる", "あそぶ"], "おとなに しらせる"),
    qChoice("どれが ただしい？", "よる ねるまえに", ["はを みがく", "そとで あそぶ", "おかしを たくさん たべる", "くつを はく"], "はを みがく"),
    qChoice("どれが ただしい？", "つかれたときは", ["やすむ", "むりを する", "はしりつづける", "ねない"], "やすむ"),
    qChoice("どれが ただしい？", "こまったときは", ["おとなに そうだん", "ひとりで がまん", "かくす", "なくす"], "おとなに そうだん"),
  ],
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
  fish("rare_fugu", "さくらフグ", "レア", "#ff9fc4", 6, 0.045, "./assets/fish/rare_fugu.png"),
  fish("rare_unagi", "よぞらウナギ", "レア", "#4969c9", 7, 0.04, "./assets/fish/rare_unagi.png"),
  fish("super_manta", "ほしぞらマンタ", "スーパー レア", "#6c7fd8", 8, 0.028, "./assets/fish/super_manta.png"),
  fish("super_shark", "ぎんがザメ", "スーパー レア", "#7b8ca8", 9, 0.022, "./assets/fish/super_shark.png"),
  fish("super_salmon", "オーロラサケ", "スーパー レア", "#ff8fb3", 9, 0.02, "./assets/fish/super_salmon.png"),
  fish("super_kurage", "ひかりクラゲ", "スーパー レア", "#8be8ff", 8, 0.024, "./assets/fish/super_kurage.png"),
  fish("legend_koi", "にじいろコイ", "でんせつ", "#f6a6c9", 9, 0.025, "./assets/fish/legend_koi.png"),
  fish("legend_tai", "おうごんタイ", "でんせつ", "#ffd166", 10, 0.02, "./assets/fish/legend_tai.png"),
  fish("legend_coelacanth", "まぼろしシーラカンス", "でんせつ", "#5f6caf", 10, 0.015, "./assets/fish/legend_coelacanth.png"),
  fish("legend_maguro", "おうじゃマグロ", "でんせつ", "#2f6fb4", 10, 0.014, "./assets/fish/legend_maguro.png"),
  fish("legend_ryugu", "りゅうぐうのつかい", "でんせつ", "#f2f0ff", 10, 0.01, "./assets/fish/legend_ryugu.png"),
];

let state = loadState();
let activeSubject = "math";
let selectedLevels = defaultLevels();
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
    levels: defaultLevels(),
    tickets: 0,
    bait: 0,
    fish: {},
  };
}

function defaultLevels() {
  return Object.fromEntries(Object.keys(subjectInfo).map((key) => [key, 1]));
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return {
      ...defaultState(),
      ...saved,
      levels: { ...defaultLevels(), ...(saved.levels || {}) },
    };
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
  return Math.max(...Object.values(state.levels));
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
  const worldBuddy = document.getElementById("world-buddy");
  const animalBuddy = document.getElementById("animal-buddy");
  const quizBuddy = document.getElementById("quiz-buddy");
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
  worldBuddy.innerHTML = `
    <img class="character-sprite world-buddy-sprite" src="${snapshot.world.src}" alt="せかいのあいぼう" />
    <span class="sprite-level buddy-level">L${snapshot.world.level}</span>
  `;
  animalBuddy.innerHTML = `
    <img class="character-sprite animal-buddy-sprite" src="${snapshot.animal.src}" alt="いきもののあいぼう" />
    <span class="sprite-level buddy-level">L${snapshot.animal.level}</span>
  `;
  quizBuddy.innerHTML = `
    <img class="character-sprite quiz-buddy-sprite" src="${snapshot.quiz.src}" alt="なぞなぞのあいぼう" />
    <span class="sprite-level buddy-level">L${snapshot.quiz.level}</span>
  `;
}

function avatarSnapshot() {
  const math = clampLevel(state.levels.math);
  const roma = clampLevel(state.levels.roma);
  const word = clampLevel(state.levels.word);
  const world = clampLevel(state.levels.world);
  const animal = clampLevel(state.levels.animal);
  const quizLevel = clampLevel(state.levels.quiz);
  const elder = Object.values(state.levels).every((level) => level === MAX_LEVEL);
  const heroLevel = elder ? 10 : Math.min(9, math);
  return {
    hero: { key: "hero", level: heroLevel, src: heroAsset(heroLevel), name: "しゅじんこう" },
    blue: { key: "blue", level: roma, src: buddyAsset(roma), name: "あおい あいぼう" },
    red: { key: "red", level: word, src: redBuddyAsset(word), name: "あかい あいぼう" },
    world: { key: "world", level: world, src: worldBuddyAsset(world), name: "せかいの あいぼう" },
    animal: { key: "animal", level: animal, src: animalBuddyAsset(animal), name: "いきものの あいぼう" },
    quiz: { key: "quiz", level: quizLevel, src: quizBuddyAsset(quizLevel), name: "なぞなぞの あいぼう" },
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

function worldBuddyAsset(level) {
  if (level >= 8) return "./assets/buddy/world_buddy_lv10.png";
  if (level >= 4) return "./assets/buddy/world_buddy_lv05.png";
  return "./assets/buddy/world_buddy_lv01.png";
}

function animalBuddyAsset(level) {
  if (level >= 8) return "./assets/buddy/animal_buddy_lv10.png";
  if (level >= 4) return "./assets/buddy/animal_buddy_lv05.png";
  return "./assets/buddy/animal_buddy_lv01.png";
}

function quizBuddyAsset(level) {
  if (level >= 8) return "./assets/buddy/quiz_buddy_lv10.png";
  if (level >= 4) return "./assets/buddy/quiz_buddy_lv05.png";
  return "./assets/buddy/quiz_buddy_lv01.png";
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
      answers: romajiAnswers(kana, roma),
    }));
  }
  if (subject === "world") return worldLevels[level - 1];
  if (subject === "animal") return animalLevels[level - 1];
  if (subject === "quiz") return quizLevels[level - 1];
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

function romajiAnswers(kana, hint) {
  const answers = new Set(romajiKanaVariants(kana).map(normalizeAnswer));
  if (hint) answers.add(normalizeAnswer(hint));
  return [...answers];
}

function romajiKanaVariants(kana) {
  const text = kanaToHiragana(kana);
  const groups = [];
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1] || "";
    if (char === "っ") {
      const nextVariants = kanaChunkVariants(next);
      const doubled = nextVariants
        .map((item) => doubleConsonant(item))
        .filter(Boolean);
      groups.push([...new Set([...doubled, "ltu", "xtu"])]);
      continue;
    }
    if ("ゃゅょ".includes(next)) {
      groups.push(kanaChunkVariants(char + next));
      index += 1;
      continue;
    }
    groups.push(kanaChunkVariants(char));
  }
  return combineRomajiGroups(groups);
}

function kanaToHiragana(text) {
  return text.replace(/[ァ-ン]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0x60));
}

function kanaChunkVariants(chunk) {
  const map = {
    あ: ["a"], い: ["i"], う: ["u"], え: ["e"], お: ["o"],
    か: ["ka"], き: ["ki"], く: ["ku"], け: ["ke"], こ: ["ko"],
    さ: ["sa"], し: ["shi", "si"], す: ["su"], せ: ["se"], そ: ["so"],
    た: ["ta"], ち: ["chi", "ti"], つ: ["tsu", "tu"], て: ["te"], と: ["to"],
    な: ["na"], に: ["ni"], ぬ: ["nu"], ね: ["ne"], の: ["no"],
    は: ["ha"], ひ: ["hi"], ふ: ["fu", "hu"], へ: ["he"], ほ: ["ho"],
    ま: ["ma"], み: ["mi"], む: ["mu"], め: ["me"], も: ["mo"],
    や: ["ya"], ゆ: ["yu"], よ: ["yo"],
    ら: ["ra"], り: ["ri"], る: ["ru"], れ: ["re"], ろ: ["ro"],
    わ: ["wa"], を: ["wo"], ん: ["n", "nn"],
    が: ["ga"], ぎ: ["gi"], ぐ: ["gu"], げ: ["ge"], ご: ["go"],
    ざ: ["za"], じ: ["ji", "zi"], ず: ["zu"], ぜ: ["ze"], ぞ: ["zo"],
    だ: ["da"], ぢ: ["di"], づ: ["du"], で: ["de"], ど: ["do"],
    ば: ["ba"], び: ["bi"], ぶ: ["bu"], べ: ["be"], ぼ: ["bo"],
    ぱ: ["pa"], ぴ: ["pi"], ぷ: ["pu"], ぺ: ["pe"], ぽ: ["po"],
    ゃ: ["lya", "xya"], ゅ: ["lyu", "xyu"], ょ: ["lyo", "xyo"],
    きゃ: ["kya", "kilya", "kixya"], きゅ: ["kyu", "kilyu", "kixyu"], きょ: ["kyo", "kilyo", "kixyo"],
    しゃ: ["sha", "sya", "silya", "sixya", "shilya", "shixya"],
    しゅ: ["shu", "syu", "silyu", "sixyu", "shilyu", "shixyu"],
    しょ: ["sho", "syo", "silyo", "sixyo", "shilyo", "shixyo"],
    ちゃ: ["cha", "tya", "tilya", "tixya", "chilya", "chixya"],
    ちゅ: ["chu", "tyu", "tilyu", "tixyu", "chilyu", "chixyu"],
    ちょ: ["cho", "tyo", "tilyo", "tixyo", "chilyo", "chixyo"],
    じゃ: ["ja", "zya", "jilya", "jixya", "zilya", "zixya"],
    じゅ: ["ju", "zyu", "jilyu", "jixyu", "zilyu", "zixyu"],
    じょ: ["jo", "zyo", "jilyo", "jixyo", "zilyo", "zixyo"],
    ぎゃ: ["gya", "gilya", "gixya"], ぎゅ: ["gyu", "gilyu", "gixyu"], ぎょ: ["gyo", "gilyo", "gixyo"],
    ー: ["-"],
  };
  return map[chunk] || [chunk];
}

function doubleConsonant(value) {
  if (!/^[bcdfghjklmpqrstvwxyz]/.test(value)) return "";
  return value[0];
}

function combineRomajiGroups(groups) {
  return groups.reduce((acc, group) => {
    const next = [];
    for (const prefix of acc) {
      for (const item of group) {
        next.push(`${prefix}${item}`);
      }
    }
    return next;
  }, [""]);
}

function normalizeAnswer(value) {
  return value.trim().toLowerCase().replace(/[‐‑‒–—―−ー]/g, "-").replace(/\s+/g, " ");
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
  const changed = ["hero", "blue", "red", "world", "animal", "quiz"].find((key) => before[key].src !== after[key].src);
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
  return item.rarity === "レア" || item.rarity === "スーパー レア" || item.rarity === "でんせつ";
}

function pickFish() {
  const level = currentBestLevel();
  const available = fishList.filter((item) => item.minLevel <= level);
  const weighted = available.map((item) => ({
    item,
    weight: fishDrawWeight(item),
  }));
  const total = weighted.reduce((sum, entry) => sum + entry.weight, 0);
  let draw = Math.random() * total;
  for (const entry of weighted) {
    draw -= entry.weight;
    if (draw <= 0) return entry.item;
  }
  return available[0];
}

function fishDrawWeight(item) {
  const seen = state.fish[item.id] || 0;
  if (seen > 0) return item.weight;
  if (item.rarity === "よくでる") return item.weight * 8;
  if (item.rarity === "たまにでる") return item.weight * 6;
  if (item.rarity === "レア") return item.weight * 2;
  if (item.rarity === "スーパー レア") return item.weight * 1.7;
  return item.weight * 1.5;
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
  selectedLevels = defaultLevels();
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
