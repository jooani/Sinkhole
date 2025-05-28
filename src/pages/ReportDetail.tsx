import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageContainer } from "../components/PageContainer";

interface Report {
  id: number;
  location: string;
  width: number;
  length: number;
  depth: number;
  contact: string;
  description: string;
  imageUrl?: string;
  createdAt: string;
  approved: boolean;
}

export default function ReportDetail() {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<Report | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/reports/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("제보 조회 실패");
        return res.json();
      })
      .then((data) => setReport(data))
      .catch((err) => {
        console.error(err);
        alert("제보를 불러오지 못했습니다.");
      });
  }, [id]);

  if (!report)
    return <div className="text-center py-10">제보를 불러오는 중...</div>;

  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-2">📌 제보 상세</h1>
        <p className="text-gray-600 mb-1">위치: {report.location}</p>
        <p className="text-gray-600 mb-1">
          크기: {report.width}m × {report.length}m × {report.depth}m
        </p>
        <p className="text-gray-600 mb-1">연락처: {report.contact}</p>
        <p className="text-gray-600 mb-1">등록일: {report.createdAt}</p>
        <p className="mt-4 text-gray-800">{report.description}</p>

        {report.imageUrl && (
          <img
            src={`http://localhost:8080${report.imageUrl}`}
            alt="제보 이미지"
            className="mt-4 rounded shadow max-w-full"
          />
        )}
      </div>
    </PageContainer>
  );
}
