import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { studyData } from "../data/studyData";
import { addXP } from "../utils/xp";

export default function Lesson() {
  const { subject, topicId } = useParams();

  const topic =
    studyData[subject]?.topics.find(
      (t) => t.id === topicId
    );

  // Award XP when lesson is opened
  useEffect(() => {
    if (topic) {
      addXP(10);
    }
  }, [topic]);

  if (!topic) {
    return (
      <div className="page">
        <h1>Lesson not found</h1>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>{topic.title}</h1>

      <div className="lesson-card section">
        <pre className="lesson-content">
          {topic.content}
        </pre>
      </div>
    </div>
  );
}
