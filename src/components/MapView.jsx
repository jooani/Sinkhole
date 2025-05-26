import React, { useEffect, useRef, memo } from "react";

/**
 * @param {{ onSelectLocation: (coords: { lat: number, lng: number }) => void }} props
 */

const MapView = memo(({ onSelectLocation }) => {
  const mapRef = useRef(null);
  const boxRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    // 카카오맵 SDK 로드
    if (window.kakao && window.kakao.maps) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.src =
        "https://dapi.kakao.com/v2/maps/sdk.js?appkey=91211ae4c5c4647fdb241630907d5e06&autoload=false&libraries=services";
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(() => {
          initMap();
        });
      };
      document.head.appendChild(script);
    }

    // 지도 초기화 함수
    function initMap() {
      if (!mapRef.current) {
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 3,
        };
        mapRef.current = new window.kakao.maps.Map(boxRef.current, options);

        // 지도 클릭 이벤트 등록
        window.kakao.maps.event.addListener(
          mapRef.current,
          "click",
          (mouseEvent) => {
            const latlng = mouseEvent.latLng;
            if (markerRef.current) {
              markerRef.current.setMap(null);
            }
            markerRef.current = new window.kakao.maps.Marker({
              position: latlng,
              map: mapRef.current,
            });
            onSelectLocation({ lat: latlng.getLat(), lng: latlng.getLng() });
          }
        );
      }
    }

    // Cleanup: 스크립트 태그 제거 선택사항 (필요 시)
    return () => {
      // document.querySelectorAll('script[src*="dapi.kakao.com"]').forEach(s => s.remove());
    };
  }, [onSelectLocation]);

  // 내 위치 버튼 클릭 핸들러
  const handleMyLocationClick = () => {
    if (!navigator.geolocation) {
      alert("브라우저가 위치 정보를 지원하지 않습니다.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        const locPosition = new window.kakao.maps.LatLng(lat, lng);

        // 지도 중심 이동
        mapRef.current.setCenter(locPosition);

        // 기존 마커 제거 후 새 마커 생성
        if (markerRef.current) {
          markerRef.current.setMap(null);
        }
        markerRef.current = new window.kakao.maps.Marker({
          position: locPosition,
          map: mapRef.current,
        });

        onSelectLocation({ lat, lng });
      },
      () => {
        alert("내 위치 정보를 가져오지 못했습니다.");
      }
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <button
        onClick={handleMyLocationClick}
        className="mx-auto mb-4 flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-500 active:scale-[0.98] transition"
      >
        📍 내 위치 보기
      </button>

      <div
        ref={boxRef}
        id="map"
        className="w-full h-[400px] rounded-lg border border-gray-300 shadow-sm"
      />
    </div>
  );
});

export default MapView;
