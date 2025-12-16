import { useParams, useNavigate } from "react-router-dom";
import { studyData } from "../data/studyData";

export default function StudyTopics() {
  const { subject } = useParams();
  const navigate = useNavigate();
  const data = studyData[subject];

  if (!data) {
    return <div className="page">Subject not found</div>;
  }

  return (
    <div className="page">
  <h1>{data.title}</h1>
  <p className="subtitle">
    Select a topic to start the lesson.
  </p>

  <div className="section">
    {data.topics.map((topic) => (
      <div
        key={topic.id}
        className="feature-card clickable"
        onClick={() =>
          navigate(`/study/${subject}/${topic.id}`)
        }
      >
        <h3>{topic.title}</h3>
        <p>Click to read lesson content</p>
      </div>
    ))}
  </div>
</div>

  );
}
