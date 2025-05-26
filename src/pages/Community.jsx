import React from "react";
import { Link } from "react-router-dom";
import { PageContainer } from "../components/PageContainer";

const dummyPosts = [
  { id: 1, category: "정보", title: "싱크홀 예방법", author: "관리자", date: "2025-05-22" },
  { id: 2, category: "경험", title: "우리 동네 싱크홀 경험", author: "시민1", date: "2025-05-21" },
];

export default function Community() {
  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">📢 커뮤니티</h1>

        <table className="w-full border rounded-md overflow-hidden text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">카테고리</th>
              <th className="p-3">제목</th>
              <th className="p-3 hidden sm:table-cell">작성자</th>
              <th className="p-3 hidden sm:table-cell">작성일</th>
            </tr>
          </thead>
          <tbody>
            {dummyPosts.map((post) => (
              <tr key={post.id} className="border-t hover:bg-gray-50">
                <td className="p-3 text-sm">{post.category}</td>
                <td className="p-3 text-blue-600 font-medium">
                  <Link to={`/community/${post.id}`}>{post.title}</Link>
                </td>
                <td className="p-3 text-sm hidden sm:table-cell">{post.author}</td>
                <td className="p-3 text-sm hidden sm:table-cell">{post.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageContainer>
  );
}