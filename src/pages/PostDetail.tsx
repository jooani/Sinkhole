// PostDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { PageContainer } from "../components/PageContainer";
import { Button } from "../components/ui/button";

type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
};

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // ✅ 현재 사용자 이름 가져오기
      fetch("https://internetprogramming.onrender.com/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setCurrentUser(data.username))
        .catch(() => setCurrentUser(null));
    }
  }, []);

  useEffect(() => {
    fetch(`https://internetprogramming.onrender.com/api/community/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("게시글 조회 실패");
        return res.json();
      })
      .then((data) => setPost(data))
      .catch((err) => {
        console.error(err);
        alert("게시글을 불러오지 못했습니다.");
      });
  }, [id]);

  const handleDelete = async () => {
    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (!confirm) return;

    const token = localStorage.getItem("token");
    const res = await fetch(`https://internetprogramming.onrender.com/api/community/posts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      alert("삭제 완료");
      navigate("/community");
    } else {
      alert("삭제 실패");
    }
  };

  if (!post) return <PageContainer>로딩 중...</PageContainer>;

  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
        <div className="text-sm text-gray-500 mb-2">
          작성자: {post.author} | {new Date(post.createdAt).toLocaleString()}
        </div>
        <div className="mt-4 whitespace-pre-line">{post.content}</div>

        {/* ✅ 로그인 사용자 & 작성자 일치 시만 버튼 표시 */}
        {currentUser === post.author && (
          <div className="flex gap-4 mt-6">
            <Link to={`/community/edit/${post.id}`}>
              <Button>수정</Button>
            </Link>
            <Button variant="destructive" onClick={handleDelete}>
              삭제
            </Button>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
