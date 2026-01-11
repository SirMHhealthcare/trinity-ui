import logo from "@/assets/logo.jpg";
import { cn } from "@/lib/utils";

interface LogoWatermarkProps {
  className?: string;
  opacity?: number;
  size?: "sm" | "md" | "lg";
}

const LogoWatermark = ({ className, opacity = 0.05, size = "md" }: LogoWatermarkProps) => {
  const sizeClasses = {
    sm: "w-32 h-32",
    md: "w-48 h-48",
    lg: "w-64 h-64",
  };

  return (
    <div 
      className={cn(
        "absolute pointer-events-none select-none",
        className
      )}
    >
      <img 
        src={logo} 
        alt="" 
        aria-hidden="true"
        className={cn(
          sizeClasses[size],
          "rounded-full object-cover"
        )}
        style={{ opacity }}
      />
    </div>
  );
};

export default LogoWatermark;
