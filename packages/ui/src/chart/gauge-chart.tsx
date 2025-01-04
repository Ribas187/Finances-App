import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, DEFAULT_CHART_CONFIG, DEFAULT_MAX_HEIGHT } from "./chart";

export function GaugeChart({ data, label, total, chartConfig = DEFAULT_CHART_CONFIG, maxHeight = DEFAULT_MAX_HEIGHT }: {
  data: Record<string, number>
  label: string,
  chartConfig?: ChartConfig,
  maxHeight?: number;
  total: number;
}) {

  return (
    <ChartContainer config={chartConfig} className={`w-full`} maxHeight={maxHeight}>
      <RadialBarChart
        data={[data]}
        endAngle={180}
        innerRadius={80}
        outerRadius={130}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 16}
                      className="fill-foreground text-2xl font-bold"
                    >
                      {total.toLocaleString('en-US', {
                        maximumFractionDigits: 0
                      })}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 4}
                      className="fill-muted-foreground"
                    >
                      {label}
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </PolarRadiusAxis>
        {Object.keys(chartConfig).map(k => (
          <RadialBar
            key={k}
            dataKey={k}
            stackId="a"
            cornerRadius={5}
            fill={`var(--color-${k})`}
            className="stroke-transparent stroke-2"
          />
        ))}
      </RadialBarChart>
    </ChartContainer>
  )
}