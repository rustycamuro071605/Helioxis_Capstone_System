import { Sun, Battery } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SolarPowerCardProps {
  batteryLevel: number;
  isCharging: boolean;
  currentOutput: number;
}

export const SolarPowerCard = ({ batteryLevel, isCharging, currentOutput }: SolarPowerCardProps) => {
  return (
    <Card className="p-6 border-2">
      <div className="flex items-center gap-2 mb-4">
        <Sun className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold text-card-foreground">Solar Power</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Powered by 12V/10W solar panel with charge controller and 12V battery pack
      </p>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Battery Level</span>
            <span className="font-semibold text-card-foreground">{batteryLevel}%</span>
          </div>
          <Progress value={batteryLevel} className="h-2" />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Battery className="h-4 w-4 text-success" />
            <span className="text-sm font-medium text-success">
              {isCharging ? "Charging" : "Idle"}
            </span>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{currentOutput.toFixed(2)}W</div>
            <div className="text-xs text-muted-foreground">Current Output</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
