#!/usr/bin/env python3
"""Generate the PWA icon set for the Organizador app.

Pure stdlib: shapes are sampled with 4x4 supersampling and written out as
PNG by hand, so the icons can be regenerated anywhere without extra deps.

    python3 scripts/generate-icons.py
"""

import math
import os
import struct
import zlib

OUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "app", "icons")

BG_TOP = (11, 14, 20)
BG_BOTTOM = (22, 33, 58)
ACCENT = (56, 189, 248)
INK = (226, 232, 240)
MUTED = (100, 116, 139)
WHITE = (255, 255, 255)

SUPERSAMPLE = 4


def rounded_rect(px, py, x, y, w, h, r):
    """True when the point falls inside a rounded rectangle."""
    r = min(r, w / 2, h / 2)
    cx = min(max(px, x + r), x + w - r)
    cy = min(max(py, y + r), y + h - r)
    if x <= px <= x + w and y + r <= py <= y + h - r:
        return True
    if x + r <= px <= x + w - r and y <= py <= y + h:
        return True
    return (px - cx) ** 2 + (py - cy) ** 2 <= r * r


def capsule(px, py, x1, y1, x2, y2, r):
    """True when the point falls inside a round-capped line segment."""
    dx, dy = x2 - x1, y2 - y1
    length_sq = dx * dx + dy * dy
    t = 0.0 if length_sq == 0 else max(0.0, min(1.0, ((px - x1) * dx + (py - y1) * dy) / length_sq))
    nx, ny = x1 + t * dx, y1 + t * dy
    return (px - nx) ** 2 + (py - ny) ** 2 <= r * r


def ring(px, py, x, y, w, h, r, stroke):
    return rounded_rect(px, py, x, y, w, h, r) and not rounded_rect(
        px, py, x + stroke, y + stroke, w - 2 * stroke, h - 2 * stroke, max(r - stroke, 0)
    )


def blend(dst, src, alpha):
    return tuple(round(d + (s - d) * alpha) for d, s in zip(dst, src))


def build_layers(size, content_scale):
    """Return the drawing primitives, expressed in pixels for this size."""
    box = size * content_scale
    ox = oy = (size - box) / 2
    u = lambda v: v * box  # noqa: E731 - unit (0..1) of the content box to pixels

    layers = []
    rows = (0.16, 0.46, 0.76)
    for index, top in enumerate(rows):
        cy = oy + u(top) + u(0.12) / 2
        bx, by, bs = ox + u(0.02), oy + u(top), u(0.12)
        radius = bs * 0.3
        if index == 0:
            layers.append(("fill", ACCENT, ("rr", bx, by, bs, bs, radius)))
            layers.append(("fill", WHITE, ("check", bx + bs * 0.24, cy, bx + bs * 0.44, cy + bs * 0.2,
                                           bx + bs * 0.78, cy - bs * 0.24, bs * 0.1)))
        else:
            layers.append(("fill", MUTED, ("ring", bx, by, bs, bs, radius, max(bs * 0.14, 1.0))))
        line_color = MUTED if index == 0 else INK
        line_end = 0.72 if index == 2 else 0.98
        layers.append(("fill", line_color, ("cap", ox + u(0.26), cy, ox + u(line_end), cy, u(0.045))))
    return layers


def covered(layers_shape, px, py):
    kind = layers_shape[0]
    if kind == "rr":
        _, x, y, w, h, r = layers_shape
        return rounded_rect(px, py, x, y, w, h, r)
    if kind == "ring":
        _, x, y, w, h, r, stroke = layers_shape
        return ring(px, py, x, y, w, h, r, stroke)
    if kind == "cap":
        _, x1, y1, x2, y2, r = layers_shape
        return capsule(px, py, x1, y1, x2, y2, r)
    if kind == "check":
        _, x1, y1, x2, y2, x3, y3, r = layers_shape
        return capsule(px, py, x1, y1, x2, y2, r) or capsule(px, py, x2, y2, x3, y3, r)
    raise ValueError(kind)


def render(size, shape="rounded", content_scale=0.62):
    """Render one icon as an RGBA byte buffer.

    shape: "rounded" (transparent corners), "full" (edge to edge, for iOS and
    maskable icons where the platform applies its own mask).
    """
    corner = size * 0.2237 if shape == "rounded" else 0.0
    layers = build_layers(size, content_scale)
    step = 1.0 / SUPERSAMPLE
    offsets = [(i + 0.5) * step for i in range(SUPERSAMPLE)]
    pixels = bytearray()

    for y in range(size):
        row = bytearray()
        for x in range(size):
            samples = []
            for sy in offsets:
                for sx in offsets:
                    px, py = x + sx, y + sy
                    if shape == "rounded" and not rounded_rect(px, py, 0, 0, size, size, corner):
                        samples.append(None)
                        continue
                    ratio = py / size
                    color = tuple(round(a + (b - a) * ratio) for a, b in zip(BG_TOP, BG_BOTTOM))
                    for _, tint, shape_def in layers:
                        if covered(shape_def, px, py):
                            color = tint
                    samples.append(color)
            opaque = [s for s in samples if s is not None]
            alpha = round(255 * len(opaque) / len(samples))
            if not opaque:
                row += bytes((0, 0, 0, 0))
                continue
            avg = tuple(round(sum(c[i] for c in opaque) / len(opaque)) for i in range(3))
            row += bytes((*avg, alpha))
        pixels += b"\x00" + row
    return bytes(pixels)


def write_png(path, size, raw):
    def chunk(tag, data):
        payload = tag + data
        return struct.pack(">I", len(data)) + payload + struct.pack(">I", zlib.crc32(payload) & 0xFFFFFFFF)

    header = struct.pack(">IIBBBBB", size, size, 8, 6, 0, 0, 0)
    png = b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", header) + chunk(b"IDAT", zlib.compress(raw, 9)) + chunk(b"IEND", b"")
    with open(path, "wb") as handle:
        handle.write(png)
    return len(png)


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    targets = [
        ("icon-192.png", 192, "rounded", 0.62),
        ("icon-512.png", 512, "rounded", 0.62),
        ("icon-maskable-512.png", 512, "full", 0.50),
        ("apple-touch-icon.png", 180, "full", 0.62),
    ]
    for name, size, shape, scale in targets:
        path = os.path.join(OUT_DIR, name)
        written = write_png(path, size, render(size, shape, scale))
        print(f"{name:<26} {size}x{size:<5} {written / 1024:6.1f} KB")


if __name__ == "__main__":
    main()
