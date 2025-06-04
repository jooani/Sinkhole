import React, { useState } from "react";
import { PageContainer } from "../components/PageContainer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";

type FormState = {
  title: string;
  category: string;
  content: string;
};

const NewPostForm = () => {
  const [form, setForm] = useState<FormState>({
    title: "",
    category: "",
    content: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://internetprogramming.onrender.com/api/community/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
          body: JSON.stringify(form),
        }
      );

      if (res.ok) {
        alert("게시글이 등록되었습니다!");
      } else {
        const err = await res.json();
        alert(`등록 실패: ${err.message || res.status}`);
      }
    } catch (err) {
      console.error(err);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-4">게시글 작성</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label className="text-white" htmlFor="title">
              제목
            </Label>
            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="bg-white text-black dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <Label className="text-white" htmlFor="content">
              제목
            </Label>
            <Textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={6}
              className="bg-white text-black dark:bg-gray-800 dark:text-white"
            />
          </div>
          <Button type="submit">등록하기</Button>
        </form>
      </div>
    </PageContainer>
  );
};

export default NewPostForm;
