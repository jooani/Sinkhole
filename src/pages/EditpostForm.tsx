import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageContainer } from "../components/PageContainer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

const EditPostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    content: "",
  });

  useEffect(() => {
    fetch(`https://internetprogramming.onrender.com/api/community/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          title: data.title,
          category: data.category,
          content: data.content,
        });
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://internetprogramming.onrender.com/api/community/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("게시글 수정 완료");
        navigate(`/community/${id}`, { replace: true });
      } else {
        const err = await res.json();
        alert(`수정 실패: ${err.message || res.status}`);
      }
    } catch (err) {
      console.error(err);
      alert("수정 중 오류 발생");
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("정말 이 게시글을 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      const res = await fetch(`https://internetprogramming.onrender.com/api/community/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });

      if (res.ok) {
        alert("게시글이 삭제되었습니다.");
        navigate("/community");
      } else {
        const err = await res.json();
        alert(`삭제 실패: ${err.message || res.status}`);
      }
    } catch (err) {
      console.error(err);
      alert("삭제 중 오류 발생");
    }
  };

  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-4">게시글 수정</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label>카테고리</Label>
            <Select
              value={form.category}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger className="w-full mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="notice">공지사항</SelectItem>
                <SelectItem value="info">정보공유</SelectItem>
                <SelectItem value="experience">경험담</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="title">제목</Label>
            <Input name="title" value={form.title} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="content">내용</Label>
            <Textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={6}
            />
          </div>

          <div className="flex justify-between">
            <Button type="submit">수정하기</Button>
            <Button type="button" variant="destructive" onClick={handleDelete}>
              삭제하기
            </Button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
};

export default EditPostForm;