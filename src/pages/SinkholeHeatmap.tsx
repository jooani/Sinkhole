import React from 'react';
import { PageContainer } from "../components/PageContainer";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

/**
 * 📍 개선 사항 반영:
 * - 지도, 그래프 영역은 실제 API 연동 시 교체
 * - 현재 페이지 active 상태 표현 등은 추후 구현 가능
 */
const SinkholeHeatmap = () => {
  return (
    <PageContainer pageTitle="싱크홀 히트맵">
      <div className="container mx-auto py-8 px-4 max-w-5xl">
        <h1 className="text-3xl font-bold mb-2">싱크홀 히트맵</h1>
        <p className="text-gray-600 mb-6">
          전국의 싱크홀 발생 현황을 지도로 확인하세요.
        </p>

        <Tabs defaultValue="map" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="map">지도 보기</TabsTrigger>
            <TabsTrigger value="stats">통계 정보</TabsTrigger>
            <TabsTrigger value="list">목록 보기</TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>싱크홀 발생 지도</CardTitle>
                <CardDescription>최근 12개월간 현황입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                {/* TODO: 여기에 KakaoMap Heatmap 연동 필요 */}
                <div className="w-full h-[500px] bg-gray-100 flex items-center justify-center rounded-lg">
                  <p className="text-gray-500">지도 데이터 로딩 중...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>발생 통계</CardTitle>
              </CardHeader>
              <CardContent>
                {/* TODO: Chart.js 또는 ApexCharts 연동 필요 */}
                <div className="h-[300px] bg-gray-100 mb-4 rounded-lg" />
                <div className="h-[300px] bg-gray-100 mb-4 rounded-lg" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="list" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>발생 목록</CardTitle>
              </CardHeader>
              <CardContent>
                {/* TODO: API 연동 + 페이징 필요 */}
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-3 font-medium">발생일</th>
                      <th className="text-left p-3 font-medium">위치</th>
                      <th className="text-left p-3 font-medium">크기</th>
                      <th className="text-left p-3 font-medium">상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-3">2023-06-15</td>
                      <td className="p-3">서울 강남구</td>
                      <td className="p-3">120×80×150cm</td>
                      <td className="p-3 text-green-600">조치완료</td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default SinkholeHeatmap;