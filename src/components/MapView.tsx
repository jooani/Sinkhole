import React, { useEffect, useRef, memo } from "react";

type Props = {
  onSelectLocation: (coords: { lat: number; lng: number }) => void;
};

const MapView: React.FC<Props> = memo(({ onSelectLocation }) => {
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<kakao.maps.Marker | null>(null);

  useEffect(() => {
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

    function initMap() {
      if (!boxRef.current) return;

      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.978),
        level: 3,
      };
      const map = new window.kakao.maps.Map(boxRef.current, options);
      mapRef.current = map;

      window.kakao.maps.event.addListener(
        map,
        "click",
        (mouseEvent: kakao.maps.event.MouseEvent) => {
          const latlng = mouseEvent.latLng;

          if (markerRef.current) {
            markerRef.current.setMap(null);
          }

          const marker = new window.kakao.maps.Marker({
            position: latlng,
            map,
          });

          markerRef.current = marker;
          onSelectLocation({ lat: latlng.getLat(), lng: latlng.getLng() });
        }
      );
    }

    return () => {
      // 클린업 생략
    };
  }, [onSelectLocation]);

  const handleMyLocationClick = () => {
    if (!navigator.geolocation) {
      alert("브라우저가 위치 정보를 지원하지 않습니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        const locPosition = new window.kakao.maps.LatLng(lat, lng);

        if (mapRef.current) {
          mapRef.current.setCenter(locPosition);
        }

        if (markerRef.current) {
          markerRef.current.setMap(null);
        }

        const marker = new window.kakao.maps.Marker({
          position: locPosition,
          map: mapRef.current!,
        });

        markerRef.current = marker;
        onSelectLocation({ lat, lng });
      },
      () => {
        alert("위치 정보를 가져올 수 없습니다.");
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