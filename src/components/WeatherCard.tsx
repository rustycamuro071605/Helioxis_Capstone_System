import { Cloud, Thermometer, Droplets, Sun, Wind } from "lucide-react";
import { Card } from "@/components/ui/card";

interface WeatherCardProps {
  temperature: number;
  humidity: number;
  uvIndex: number;
  windSpeed: number;
}

export const WeatherCard = ({ temperature, humidity, uvIndex, windSpeed }: WeatherCardProps) => {
  return (
    <Card className="p-6 border-2">
      <div className="flex items-center gap-2 mb-4">
        <Cloud className="h-5 w-5 text-info" />
        <h2 className="text-xl font-bold text-card-foreground">Weather Conditions</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Thermometer className="h-4 w-4" />
            <span>Temperature</span>
          </div>
          <div className="text-3xl font-bold text-card-foreground">{temperature}°C</div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Droplets className="h-4 w-4" />
            <span>Humidity</span>
          </div>
          <div className="text-3xl font-bold text-card-foreground">{humidity}%</div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Sun className="h-4 w-4" />
            <span>UV Index</span>
          </div>
          <div className="text-3xl font-bold text-card-foreground">{uvIndex}</div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Wind className="h-4 w-4" />
            <span>Wind Speed</span>
          </div>
          <div className="text-3xl font-bold text-card-foreground">{windSpeed} km/h</div>
        </div>
      </div>
    </Card>
  );
};
