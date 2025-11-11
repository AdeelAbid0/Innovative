import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    document.addEventListener("mousemove", updatePosition);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Main Cursor */}
      <div
        className={`cursor ${isClicking ? "scale-75" : ""} ${
          isHovering ? "scale-150" : ""
        }`}
        style={{
          left: position.x - 10,
          top: position.y - 10,
          background: isHovering
            ? "rgba(228, 174, 12, 1)"
            : "rgba(228, 174, 12, 0.8)",
          transform: `translate(0, 0) scale(${
            isClicking ? 0.8 : isHovering ? 1.5 : 1
          })`,
        }}
      />

      {/* Cursor Follower */}
      <div
        className="cursor-follower"
        style={{
          left: position.x - 20,
          top: position.y - 20,
          borderColor: isHovering
            ? "rgba(228, 174, 12, 0.6)"
            : "rgba(228, 174, 12, 0.3)",
          transform: `translate(0, 0) scale(${isHovering ? 1.2 : 1})`,
        }}
      />
    </>
  );
}
