// App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import SinkholeReport from "./pages/SinkholeReport";
import SinkholeHeatmap from "./pages/SinkholeHeatmap";
import NewPostForm from "./pages/NewpostForm";
import EditPostForm from "./pages/EditpostForm";
import Community from "./pages/Community";
import PostDetail from "./pages/PostDetail";

/**
 * 홈 카드 데이터
 */
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
];

/**
 * 홈 컴포넌트
 */
const Home: React.FC = () => {
  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-10">
        📍 싱크홀 제보 플랫폼
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link
            to={card.link}
            key={card.title}
            className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-6 text-center block"
          >
            <div className="text-4xl mb-3">{card.emoji}</div>
            <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
            <p className="text-gray-600 text-sm">{card.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
};

/**
 * 전체 앱 구성
 */
const App: React.FC = () => {
  console.log("✅ App.tsx 렌더됨");

  return (
    <BrowserRouter>
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >

        <div style={{ flex: 1, overflow: "auto" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<SinkholeReport />} />
            <Route path="/heatmap" element={<SinkholeHeatmap />} />
            <Route path="/community/new" element={<NewPostForm />} />
            <Route path="/community/edit/:id" element={<EditPostForm />} />
            <Route path="/community/:id" element={<PostDetail />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
