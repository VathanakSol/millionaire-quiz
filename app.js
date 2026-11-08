// ---------- Data ----------
const QUESTIONS = [
  {
    cat: "Mindset",
    q: "What is the single biggest habit that separates millionaires from everyone else?",
    options: [
      "Buying luxury goods to feel successful",
      "Living below their means and investing the difference",
      "Waiting for a lottery win or inheritance",
      "Taking out more credit cards for rewards"
    ],
    correct: 1,
    explain: "<b>Spending less than you earn</b> creates the surplus that gets invested — compounding turns it into wealth over time."
  },
  {
    cat: "Compounding",
    q: "You invest $500/month starting at age 25, earning 8% annually. Roughly what do you have by age 65?",
    options: ["About $150,000", "About $300,000", "About $1.4 million", "About $50,000"],
    correct: 2,
    explain: "With <b>40 years of compounding</b>, $500/month at 8% grows past <b>$1.4M</b>. Time in the market beats timing the market."
  },
  {
    cat: "Risk",
    q: "Which is the smartest way to build wealth through real estate?",
    options: [
      "Buy one home and hope its price triples",
      "Flip houses with maximum leverage every month",
      "Own income-producing properties that pay your expenses",
      "Avoid real estate because it's too risky"
    ],
    correct: 2,
    explain: "Wealthy investors favor <b>cash-flowing assets</b> — rent covers costs and builds equity while you sleep."
  },
  {
    cat: "Income",
    q: "What does 'multiple income streams' really mean for building wealth?",
    options: [
      "Having several high-paying jobs at once",
      "Diversifying so one loss doesn't wipe you out",
      "Maxing out all your credit lines",
      "Relying only on your salary but spending lavishly"
    ],
    correct: 1,
    explain: "Diversified income (salary, investments, business, rentals) <b>reduces risk</b> and accelerates net worth growth."
  },
  {
    cat: "Debt",
    q: "How should you treat high-interest consumer debt (credit cards ~20%)?",
    options: [
      "Carry the balance forever since minimums are small",
      "Pay it off aggressively before investing",
      "Ignore it and focus only on stocks",
      "Transfer it to more cards to spread payments"
    ],
    correct: 1,
    explain: "A 20% debt is a guaranteed -20% return. <b>Kill expensive debt first</b>, then invest the freed-up cash flow."
  },
  {
    cat: "Investing",
    q: "Which portfolio approach has historically beaten most active stock pickers?",
    options: [
      "Picking one hot stock each quarter",
      "Timing the market based on news headlines",
      "Low-cost diversified index funds, rebalanced yearly",
      "Putting everything in a single crypto coin"
    ],
    correct: 2,
    explain: "Broad <b>index funds</b> capture whole-market returns with low fees — the strategy behind most long-term millionaires."
  },
  {
    cat: "Lifestyle",
    q: "As your income rises, what should happen to your lifestyle spending?",
    options: [
      "It should rise equally — you've earned it",
      "It should stay flat while savings grow (lifestyle creep control)",
      "It should double to show success",
      "It doesn't matter if you're rich anyway"
    ],
    correct: 1,
    explain: "Controlling <b>lifestyle creep</b> means bigger raises go to investments, not just bigger cars and dinners."
  },
  {
    cat: "Time",
    q: "What is the most underrated asset a future millionaire owns?",
    options: [
      "A luxury watch",
      "Their health and energy to work and learn",
      "A second car",
      "Designer clothing"
    ],
    correct: 1,
    explain: "Health, skills, and relationships compound like money. <b>You can't invest without the energy to keep going.</b>"
  }
];

const RESULTS = [
  { min: 0, max: 2, medal: "🐣", title: "The Dreamer", sub: "You're just getting started — and that's okay. The best time to start was yesterday; the second-best is now." },
  { min: 3, max: 4, medal: "", title: "The Builder", sub: "You've got solid instincts. A few key upgrades will turn good habits into real wealth." },
  { min: 5, max: 6, medal: "", title: "The Investor", sub: "Strong financial mindset! You understand compounding and diversification — keep stacking." },
  { min: 7, max: 8, medal: "👑", title: "Future Millionaire", sub: "Outstanding. Your answers mirror how actual millionaires think. Now execute consistently." }
];

// ---------- State ----------
let idx = 0;
let score = 0;
let streak = 0;
let answered = false;

