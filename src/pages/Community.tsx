import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PageContainer } from "../components/PageContainer";

type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
};

export default function Community() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [keyword, setKeyword] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(keyword.toLowerCase()) ||
      p.content.toLowerCase().includes(keyword.toLowerCase()) ||
      p.author.toLowerCase().includes(keyword.toLowerCase())
  );

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://internetprogramming.onrender.com/api/community/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("게시글 로드 실패");
        return res.json();
      })
      .then((data) => setPosts(data))
      .catch((err) => {
        console.error(err);
        alert("게시글을 불러오는 데 실패했습니다.");
      });
  }, []);

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">📢 커뮤니티</h1>

        <div className="mb-4">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="검색어를 입력하세요"
            className="w-full border rounded px-4 py-2 text-black"
          />
        </div>

        <table className="w-full border rounded-md overflow-hidden text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-black">제목</th>
              <th className="p-3 text-black">작성자</th>
              <th className="p-3 text-black">작성일</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map((post) => (
              <tr
                key={post.id}
                className="border-t hover:bg-gray-700"
              >
                <td className="p-3 text-blue-600 font-medium">
                  <Link to={`/community/${post.id}`}>{post.title}</Link>
                </td>
                <td className="p-3 text-sm hidden sm:table-cell">
                  {post.author}
                </td>
                <td className="p-3 text-sm hidden sm:table-cell">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageContainer>
  );
}
