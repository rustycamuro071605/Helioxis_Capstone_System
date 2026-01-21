import { Wifi, WifiOff, Zap, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { blynkService } from "@/services/blynkService";

interface BlynkConnectionStatusProps {
  connected: boolean;
  lastUpdate: Date | null;
}

export const BlynkConnectionStatus = ({ connected, lastUpdate }: BlynkConnectionStatusProps) => {
  return (
    <Card className="p-4 border-2 bg-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${connected ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}`}>
            {connected ? (
              <Wifi className="h-5 w-5" />
            ) : (
              <WifiOff className="h-5 w-5" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">Blynk Connection</h3>
            <p className="text-sm text-muted-foreground">
              {connected ? 'Connected to IoT device' : 'Disconnected from IoT device'}
            </p>
          </div>
        </div>
        
        <Badge variant={connected ? "default" : "destructive"}>
          {connected ? 'Online' : 'Offline'}
        </Badge>
      </div>
      
      <div className="mt-3 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Zap className="h-4 w-4" />
          <span>Blynk Cloud</span>
        </div>
        
        {lastUpdate && (
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Last update: {lastUpdate.toLocaleTimeString()}</span>
          </div>
        )}
      </div>
    </Card>
  );
};