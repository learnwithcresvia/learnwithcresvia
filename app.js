function selectLanguage(lang) {
    localStorage.setItem("language", lang);
    window.location.href = "template.html";
}

const languageData = {
    python: {
        intro: "Python is easy to learn and used in AI & Data Science.",
        code: "print('Hello, World!')"
    },
    java: {
        intro: "Java is an object-oriented programming language.",
        code: "class HelloWorld { public static void main(String[] args) { System.out.println('Hello World'); } }"
    },
    c: {
        intro: "C is a procedural programming language.",
        code: "#include <stdio.h>\nint main() {\n printf(\"Hello World\");\n return 0;\n}"
    }
};

const quizQuestions = [
    {
        question: "Which function is used to print output in Python?",
        options: ["print()", "echo()", "write()"],
        answer: "print()"
    },
    {
        question: "Which data type is used to store text in Python?",
        options: ["int", "float", "str"],
        answer: "str"
    },
    {
        question: "Which symbol is used for comments in Python?",
        options: ["//", "#", "/* */"],
        answer: "#"
    }
];

let currentQuestion = 0;
let quizScore = 0;

// Load first question
if (document.getElementById("question")) {
    loadQuestion();
}

function loadQuestion() {
    document.getElementById("feedback").innerText = "";
    const q = quizQuestions[currentQuestion];

    document.getElementById("question").innerText =
        `Question ${currentQuestion + 1}: ${q.question}`;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach(option => {
        optionsDiv.innerHTML += `
            <label>
                <input type="radio" name="quiz" value="${option}">
                ${option}
            </label><br>
        `;
    });
}

function nextQuestion() {
    const selected = document.querySelector('input[name="quiz"]:checked');

    if (!selected) {
        document.getElementById("feedback").innerText =
            "Please select an answer before continuing.";
        return;
    }

    if (selected.value === quizQuestions[currentQuestion].answer) {
        quizScore++;
    }

    currentQuestion++;

    if (currentQuestion < quizQuestions.length) {
        loadQuestion();
    } else {
        localStorage.setItem("finalQuizScore", quizScore);
        window.location.href = "result.html";
    }
}


if (document.getElementById("intro")) {
    let lang = localStorage.getItem("language");
    document.getElementById("intro").innerText = languageData[lang].intro;
    document.getElementById("code").innerText = languageData[lang].code;
}

function goToPractice() {
    window.location.href = "practice.html";
}

function checkCode() {
    let code = document.getElementById("userCode").value.trim();
    let result = document.getElementById("result");
    let hint = document.getElementById("hint");
    let errorBox = document.getElementById("errorBox");
    let errorCode = document.getElementById("errorCode");
    let feedback = document.getElementById("feedback");

    // Show feedback after submit
    feedback.style.display = "block";

    // Reset
    result.innerText = "";
    hint.innerText = "";
    errorBox.style.display = "none";
    errorCode.innerHTML = "";

    // 1️⃣ Empty code
    if (code === "") {
        result.innerText = "❌ Incorrect.";
        hint.innerText =
            "Reference: Use the print() function.\nExample: print(\"Hello\")";
        return;
    }

    // 2️⃣ CASE-SENSITIVE ERROR (MUST COME FIRST)
    if (code.includes("Print")) {
        result.innerText = "❌ Incorrect.";
        hint.innerText =
            "Reference: Python is case-sensitive.\nUse print(), not Print().";

        errorBox.style.display = "block";

        let highlighted = code.replace(
            /Print/g,
            `<span class="error-highlight">Print</span>`
        );

        errorCode.innerHTML = highlighted;
        return;
    }

    // 3️⃣ Missing print
    if (!code.includes("print")) {
        result.innerText = "❌ Incorrect.";
        hint.innerText =
            "Reference: You must use the print() function.";

        errorBox.style.display = "block";
        errorCode.innerText = code;
        return;
    }

    // 4️⃣ Missing quotes
    if (!code.includes('"') && !code.includes("'")) {
        result.innerText = "❌ Incorrect.";
        hint.innerText =
            "Reference: Text must be written inside quotes.";

        errorBox.style.display = "block";
        errorCode.innerText = code;
        return;
    }

    // ✅ Correct
    result.innerText = "✅ Correct!";
    hint.innerText =
        "Well done! You used the print() function correctly.";
}









function checkQuiz() {
    let options = document.getElementsByName("q1");
    let score = 0;
    let answered = false;

    for (let opt of options) {
        if (opt.checked) {
            answered = true;
            if (opt.value === "print()") {
                score = 1;
                document.getElementById("score").innerText =
                    "Correct answer. Score: 1 / 1";
            } else {
                document.getElementById("score").innerText =
                    "Incorrect answer. Score: 0 / 1";
            }
            break;
        }
    }

    if (!answered) {
        document.getElementById("score").innerText =
            "Please select an option before submitting.";
        return;
    }

    // Store score
    localStorage.setItem("quizScore", score);
}



function goToQuiz() {
    window.location.href = "quiz.html";
}

function goHome() {
    window.location.href = "index.html";
}



