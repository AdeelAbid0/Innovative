import { useEffect, useRef } from "react";

export function CodeRainEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Code snippets that will fall
    const codeSnippets = [
      "const",
      "let",
      "var",
      "function",
      "class",
      "import",
      "export",
      "return",
      "if",
      "else",
      "for",
      "while",
      "async",
      "await",
      "React",
      "useState",
      "useEffect",
      "props",
      "state",
      "npm",
      "git",
      "push",
      "commit",
      "merge",
      "pull",
      "API",
      "REST",
      "JSON",
      "HTTP",
      "GET",
      "POST",
      "=>",
      "{}",
      "[]",
      "()",
      "===",
      "!==",
      "&&",
      "||",
      "01",
      "10",
      "001",
      "101",
      "011",
      "100",
      "110",
      "<div>",
      "</div>",
      "</>",
      "onClick",
      "onChange",
      "true",
      "false",
      "null",
      "undefined",
      "void",
      "interface",
      "type",
      "enum",
      "any",
      "unknown",
    ];

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Create drops array with random starting positions and speeds
    const drops: Array<{
      y: number;
      speed: number;
      text: string;
      opacity: number;
    }> = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = {
        y: Math.random() * -canvas.height,
        speed: 0.5 + Math.random() * 1.5,
        text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        opacity: 0.3 + Math.random() * 0.5,
      };
    }

    let animationId: number;

    // Draw function
    function draw() {
      if (!ctx || !canvas) return;

      // Create fade effect
      ctx.fillStyle = "rgba(33, 33, 33, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `bold ${fontSize}px 'Courier New', monospace`;

      // Draw each column
      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];

        // Set color with opacity
        ctx.fillStyle = `rgba(12, 228, 33, ${drop.opacity * 1.5})`;

        // Draw the text
        const x = i * fontSize;
        ctx.fillText(drop.text, x, drop.y);

        // Add a brighter head to the drop
        if (drop.y > 0 && drop.y < canvas.height) {
          ctx.fillStyle = `rgba(12, 228, 33, ${Math.min(
            drop.opacity * 2,
            0.9
          )})`;
          ctx.fillText(drop.text, x, drop.y);
        }

        // Move drop down
        drop.y += drop.speed;

        // Reset drop when it goes off screen
        if (drop.y > canvas.height + fontSize) {
          drop.y = Math.random() * -200;
          drop.text =
            codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
          drop.speed = 0.5 + Math.random() * 1.5;
          drop.opacity = 0.3 + Math.random() * 0.5;
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    draw();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-35 pointer-events-none"
      style={{
        mixBlendMode: "screen",
        zIndex: 0,
        imageRendering: "crisp-edges",
      }}
    />
  );
}
