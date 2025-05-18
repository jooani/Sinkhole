import React, { useState } from 'react';
import MapView from '../components/MapView';

const ReportForm = () => {
  const [photo, setPhoto] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [description, setDescription] = useState('');

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSelectLocation = (coords) => {
    setSelectedLocation(coords);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // selectedLocation이 null인지 체크
    if (!photo || !selectedLocation || !description.trim()) {
      alert('모든 항목을 입력하세요.');
      return;
    }

    // 제출 처리 (예: API 호출)
    alert('제보 제출 완료!');
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>싱크홀 제보하기</h2>

      <label>
        사진 첨부:
        <input type="file" accept="image/*" onChange={handlePhotoChange} />
      </label>

      <MapView onSelectLocation={handleSelectLocation} />

      <div style={{ margin: '10px 0' }}>
        {selectedLocation
          ? `선택 위치: 위도 ${selectedLocation.lat.toFixed(6)}, 경도 ${selectedLocation.lng.toFixed(6)}`
          : '위치를 선택해주세요.'}
      </div>

      <label>
        설명:
        <textarea
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="상세 내용을 입력하세요"
          required
        />
      </label>

      <button type="submit">제보 제출</button>
    </form>
  );
};

export default ReportForm;
