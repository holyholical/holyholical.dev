import { ICON_PALETTE, ICON_SIZE, ICONS, spriteToRects, type IconName } from "@/lib/icons";

interface PixelIconProps {
  name: IconName;
  /** Rendered size in px. Multiples of 10 keep the pixels even. */
  size?: number;
  className?: string;
}

/** A 10x10 pixel icon rendered as crisp SVG rects. Decorative: the label next to it carries meaning. */
export default function PixelIcon({ name, size = 20, className }: PixelIconProps) {
  const rects = spriteToRects(ICONS[name], ICON_PALETTE);
  return (
    <svg
      className={className}
      viewBox={`0 0 ${ICON_SIZE} ${ICON_SIZE}`}
      width={size}
      height={size}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      {rects.map((rect) => (
        <rect key={`${rect.x}-${rect.y}`} x={rect.x} y={rect.y} width={1} height={1} fill={rect.fill} />
      ))}
    </svg>
  );
}
