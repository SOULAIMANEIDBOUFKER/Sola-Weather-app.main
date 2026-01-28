import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { ForecastData } from "@/api/types";
import { useTranslation } from "react-i18next";

interface HourlyTemperatureProps {
  data: ForecastData;
}

interface ChartData {
  time: string;
  temp: number;
  feels_like: number;
}

export function HourlyTemperature({ data }: HourlyTemperatureProps) {
  const { t, i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "en").split("-")[0];
  const hour12 = !lang.startsWith("de");

  const formatHour = (unixSeconds: number) =>
    new Intl.DateTimeFormat(lang, { hour: "numeric", hour12 }).format(
      new Date(unixSeconds * 1000)
    );

  const chartData: ChartData[] = data.list.slice(0, 8).map((item) => ({
    time: formatHour(item.dt),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }));

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{t("hourly.title")}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="time" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${v}°`}
              />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              {t("hourly.tooltip.temperature")}
                            </span>
                            <span className="font-bold">{payload[0].value}°</span>
                          </div>

                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              {t("hourly.tooltip.feelsLike")}
                            </span>
                            <span className="font-bold">{payload[1].value}°</span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Line type="monotone" dataKey="temp" strokeWidth={2} dot={false} />
              <Line
                type="monotone"
                dataKey="feels_like"
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
