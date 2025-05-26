import React from "react";
// PostDetail.tsx
import { useParams } from "react-router-dom";
import { PageContainer } from "../components/PageContainer";

const dummyPost = {
  1: {
    title: "싱크홀 예방법",
    content: "싱크홀 예방을 위해선 정기적인 도로 점검이 중요합니다.",
    author: "관리자",
    date: "2025-05-22",
  },
  2: {
    title: "우리 동네 싱크홀 경험",
    content: "갑자기 땅이 꺼져서 깜짝 놀랐어요.",
    author: "시민1",
    date: "2025-05-21",
  },
};

export default function PostDetail() {
  const { id } = useParams();
  const numericId = Number(id); // 문자열 → 숫자

  const post = dummyPost[numericId as keyof typeof dummyPost];

  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-2">{post?.title}</h1>
        <p className="text-sm text-gray-500 mb-4">
          작성자: {post?.author} | 작성일: {post?.date}
        </p>
        <div className="bg-white rounded-md p-4 border text-gray-800 leading-relaxed">
          {post?.content}
        </div>
      </div>
    </PageContainer>
  );
}