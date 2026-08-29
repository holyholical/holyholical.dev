/**
 * Two-color botanical prints for packet fronts. Each print is drawn as a fill layer
 * in the packet's band color, offset one unit so the print reads as misregistered,
 * with the ink line layer on top. The print is chosen deterministically from the
 * repository name so the same repo always gets the same plant.
 */

type PrintName = "sunflower" | "carrot" | "radish" | "pea" | "tomato" | "marigold" | "bean" | "chili";

const PRINTS: PrintName[] = ["sunflower", "carrot", "radish", "pea", "tomato", "marigold", "bean", "chili"];

export const PLANT_COMMON_NAMES: Record<PrintName, string> = {
  sunflower: "Sunflower",
  carrot: "Carrot",
  radish: "Radish",
  pea: "Garden pea",
  tomato: "Tomato",
  marigold: "Marigold",
  bean: "Runner bean",
  chili: "Chili pepper",
};

/** FNV-1a over the name; spreads short, similar names across the prints far better than a 31-multiplier. */
export function pickPrint(seed: string): PrintName {
  let hash = 0x811c9dc5;
  for (const char of seed.toLowerCase()) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return PRINTS[hash % PRINTS.length];
}

const petalPoints = (count: number, radius: number, cx: number, cy: number) =>
  Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2;
    return { x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius, deg: (angle * 180) / Math.PI };
  });

function Sunflower({ layer }: { layer: "fill" | "line" }) {
  const petals = petalPoints(14, 30, 60, 50);
  if (layer === "fill") {
    return (
      <g>
        {petals.map((p, i) => (
          <ellipse key={i} cx={p.x} cy={p.y} rx="7" ry="13" transform={`rotate(${p.deg + 90} ${p.x} ${p.y})`} />
        ))}
        <path d="M60 78 C58 100 62 118 60 138 L66 138 C64 118 68 100 66 78 Z" />
      </g>
    );
  }
  return (
    <g fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {petals.map((p, i) => (
        <ellipse key={i} cx={p.x} cy={p.y} rx="7" ry="13" transform={`rotate(${p.deg + 90} ${p.x} ${p.y})`} />
      ))}
      <circle cx="60" cy="50" r="19" />
      <path d="M48 42 L72 58 M52 62 L70 40 M46 52 L74 48 M58 33 L62 67" strokeWidth="1.4" />
      <path d="M60 78 C59 100 61 118 60 138" strokeWidth="2.6" />
      <path d="M60 104 C46 100 38 106 34 118 C46 120 56 114 60 104 Z" />
      <path d="M60 116 C72 110 82 114 86 126 C74 128 64 124 60 116 Z" />
    </g>
  );
}

function Carrot({ layer }: { layer: "fill" | "line" }) {
  if (layer === "fill") {
    return (
      <g>
        <path d="M44 48 C40 80 52 112 60 134 C68 112 80 80 76 48 Z" />
        <path d="M60 48 C50 30 40 20 30 14 M60 48 C58 26 62 16 66 6 M60 48 C70 30 82 22 92 16" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" opacity="0.9" />
      </g>
    );
  }
  return (
    <g fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M44 48 C40 80 52 112 60 134 C68 112 80 80 76 48 Z" />
      <path d="M46 62 L58 60 M48 78 L66 74 M52 94 L70 90 M56 110 L66 108" strokeWidth="1.6" />
      <path d="M60 48 C50 30 40 20 30 14 M60 48 C58 26 62 16 66 6 M60 48 C70 30 82 22 92 16" />
      <path d="M30 14 C34 22 36 26 44 30 M66 6 C62 14 62 20 66 28 M92 16 C86 24 80 26 74 32" strokeWidth="1.6" />
    </g>
  );
}

function Radish({ layer }: { layer: "fill" | "line" }) {
  if (layer === "fill") {
    return (
      <g>
        <circle cx="60" cy="86" r="30" />
        <path d="M60 116 C58 124 60 132 62 140" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </g>
    );
  }
  return (
    <g fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="60" cy="86" r="30" />
      <path d="M60 116 C58 124 60 132 62 140" />
      <path d="M40 74 C46 66 54 62 60 60 C66 62 74 66 80 74" strokeWidth="1.6" />
      <path d="M60 58 C48 44 38 38 30 40 C36 52 46 56 60 58 Z" />
      <path d="M60 58 C64 40 60 26 56 12 C68 22 70 40 60 58 Z" />
      <path d="M60 58 C72 44 84 40 92 42 C84 54 74 58 60 58 Z" />
    </g>
  );
}

function Pea({ layer }: { layer: "fill" | "line" }) {
  if (layer === "fill") {
    return (
      <g>
        <path d="M30 40 C44 34 84 44 96 84 C88 100 62 104 44 90 C30 78 24 56 30 40 Z" />
      </g>
    );
  }
  return (
    <g fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M30 40 C44 34 84 44 96 84 C88 100 62 104 44 90 C30 78 24 56 30 40 Z" />
      <circle cx="44" cy="56" r="8" />
      <circle cx="60" cy="66" r="8" />
      <circle cx="76" cy="78" r="8" />
      <path d="M30 40 C24 28 26 18 34 10" />
      <path d="M96 84 C104 96 108 110 100 124 C96 116 100 104 92 100" strokeWidth="1.6" />
      <path d="M34 10 C30 6 24 8 22 14 C24 20 30 20 34 16" strokeWidth="1.6" />
    </g>
  );
}

