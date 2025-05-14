import { useEffect } from 'react';

const MapView = ({ mapLoaded, sortedCenters }) => {
  useEffect(() => {
    if (window.kakao && window.kakao.maps) return; // 이미 로드되었으면 무시

    const script = document.createElement('script');
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=4123bd02d633ce03cfa9b6ee5688c349&autoload=false&libraries=services";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (!mapLoaded || !sortedCenters.length) return;

        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(
            sortedCenters[0].coord.lat,
            sortedCenters[0].coord.lng
          ),
          level: 5,
        };
        const map = new window.kakao.maps.Map(container, options);
        const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

        sortedCenters.forEach((center) => {
          const marker = new window.kakao.maps.Marker({
            map,
            position: new window.kakao.maps.LatLng(center.coord.lat, center.coord.lng),
            title: center.name,
          });

          const content = `
            <div style="padding:8px 12px;font-size:14px;">
              <strong>${center.name}</strong><br/>
              <span>${center.region} · ${center.fields.join(', ')}</span><br/>
              <span>📞 ${center.phone}</span><br/>
              <a href="${center.link}" target="_blank" style="color:blue; text-decoration:underline;">홈페이지 방문</a>
            </div>
          `;

          window.kakao.maps.event.addListener(marker, 'click', () => {
            infowindow.setContent(content);
            infowindow.open(map, marker);
          });
        });
      });
    };
  }, [mapLoaded, sortedCenters]);

  return <div id="map" style={{ width: '100%', height: '500px' }} />;
};

export default MapView;
