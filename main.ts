// One Line, One Laugh — make.fun bounty entry.
//
// Writes one funny line of text to entry.txt. The line is fixed and
// deterministic: the same bytes on every run, no clock, no randomness,
// no network, no input read.
//
// The joke: a smoke alarm that only ever sounds while its owner cooks
// stops being a safety device and becomes a restaurant critic — the
// punchline reframes the alarm in one beat, and the image (an alarm
// judging dinner) is specific, visual, and needs no setup.
//
// Run with Node 22.18+ (it runs this TypeScript as-is):
//   node main.ts
// The program writes entry.txt into $MAKEFUN_OUTPUT_DIR, or /output
// when that variable is unset.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line is built from its two beats: the setup (an alarm that
// only ever sounds over dinner) and the punchline (it is not warning
// anyone about fire any more — it is reviewing the cooking).
const SETUP = "My smoke alarm goes off every time I cook.";
const PUNCHLINE =
  "At this point it's less a fire alarm and more a food critic.";

function buildLine(): string {
  return `${SETUP} ${PUNCHLINE}`;
}

function main(): void {
  const line = buildLine();
  // Gate first, write second: the sealed scorer only accepts UTF-8
  // text of 1-200 characters, so refuse to write anything outside it.
  if (line.length < 1 || line.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${line.length}`);
  }
  if (line.trim().length === 0 || line.includes("\n")) {
    throw new Error("line must be a single non-blank line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), line, "utf8");
  console.log(`wrote entry.txt (${line.length} chars): ${line}`);
}

main();
