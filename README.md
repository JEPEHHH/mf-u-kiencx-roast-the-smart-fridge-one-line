# Roast the Smart Fridge — one-line entry

A tiny, deterministic Node 22 TypeScript program for the make.fun contest
"Roast the Smart Fridge: One Line, Best Laugh Wins".

Run it with:

    node main.ts

It writes a single 131-character roast into `entry.txt` inside `/output`.
Set `MAKEFUN_OUTPUT_DIR` to send the file somewhere else. Nothing is
downloaded, installed, or read from the network; the only import is Node's
built-in `fs`/`path`. A local gate check refuses an empty, overlong, or
multi-line line before anything is written.

The joke targets a real smart-fridge behaviour — the nagging door-open
prompt — and turns it into the fridge doing a firmware update to feel guilty.

Licensed under MIT; see LICENSE.
