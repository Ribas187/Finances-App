"use client";

import { PeriodSelector } from "@/components/date/period-selector";
import { usePeriod } from "@/lib/hook/use-period";
import { useChartData } from "@/lib/queries/use-chart-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  GaugeChart,
  LineChart,
} from "@turbostack/ui";
import { subDays } from "date-fns";
import { useSearchParams } from "next/navigation";

export function DashboardPageClient() {
  const searchParams = useSearchParams();
  const period = usePeriod(searchParams, {
    start: subDays(new Date(), 30),
    end: new Date(),
  });

  const usersData = useChartData(period).map((data) => ({
    ...data,
    value: Math.floor(data.value),
  }));

  const revenueData = useChartData({
    start: subDays(new Date(), 7),
    end: new Date(),
  });
  const lastRevenueData = revenueData.at(-1);

  const feeData = useChartData({
    start: subDays(new Date(), 7),
    end: new Date(),
  });
  const lastFeeData = feeData.at(-1);

  const npsData = {
    promoters: 150,
    detractors: 10,
    passives: 30,
  };

  const totalNpsData =
    npsData.promoters + npsData.detractors + npsData.passives;
  const percentagePromoters = (npsData.promoters / totalNpsData) * 100;
  const percentageDetractors = (npsData.detractors / totalNpsData) * 100;
  const npsScore = percentagePromoters - percentageDetractors;

  return (
    <div className="flex flex-col flex-wrap">
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-y-1">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Here you get an overview of your project's performance
          </p>
        </div>
        <PeriodSelector />
      </div>

      <div className="mt-8 flex gap-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
            <CardDescription>Total Revenue since the past week</CardDescription>
            <span className="text-xl font-semibold">
              ${lastRevenueData?.value?.toFixed(1)}
            </span>
          </CardHeader>
          <CardContent>
            <LineChart
              maxHeight={150}
              data={revenueData}
              chartConfig={{
                value: { label: "Rev.", color: `hsl(var(--chart-1))` },
              }}
            />
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Fee</CardTitle>
            <CardDescription>
              Total Fee collected since the past week
            </CardDescription>
            <span className="text-xl font-semibold">
              ${lastFeeData?.value?.toFixed(1)}
            </span>
          </CardHeader>
          <CardContent>
            <LineChart
              maxHeight={150}
              data={feeData}
              chartConfig={{
                value: { label: "Fee", color: `hsl(var(--chart-1))` },
              }}
            />
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>NPS</CardTitle>
            <CardDescription>NPS Score since the last week</CardDescription>
          </CardHeader>
          <CardContent>
            <GaugeChart
              data={npsData}
              total={npsScore}
              label="Score"
              chartConfig={{
                promoters: { label: "Promoters", color: `hsl(var(--chart-1))` },
                detractors: {
                  label: "Detractors",
                  color: `hsl(var(--danger))`,
                },
                passives: { label: "Detractors", color: `hsl(var(--chart-2))` },
              }}
            />
          </CardContent>
        </Card>
      </div>
      <div className="mt-4 w-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>Active users since last month</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              maxHeight={200}
              data={usersData}
              chartConfig={{
                value: { label: "Users", color: `hsl(var(--chart-1))` },
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
