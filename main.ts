import { copyFileSync, readFileSync } from "node:fs";

// The entry is a single image: a newspaper front page summing up
// Friday 13 November 2026 — Ukraine's 1,200-drone night, the FAA ground
// stop, Iranian drones off Bahrain, Nvidia's chief resigning, and the
// Microsoft outage on day two. Copy it byte-for-byte to the output dir.
const out = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const src = new URL("./entry.png", import.meta.url);
const buf = readFileSync(src);
const isPng =
  buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
const isJpg = buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
if (!isPng && !isJpg) throw new Error("entry.png is not a PNG or JPEG");
copyFileSync(src, `${out}/entry.png`);