// ---------- Elements ----------
const introScreen = document.getElementById("introScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");
const startBtn = document.getElementById("startBtn");
const retryBtn = document.getElementById("retryBtn");
const nextBtn = document.getElementById("nextBtn");
const qNow = document.getElementById("qNow");
const qTotal = document.getElementById("qTotal");
const bar = document.getElementById("bar");
const qCat = document.getElementById("qCat");
const qText = document.getElementById("qText");
const optionsEl = document.getElementById("options");
const explainEl = document.getElementById("explain");
const streakLbl = document.getElementById("streakLbl");
const netWorth = document.getElementById("netWorth");
const medal = document.getElementById("medal");
const resTitle = document.getElementById("resTitle");
const resSub = document.getElementById("resSub");
const stScore = document.getElementById("stScore");
const stPct = document.getElementById("stPct");
const stWorth = document.getElementById("stWorth");

qTotal.textContent = QUESTIONS.length;

// ---------- Helpers ----------
function fmtMoney(n){
  return "$" + n.toLocaleString("en-US");
}
// Fun estimated net worth based on score
function estimateWorth(s){
  const map = [0, 12000, 45000, 90000, 210000, 480000, 850000, 1250000, 2000000];
  return map[s] || 0;
}

// ---------- Flow ----------
function startQuiz(){
  idx = 0; score = 0; streak = 0;
  introScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  renderQuestion();
}

function renderQuestion(){
  answered = false;
  const item = QUESTIONS[idx];
  qNow.textContent = idx + 1;
  bar.style.width = ((idx) / QUESTIONS.length * 100) + "%";
  qCat.textContent = item.cat;
  qText.textContent = item.q;
  explainEl.classList.remove("show");
  explainEl.innerHTML = "";
  nextBtn.classList.remove("ready");
  nextBtn.textContent = idx === QUESTIONS.length - 1 ? "See My Result →" : "Next →";
  streakLbl.textContent = streak >= 2 ? "🔥 " + streak + " in a row" : "";

  optionsEl.innerHTML = "";
  item.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "opt";
    btn.innerHTML = '<span class="key">' + String.fromCharCode(65 + i) + '</span><span>' + opt + '</span>';
    btn.addEventListener("click", () => selectAnswer(i, btn));
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(i, btn){
  if(answered) return;
  answered = true;
  const item = QUESTIONS[idx];
  const buttons = optionsEl.querySelectorAll(".opt");
  buttons.forEach(b => b.disabled = true);

  const isCorrect = i === item.correct;
  if(isCorrect){
    btn.classList.add("correct");
    score++;
    streak++;
  } else {
    btn.classList.add("wrong");
    buttons[item.correct].classList.add("correct");
    streak = 0;
  }

  // Update live net worth ticker
  netWorth.textContent = fmtMoney(estimateWorth(score));

  // Show explanation
  explainEl.innerHTML = (isCorrect ? "✅ <b>Correct!</b> " : "❌ <b>Not quite.</b> ") + item.explain;
  explainEl.classList.add("show");

  // Progress bar to this question
  bar.style.width = ((idx + 1) / QUESTIONS.length * 100) + "%";
  streakLbl.textContent = streak >= 2 ? "🔥 " + streak + " in a row" : "";

  nextBtn.classList.add("ready");
}

function nextQuestion(){
  idx++;
  if(idx >= QUESTIONS.length){
    showResult();
  } else {
    renderQuestion();
  }
}

function showResult(){
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  const pct = Math.round(score / QUESTIONS.length * 100);
  const worth = estimateWorth(score);
  let tier = RESULTS[RESULTS.length - 1];
  for(const r of RESULTS){
    if(score >= r.min && score <= r.max){ tier = r; break; }
  }

  medal.textContent = tier.medal;
  resTitle.textContent = tier.title;
  resSub.textContent = tier.sub;
  stScore.textContent = score + "/" + QUESTIONS.length;
  stPct.textContent = pct + "%";
  stWorth.textContent = fmtMoney(worth);
  netWorth.textContent = fmtMoney(worth);
}

// ---------- Events ----------
startBtn.addEventListener("click", startQuiz);
retryBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);

// Keyboard support: 1-4 / A-D to answer, Enter to advance
document.addEventListener("keydown", (e) => {
  if(quizScreen.classList.contains("hidden")) return;
  const keys = ["1","2","3","4","a","b","c","d"];
  const lower = e.key.toLowerCase();
  if(!answered && keys.includes(lower)){
    const i = keys.indexOf(lower);
    const btn = optionsEl.querySelectorAll(".opt")[i];
    if(btn) btn.click();
  } else if(answered && (e.key === "Enter" || e.key === "ArrowRight")){
    nextQuestion();
  }
});
