import { AlertCircle } from "lucide-react";

interface StatusBannerProps {
  title: string;
  message: string;
  variant?: "warning" | "success" | "info";
}

export const StatusBanner = ({ title, message, variant = "warning" }: StatusBannerProps) => {
  const variantStyles = {
    warning: "bg-warning/10 border-warning/30 text-warning-foreground",
    success: "bg-success/10 border-success/30 text-success",
    info: "bg-info/10 border-info/30 text-info",
  };

  return (
    <div className={`rounded-xl border-2 p-4 ${variantStyles[variant]}`}>
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-semibold mb-1">{title}</h3>
          <p className="text-sm opacity-90">{message}</p>
        </div>
      </div>
    </div>
  );
};
