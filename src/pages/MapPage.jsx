import { useState } from 'react';
import MapView from '../components/MapView';

export default function MapPage() {
  const [loc, setLoc] = useState(null);

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-12">
      {/* ⬇️ 폭 제한 + 가운데 정렬 */}
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="mb-4 text-2xl font-bold text-center text-white">지도 보기</h1>

        <MapView onSelectLocation={setLoc} />

        {loc && (
          <p className="mt-4 text-center text-white">
            선택 위치: 위도 {loc.lat.toFixed(6)}, 경도 {loc.lng.toFixed(6)}
          </p>
        )}
      </div>
    </div>
  );
}