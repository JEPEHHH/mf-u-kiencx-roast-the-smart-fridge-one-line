// Roast-the-Smart-Fridge entry point.
// Writes exactly one short line to <output dir>/entry.txt.
// No installs, no network, no secrets, no randomness: same bytes every run.

import * as fs from "node:fs";
import * as path from "node:path";

// The entry itself: a roast of the fridge I actually live with.
// One line, well under the 160-character ceiling, with the sting last.
const ENTRY_LINE =
  "My fridge asked if I wanted the door left open a little longer, so I told it yes and now it's updating its firmware to feel guilty.";

const DEFAULT_OUTPUT_DIR = "/output";
const ARTIFACT_NAME = "entry.txt";

// Where the harness wants the artifact. An explicit env override wins.
function resolveOutputDir(): string {
  const candidate = process.env["MAKEFUN_OUTPUT_DIR"];
  if (candidate !== undefined && candidate.trim() !== "") {
    return path.resolve(candidate.trim());
  }
  return DEFAULT_OUTPUT_DIR;
}

class InvalidEntryError extends Error {
  constructor(reason: string) {
    super("entry rejected by local gate: " + reason);
    this.name = "InvalidEntryError";
  }
}

// Mirror the gate before writing: UTF-8 text, 1..160 chars, non-blank, one line.
function assertValidEntry(line: string): void {
  const size = line.length;
  if (size < 1 || size > 160) {
    throw new InvalidEntryError(`length ${size} is outside 1..160`);
  }
  if (line.trim().length === 0) {
    throw new InvalidEntryError("only whitespace");
  }
  if (/[\r\n\u2028\u2029]/.test(line)) {
    throw new InvalidEntryError("more than one line");
  }
}

// Create the directory if needed, then write the artifact as UTF-8.
function writeArtifact(line: string, directory: string): string {
  fs.mkdirSync(directory, { recursive: true });
  const target = path.join(directory, ARTIFACT_NAME);
  fs.writeFileSync(target, line, "utf8");
  return target;
}

function run(): void {
  assertValidEntry(ENTRY_LINE);
  const written = writeArtifact(ENTRY_LINE, resolveOutputDir());
  process.stdout.write(`wrote ${written} (${Buffer.byteLength(ENTRY_LINE, "utf8")} bytes)\n`);
}

run();
