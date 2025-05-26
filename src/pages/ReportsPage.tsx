import React, { useEffect, useState } from "react";
import ReportMapMarkers from "../components/ReportMapMarkers";
import { Report } from "../types";

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/reports")
      .then((res) => res.json())
      .then((data) => setReports(data))
      .catch((err) => console.error("제보 목록 불러오기 실패", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">📋 제보 목록 및 지도</h1>

        {/* 지도에 마커 렌더링 */}
        <ReportMapMarkers reports={reports} />

        {/* 제보 리스트 렌더링 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
          {reports.map((report) => (
            <div
              key={report.id}
              className="border rounded-lg p-4 shadow bg-white space-y-2"
            >
              <p className="font-semibold">🗺️ 위치: {report.location}</p>
              <p className="text-sm text-gray-600">📝 설명: {report.description}</p>
              {report.imageUrl && (
                <img
                  src={`http://localhost:8080${report.imageUrl}`}
                  alt="제보 이미지"
                  className="max-w-full rounded"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}