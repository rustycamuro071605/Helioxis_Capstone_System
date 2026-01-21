import { useState } from "react";
import { Settings, Wifi, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { blynkService } from "@/services/blynkService";
import { toast } from "sonner";

export const BlynkSettingsDialog = () => {
  const [apiKey, setApiKey] = useState("");
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(blynkService.getDeviceData().connected);

  const handleConnect = async () => {
    if (!apiKey.trim()) {
      toast.error("Please enter your Blynk API key");
      return;
    }

    setConnecting(true);
    try {
      const success = await blynkService.initialize(apiKey);
      if (success) {
        setConnected(true);
        toast.success("Successfully connected to Blynk!");
      } else {
        setConnected(false);
        toast.error("Failed to connect to Blynk");
      }
    } catch (error) {
      setConnected(false);
      toast.error("Error connecting to Blynk");
      console.error("Connection error:", error);
    } finally {
      setConnecting(false);
    }
  };

  const handleDisconnect = () => {
    blynkService.disconnect();
    setConnected(false);
    toast.info("Disconnected from Blynk");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wifi className="h-5 w-5 text-primary" />
            Blynk Connection Settings
          </DialogTitle>
          <DialogDescription>
            Configure your connection to the Blynk IoT platform
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <KeyRound className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="apiKey">Blynk Auth Token</Label>
            </div>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your Blynk auth token"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="mb-2"
            />
            <p className="text-xs text-muted-foreground">
              Your auth token can be found in the Blynk app project settings
            </p>
          </Card>

          <div className="flex gap-2">
            <Button 
              onClick={handleConnect} 
              disabled={connecting || connected}
              className="flex-1"
            >
              {connecting ? "Connecting..." : connected ? "Connected" : "Connect"}
            </Button>
            
            {connected && (
              <Button 
                variant="outline" 
                onClick={handleDisconnect}
                className="flex-1"
              >
                Disconnect
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};