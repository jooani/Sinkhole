import React, { useEffect, useRef, memo } from 'react';

const MapView = memo(({ onSelectLocation }) => {
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    // 카카오맵 SDK 로드
    if (window.kakao && window.kakao.maps) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=91211ae4c5c4647fdb241630907d5e06&autoload=false&libraries=services';
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
          center: new window.kakao.maps.LatLng(37.5665, 126.9780),
          level: 3,
        };
        mapRef.current = new window.kakao.maps.Map(containerRef.current, options);

        // 지도 클릭 이벤트 등록
        window.kakao.maps.event.addListener(mapRef.current, 'click', (mouseEvent) => {
          const latlng = mouseEvent.latLng;
          if (markerRef.current) {
            markerRef.current.setMap(null);
          }
          markerRef.current = new window.kakao.maps.Marker({
            position: latlng,
            map: mapRef.current,
          });
          onSelectLocation({ lat: latlng.getLat(), lng: latlng.getLng() });
        });
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
      alert('브라우저가 위치 정보를 지원하지 않습니다.');
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
        alert('내 위치 정보를 가져오지 못했습니다.');
      }
    );
  };

  return (
    <>
      <button
        onClick={handleMyLocationClick}
        style={{ marginBottom: '10px', padding: '8px 16px', cursor: 'pointer' }}
      >
        내 위치 보기
      </button>
      <div
        ref={containerRef}
        id="map"
        style={{ width: '100%', height: '400px', borderRadius: 8 }}
      />
    </>
  );
});

export default MapView;
