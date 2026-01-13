import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

interface LogoWatermarkProps {
  className?: string;
  opacity?: number;
  size?: "sm" | "md" | "lg";
}

const LogoWatermark = ({ className, opacity = 0.08, size = "md" }: LogoWatermarkProps) => {
  const sizeClasses = {
    sm: "w-40 h-40",
    md: "w-64 h-64",
    lg: "w-80 h-80",
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
