import { useEffect, useState } from "react";
import { getLeaderboard } from "../services/leaderboardService";

function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [department, setDepartment] = useState("All");
  const [year, setYear] = useState("All");
  const [timeRange, setTimeRange] = useState("ALL"); // ALL | WEEK | MONTH

  // 👥 Global / Friends view
  const [viewType, setViewType] = useState("GLOBAL"); // GLOBAL | FRIENDS

  useEffect(() => {
    async function fetchData() {
      const data = await getLeaderboard();
      setUsers(data);
      setFilteredUsers(data);
    }
    fetchData();
  }, []);

  // 🔍 Apply filters
  function applyFilters(dept, yr, range, view = viewType) {
    let tempUsers = [...users];
    const now = new Date();

    // 1️⃣ Time filter
    if (range === "WEEK") {
      tempUsers = tempUsers.filter(
        (u) =>
          u.last_active &&
          (now - new Date(u.last_active)) / (1000 * 60 * 60 * 24) <= 7
      );
    } else if (range === "MONTH") {
      tempUsers = tempUsers.filter(
        (u) =>
          u.last_active &&
          (now - new Date(u.last_active)) / (1000 * 60 * 60 * 24) <= 30
      );
    }

    // 2️⃣ Department filter
    if (dept !== "All") {
      tempUsers = tempUsers.filter((u) => u.department === dept);
    }

    // 3️⃣ Year filter
    if (yr !== "All") {
      tempUsers = tempUsers.filter((u) => u.year === Number(yr));
    }

    // 4️⃣ Friends filter ✅ Apply last
    if (view === "FRIENDS") {
      tempUsers = tempUsers.filter((u) => u.is_friend === true);
    }

    setFilteredUsers(tempUsers);
  }

  // 🏅 Badge logic
  function getBadges(user) {
    const badges = [];
    if (user.streak >= 7) badges.push("🔥 Consistency Champ");
    if (user.xp >= 2000) badges.push("🥇 XP Master");
    return badges;
  }

  // 🤖 AI Feedback
  function getFeedback(index) {
    if (index < 3) return "🏆 Excellent performance! Keep leading.";
    if (index < 10) return "🔥 Great job! You are close to top 3.";
    return "💡 Stay consistent. Daily practice improves rank.";
  }

  // 🎁 Rewards
  function getReward(index) {
    const rank = index + 1;
    if (rank <= 10) return "🎖 Elite Coding Arena Unlocked";
    return "🔒 Locked";
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>🏆 Leaderboard</h2>

      {/* ⏱ Time Tabs */}
      <div style={{ marginBottom: "15px" }}>
        <button
          onClick={() => {
            setTimeRange("ALL");
            applyFilters(department, year, "ALL", viewType);
          }}
        >
          👑 All-Time Legends
        </button>

        <button
          style={{ marginLeft: "10px" }}
          onClick={() => {
            setTimeRange("WEEK");
            applyFilters(department, year, "WEEK", viewType);
          }}
        >
          🔥 Weekly Hustlers
        </button>

        <button
          style={{ marginLeft: "10px" }}
          onClick={() => {
            setTimeRange("MONTH");
            applyFilters(department, year, "MONTH", viewType);
          }}
        >
          🏆 Monthly Champions
        </button>
      </div>

      {/* 👥 Global / Friends Tabs */}
      <div style={{ marginBottom: "15px" }}>
        <button
          onClick={() => {
            setViewType("GLOBAL");
            applyFilters(department, year, timeRange, "GLOBAL");
          }}
        >
          🌍 Global
        </button>

        <button
          style={{ marginLeft: "10px" }}
          onClick={() => {
            setViewType("FRIENDS");
            applyFilters(department, year, timeRange, "FRIENDS");
          }}
        >
          👥 My Friends
        </button>
      </div>

      {/* 🏫 Filters */}
      <div style={{ marginBottom: "15px" }}>
        <label>Department: </label>
        <select
          value={department}
          onChange={(e) => {
            setDepartment(e.target.value);
            applyFilters(e.target.value, year, timeRange, viewType);
          }}
        >
          <option value="All">All</option>
          <option value="AIDS">AIDS</option>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
        </select>

        <label style={{ marginLeft: "15px" }}>Year: </label>
        <select
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
            applyFilters(department, e.target.value, timeRange, viewType);
          }}
        >
          <option value="All">All</option>
          {[1, 2, 3, 4].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* 📊 Leaderboard Table */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>XP Progress</th>
            <th>Streak 🔥</th>
            <th>Badges 🏅</th>
            <th>AI Feedback 🤖</th>
            <th>Rewards 🎁</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{user.name}</td>

                {/* XP + Progress */}
                <td>
                  {user.xp}
                  <br />
                  <progress
                    value={user.xp % 1000}
                    max="1000"
                    style={{ width: "120px" }}
                  />
                </td>

                <td>{user.streak}</td>

                <td>
                  {getBadges(user).length > 0
                    ? getBadges(user).map((b, j) => <div key={j}>{b}</div>)
                    : "—"}
                </td>

                <td>{getFeedback(i)}</td>
                <td>{getReward(i)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;


