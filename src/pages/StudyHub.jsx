import { useNavigate } from "react-router-dom";

export default function StudyHub() {
  const navigate = useNavigate();

  return (
    <div className="page">
  <h1>📘 Study Hub</h1>
  <p className="subtitle">
    Choose a subject and start learning step by step.
  </p>

  <div className="home-features section">
    <div
      className="feature-card clickable"
      onClick={() => navigate("/study/programming")}
    >
      <div className="icon-circle">💻</div>
      <h3>Programming</h3>
      <p>Learn coding fundamentals and frameworks.</p>
    </div>

    <div
      className="feature-card clickable"
      onClick={() => navigate("/study/mathematics")}
    >
      <div className="icon-circle">📐</div>
      <h3>Mathematics</h3>
      <p>Build strong problem-solving foundations.</p>
    </div>
  </div>
</div>

  );
}
