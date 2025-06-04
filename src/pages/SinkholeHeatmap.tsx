import React from "react";
import { PageContainer } from "../components/PageContainer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import SinkholeBarChart from "../components/SinkholeBarChart";

const SinkholeHeatmap = () => {
  return (
    <PageContainer pageTitle="싱크홀 히트맵">
      <div className="container mx-auto py-8 px-4 max-w-5xl">
        <h1 className="text-3xl font-bold mb-2">싱크홀 히트맵</h1>
        <p className="text-gray-600 mb-6">
          전국의 싱크홀 발생 현황을 지도로 확인하세요.
        </p>

        <Tabs defaultValue="map" className="w-full">

          <TabsContent value="map" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>싱크홀 발생 지도</CardTitle>
                <CardDescription>
                  2018년부터 2024년 8월까지 기록된 싱크홀 발생 현황입니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[500px] rounded-lg overflow-hidden">
                  <iframe
                    src="/sinkhole_heatmap.html"
                    title="Sinkhole Heatmap"
                    className="w-full h-full border-none"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>월별 싱크홀 발생 건수</CardTitle>
                <CardDescription>
                  2018년부터 2024년까지의 통계를 보여줍니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SinkholeBarChart />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default SinkholeHeatmap;
