const quiz = [
  {
    q: "HTML ka full form kya hai?",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Markup Language",
      "Hyper Text Marketing Language"
    ],
    answer: 1
  },
  {
    q: "CSS ka use kis liye hota hai?",
    options: ["Structure", "Styling", "Database"],
    answer: 1
  },
  {
    q: "JavaScript kya hai?",
    options: ["Programming Language", "Server", "Database"],
    answer: 0
  }
];

let current = 0;
let score = 0;
let timer;
let time = 10;

function startQuiz() {
  showScreen("quizScreen");
  loadQuestion();
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function loadQuestion() {
  clearInterval(timer);
  time = 10;
  document.getElementById("time").innerText = time;

  timer = setInterval(() => {
    time--;
    document.getElementById("time").innerText = time;
    if (time === 0) nextQuestion();
  }, 1000);

  let q = quiz[current];
  document.getElementById("question").innerText = q.q;

  let optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, i) => {
    let btn = document.createElement("button");
    btn.innerText = opt;

    btn.onclick = () => {
      if (i === q.answer) {
        btn.classList.add("correct");
        score++;
      } else {
        btn.classList.add("wrong");
      }
    };

    optionsDiv.appendChild(btn);
  });

  document.getElementById("progressBar").style.width =
    ((current / quiz.length) * 100) + "%";
}

function nextQuestion() {
  current++;
  if (current < quiz.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  showScreen("resultScreen");
  document.getElementById("score").innerText = score;
}

function restartQuiz() {
  current = 0;
  score = 0;
  showScreen("startScreen");
}
