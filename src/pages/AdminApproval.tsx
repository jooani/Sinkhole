import React, { useEffect, useState } from "react";
import EXIF from "exif-js";
import { Report } from "../types";
import { useNavigate } from "react-router-dom";

type ExifWarnings = {
  [key: number]: string;
};

const AdminApproval = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [exifWarnings, setExifWarnings] = useState<ExifWarnings>({});
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAndLoadReports = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/");
        return;
      }

      try {
        const res = await fetch("https://internetprogramming.onrender.com/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("인증 실패");

        const data = await res.json();

        if (data.role !== "ADMIN") {
          alert("관리자만 접근할 수 있습니다.");
          navigate("/");
        } else {
          // ADMIN이라면 승인 대기 제보 불러오기
          const reportRes = await fetch("https://internetprogramming.onrender.com/api/reports/pending", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!reportRes.ok) throw new Error("제보 불러오기 실패");

          const reportData = await reportRes.json();
          setReports(reportData);
          checkExifMetadata(reportData, setExifWarnings);
        }
      } catch (err) {
        console.error("오류 발생:", err);
        navigate("/");
      }
    };

    checkAdminAndLoadReports();
  }, [navigate]);

  const handleApprove = async (id: number) => {
    const token = localStorage.getItem("token");
    await fetch(`https://internetprogramming.onrender.com/api/reports/${id}/approve`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
                    src={`https://internetprogramming.onrender.com${report.imageUrl}`}
                    alt="제보 이미지"
                    className="max-w-xs mt-2"
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

// ✅ EXIF 분석 함수
function checkExifMetadata(
  reports: Report[],
  setExifWarnings: React.Dispatch<React.SetStateAction<ExifWarnings>>
) {
  reports.forEach((report) => {
    const imageUrl = report.imageUrl;
    if (!imageUrl) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = `https://internetprogramming.onrender.com${imageUrl}`;

    img.onload = () => {
      try {
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