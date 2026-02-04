"use client";

import { useEffect, useRef } from "react";

interface OnekoOptions {
  src?: string;
  speed?: number;
  spriteSize?: number;
  x?: number;
  y?: number;
  xOffset?: number;
  yOffset?: number;
}

type OnekoState =
  | "idle"
  | "alert"
  | "moving"
  | "scratchSelf"
  | "scratchWallN"
  | "scratchWallS"
  | "scratchWallE"
  | "scratchWallW"
  | "tired"
  | "sleeping";

export default function Oneko({
  src = "/holyholical.dev/oneko.gif",
  speed = 3,
  spriteSize = 32,
  x: initialX = 32,
  y: initialY = 32,
  xOffset = 32,
  yOffset = 32,
}: OnekoOptions = {}) {
  const divRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: initialX + xOffset, y: initialY + yOffset });

  const stateRef = useRef<OnekoState>("idle");
  const xRef = useRef(initialX);
  const yRef = useRef(initialY);
  const targetXRef = useRef(initialX);
  const targetYRef = useRef(initialY);

  const frameCountRef = useRef(0);
  const idleTimeRef = useRef(0);
  const alertTimeRef = useRef(0);

  const directionMap = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"] as const;

  const spriteSets: Record<string, [number, number][]> = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratchSelf: [
      [-5, 0],
      [-6, 0],
      [-7, 0],
    ],
    scratchWallN: [
      [0, 0],
      [0, -1],
    ],
    scratchWallS: [
      [-7, -1],
      [-6, -2],
    ],
    scratchWallE: [
      [-2, -2],
      [-2, -3],
    ],
    scratchWallW: [
      [-4, 0],
      [-4, -1],
    ],
    tired: [[-3, -2]],
    sleeping: [
      [-2, 0],
      [-2, -1],
    ],
    N: [
      [-1, -2],
      [-1, -3],
    ],
    NE: [
      [0, -2],
      [0, -3],
    ],
    E: [
      [-3, 0],
      [-3, -1],
    ],
    SE: [
      [-5, -1],
      [-5, -2],
    ],
    S: [
      [-6, -3],
      [-7, -2],
    ],
    SW: [
      [-5, -3],
      [-6, -1],
    ],
    W: [
      [-4, -2],
      [-4, -3],
    ],
    NW: [
      [-1, 0],
      [-1, -1],
    ],
  };

  const getFrames = (key: string): [number, number][] =>
    spriteSets[key] ?? spriteSets.idle;

  useEffect(() => {
    const el = divRef.current;
    if (!el) return;

    Object.assign(el.style, {
      width: `${spriteSize}px`,
      height: `${spriteSize}px`,
      position: "fixed",
      pointerEvents: "none",
      backgroundImage: `url('${src}')`,
      imageRendering: "pixelated",
      zIndex: "9999",
      left: `${xRef.current}px`,
      top: `${yRef.current}px`,
    });

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    const loop = () => {
      const targetX = mouseRef.current.x - xOffset;
      const targetY = mouseRef.current.y - yOffset;

      const dx = targetX - xRef.current;
      const dy = targetY - yRef.current;
      const distance = Math.hypot(dx, dy);

      targetXRef.current = targetX;
      targetYRef.current = targetY;

      if (distance > speed) {
        // Moving logic
        if (
          [
            "idle",
            "sleeping",
            "scratchSelf",
            "tired",
            "scratchWallN",
            "scratchWallS",
            "scratchWallE",
            "scratchWallW",
          ].includes(stateRef.current)
        ) {
          stateRef.current = "alert";
          alertTimeRef.current = 0;
        } else if (stateRef.current === "alert") {
          alertTimeRef.current++;
          if (alertTimeRef.current > 20) {
            stateRef.current = "moving";
          }
        } else {
          stateRef.current = "moving";
          xRef.current += (dx / distance) * speed;
          yRef.current += (dy / distance) * speed;
          frameCountRef.current++;
        }
      } else {
        // Idle behavior
        if (["moving", "alert"].includes(stateRef.current)) {
          stateRef.current = "idle";
          idleTimeRef.current = 0;
        } else {
          idleTimeRef.current++;

          if (stateRef.current === "idle" && idleTimeRef.current > 10) {
            const rand = Math.random();
            if (xRef.current < 16 && rand < 0.01) {
              stateRef.current = "scratchWallW";
              idleTimeRef.current = 0;
            } else if (xRef.current > window.innerWidth - 48 && rand < 0.01) {
              stateRef.current = "scratchWallE";
              idleTimeRef.current = 0;
            } else if (yRef.current < 16 && rand < 0.01) {
              stateRef.current = "scratchWallN";
              idleTimeRef.current = 0;
            } else if (yRef.current > window.innerHeight - 48 && rand < 0.01) {
              stateRef.current = "scratchWallS";
              idleTimeRef.current = 0;
            } else if (rand < 0.01) {
              stateRef.current = "scratchSelf";
              idleTimeRef.current = 0;
            } else if (rand < 0.005) {
              stateRef.current = "tired";
              idleTimeRef.current = 0;
            }
          }

          if (
            [
              "scratchWallN",
              "scratchWallS",
              "scratchWallE",
              "scratchWallW",
              "scratchSelf",
            ].includes(stateRef.current) &&
            idleTimeRef.current > 40
          ) {
            stateRef.current = "idle";
            idleTimeRef.current = 0;
          }

          if (stateRef.current === "tired" && idleTimeRef.current > 50) {
            stateRef.current = "sleeping";
          }
        }
      }


      if (el) {
        el.style.left = `${xRef.current}px`;
        el.style.top = `${yRef.current}px`;

        let offset: [number, number] = [0, 0];

        switch (stateRef.current) {
          case "moving": {
            const dx = targetXRef.current - xRef.current;
            const dy = targetYRef.current - yRef.current;
            const angle = Math.atan2(dy, dx);
            let dirIdx = Math.round(angle / (Math.PI / 4) + 2) % 8;
            if (dirIdx < 0) dirIdx += 8;
            const dirKey = directionMap[dirIdx];
            const frames = getFrames(dirKey);
            const idx = Math.floor(frameCountRef.current / 5) % frames.length;
            offset = frames[idx];
            break;
          }

          case "alert":
            offset = spriteSets.alert[0];
            break;

          case "scratchSelf": {
            const frames = spriteSets.scratchSelf;
            const idx = Math.floor(frameCountRef.current / 4) % frames.length;
            offset = frames[idx];
            break;
          }

          case "scratchWallN":
          case "scratchWallS":
          case "scratchWallE":
          case "scratchWallW": {
            const frames = spriteSets[stateRef.current];
            const idx = Math.floor(frameCountRef.current / 4) % frames.length;
            offset = frames[idx];
            break;
          }

          case "tired":
            offset = spriteSets.tired[0];
            break;

          case "sleeping": {
            const frames = spriteSets.sleeping;
            const idx = Math.floor(frameCountRef.current / 30) % frames.length;
            offset = frames[idx];
            break;
          }

          case "idle":
          default:
            offset = spriteSets.idle[0];
            break;
        }

        el.style.backgroundPosition = `${offset[0] * 32}px ${offset[1] * 32}px`;
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [src, speed, spriteSize, xOffset, yOffset]);

  return <div ref={divRef} />;
}
