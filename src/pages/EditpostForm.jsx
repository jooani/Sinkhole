import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageContainer } from "../components/PageContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const EditPostForm = () => {
  const { id } = useParams(); // URL에서 post ID 추출
  const [form, setForm] = useState({
    title: "",
    category: "",
    content: "",
    image: null,
  });

  // ✅ 기존 게시글 데이터 불러오기
  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          title: data.title,
          category: data.category,
          content: data.content,
          image: null, // 새 이미지 업로드 시 사용
        });
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("content", form.content);
    if (form.image) formData.append("image", form.image);

    // 서버에 PATCH 요청 보내기
    fetch(`/api/posts/${id}`, {
      method: "PATCH",
      body: formData,
    }).then(() => {
      alert("게시글이 수정되었습니다.");
      // TODO: 게시글 상세 페이지로 이동
    });
  };

  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-4">게시글 수정</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label>카테고리</Label>
            <Select value={form.category} onValueChange={(value) => setForm((prev) => ({ ...prev, category: value }))}>
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
            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="content">내용</Label>
            <Textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={6}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="image">이미지 수정 (선택)</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1"
            />
          </div>

          <Button type="submit">수정하기</Button>
        </form>
      </div>
    </PageContainer>
  );
};

export default EditPostForm;