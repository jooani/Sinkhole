// src/pages/AdminApproval.tsx
import React, { useEffect, useState } from "react";
import EXIF from "exif-js";
import { Report } from "../types"; // Report 타입이 별도 정의되어 있어야 함

type ExifWarnings = {
  [key: number]: string;
};

const AdminApproval = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [exifWarnings, setExifWarnings] = useState<ExifWarnings>({});

  useEffect(() => {
    fetch("http://localhost:8080/api/reports/pending")
      .then((res) => res.json())
      .then((data) => {
        setReports(data);
        console.log("pending reports:", data);
        checkExifMetadata(data, setExifWarnings);
      });
  }, []);

  const handleApprove = async (id: number) => {
    await fetch(`http://localhost:8080/api/reports/${id}/approve`, {
      method: "PATCH",
    });
    setReports((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6">🛠️ 제보 승인 관리</h2>

      {reports.length === 0 ? (
        <p className="text-gray-500">대기 중인 제보가 없습니다.</p>
      ) : (
        <ul className="space-y-6">
          {reports.map((report) => (
            <li
              key={report.id}
              className="border rounded p-4 shadow flex flex-col gap-2"
            >
              <p>
                🗺️ 위치: 위도 {report.latitude.toFixed(6)}, 경도{" "}
                {report.longitude.toFixed(6)}
              </p>
              <p>
                📏 크기: {report.width}m × {report.length}m × {report.depth}m
              </p>
              <p>📞 연락처: {report.contact}</p>
              <p>📝 설명: {report.description}</p>

              {report.imageUrl && (
                <>
                  <img
                    src={`http://localhost:8080${report.imageUrl}`}
                    alt="제보 이미지"
                    className="max-w-xs mt-2"
                    crossOrigin="anonymous"
                  />
                  {exifWarnings[report.id] && (
                    <p className="text-sm text-red-600">
                      {exifWarnings[report.id]}
                    </p>
                  )}
                </>
              )}

              <button
                onClick={() => handleApprove(report.id)}
                className="mt-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-500"
              >
                ✅ 승인하기
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminApproval;

// -------------------------------
// ✅ EXIF 분석 함수
// -------------------------------
function checkExifMetadata(
  reports: Report[],
  setExifWarnings: React.Dispatch<React.SetStateAction<ExifWarnings>>
) {
  reports.forEach((report) => {
    const imageUrl = report.imageUrl;
    if (!imageUrl) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = `http://localhost:8080${imageUrl}`;

    img.onload = () => {
      try {
        // 타입을 무시하고 강제 사용 (exif-js의 타입 정의 문제로 인한 우회)
        EXIF.getData(img as any, function (this: any) {
          const lat = EXIF.getTag(this, "GPSLatitude");
          const lon = EXIF.getTag(this, "GPSLongitude");
          const date = EXIF.getTag(this, "DateTimeOriginal");

          if (!lat || !lon) {
            setExifWarnings((prev) => ({
              ...prev,
              [report.id]: "🚨 위치 정보 없음 (EXIF GPS 미포함)",
            }));
          } else if (!date) {
            setExifWarnings((prev) => ({
              ...prev,
              [report.id]: "⚠️ 촬영 날짜 없음 (DateTimeOriginal 없음)",
            }));
          } else {
            setExifWarnings((prev) => {
              const updated = { ...prev };
              delete updated[report.id];
              return updated;
            });
          }
        });
      } catch {
        setExifWarnings((prev) => ({
          ...prev,
          [report.id]: "❌ EXIF 파싱 오류",
        }));
      }
    };

    img.onerror = () => {
      setExifWarnings((prev) => ({
        ...prev,
        [report.id]: "❌ 이미지 로드 실패",
      }));
    };
  });
}
