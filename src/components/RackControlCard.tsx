import { useState } from "react";
import { Shirt, ChevronUp, ChevronDown, Check, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { notificationService } from "@/services/notificationService";

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
    
    // Notify about the movement
    notificationService.notifyMovement('extended', 'manual');
  };

  const handleRetract = async () => {
    if (onRetract) {
      await onRetract();
    }
    setLocalPosition("retracted");
    
    // Notify about the movement
    notificationService.notifyMovement('retracted', 'manual');
  };

  const handleToggleAutoMode = (enabled: boolean) => {
    if (onToggleAutoMode) {
      onToggleAutoMode(enabled);
    }
    setLocalAutoMode(enabled);
  };

  return (
    <Card className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-700/50 hover:border-orange-500/30 transition-all duration-300 hover:shadow-orange-500/20 hover:scale-[1.02]">
      <h2 className="text-2xl font-semibold text-white mb-5 bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">Rack Control</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between py-3 px-4 bg-slate-700/30 rounded-2xl border border-slate-600/50 hover:bg-slate-700/40 transition-colors duration-200">
          <span className="text-base font-medium text-gray-200 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Auto Mode
          </span>
          <Switch 
            checked={effectiveAutoMode} 
            onCheckedChange={handleToggleAutoMode} 
            className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-orange-500 data-[state=checked]:to-amber-500 data-[state=unchecked]:bg-slate-600"
          />
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleExtend}
            disabled={effectivePosition === "extended" || effectiveAutoMode}
            className="w-full h-14 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl uppercase shadow-lg hover:shadow-orange-500/30 transition-all duration-300 hover:scale-105 relative overflow-hidden group"
          >
            <span className="relative z-10">EXTEND</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Button>
          <Button
            onClick={handleRetract}
            disabled={effectivePosition === "retracted" || effectiveAutoMode}
            variant="secondary"
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed relative rounded-2xl uppercase border border-blue-500/30 shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 group"
          >
            <span className="relative z-10 flex items-center gap-2">
              RETRACT
              {(effectivePosition === "retracted" || effectiveAutoMode) && (
                <Lock className="h-4 w-4" />
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Button>
        </div>

        <div className="text-center py-3 px-4 bg-slate-700/20 rounded-2xl border border-slate-600/30">
          <div className="flex items-center justify-center gap-2">
            <span className="text-gray-400 text-sm">Current Position:</span> 
            <span className={`font-bold uppercase px-3 py-1 rounded-full text-sm ${effectivePosition === 'extended' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-slate-600/30 text-slate-300 border border-slate-500/30'}`}>
              {effectivePosition}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
