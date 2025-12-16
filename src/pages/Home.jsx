import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="page">
      {/* Hero Section */}
      <section className="home-hero">
        <h1>LearnWithCresvia</h1>
        <p>
          Learn. Practice. Earn XP.  
          All in one interactive learning platform.
        </p>

        {user ? (
          <Link to="/study" className="hero-button">
            Go to Study Hub
          </Link>
        ) : (
          <Link to="/auth" className="hero-button">
            Get Started
          </Link>
        )}
      </section>

      {/* Features Section */}
      <section className="home-features">
        <div className="feature-card">
          <div className="icon-circle">📘</div>
          <h3>Study Hub</h3>
          <p>
            Learn concepts through structured topics and easy explanations.
          </p>
        </div>

        <div className="feature-card">
          <div className="icon-circle">💻</div>
          <h3>Coding Practice</h3>
          <p>
            Write, run, and test your code directly in the browser.
          </p>
        </div>

        <div className="feature-card">
          <div className="icon-circle">🎮</div>
          <h3>XP & Rewards</h3>
          <p>
            Stay motivated by earning XP and tracking your learning progress.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      {!user && (
        <section className="home-cta">
          <h2>Start your learning journey today</h2>
          <Link to="/auth" className="cta-button">
            Create Free Account
          </Link>
        </section>
      )}
    </div>
  );
}
