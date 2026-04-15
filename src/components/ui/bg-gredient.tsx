import { cn } from "@/lib/utils";

interface BgGradientProps {
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
  gradientSize?: string;
  gradientPosition?: string;
  gradientStop?: string;
}

export const Component = ({
  className,
  gradientFrom = "#f8fbff",
  gradientTo = "#a5b4fc",
  gradientSize = "140% 140%",
  gradientPosition = "50% 8%",
  gradientStop = "32%",
}: BgGradientProps) => {
  return (
    <div
      className={cn("absolute inset-0 w-full h-full z-0 bg-white", className)}
      style={{
        background: `radial-gradient(${gradientSize} at ${gradientPosition}, ${gradientFrom} ${gradientStop}, ${gradientTo} 100%)`,
      }}
    />
  );
};
