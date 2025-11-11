export function DataStream() {
  // Generate random hex-like data
  const generateData = () => {
    const chars = "0123456789ABCDEF";
    let result = "";
    for (let i = 0; i < 100; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
      if ((i + 1) % 2 === 0) result += " ";
    }
    return result;
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15">
      {/* Top data stream */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-primary/30 to-transparent">
        <div
          className="text-primary text-sm font-mono whitespace-nowrap overflow-hidden animate-marquee"
          style={{
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            fontWeight: 600,
          }}
        >
          {generateData()}
        </div>
      </div>

      {/* Bottom data stream */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-primary/30 to-transparent">
        <div
          className="text-primary text-sm font-mono whitespace-nowrap overflow-hidden animate-marquee-reverse"
          style={{
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            fontWeight: 600,
          }}
        >
          {generateData()}
        </div>
      </div>

      {/* Vertical streams on sides */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-primary/15 to-transparent writing-mode-vertical">
        <div
          className="text-primary text-sm font-mono whitespace-nowrap animate-marquee-vertical"
          style={{
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            fontWeight: 600,
          }}
        >
          {generateData().substring(0, 50)}
        </div>
      </div>

      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-primary/15 to-transparent">
        <div
          className="text-primary text-sm font-mono whitespace-nowrap animate-marquee-vertical-reverse"
          style={{
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            fontWeight: 600,
          }}
        >
          {generateData().substring(0, 50)}
        </div>
      </div>
    </div>
  );
}
