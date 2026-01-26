import { useState } from "react";
import { Shirt, ChevronUp, ChevronDown, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface RackControlCardProps {
  onExtend: () => void;
  onRetract: () => void;
  position?: 'extended' | 'retracted';
  autoMode?: boolean;
  onToggleAutoMode?: (enabled: boolean) => void;
}

export const RackControlCard = ({ onExtend, onRetract, position: propPosition, autoMode: propAutoMode, onToggleAutoMode }: RackControlCardProps) => {
  const [localAutoMode, setLocalAutoMode] = useState(true);
  const [localPosition, setLocalPosition] = useState<"extended" | "retracted">("extended");

  // Use props if provided, otherwise fall back to local state
  const effectivePosition = propPosition ?? localPosition;
  const effectiveAutoMode = propAutoMode ?? localAutoMode;

  const handleExtend = async () => {
    if (onExtend) {
      await onExtend();
    }
    setLocalPosition("extended");
  };

  const handleRetract = async () => {
    if (onRetract) {
      await onRetract();
    }
    setLocalPosition("retracted");
  };

  const handleToggleAutoMode = (enabled: boolean) => {
    if (onToggleAutoMode) {
      onToggleAutoMode(enabled);
    }
    setLocalAutoMode(enabled);
  };

  return (
    <Card className="p-6 border-2">
      <div className="flex items-center gap-2 mb-6">
        <Shirt className="h-5 w-5 text-card-foreground" />
        <h2 className="text-xl font-bold text-card-foreground">Rack Control</h2>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
          <span className="font-medium text-card-foreground">Auto Mode</span>
          <Switch checked={effectiveAutoMode} onCheckedChange={handleToggleAutoMode} />
        </div>

        <p className="text-sm text-muted-foreground">
          Controlled by ESP32 microcontroller via L298N motor driver and DC gear motor
        </p>

        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Current Position</span>
            <span className="font-semibold text-card-foreground capitalize">{effectivePosition}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={handleExtend}
              disabled={effectivePosition === "extended"}
              variant={effectivePosition === "extended" ? "default" : "outline"}
              className="w-full"
            >
              <ChevronUp className="h-4 w-4 mr-2" />
              Extend
            </Button>
            <Button
              onClick={handleRetract}
              disabled={effectivePosition === "retracted"}
              variant={effectivePosition === "retracted" ? "default" : "outline"}
              className="w-full"
            >
              <ChevronDown className="h-4 w-4 mr-2" />
              Retract
            </Button>
          </div>
        </div>

        {effectiveAutoMode && (
          <div className="flex items-start gap-2 p-3 bg-success/10 border border-success/30 rounded-lg">
            <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
            <p className="text-sm text-success">
              Auto mode active - Rack adjusts based on weather conditions
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
