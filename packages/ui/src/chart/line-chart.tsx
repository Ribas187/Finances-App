import { formatDate } from "date-fns"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, DEFAULT_CHART_CONFIG, DEFAULT_MAX_HEIGHT } from "./chart"
import { Line, LineChart as LineChartPrimitive, CartesianGrid, XAxis, YAxis } from "recharts"

export function LineChart({ data, chartConfig = DEFAULT_CHART_CONFIG, maxHeight = DEFAULT_MAX_HEIGHT }: {
  data: { date: string, value: number }[],
  chartConfig?: ChartConfig,
  maxHeight?: number
}) {

  function labelFormatter(value: Date) {
    return formatDate(value, 'MMM do')
  }

  return (
    <ChartContainer config={chartConfig} className={`w-full`} maxHeight={maxHeight}>
      <LineChartPrimitive 
        accessibilityLayer 
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={labelFormatter}
        />
        <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent labelFormatter={labelFormatter}/>}
        />
        <Line 
          type="natural" 
          dot={false} 
          dataKey="value" 
          stroke="var(--color-value)"    
          strokeWidth={2}
        />
        <CartesianGrid vertical={false} />
      </LineChartPrimitive>
    </ChartContainer>
  )
}