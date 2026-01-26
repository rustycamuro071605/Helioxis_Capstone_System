import { CloudRain, Sun, Eye, Wind } from "lucide-react";
import { Card } from "@/components/ui/card";

interface WeatherAnalysisCardProps {
  temperature: number;
  humidity: number;
  uvIndex: number;
  windSpeed: number;
}

export const WeatherAnalysisCard = ({ 
  temperature, 
  humidity, 
  uvIndex, 
  windSpeed 
}: WeatherAnalysisCardProps) => {
  // Calculate comfort level based on various factors
  const calculateComfortLevel = (): { level: string; description: string; color: string } => {
    // Temperature comfort calculation
    const tempComfort = Math.abs(temperature - 22); // 22°C is ideal
    const humComfort = Math.abs(humidity - 50); // 50% is ideal
    
    if (tempComfort <= 3 && humComfort <= 10 && uvIndex <= 5 && windSpeed <= 15) {
      return { 
        level: "Optimal", 
        description: "Perfect conditions for outdoor drying", 
        color: "text-success" 
      };
    } else if (tempComfort <= 5 && humComfort <= 15 && uvIndex <= 7 && windSpeed <= 20) {
      return { 
        level: "Good", 
        description: "Acceptable conditions for outdoor drying", 
        color: "text-primary" 
      };
    } else if (tempComfort <= 8 && humComfort <= 20 && uvIndex <= 9 && windSpeed <= 25) {
      return { 
        level: "Moderate", 
        description: "Conditions are acceptable but monitor closely", 
        color: "text-warning" 
      };
    } else {
      return { 
        level: "Poor", 
        description: "Not suitable for outdoor drying", 
        color: "text-destructive" 
      };
    }
  };

  const comfort = calculateComfortLevel();

  // Calculate recommendations
  const getRecommendations = () => {
    const recs = [];
    
    if (humidity > 70) {
      recs.push("High humidity - consider retracting rack");
    }
    
    if (uvIndex > 8) {
      recs.push("High UV levels - clothes will dry faster but colors may fade");
    }
    
    if (windSpeed > 20) {
      recs.push("Strong winds - secure clothes properly");
    }
    
    if (temperature < 15) {
      recs.push("Low temperatures - drying will be slower");
    }
    
    if (recs.length === 0) {
      recs.push("Optimal conditions for drying");
    }
    
    return recs;
  };

  const recommendations = getRecommendations();

  return (
    <Card className="p-6 border-2">
      <div className="flex items-center gap-2 mb-4">
        <Eye className="h-5 w-5 text-info" />
        <h2 className="text-xl font-bold text-card-foreground">Weather Analysis</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Real-time analysis using ESP32 with DHT22 and rain sensor (YL-83) integration
      </p>

      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-secondary">
          <div className="text-center">
            <div className={`text-2xl font-bold ${comfort.color}`}>{comfort.level}</div>
            <div className="text-sm text-muted-foreground">{comfort.description}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4 text-yellow-500" />
              <span className="text-sm text-muted-foreground">Temp Feels Like</span>
            </div>
            <div className="text-sm font-medium">
              {temperature + (humidity > 70 ? 2 : 0) + (windSpeed > 15 ? -1 : 0)}°C
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
            <div className="flex items-center gap-2">
              <CloudRain className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-muted-foreground">Dew Point</span>
            </div>
            <div className="text-sm font-medium">
              {Math.round(temperature - (100 - humidity) / 5)}°C
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-card-foreground mb-2">Recommendations:</h3>
          <ul className="space-y-1">
            {recommendations.map((rec, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start">
              <span className="mr-2">•</span> {rec}
            </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};