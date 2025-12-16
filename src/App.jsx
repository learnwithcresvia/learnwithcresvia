import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";


import Home from "./pages/Home";
import Auth from "./pages/Auth";
import StudyHub from "./pages/StudyHub";
import CodingPractice from "./pages/CodingPractice";
import XPRewards from "./pages/XPRewards";
import StudyTopics from "./pages/StudyTopics";
import Lesson from "./pages/Lesson";


export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/study" element={<ProtectedRoute><StudyHub /></ProtectedRoute>} />
            <Route path="/coding" element={<ProtectedRoute><CodingPractice /></ProtectedRoute>} />
            <Route path="/xp" element={<ProtectedRoute><XPRewards /></ProtectedRoute>} />
            <Route path="/study/:subject" element={<ProtectedRoute><StudyTopics /></ProtectedRoute>}/>
            <Route path="/study/:subject/:topicId" element={<ProtectedRoute><Lesson /></ProtectedRoute>}/>
          </Routes>
          
        </div>
      </div>
    </BrowserRouter>
  );
}
