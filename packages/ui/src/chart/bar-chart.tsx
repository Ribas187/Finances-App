import { formatDate } from "date-fns"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, DEFAULT_CHART_CONFIG, DEFAULT_MAX_HEIGHT } from "./chart"
import { Bar, BarChart as BarChartPrimitive, CartesianGrid, XAxis } from "recharts"

export function BarChart({ data, chartConfig = DEFAULT_CHART_CONFIG, maxHeight = DEFAULT_MAX_HEIGHT }: {
  data: { date: string, value: number }[],
  chartConfig?: ChartConfig,
  maxHeight?: number;
}) {

  return (
    <ChartContainer config={chartConfig} className={`w-full`} maxHeight={maxHeight}>
      <BarChartPrimitive accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickCount={data.length / 2}
          tickFormatter={(value) => formatDate(value, 'MMM do')}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="value" fill="var(--color-value)" radius={8} />
      </BarChartPrimitive>
    </ChartContainer>
  )
}