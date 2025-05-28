// src/components/BackButton.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="text-blue-600 hover:underline text-sm mb-4"
    >
      ← 뒤로가기
    </button>
  );
};

export default BackButton;