import React, { useEffect, useRef } from "react";
import { Report } from "../types/index";

type Props = {
  reports: Report[];
};

const ReportMapMarkers: React.FC<Props> = ({ reports }) => {
  const mapRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentInfoWindow: kakao.maps.InfoWindow | null = null;

    const loadMap = () => {
      const center = new window.kakao.maps.LatLng(37.5665, 126.978); // 서울 중심
      const map = new window.kakao.maps.Map(containerRef.current, {
        center,
        level: 6,
      });
      mapRef.current = map;

      reports.forEach((report) => {
        const position = new window.kakao.maps.LatLng(report.latitude, report.longitude);

        const marker = new window.kakao.maps.Marker({
          map,
          position,
        });

        const infoWindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:8px; font-size:13px;">
            🕳️ 제보 ID: ${report.id}<br/>
            📝 ${report.description || "설명 없음"}
          </div>`,
        });

        window.kakao.maps.event.addListener(marker, "click", () => {
          if (currentInfoWindow) currentInfoWindow.close();
          infoWindow.open(map, marker);
          currentInfoWindow = infoWindow;
        });
      });
    };

    if (window.kakao && window.kakao.maps) {
      loadMap();
    } else {
      const script = document.createElement("script");
      script.src =
        "https://dapi.kakao.com/v2/maps/sdk.js?appkey=91211ae4c5c4647fdb241630907d5e06&autoload=false&libraries=services";
      script.async = true;
      script.onload = () => window.kakao.maps.load(loadMap);
      document.head.appendChild(script);
    }
  }, [reports]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[500px] rounded-lg border border-gray-300 shadow"
    />
  );
};

export default ReportMapMarkers;