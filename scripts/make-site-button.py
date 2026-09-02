#!/usr/bin/env python3
"""Draws the shrine's own 88x31 button as a two-frame GIF.

Run from the repo root:  python3 scripts/make-site-button.py
Writes public/buttons/holyholical.gif. Pure pixel maps, same language as lib/icons.ts.
"""

from pathlib import Path

from PIL import Image

WIDTH, HEIGHT = 88, 31
SCALE = 2
FRAME_MS = 600
OUT = Path(__file__).resolve().parent.parent / "public" / "buttons" / "holyholical.gif"

# DESIGN.md palette.
INK = (0x3A, 0x1F, 0x3A)
ROSE = (0xFF, 0xD1, 0xE8)
HOT = (0xFF, 0x2D, 0x95)
PINK = (0xFF, 0x8F, 0xC8)
WHITE = (0xFF, 0xFF, 0xFF)
BEVEL_DARK = (0xB0, 0x6A, 0x9A)
LEMON = (0xFF, 0xF3, 0xA8)
SKY = (0xA2, 0xD2, 0xFF)

# 3x5 lowercase-ish glyphs. "X" is ink, "." is background. Narrow glyphs are narrower.
FONT = {
    "h": ["X..", "X..", "XX.", "X.X", "X.X"],
    "o": ["...", "XXX", "X.X", "X.X", "XXX"],
    "l": ["X", "X", "X", "X", "X"],
    "i": ["X", ".", "X", "X", "X"],
    "y": ["X.X", "X.X", "XXX", "..X", "XXX"],
    "c": ["...", "XXX", "X..", "X..", "XXX"],
    "a": ["XX.", "..X", "XXX", "X.X", "XXX"],
    "d": ["..X", "..X", "XXX", "X.X", "XXX"],
    "e": ["XXX", "X.X", "XXX", "X..", "XXX"],
    "v": ["...", "X.X", "X.X", "X.X", ".X."],
    ".": [".", ".", ".", ".", "X"],
}

HEART = [".X.X.", "XXXXX", "XXXXX", ".XXX.", "..X.."]
STAR = ["..X..", "..X..", "XX.XX", "..X..", "..X.."]


def text_width(text: str) -> int:
    return sum(len(FONT[ch][0]) for ch in text) + (len(text) - 1)


def blit(px, grid, x0, y0, colour, scale=1):
    """Paints a pixel map onto the image with each map cell scaled up."""
    for dy, row in enumerate(grid):
        for dx, cell in enumerate(row):
            if cell != "X":
                continue
            for sy in range(scale):
                for sx in range(scale):
                    px[x0 + dx * scale + sx, y0 + dy * scale + sy] = colour


def draw_text(px, text, x0, y0, colour, scale):
    x = x0
    for ch in text:
        glyph = FONT[ch]
        blit(px, glyph, x, y0, colour, scale)
        x += (len(glyph[0]) + 1) * scale


def base_frame() -> Image.Image:
    img = Image.new("RGB", (WIDTH, HEIGHT), ROSE)
    px = img.load()
    for x in range(WIDTH):
        px[x, 0] = INK
        px[x, HEIGHT - 1] = INK
        px[x, 1] = WHITE
        px[x, HEIGHT - 2] = BEVEL_DARK
    for y in range(HEIGHT):
        px[0, y] = INK
        px[WIDTH - 1, y] = INK
        px[1, y] = WHITE
        px[WIDTH - 2, y] = BEVEL_DARK
    px[1, HEIGHT - 2] = WHITE
    px[WIDTH - 2, 1] = BEVEL_DARK

    name = "holyholical"
    name_x = (WIDTH - text_width(name) * SCALE) // 2
    draw_text(px, name, name_x, 4, INK, SCALE)

    tld = ".dev"
    tld_w = text_width(tld) * SCALE
    heart_w = len(HEART[0]) * SCALE
    gap = 4
    row_w = heart_w + gap + tld_w + gap + heart_w
    x = (WIDTH - row_w) // 2
    blit(px, HEART, x, 16, HOT, SCALE)
    draw_text(px, tld, x + heart_w + gap, 16, INK, SCALE)
    blit(px, HEART, x + heart_w + gap + tld_w + gap, 16, HOT, SCALE)
    return img


def sparkle_frame() -> Image.Image:
    img = base_frame()
    px = img.load()
    blit(px, STAR, 3, 3, LEMON)
    blit(px, STAR, WIDTH - 9, HEIGHT - 9, SKY)
    # Hearts blush a shade lighter on the off-beat.
    for y in range(HEIGHT):
        for x in range(WIDTH):
            if px[x, y] == HOT:
                px[x, y] = PINK
    return img


def main() -> None:
    frames = [base_frame(), sparkle_frame()]
    OUT.parent.mkdir(parents=True, exist_ok=True)
    frames[0].save(
        OUT,
        save_all=True,
        append_images=frames[1:],
        duration=FRAME_MS,
        loop=0,
        optimize=False,
    )
    print(f"wrote {OUT.relative_to(Path.cwd())} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
