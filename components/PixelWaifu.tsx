import { applyPatches, EXPRESSIONS, SPRITE_HEIGHT, SPRITE_WIDTH, spriteToRects, WAIFU_BASE, type Expression, type Waifu } from "@/lib/sprites";

interface PixelWaifuProps {
  waifu: Waifu;
  expression?: Expression;
  /** Pixels per sprite cell. */
  scale?: number;
  className?: string;
}

/** Renders a waifu sprite as crisp SVG rects, one per pixel. */
export default function PixelWaifu({ waifu, expression = "normal", scale = 4, className }: PixelWaifuProps) {
  const rects = spriteToRects(applyPatches(WAIFU_BASE, EXPRESSIONS[expression]), waifu.palette);
  return (
    <svg
      className={className}
      viewBox={`0 0 ${SPRITE_WIDTH} ${SPRITE_HEIGHT}`}
      width={SPRITE_WIDTH * scale}
      height={SPRITE_HEIGHT * scale}
      shapeRendering="crispEdges"
      role="img"
      aria-label={`${waifu.name}, ${expression}`}
    >
      {rects.map((rect) => (
        <rect key={`${rect.x}-${rect.y}`} x={rect.x} y={rect.y} width={1} height={1} fill={rect.fill} />
      ))}
    </svg>
  );
}
