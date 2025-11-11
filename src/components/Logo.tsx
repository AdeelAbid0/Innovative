import svgPaths from "../imports/svg-4amhmf5uvd";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export function Logo({
  size = "md",
  showText = true,
  className = "",
}: LogoProps) {
  const sizes = {
    sm: { container: "w-8 h-8", text: "text-lg" },
    md: { container: "w-10 h-10", text: "text-xl" },
    lg: { container: "w-12 h-12", text: "text-2xl" },
  };

  return (
    <div className={`flex items-center ${className}`}>
      {/* Nexus Core Logo - Using imported polygon design */}
      <div
        className={`${sizes[size].container} relative flex items-center justify-center group`}
      >
        <svg
          className={`${sizes[size].container} transition-all duration-300 group-hover:scale-105`}
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 40 40"
        >
          <defs>
            {/* Glow Effect */}
            <filter id="logo-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Main polygon paths with primary green color */}
          <path
            d={svgPaths.p11b2380}
            fill="var(--primary)"
            filter="url(#logo-glow)"
            className="transition-all duration-300 group-hover:brightness-110"
          />
          <path
            d={svgPaths.pc068400}
            fill="var(--primary)"
            opacity="0.8"
            className="transition-all duration-300 group-hover:opacity-100"
          />
          <path
            d={svgPaths.p2c33f080}
            fill="var(--primary)"
            opacity="0.9"
            className="transition-all duration-300 group-hover:opacity-100"
          />
        </svg>
      </div>

      {/* Brand Text - Nexus Core Wordmark */}
      {showText && (
        <div className="ml-3 flex items-center space-x-2">
          <span
            className={`${sizes[size].text} font-bold text-foreground group-hover:text-primary transition-colors duration-300`}
          >
            Nexus
          </span>
          <span className={`${sizes[size].text} font-bold text-primary`}>
            Core
          </span>
        </div>
      )}
    </div>
  );
}
