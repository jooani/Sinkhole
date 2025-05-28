import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { PageContainer } from "../components/PageContainer";

const LoginForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token); // JWT 저장
        alert("✅ 로그인 성공");
        navigate("/");
      } else {
        const err = await res.json();
        alert(`❌ 로그인 실패: ${err.message || res.status}`);
      }
    } catch (err) {
      console.error(err);
      alert("❌ 오류 발생");
    }
  };

  return (
    <PageContainer>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 py-8">
        <h2 className="text-xl font-bold">로그인</h2>
        <div>
          <Label>아이디</Label>
          <Input name="username" value={form.username} onChange={handleChange} />
        </div>
        <div>
          <Label>비밀번호</Label>
          <Input type="password" name="password" value={form.password} onChange={handleChange} />
        </div>
        <Button type="submit">로그인</Button>
      </form>
    </PageContainer>
  );
};

export default LoginForm;