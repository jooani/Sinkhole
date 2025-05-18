import React, { useState } from 'react';
import MapView from '../components/MapView';

const MapPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSelectLocation = (coords) => {
    setSelectedLocation(coords);
    console.log('선택한 위치:', coords);
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        padding: '1rem',
      }}
    >
      <h1>지도 보기</h1>
      <MapView onSelectLocation={handleSelectLocation} />
      {selectedLocation && (
        <p>
          선택 위치: 위도 {selectedLocation.lat.toFixed(6)}, 경도 {selectedLocation.lng.toFixed(6)}
        </p>
      )}
    </div>
  );
};

export default MapPage;
