import React, { useState } from "react";
import MapView from "../components/MapView";

const ReportForm = () => {
  const [photo, setPhoto] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [description, setDescription] = useState("");

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSelectLocation = (coords) => {
    setSelectedLocation(coords);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!photo || !selectedLocation || !description.trim()) {
      alert("모든 항목을 입력하세요.");
      return;
    }

    alert("제보 제출 완료!");
  };

  return (
    <div
      style={{
        padding: "2rem",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        boxSizing: "border-box",
      }}
    >
      <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto p-4">
        <h2 className="text-xl font-bold text-center mb-4">싱크홀 제보하기</h2>

        <label className="block mb-2">
          사진 첨부:
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="mt-1"
          />
        </label>

        <MapView onSelectLocation={handleSelectLocation} />

        <div className="my-3 text-sm">
          {selectedLocation
            ? `선택 위치: 위도 ${selectedLocation.lat.toFixed(
                6
              )}, 경도 ${selectedLocation.lng.toFixed(6)}`
            : "위치를 선택해주세요."}
        </div>

        <label className="block mb-4">
          설명:
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="상세 내용을 입력하세요"
            required
            className="w-full border border-gray-300 p-2 rounded mt-1"
          />
        </label>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          제보 제출
        </button>
      </form>
    </div>
  );
};

export default ReportForm;
