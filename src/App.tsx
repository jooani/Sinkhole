// App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import SinkholeReport from "./pages/SinkholeReport";
import SinkholeHeatmap from "./pages/SinkholeHeatmap";
import NewPostForm from "./pages/NewpostForm";
import EditPostForm from "./pages/EditpostForm";
import Community from "./pages/Community";
import PostDetail from "./pages/PostDetail"; // ❗ 오타 수정
import AdminApproval from "./pages/AdminApproval";
import ReportDetail from "./pages/ReportDetail";
import ReportsPage from "./pages/ReportsPage";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home"


// 홈 카드 데이터
const cards = [
  {
    title: "제보하기",
    emoji: "📝",
    description: "싱크홀 발견 시 빠르게 제보할 수 있어요.",
    link: "/report",
  },
  {
    title: "새 글 작성",
    emoji: "🆕",
    description: "커뮤니티에 자유롭게 글을 작성해보세요.",
    link: "/community/new",
  },
  {
    title: "Heatmap 보기",
    emoji: "🗺️",
    description: "전국 싱크홀 발생 현황을 지도에서 확인하세요.",
    link: "/heatmap",
  },
  {
    title: "커뮤니티",
    emoji: "💬",
    description: "다른 사람들의 제보와 이야기를 확인해보세요.",
    link: "/community",
  },
  {
    title: "제보 승인",
    emoji: "🛠️",
    description: "제보된 내용을 확인하고 승인할 수 있어요.",
    link: "/admin",
  },
  {
    title: "제보 전체 보기",
    emoji: "📍",
    description: "지도와 함께 전체 제보를 한 눈에!",
    link: "/reports",
  },
];


// 전체 앱 구성
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100 flex flex-col">
        <Navbar />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<SinkholeReport />} />
            <Route path="/heatmap" element={<SinkholeHeatmap />} />
            <Route path="/community/new" element={<NewPostForm />} />
            <Route path="/community/edit/:id" element={<EditPostForm />} />
            <Route path="/community/:id" element={<PostDetail />} />
            <Route path="/community" element={<Community />} />
            <Route path="/admin" element={<AdminApproval />} />
            <Route path="/reports/:id" element={<ReportDetail />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;