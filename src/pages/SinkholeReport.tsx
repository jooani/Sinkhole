import React, { useState } from 'react';
import MapView from "../components/MapView.jsx";
import { PageContainer } from "../components/PageContainer";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Textarea } from "../components/ui/textarea";

const SinkholeReport = () => {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleSelectLocation = (coords: { lat: number; lng: number }) => {
    setSelectedLocation(coords);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLocation) {
      alert('지도를 클릭하여 위치를 선택해주세요.');
      return;
    }

    // 예시: API로 전송할 데이터 구성
    const formData = {
      location: selectedLocation,
      // TODO: 다른 폼 필드들도 여기에 포함하세요
    };

    console.log("제출 데이터:", formData);
    alert('제보가 접수되었습니다. 확인 후 조치하겠습니다.');
  };

  return (
    <PageContainer>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">싱크홀 제보</h1>
          <p className="text-gray-600 mb-6">
            도로나 보도에서 발견한 싱크홀을 제보해주세요. 시민들의 안전을 위해 신속하게 조치하겠습니다.
          </p>
          
          <Separator className="my-6" />
          
          <Card>
            <CardHeader>
              <CardTitle>싱크홀 제보 양식</CardTitle>
              <CardDescription>
                발견한 싱크홀의 위치와 상태를 자세히 알려주세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-6">

                  {/* 지도 위치 선택 */}
                  <div className="grid gap-3">
                    <Label>발견 위치</Label>
                    <MapView onSelectLocation={handleSelectLocation} />
                    {selectedLocation && (
                      <p className="text-sm text-gray-500 mt-2">
                        선택된 위치: 위도 {selectedLocation.lat.toFixed(6)}, 경도 {selectedLocation.lng.toFixed(6)}
                      </p>
                    )}
                  </div>

                  {/* 싱크홀 크기 */}
                  <div className="grid gap-3">
                    <Label htmlFor="size">싱크홀 크기</Label>
                    <div className="flex gap-4">
                      <Input id="width" type="number" placeholder="가로(cm)" className="w-32" required />
                      <span className="mx-2">×</span>
                      <Input id="length" type="number" placeholder="세로(cm)" className="w-32" required />
                      <span className="mx-2">×</span>
                      <Input id="depth" type="number" placeholder="깊이(cm)" className="w-32" />
                    </div>
                  </div>

                  {/* 상세 설명 */}
                  <div className="grid gap-3">
                    <Label htmlFor="description">상세 설명</Label>
                    <Textarea id="description" placeholder="싱크홀의 상태와 주변 상황을 자세히 설명해주세요" rows={4} required />
                  </div>

                  {/* 이미지 첨부 */}
                  <div className="grid gap-3">
                    <Label htmlFor="photo">사진 첨부</Label>
                    <Input id="photo" type="file" accept="image/*" multiple />
                    <p className="text-sm text-gray-500">
                      싱크홀의 모습을 확인할 수 있는 사진을 첨부해주세요. (선택사항)
                    </p>
                  </div>

                  {/* 연락처 */}
                  <div className="grid gap-3">
                    <Label htmlFor="contact">연락처</Label>
                    <Input id="contact" placeholder="추가 정보 확인이 필요할 경우 연락 가능한 번호" />
                    <p className="text-sm text-gray-500">
                      연락처는 추가 정보가 필요한 경우에만 사용됩니다. (선택사항)
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button type="submit" onClick={handleSubmit} className="w-full">
                제보하기
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-8 bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">싱크홀 제보 시 유의사항</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>위험한 상황이라면 먼저 119에 신고해주세요.</li>
              <li>가능하다면 주변에 안전을 위한 표시를 해주세요.</li>
              <li>정확한 위치 정보를 제공하면 더 빠른 조치가 가능합니다.</li>
              <li>접수된 제보는 담당 부서에서 확인 후 조치됩니다.</li>
            </ul>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default SinkholeReport;