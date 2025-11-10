import React, { useState, useEffect } from 'react';

export function CodeTerminal() {
  const [currentLine, setCurrentLine] = useState(0);
  
  const codeLines = [
    '$ npm install nexus-core',
    '> Building amazing software...',
    '✓ Dependencies installed',
    '$ npm run dev',
    '> Starting development server...',
    '✓ Server running on localhost:3000',
    '> Compiling...',
    '✓ Compiled successfully!',
    '> Hot reload enabled',
    '✓ Ready for development',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % codeLines.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-20 right-10 w-96 bg-black/40 border border-primary/30 rounded-lg shadow-2xl overflow-hidden opacity-40 hover:opacity-70 transition-opacity duration-500 hidden lg:block">
      {/* Terminal header */}
      <div className="bg-primary/15 px-4 py-2 flex items-center gap-2 border-b border-primary/30">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <span className="text-sm text-primary/80 font-mono ml-2" style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}>terminal</span>
      </div>
      
      {/* Terminal content */}
      <div className="p-4 font-mono text-sm space-y-2 h-48 overflow-hidden">
        {codeLines.map((line, index) => (
          <div
            key={index}
            className={`transition-all duration-500 ${
              index <= currentLine 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionDelay: `${(index - currentLine) * 100}ms`,
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              fontWeight: 500,
            }}
          >
            <span className={`${
              line.startsWith('$') 
                ? 'text-primary' 
                : line.startsWith('>') 
                ? 'text-blue-400' 
                : 'text-green-400'
            }`}>
              {line}
            </span>
            {index === currentLine && (
              <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
