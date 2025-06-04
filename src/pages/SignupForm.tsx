import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { PageContainer } from "../components/PageContainer";

const SignupForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "", nickname: ""});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1. 회원가입 요청
      const signupRes = await fetch("https://internetprogramming.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!signupRes.ok) {
        let message = `회원가입 실패 (${signupRes.status})`;
        try {
          const err = await signupRes.json();
          message = err.message || message;
        } catch {
          message = "회원가입 실패 (서버 응답 없음)";
        }
        alert(`❌ ${message}`);
        return;
      }

      // 2. 자동 로그인 요청
      const loginRes = await fetch("https://internetprogramming.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: form.username, password: form.password, nickname: form.nickname }),
      });

      if (!loginRes.ok) {
        alert("✅ 회원가입은 성공했지만, 자동 로그인 실패");
        return;
      }

      const loginData = await loginRes.json();
      localStorage.setItem("token", loginData.token); // JWT 저장

      alert("✅ 회원가입 및 자동 로그인 성공!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("❌ 오류 발생");
    }
  };

  return (
    <PageContainer>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 py-8">
        <h2 className="text-xl font-bold">회원가입</h2>
        <div>
          <Label>아이디</Label>
          <Input name="username" value={form.username} onChange={handleChange} className="text-black"/>
        </div>
        <div>
          <Label>이메일</Label>
          <Input name="email" value={form.email} onChange={handleChange} className="text-black"/>
        </div>
        <div>
          <Label>비밀번호</Label>
          <Input type="password" name="password" value={form.password} onChange={handleChange} className="text-black"/>
        </div>
        <div>
          <Label>닉네임</Label>
          <Input name="nickname" value={form.nickname} onChange={handleChange} className="text-black"/>
        </div>
        <Button type="submit">회원가입</Button>
      </form>
    </PageContainer>
  );
};

export default SignupForm;