import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { runCode } from "../utils/judge0";
import { addXP } from "../utils/xp";
import { languages } from "../data/languages";

export default function CodingPractice() {
  const [language, setLanguage] = useState(languages[0]);
  const [code, setCode] = useState(`console.log("Hello Cresvia");`);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    setOutput("Running code...");

    try {
      const result = await runCode(code, language.id);

      if (result.stdout) {
        setOutput(result.stdout);
        await addXP(20);
      } else if (result.stderr) {
        setOutput(result.stderr);
      } else if (result.compile_output) {
        setOutput(result.compile_output);
      } else {
        setOutput("No output returned.");
      }
    } catch (error) {
      setOutput("Error executing code.");
    }

    setLoading(false);
  };

  return (
    <div className="page">
      <h1>💻 Coding Practice</h1>

      <div className="language-selector section">
        <label>Select Language:</label>
        <select
          value={language.id}
          onChange={(e) =>
            setLanguage(
              languages.find(
                (lang) => lang.id === Number(e.target.value)
              )
            )
          }
        >
          {languages.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      <div className="editor-container section">
        <CodeMirror
          value={code}
          height="300px"
          extensions={[javascript()]}
          onChange={(value) => setCode(value)}
        />
      </div>

      <button
        className="run-button"
        onClick={handleRun}
        disabled={loading}
      >
        {loading ? "Running..." : "▶ Run Code"}
      </button>

      <div className="output-container section">
        <h3>Output</h3>
        <pre className="output-box">{output}</pre>
      </div>
    </div>
  );
}
