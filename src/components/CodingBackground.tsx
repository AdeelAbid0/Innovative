import { useEffect, useState } from "react";

interface CodeParticle {
  id: number;
  text: string;
  x: number;
  y: number;
  speed: number;
  opacity: number;
  size: number;
}

export function CodingBackground() {
  const [particles, setParticles] = useState<CodeParticle[]>([]);

  // Code snippets and symbols that will float around
  const codeSnippets = [
    "const",
    "function",
    "import",
    "export",
    "return",
    "async",
    "await",
    "class",
    "interface",
    "type",
    "{ }",
    "< />",
    "=> ",
    "[ ]",
    "( )",
    "if",
    "else",
    "for",
    "while",
    "map",
    "filter",
    "React",
    "useState",
    "useEffect",
    "npm",
    "git",
    "API",
    "JSON",
    "CSS",
    "HTML",
    "JS",
    "TS",
    "01",
    "10",
    "001",
    "101",
    "011",
    "100",
    "::",
    "&&",
    "||",
    "===",
    "!==",
    "++",
    "--",
    "/*",
    "*/",
    "//",
    "#",
    "@",
    "$",
  ];

  useEffect(() => {
    // Generate initial particles
    const initialParticles: CodeParticle[] = Array.from(
      { length: 50 },
      (_, i) => ({
        id: i,
        text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        speed: 0.05 + Math.random() * 0.15,
        opacity: 0.3 + Math.random() * 0.4,
        size: 12 + Math.random() * 10,
      })
    );

    setParticles(initialParticles);

    // Animate particles
    const animationInterval = setInterval(() => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => ({
          ...particle,
          y: particle.y + particle.speed,
          // Reset to top when particle goes off screen
          ...(particle.y > 100 && {
            y: -5,
            x: Math.random() * 100,
            text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
          }),
        }))
      );
    }, 50);

    return () => clearInterval(animationInterval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(12, 228, 33, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(12, 228, 33, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Animated code particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute text-primary font-mono transition-all duration-100 ease-linear"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
            fontSize: `${particle.size}px`,
            transform: "translateZ(0)",
            willChange: "transform",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            fontWeight: 500,
          }}
        >
          {particle.text}
        </div>
      ))}

      {/* Glowing orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "4s" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "6s", animationDelay: "2s" }}
      />

      {/* Diagonal lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="diagonalLines"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="40"
              y2="40"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-primary"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagonalLines)" />
      </svg>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
    </div>
  );
}