function Tomato({ layer }: { layer: "fill" | "line" }) {
  if (layer === "fill") {
    return (
      <g>
        <path d="M60 46 C36 46 24 62 26 84 C28 108 44 122 60 122 C76 122 92 108 94 84 C96 62 84 46 60 46 Z" />
      </g>
    );
  }
  return (
    <g fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M60 46 C36 46 24 62 26 84 C28 108 44 122 60 122 C76 122 92 108 94 84 C96 62 84 46 60 46 Z" />
      <path d="M60 46 C48 52 44 58 40 66 M60 46 C72 52 76 58 80 66 M60 46 C58 60 56 72 56 84" strokeWidth="1.4" />
      <path d="M60 46 L52 32 L58 40 L60 24 L62 40 L68 32 L60 46 Z" />
      <path d="M46 40 C50 44 54 46 60 46 M74 40 C70 44 66 46 60 46" strokeWidth="1.6" />
      <path d="M40 74 C38 84 40 96 46 104" strokeWidth="1.4" />
    </g>
  );
}

function Marigold({ layer }: { layer: "fill" | "line" }) {
  const outer = petalPoints(12, 26, 60, 54);
  const inner = petalPoints(8, 14, 60, 54);
  if (layer === "fill") {
    return (
      <g>
        {outer.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="12" />
        ))}
        <path d="M60 86 C58 104 62 120 60 138 L66 138 C64 120 68 104 66 86 Z" />
      </g>
    );
  }
  return (
    <g fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {outer.map((p, i) => (
        <circle key={`o${i}`} cx={p.x} cy={p.y} r="12" />
      ))}
      {inner.map((p, i) => (
        <circle key={`i${i}`} cx={p.x} cy={p.y} r="8" strokeWidth="1.6" />
      ))}
      <circle cx="60" cy="54" r="5" />
      <path d="M60 86 C59 104 61 120 60 138" strokeWidth="2.6" />
      <path d="M60 110 C48 104 38 108 32 118 C44 122 54 118 60 110 Z" />
      <path d="M60 122 C72 116 82 120 88 130 C76 134 66 130 60 122 Z" />
    </g>
  );
}


function Bean({ layer }: { layer: "fill" | "line" }) {
  if (layer === "fill") {
    return (
      <g>
        <path d="M36 118 C30 100 44 92 54 96 C66 100 70 112 62 124 C54 132 40 130 36 118 Z" />
        <path d="M60 60 C72 44 92 44 98 58 C88 58 80 64 74 74 C66 70 60 66 60 60 Z" />
        <path d="M60 60 C48 44 28 44 22 58 C32 58 40 64 46 74 C54 70 60 66 60 60 Z" />
      </g>
    );
  }
  return (
    <g fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M36 118 C30 100 44 92 54 96 C66 100 70 112 62 124 C54 132 40 130 36 118 Z" />
      <path d="M44 104 C46 110 52 116 58 118" strokeWidth="1.4" />
      <path d="M52 96 C50 84 54 72 60 60" />
      <path d="M60 60 C72 44 92 44 98 58 C88 58 80 64 74 74 C66 70 60 66 60 60 Z" />
      <path d="M60 60 C48 44 28 44 22 58 C32 58 40 64 46 74 C54 70 60 66 60 60 Z" />
      <path d="M60 60 C62 44 58 30 66 18 C70 24 66 32 70 36" strokeWidth="1.6" />
    </g>
  );
}

function Chili({ layer }: { layer: "fill" | "line" }) {
  if (layer === "fill") {
    return (
      <g>
        <path d="M46 36 C36 48 34 72 44 96 C52 114 66 126 84 132 C78 120 72 104 70 88 C68 70 62 50 46 36 Z" />
      </g>
    );
  }
  return (
    <g fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M46 36 C36 48 34 72 44 96 C52 114 66 126 84 132 C78 120 72 104 70 88 C68 70 62 50 46 36 Z" />
      <path d="M50 52 C46 68 48 84 56 100" strokeWidth="1.4" />
      <path d="M46 36 C40 30 40 24 44 18 M46 36 C52 30 60 30 66 34 M46 36 C38 36 34 40 32 46" />
      <path d="M44 18 C48 12 54 12 58 16" strokeWidth="1.6" />
    </g>
  );
}

const COMPONENTS: Record<PrintName, (props: { layer: "fill" | "line" }) => React.JSX.Element> = {
  sunflower: Sunflower,
  carrot: Carrot,
  radish: Radish,
  pea: Pea,
  tomato: Tomato,
  marigold: Marigold,
  bean: Bean,
  chili: Chili,
};

export default function PlantPrint({ name, bandColor }: { name: PrintName; bandColor: string }) {
  const Print = COMPONENTS[name];
  return (
    <svg className="print" viewBox="0 0 120 144" role="img" aria-label={`${PLANT_COMMON_NAMES[name]} print`}>
      <g className="print__fill" fill={bandColor} transform="translate(1.5 1.5)">
        <Print layer="fill" />
      </g>
      <g className="print__line" stroke="currentColor">
        <Print layer="line" />
      </g>
    </svg>
  );
}
