// src/pages/SinkholeReport.tsx
import React, { useState } from "react";
import MapView from "../components/MapView";
import { PageContainer } from "../components/PageContainer";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Textarea } from "../components/ui/textarea";

const SinkholeReport = () => {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [depth, setDepth] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLocation || !description.trim()) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    const formData = new FormData();
    const data = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
      location: `위도 ${selectedLocation.lat}, 경도 ${selectedLocation.lng}`,
      width: parseInt(width),
      length: parseInt(length),
      depth: parseInt(depth),
      description,
      contact,
    };

    formData.append("data", new Blob([JSON.stringify(data)], { type: "application/json" }));
    if (photo) formData.append("image", photo);

    try {
      const res = await fetch("http://localhost:8080/api/reports", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("✅ 제보가 성공적으로 제출되었습니다!");
      } else {
        const err = await res.json();
        alert(`제보 실패: ${err.message || res.status}`);
      }
    } catch (error) {
      alert("제보 중 오류가 발생했습니다.");
      console.error(error);
    }
  };

  return (
    <PageContainer>
      <div className="container mx-auto py-8 px-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">싱크홀 제보</h1>
        <p className="text-gray-600 mb-6">
          도로나 보도에서 발견한 싱크홀을 제보해주세요.
        </p>

        <Separator className="my-6" />

        <Card>
          <CardHeader>
            <CardTitle>싱크홀 제보 양식</CardTitle>
            <CardDescription>위치, 크기, 설명을 정확히 입력해주세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-6">
              <div className="grid gap-3">
                <Label>발견 위치</Label>
                <MapView onSelectLocation={setSelectedLocation} />
                {selectedLocation && (
                  <p className="text-sm text-gray-500 mt-2">
                    선택된 위치: 위도 {selectedLocation.lat.toFixed(6)}, 경도 {selectedLocation.lng.toFixed(6)}
                  </p>
                )}
              </div>

              <div className="grid gap-3">
                <Label>크기 (cm)</Label>
                <div className="flex gap-4">
                  <Input type="number" placeholder="가로" className="w-32" required value={width} onChange={e => setWidth(e.target.value)} />
                  <Input type="number" placeholder="세로" className="w-32" required value={length} onChange={e => setLength(e.target.value)} />
                  <Input type="number" placeholder="깊이" className="w-32" value={depth} onChange={e => setDepth(e.target.value)} />
                </div>
              </div>

              <div className="grid gap-3">
                <Label>상세 설명</Label>
                <Textarea placeholder="싱크홀 상태 및 주변 상황 설명" required value={description} onChange={e => setDescription(e.target.value)} />
              </div>

              <div className="grid gap-3">
                <Label>사진 첨부</Label>
                <Input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files?.[0] || null)} />
              </div>

              <div className="grid gap-3">
                <Label>연락처</Label>
                <Input placeholder="010-1234-5678" value={contact} onChange={e => setContact(e.target.value)} />
              </div>

              <Button type="submit" className="w-full">제보하기</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default SinkholeReport;