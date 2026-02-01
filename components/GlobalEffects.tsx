"use client";
import React, { useEffect, useState } from "react";

export const GlobalEffects = () => {
  const [drops, setDrops] = useState<
    { id: number; left: number; speed: number; opacity: number }[]
  >([]);
  const [ripples, setRipples] = useState<
    { x: number; y: number; id: number }[]
  >([]);
  const [idCounter, setIdCounter] = useState(0);

  // Handle click ripples
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const x = e.pageX;
      const y = e.pageY;
      const id = idCounter;
      setIdCounter(id + 1);
      setRipples((prev) => [...prev, { x, y, id }]);
      setTimeout(
        () => setRipples((current) => current.filter((r) => r.id !== id)),
        400,
      );
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [idCounter]);

  // Rain drops logic
  useEffect(() => {
    let dropIdCounter = 0; // local variable, not state

    const createDrop = () => {
      const id = dropIdCounter++;
      return {
        id,
        left: Math.random() * 100,
        speed: 0.5 + Math.random() * 0.5,
        opacity: 0.2 + Math.random() * 0.3,
      };
    };

    let animationFrameId: number;
    const animate = () => {
      setDrops((prev) => {
        const newDrop = createDrop();
        const updatedDrops = [...prev, newDrop];
        if (updatedDrops.length > 200) updatedDrops.shift();
        return updatedDrops;
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []); // empty dependency array — runs once

  return (
    <>
      {/* Rain Drops */}
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="absolute bg-white rounded pointer-events-none"
          style={{
            left: `${drop.left}%`,
            top: "-10px",
            width: "2px",
            height: "10px",
            opacity: drop.opacity,
            animation: `fall linear ${0.5 + drop.speed}s forwards`,
          }}
          onAnimationEnd={() =>
            setDrops((current) => current.filter((d) => d.id !== drop.id))
          }
        />
      ))}

      {/* Click Ripples */}
      {ripples.map((r) => (
        <span
          key={r.id}
          style={{
            position: "absolute",
            left: r.x,
            top: r.y,
            width: 10,
            height: 10,
            backgroundColor: "rgba(255,255,255,0.3)",
            borderRadius: "50%",
            transform: "translate(-50%, -50%) scale(0)",
            pointerEvents: "none",
            animation: "ripple 400ms ease-out forwards",
            zIndex: 9999,
          }}
        />
      ))}

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.5;
          }
          100% {
            transform: translate(-50%, -50%) scale(8);
            opacity: 0;
          }
        }

        @keyframes fall {
          0% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </>
  );
};
