"""
Build the trimmed Archivo variable font used by the site.

The full Archivo latin variable font (from @fontsource-variable/archivo) covers
weights 100–900 and widths 62–125%. The site only uses weights 300–750 and widths
100–115%, so we restrict the axes and subset to the characters we need.

Usage (requires `pip install fonttools brotli`):
    python3 scripts/subset-font.py
"""
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2"
OUT = ROOT / "src/assets/fonts/archivo-variable-subset.woff2"

# Basic Latin, Latin-1 Supplement, dashes, quotes, bullet, ellipsis, ₹, ×, arrows used in text.
UNICODES = (
    list(range(0x20, 0x7F))
    + list(range(0xA0, 0x100))
    + [0x2013, 0x2014, 0x2018, 0x2019, 0x201C, 0x201D, 0x2022, 0x2026, 0x20B9, 0x2192, 0x2190]
)

font = TTFont(SRC)
font = instancer.instantiateVariableFont(font, {"wght": (300, 750), "wdth": (100, 115)})

options = subset.Options()
options.layout_features = ["*"]
options.flavor = "woff2"
options.name_IDs = ["*"]
options.notdef_outline = True
subsetter = subset.Subsetter(options)
subsetter.populate(unicodes=UNICODES)
subsetter.subset(font)

OUT.parent.mkdir(parents=True, exist_ok=True)
font.flavor = "woff2"
font.save(OUT)
print(f"{SRC.stat().st_size // 1024} KB -> {OUT.stat().st_size // 1024} KB  ({OUT.relative_to(ROOT)})")
