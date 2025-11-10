import React, { useEffect, useState, useRef } from 'react';

// Binary code rain component
function BinaryRain() {
  const [columns, setColumns] = useState<Array<{ delay: number; duration: number }>>([]);

  useEffect(() => {
    const columnCount = Math.floor(window.innerWidth / 20);
    const newColumns = Array.from({ length: columnCount }, () => ({
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
    }));
    setColumns(newColumns);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
      {columns.map((col, index) => (
        <div
          key={index}
          className="absolute top-0 bottom-0 flex flex-col text-primary font-mono text-sm"
          style={{
            left: `${(index / columns.length) * 100}%`,
            animationName: 'fallDown',
            animationDuration: `${col.duration}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDelay: `${col.delay}s`,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            fontWeight: 600,
          }}
        >
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="opacity-70">
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </div>
      ))}
      <style>{`
        @keyframes fallDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  );
}

// Floating code blocks component
function FloatingCodeBlocks() {
  const codeBlocks = [
    { code: 'const app = () => {}', top: '15%', left: '10%', delay: 0 },
    { code: 'import React from "react"', top: '25%', left: '80%', delay: 1 },
    { code: 'npm install', top: '45%', left: '5%', delay: 2 },
    { code: 'git commit -m "feat"', top: '60%', left: '85%', delay: 3 },
    { code: 'async/await', top: '75%', left: '15%', delay: 4 },
    { code: 'useEffect(() => {})', top: '35%', left: '90%', delay: 5 },
    { code: 'export default', top: '55%', left: '12%', delay: 1.5 },
    { code: 'interface Props {}', top: '70%', left: '75%', delay: 2.5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {codeBlocks.map((block, index) => {
        const duration = 6 + Math.random() * 4;
        return (
          <div
            key={index}
            className="absolute text-primary/60 font-mono text-sm px-3 py-2 bg-primary/10 border border-primary/20 rounded"
            style={{
              top: block.top,
              left: block.left,
              animationName: 'float',
              animationDuration: `${duration}s`,
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDelay: `${block.delay}s`,
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              fontWeight: 500,
            }}
          >
            {block.code}
          </div>
        );
      })}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-15px) translateX(5px); }
        }
      `}</style>
    </div>
  );
}

// Glowing circuit lines
function CircuitLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Horizontal lines */}
        <line x1="0" y1="20%" x2="100%" y2="20%" stroke="#0CE421" strokeWidth="1.5" className="animate-pulse" />
        <line x1="0" y1="40%" x2="100%" y2="40%" stroke="#0CE421" strokeWidth="1.5" className="animate-pulse" style={{ animationDelay: '1s' }} />
        <line x1="0" y1="60%" x2="100%" y2="60%" stroke="#0CE421" strokeWidth="1.5" className="animate-pulse" style={{ animationDelay: '2s' }} />
        <line x1="0" y1="80%" x2="100%" y2="80%" stroke="#0CE421" strokeWidth="1.5" className="animate-pulse" style={{ animationDelay: '3s' }} />
        
        {/* Vertical lines */}
        <line x1="20%" y1="0" x2="20%" y2="100%" stroke="#0CE421" strokeWidth="1.5" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#0CE421" strokeWidth="1.5" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
        <line x1="80%" y1="0" x2="80%" y2="100%" stroke="#0CE421" strokeWidth="1.5" className="animate-pulse" style={{ animationDelay: '2.5s' }} />
        
        {/* Circuit nodes */}
        <circle cx="20%" cy="20%" r="4" fill="#0CE421" className="animate-ping" />
        <circle cx="50%" cy="40%" r="4" fill="#0CE421" className="animate-ping" style={{ animationDelay: '1s' }} />
        <circle cx="80%" cy="60%" r="4" fill="#0CE421" className="animate-ping" style={{ animationDelay: '2s' }} />
        <circle cx="20%" cy="80%" r="4" fill="#0CE421" className="animate-ping" style={{ animationDelay: '3s' }} />
      </svg>
    </div>
  );
}

// Animated brackets
function AnimatedBrackets() {
  const brackets = [
    { char: '{', top: '10%', left: '5%', delay: 0 },
    { char: '}', top: '10%', right: '5%', delay: 0.5 },
    { char: '[', top: '90%', left: '10%', delay: 1 },
    { char: ']', top: '90%', right: '10%', delay: 1.5 },
    { char: '<', top: '50%', left: '3%', delay: 2 },
    { char: '>', top: '50%', right: '3%', delay: 2.5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {brackets.map((bracket, index) => (
        <div
          key={index}
          className="absolute text-primary/40 font-mono text-6xl"
          style={{
            top: bracket.top,
            left: bracket.left,
            right: bracket.right as any,
            animationName: 'pulse',
            animationDuration: '3s',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationDelay: `${bracket.delay}s`,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            fontWeight: 700,
          }}
        >
          {bracket.char}
        </div>
      ))}
    </div>
  );
}

// Code typing effect in corner
function LiveCodeTyping() {
  const [code, setCode] = useState('');
  const fullCode = `function buildFuture() {
  const innovation = true;
  return <Success />;
}`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullCode.length) {
        setCode(fullCode.slice(0, index));
        index++;
      } else {
        setTimeout(() => {
          index = 0;
          setCode('');
        }, 2000);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-20 left-10 w-80 bg-black/30 border border-primary/20 rounded-lg p-4 font-mono text-sm text-primary/70 hidden lg:block pointer-events-none">
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-primary/20">
        <div className="w-2 h-2 rounded-full bg-red-500/70" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
        <div className="w-2 h-2 rounded-full bg-green-500/70" />
        <span className="text-primary/50 ml-2" style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}>app.tsx</span>
      </div>
      <pre className="whitespace-pre-wrap" style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale', fontWeight: 500 }}>{code}<span className="animate-pulse">|</span></pre>
    </div>
  );
}

// Particle network
function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;

      ctx.fillStyle = 'rgba(33, 33, 33, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(12, 228, 33, 0.3)';
        ctx.fill();

        // Draw connections
        particles.forEach((otherParticle, j) => {
          if (i !== j) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(12, 228, 33, ${0.1 * (1 - distance / 150)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-40 pointer-events-none"
      style={{ 
        imageRendering: 'crisp-edges'
      }}
    />
  );
}

// Main component that combines all effects
export function EnhancedCodingEffects() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <ParticleNetwork />
      {/* Hide coding tags on mobile, show on desktop */}
      <div className="hidden md:block">
        <FloatingCodeBlocks />
      </div>
      <LiveCodeTyping />
    </div>
  );
}
