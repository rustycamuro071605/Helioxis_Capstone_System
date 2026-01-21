import { useEffect, useState } from "react";
import { StatusBanner } from "@/components/StatusBanner";
import { SolarPowerCard } from "@/components/SolarPowerCard";
import { WeatherCard } from "@/components/WeatherCard";
import { WeatherAnalysisCard } from "@/components/WeatherAnalysisCard";
import { RackControlCard } from "@/components/RackControlCard";
import { BlynkConnectionStatus } from "@/components/BlynkConnectionStatus";
import { BlynkSettingsDialog } from "@/components/BlynkSettingsDialog";
import { blynkService, type DeviceData } from "@/services/blynkService";
import { toast } from "sonner";

const Index = () => {
  const [deviceData, setDeviceData] = useState<DeviceData | null>(null);

  useEffect(() => {
    // Initialize Blynk service with a mock API key
    // In a real application, this would come from environment variables or user input
    const initService = async () => {
      const success = await blynkService.initialize("BLYNK_API_KEY_12345");
      if (success) {
        // Subscribe to device data updates
        const unsubscribe = blynkService.subscribe(setDeviceData);
        
        return () => {
          unsubscribe();
        };
      }
    };
    
    initService();
    
    // Clean up on unmount
    return () => {
      blynkService.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-primary">Smart Drying Rack</h1>
            <p className="text-muted-foreground">
              Solar-powered IoT drying solution with weather monitoring
            </p>
          </div>
          <div>
            <BlynkSettingsDialog />
          </div>
        </header>

        {/* Blynk Connection Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <StatusBanner
              title={deviceData?.connected ? "Connected to Blynk" : "Disconnected"}
              message={deviceData?.connected 
                ? "Live data streaming from IoT device" 
                : "No connection to IoT device"}
              variant={deviceData?.connected ? "success" : "warning"}
            />
          </div>
          <div>
            <BlynkConnectionStatus 
              connected={!!deviceData?.connected} 
              lastUpdate={deviceData?.lastUpdate || null} 
            />
          </div>
        </div>

        {/* Solar Power & Weather Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SolarPowerCard
            batteryLevel={deviceData?.batteryLevel || 0}
            isCharging={!!deviceData?.isCharging}
            currentOutput={deviceData?.currentOutput || 0}
          />
          <WeatherCard
            temperature={deviceData?.temperature || 0}
            humidity={deviceData?.humidity || 0}
            uvIndex={deviceData?.uvIndex || 0}
            windSpeed={deviceData?.windSpeed || 0}
          />
          <WeatherAnalysisCard
            temperature={deviceData?.temperature || 0}
            humidity={deviceData?.humidity || 0}
            uvIndex={deviceData?.uvIndex || 0}
            windSpeed={deviceData?.windSpeed || 0}
          />
        </div>

        {/* Rack Control */}
        <RackControlCard 
          onExtend={() => blynkService.controlRack('extend')} 
          onRetract={() => blynkService.controlRack('retract')} 
          position={deviceData?.rackPosition || 'extended'}
          autoMode={deviceData?.autoMode || false}
          onToggleAutoMode={(enabled) => blynkService.toggleAutoMode(enabled)}
        />
      </div>
    </div>
  );
};

export default Index;
