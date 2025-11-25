import { useState } from "react";
import { StatusBanner } from "@/components/StatusBanner";
import { SolarPowerCard } from "@/components/SolarPowerCard";
import { WeatherCard } from "@/components/WeatherCard";
import { RackControlCard } from "@/components/RackControlCard";
import { toast } from "sonner";

const Index = () => {
  const [solarData] = useState({
    batteryLevel: 85,
    isCharging: true,
    currentOutput: 102.79829981950481,
  });

  const [weatherData] = useState({
    temperature: 26,
    humidity: 58,
    uvIndex: 7,
    windSpeed: 10,
  });

  const handleExtend = () => {
    toast.success("Rack extended");
  };

  const handleRetract = () => {
    toast.success("Rack retracted");
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">Smart Drying Rack</h1>
          <p className="text-muted-foreground">
            Solar-powered IoT drying solution with weather monitoring
          </p>
        </header>

        {/* Status Banner */}
        <StatusBanner
          title="Moderate Conditions"
          message="Weather is acceptable but not optimal. Monitor for changes."
          variant="warning"
        />

        {/* Solar Power & Weather Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SolarPowerCard
            batteryLevel={solarData.batteryLevel}
            isCharging={solarData.isCharging}
            currentOutput={solarData.currentOutput}
          />
          <WeatherCard
            temperature={weatherData.temperature}
            humidity={weatherData.humidity}
            uvIndex={weatherData.uvIndex}
            windSpeed={weatherData.windSpeed}
          />
        </div>

        {/* Rack Control */}
        <RackControlCard onExtend={handleExtend} onRetract={handleRetract} />
      </div>
    </div>
  );
};

export default Index;
