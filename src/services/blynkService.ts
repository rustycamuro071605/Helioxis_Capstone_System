// Service for connecting to Blynk IoT platform and handling real-time data
import { toast } from "sonner";

// Define types for our IoT device data
export interface DeviceData {
  batteryLevel: number;
  isCharging: boolean;
  currentOutput: number;
  temperature: number;
  humidity: number;
  uvIndex: number;
  windSpeed: number;
  rackPosition: 'extended' | 'retracted';
  autoMode: boolean;
  connected: boolean;
  lastUpdate: Date;
}

// Mock initial data - in a real application, this would come from Blynk API
const MOCK_DEVICE_DATA: DeviceData = {
  batteryLevel: 85,
  isCharging: true,
  currentOutput: 102.79829981950481,
  temperature: 26,
  humidity: 58,
  uvIndex: 7,
  windSpeed: 10,
  rackPosition: 'extended',
  autoMode: true,
  connected: true,
  lastUpdate: new Date(),
};

class BlynkService {
  private static instance: BlynkService;
  private apiKey: string | null = null;
  private deviceData: DeviceData = MOCK_DEVICE_DATA;
  private subscribers: Array<(data: DeviceData) => void> = [];
  private pollingInterval: NodeJS.Timeout | null = null;
  
  // In a real application, these would be actual Blynk server endpoints
  private readonly BASE_URL = 'https://api.blynk.cloud';
  private readonly POLLING_INTERVAL = 5000; // 5 seconds
  
  private constructor() {
    // Initialize with mock data
    this.deviceData = { ...MOCK_DEVICE_DATA };
  }

  public static getInstance(): BlynkService {
    if (!BlynkService.instance) {
      BlynkService.instance = new BlynkService();
    }
    return BlynkService.instance;
  }

  public async initialize(apiKey: string): Promise<boolean> {
    try {
      this.apiKey = apiKey;
      
      // Validate API key with Blynk cloud
      const isValid = await this.validateApiKey();
      
      if (isValid) {
        // Start polling for device updates
        this.startPolling();
        toast.success("Connected to Blynk IoT Platform");
        return true;
      } else {
        throw new Error("Invalid API key");
      }
    } catch (error) {
      console.error('Failed to initialize Blynk service:', error);
      toast.error("Failed to connect to Blynk IoT Platform");
      return false;
    }
  }

  private async validateApiKey(): Promise<boolean> {
    // Simulate API key validation
    // In a real app, this would make an actual API call to Blynk
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.apiKey !== null && this.apiKey.length > 0);
      }, 500);
    });
  }

  private startPolling(): void {
    this.stopPolling(); // Stop any existing polling
    
    this.pollingInterval = setInterval(async () => {
      try {
        const newData = await this.fetchDeviceData();
        this.updateDeviceData(newData);
      } catch (error) {
        console.error('Error fetching device data:', error);
        // Mark device as disconnected if we can't get data
        this.updateDeviceData({
          ...this.deviceData,
          connected: false,
          lastUpdate: new Date()
        });
      }
    }, this.POLLING_INTERVAL);
  }

  private stopPolling(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }

  private async fetchDeviceData(): Promise<DeviceData> {
    // Simulate fetching data from Blynk cloud
    // In a real app, this would make an API call to Blynk
    return new Promise(resolve => {
      setTimeout(() => {
        // Simulate slight variations in sensor readings
        const variation = (base: number, maxVariation: number = 5) => {
          const variationAmount = (Math.random() * 2 - 1) * maxVariation;
          return Math.max(0, Math.min(100, base + variationAmount));
        };

        // Simulate small changes in readings
        const newData: DeviceData = {
          ...this.deviceData,
          batteryLevel: Math.round(variation(this.deviceData.batteryLevel, 2)),
          currentOutput: parseFloat((this.deviceData.currentOutput + (Math.random() * 10 - 5)).toFixed(2)),
          temperature: Math.round(variation(this.deviceData.temperature, 3)),
          humidity: Math.round(variation(this.deviceData.humidity, 5)),
          uvIndex: Math.max(0, Math.min(11, Math.round(variation(this.deviceData.uvIndex, 2)))),
          windSpeed: Math.max(0, Math.round(variation(this.deviceData.windSpeed, 3))),
          connected: true,
          lastUpdate: new Date(),
        };

        resolve(newData);
      }, 200);
    });
  }

  private updateDeviceData(newData: DeviceData): void {
    this.deviceData = newData;
    this.notifySubscribers(newData);
  }

  public subscribe(callback: (data: DeviceData) => void): () => void {
    this.subscribers.push(callback);
    
    // Immediately send current data
    callback(this.deviceData);
    
    // Return unsubscribe function
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  private notifySubscribers(data: DeviceData): void {
    this.subscribers.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error('Error in subscriber callback:', error);
      }
    });
  }

  public getDeviceData(): DeviceData {
    return { ...this.deviceData };
  }

  public async controlRack(position: 'extend' | 'retract'): Promise<boolean> {
    try {
      // Simulate sending command to IoT device via Blynk
      // In a real app, this would make an API call to Blynk
      const response = await new Promise<{ success: boolean }>((resolve) => {
        setTimeout(() => {
          // Simulate the action
          const newPosition = position === 'extend' ? 'extended' : 'retracted';
          
          this.updateDeviceData({
            ...this.deviceData,
            rackPosition: newPosition,
            lastUpdate: new Date(),
          });

          resolve({ success: true });
        }, 1000);
      });

      if (response.success) {
        toast.success(`Rack ${position === 'extend' ? 'extended' : 'retracted'} successfully`);
        return true;
      } else {
        throw new Error('Failed to control rack');
      }
    } catch (error) {
      console.error('Error controlling rack:', error);
      toast.error(`Failed to ${position} rack`);
      return false;
    }
  }

  public async toggleAutoMode(enabled: boolean): Promise<boolean> {
    try {
      // Simulate sending command to IoT device via Blynk
      const response = await new Promise<{ success: boolean }>((resolve) => {
        setTimeout(() => {
          this.updateDeviceData({
            ...this.deviceData,
            autoMode: enabled,
            lastUpdate: new Date(),
          });

          resolve({ success: true });
        }, 500);
      });

      if (response.success) {
        toast.success(`Auto mode ${enabled ? 'enabled' : 'disabled'}`);
        return true;
      } else {
        throw new Error('Failed to toggle auto mode');
      }
    } catch (error) {
      console.error('Error toggling auto mode:', error);
      toast.error(`Failed to ${enabled ? 'enable' : 'disable'} auto mode`);
      return false;
    }
  }

  public disconnect(): void {
    this.stopPolling();
    this.apiKey = null;
    this.deviceData = {
      ...this.deviceData,
      connected: false,
    };
    toast.info("Disconnected from Blynk IoT Platform");
  }
}

export const blynkService = BlynkService.getInstance();