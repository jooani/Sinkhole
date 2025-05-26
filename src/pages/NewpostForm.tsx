import React, { useState } from "react";
import { PageContainer } from "../components/PageContainer";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

// ✅ form 상태 타입 정의
type FormState = {
  title: string;
  category: string;
  content: string;
  image: File | null;
};

const NewPostForm = () => {
  const [form, setForm] = useState<FormState>({
    title: "",
    category: "",
    content: "",
    image: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      image: e.target.files?.[0] || null,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("content", form.content);
    if (form.image) {
      formData.append("image", form.image);
    }

    // TODO: 여기에 API POST 요청 추가
    console.log("폼 전송:", form);
  };

  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-4">게시글 작성</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 카테고리 선택 */}
          <div>
            <Label htmlFor="category">카테고리</Label>
            <Select
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="카테고리 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="notice">공지사항</SelectItem>
                <SelectItem value="info">정보공유</SelectItem>
                <SelectItem value="experience">경험담</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 제목 입력 */}
          <div>
            <Label htmlFor="title">제목</Label>
            <Input
              name="title"
              placeholder="제목을 입력하세요"
              value={form.title}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          {/* 내용 입력 */}
          <div>
            <Label htmlFor="content">내용</Label>
            <Textarea
              name="content"
              placeholder="내용을 입력하세요"
              rows={6}
              value={form.content}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          {/* 이미지 첨부 */}
          <div>
            <Label htmlFor="image">이미지 첨부 (선택)</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1"
            />
          </div>

          {/* 등록 버튼 */}
          <Button type="submit">등록하기</Button>
        </form>
      </div>
    </PageContainer>
  );
};

export default NewPostForm;