import { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import practiceQuestions from "../data/practiceQuestions";
import { runCode } from "../utils/judge0";
import { addXP } from "../utils/xp";
import "./CodingPractice.css"; // Make sure CSS file has appropriate styles

export default function CodingPractice() {
  const [view, setView] = useState("language");
  const [language, setLanguage] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(null);

  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [hint, setHint] = useState("");
  const [status, setStatus] = useState("");

  const [seconds, setSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const [completed, setCompleted] = useState(new Set());

  const questions = language
    ? practiceQuestions.filter((q) => q.language === language)
    : [];

  const question = questionIndex !== null ? questions[questionIndex] : null;

  /* ================= TIMER ================= */
  useEffect(() => {
    if (!timerRunning) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [timerRunning]);

  const startTimer = () => {
    setSeconds(0);
    setTimerRunning(true);
  };

  const stopTimer = () => setTimerRunning(false);

  const formatTime = () => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const timerStatusClass =
    question && completed.has(question.id)
      ? "timer-done"
      : timerRunning
      ? "timer-running"
      : "timer-paused";

  /* ================= DRAFT ================= */
  const draftKey = question ? `${language}-${question.id}` : "";

  useEffect(() => {
    if (question && code.trim() && !completed.has(question.id)) {
      localStorage.setItem(draftKey, code);
    }
  }, [code, question, completed, draftKey]);

  const loadDraft = (q) => localStorage.getItem(`${language}-${q.id}`) || "";

  /* ================= LANGUAGE ================= */
  const chooseLanguage = (lang) => {
    setLanguage(lang);
    setView("questions");
  };

  /* ================= QUESTION ================= */
  const openQuestion = (index) => {
    const q = questions[index];
    if (!q) return;

    setQuestionIndex(index);
    setCode(loadDraft(q));
    setOutput("");
    setHint("");
    setStatus("");
    setHasStarted(false);

    if (!completed.has(q.id)) {
      startTimer();
    } else {
      stopTimer();
    }

    setView("workspace");
  };

  /* ================= RUN ================= */
  const handleRun = async () => {
    if (!question || !code.trim()) return;

    setOutput("Running...");
    setHint("");

    try {
      const langId = language === "python" ? 71 : 63;
      const result = await runCode(code, langId);

      if (result.stdout) {
        const out = result.stdout.trim();
        if (out === question.expectedOutput.trim()) {
          setStatus("correct");
          setOutput(out);
          stopTimer();
          setCompleted((prev) => new Set(prev).add(question.id));
          await addXP(10);
          localStorage.removeItem(draftKey);
        } else {
          setStatus("incorrect");
          setOutput(out);
          setHint("Output does not match expected output.");
        }
      } else {
        setStatus("incorrect");
        setOutput(result.stderr || result.compile_output || "Error");
        setHint("Check syntax or logic.");
      }
    } catch {
      setOutput("Execution failed.");
    }
  };

  /* ================= NAV ================= */
  const goPrev = () => {
    if (questionIndex === null) return;
    openQuestion(Math.max(questionIndex - 1, 0));
  };

  const goNext = () => {
    if (questionIndex === null) return;
    openQuestion(Math.min(questionIndex + 1, questions.length - 1));
  };

  /* ================= RESET ================= */
  const resetCode = () => {
    if (!question || completed.has(question.id)) return;
    setCode("");
    setOutput("");
    setHint("");
    setStatus("");
    setHasStarted(true);
    localStorage.removeItem(draftKey);
  };

  /* ================= UI ================= */
  if (view === "language") {
    return (
      <div className="page coding-page center">
        <h1>💻 Coding Practice</h1>
        <div className="lang-select">
          <button onClick={() => chooseLanguage("python")}>🐍 Python</button>
          <button onClick={() => chooseLanguage("javascript")}>🟨 JavaScript</button>
        </div>
      </div>
    );
  }

  if (view === "questions") {
    return (
      <div className="page coding-page">
        <h2>{language.toUpperCase()} Questions</h2>
        <div className="question-grid">
          {questions.map((q, i) => {
            const done = completed.has(q.id);
            return (
              <div
                key={q.id}
                className={`question-card ${done ? "done" : ""}`}
                onClick={() => openQuestion(i)}
              >
                <h4>{q.title}</h4>
                <span className={`status-badge ${done ? "done" : "pending"}`}>
                  {done ? "Completed" : "Pending"}
                </span>
              </div>
            );
          })}
        </div>
        <button onClick={() => setView("language")}>← Change Language</button>
      </div>
    );
  }

  if (view === "workspace") {
    if (!question) return null; // safety

    return (
      <div className="page coding-page">
        {/* Header */}
        <div className="coding-header">
          <div>
            <h2>{question.title}</h2>
            <p>{question.description}</p>
          </div>
          <div className={`timer-badge ${timerStatusClass}`}>⏱ {formatTime()}</div>
        </div>

        {/* Two-panel layout */}
        <div className="coding-layout">
          {/* LEFT: Editor + Run/Reset */}
          <div className="left-panel">
            <CodeMirror
              value={code}
              height="320px"
              readOnly={completed.has(question.id)}
              extensions={[language === "python" ? python() : javascript()]}
              placeholder={!hasStarted ? "// Write your code here..." : ""}
              onChange={(v) => {
                setCode(v);
                setHasStarted(true);
              }}
            />
            <div className="editor-actions">
              <button onClick={handleRun} disabled={completed.has(question.id)}>
                ▶ Run
              </button>
              <button onClick={resetCode} disabled={completed.has(question.id)}>
                Reset
              </button>
            </div>
          </div>

          {/* RIGHT: Output, Hints, Expected Output, Success, Nav */}
          <div className="right-panel">
            <h3>Output</h3>
            <pre>{output}</pre>

            {hint && <div className="hint-box">💡 {hint}</div>}

            <div className="expected-box">
              <h4>Expected Output</h4>
              <pre>{question.expectedOutput}</pre>
            </div>

            {completed.has(question.id) && (
              <div className="success-box">✅ Correct Solution</div>
            )}

            <div className="nav-buttons">
              <button onClick={goPrev}>← Previous</button>
              <button onClick={goNext}>Next →</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null; // fallback
}
