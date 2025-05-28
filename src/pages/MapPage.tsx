// src/pages/MapPage.tsx
import React, { useEffect, useState } from "react";
import MapView from "../components/MapView";
import ReportMapMarkers from "../components/ReportMapMarkers";
import type { Report } from "../types";

export default function MapPage() {
  const [loc, setLoc] = useState<{ lat: number; lng: number } | null>(null);
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/reports") // 승인된 제보만 가져오는 API
      .then((res) => res.json())
      .then((data) => setReports(data))
      .catch((err) => console.error("제보 불러오기 실패", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-12">
      <div className="w-full max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-white text-center">🗺️ 제보된 싱크홀 지도</h1>

        {/* ✅ 사용자가 위치 선택 가능 */}
        <MapView onSelectLocation={setLoc} />

        {loc && (
          <p className="text-white text-center">
            선택 위치: 위도 {loc.lat.toFixed(6)}, 경도 {loc.lng.toFixed(6)}
          </p>
        )}

        {/* ✅ 실제 제보 마커 표시 */}
        <div className="pt-8">
          <h2 className="text-xl font-semibold text-white mb-2">🧭 전체 제보 위치</h2>
          <ReportMapMarkers reports={reports} />
        </div>
      </div>
    </div>
  );
}