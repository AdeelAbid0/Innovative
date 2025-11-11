export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Clean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#212121] via-[#212121] to-[#212121]" />
    </div>
  );
}
