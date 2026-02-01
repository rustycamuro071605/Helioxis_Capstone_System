import { Card } from "@/components/ui/card";
import { Shield, Wind, Droplets, Sun } from "lucide-react";

interface CoverStatusCardProps {
  windSpeed: number;
  humidity: number;
  temperature: number;
}

export const CoverStatusCard = ({ windSpeed, humidity, temperature }: CoverStatusCardProps) => {
  // Determine which cover is currently active
  let coverType = 'none';
  let coverDescription = 'No special cover needed';
  let coverColor = 'text-gray-400';
  let coverBgColor = 'bg-gray-800/20';
  
  if (windSpeed > 15 && humidity > 60) {
    coverType = 'solid';
    coverDescription = 'Solid cover engaged for protection';
    coverColor = 'text-blue-400';
    coverBgColor = 'bg-blue-900/20 border-blue-700/30';
  } else if (windSpeed > 15 && humidity <= 60) {
    coverType = 'perforated';
    coverDescription = 'Perforated cover engaged for airflow';
    coverColor = 'text-orange-400';
    coverBgColor = 'bg-orange-900/20 border-orange-700/30';
  }

  return (
    <Card className={`p-7 bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-slate-700/50 ${coverBgColor} transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] group`}>
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-4 rounded-2xl border-2 transition-all duration-300 group-hover:scale-110 ${
          coverType === 'solid' 
            ? 'bg-gradient-to-br from-slate-700/50 to-slate-800/50 border-slate-600/50 shadow-lg' 
            : coverType === 'perforated' 
            ? 'bg-gradient-to-br from-slate-700/50 to-slate-800/50 border-slate-600/50 shadow-lg' 
            : 'bg-gradient-to-br from-slate-700/50 to-slate-800/50 border-slate-600/50'
        }`}>
          {coverType === 'solid' ? (
            <Shield className={`h-7 w-7 ${coverColor.replace('text-blue-400', 'text-orange-400').replace('text-orange-400', 'text-orange-500')}`} />
          ) : coverType === 'perforated' ? (
            <Wind className={`h-7 w-7 ${coverColor.replace('text-blue-400', 'text-orange-400').replace('text-orange-400', 'text-orange-500')}`} />
          ) : (
            <Sun className="h-7 w-7 text-gray-400" />
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Cover Status</h2>
          <p className={`text-sm font-medium ${coverColor.replace('text-blue-400', 'text-orange-400').replace('text-orange-400', 'text-orange-500')}`}>
            {coverType === 'none' ? 'Standard Protection' : 
             coverType === 'solid' ? 'Full Protection Mode' : 'Ventilation Mode'}
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="p-5 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-2xl border border-slate-600/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-300 font-medium">Current Cover</span>
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${coverColor.replace('text-blue-400', 'text-orange-400').replace('text-orange-400', 'text-orange-500')} capitalize`}>
              {coverType === 'none' ? 'Standard' : coverType}
            </span>
          </div>
          <p className={`text-sm ${coverColor.replace('text-blue-400', 'text-orange-400').replace('text-orange-400', 'text-orange-500')}`}>
            {coverDescription}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="p-4 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-2xl text-center border border-slate-600/50 hover:from-slate-700/60 hover:to-slate-800/60 transition-all duration-300">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Wind className="h-5 w-5 text-blue-400" />
              <div className="text-2xl font-bold text-white">{windSpeed}</div>
            </div>
            <div className="text-xs text-gray-400 font-medium">Wind km/h</div>
          </div>
          <div className="p-4 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-2xl text-center border border-slate-600/50 hover:from-slate-700/60 hover:to-slate-800/60 transition-all duration-300">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Droplets className="h-5 w-5 text-cyan-400" />
              <div className="text-2xl font-bold text-white">{humidity}%</div>
            </div>
            <div className="text-xs text-gray-400 font-medium">Humidity</div>
          </div>
          <div className="p-4 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-2xl text-center border border-slate-600/50 hover:from-slate-700/60 hover:to-slate-800/60 transition-all duration-300">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sun className="h-5 w-5 text-amber-400" />
              <div className="text-2xl font-bold text-white">{temperature}°</div>
            </div>
            <div className="text-xs text-gray-400 font-medium">Temp</div>
          </div>
        </div>
      </div>
    </Card>
  );
};