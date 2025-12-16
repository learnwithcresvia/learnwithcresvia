import { useAuth } from "../context/AuthContext";

export default function XPRewards() {
  const { user } = useAuth();

  const xp = user?.user_metadata?.xp || 0;
  const level = Math.floor(xp / 100) + 1;
  const progress = xp % 100;

  return (
    <div className="page">
      <h1>🎮 XP & Rewards</h1>
      <p className="subtitle">
        Track your learning progress.
      </p>

      <div className="xp-card section">
        <h2>Total XP</h2>
        <p className="xp-value">{xp}</p>
        <p>Level {level}</p>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <small>{progress} / 100 XP to next level</small>
      </div>
    </div>
  );
}
