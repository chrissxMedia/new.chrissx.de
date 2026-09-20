import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as yaml from "js-yaml";
import { g2mm } from "g2mm";
import { album } from "../src/lib.ts";

const dir = join(
  dirname(fileURLToPath(import.meta.url)),
  "../src/data/albums",
);

const tracks = readdirSync(dir)
  .flatMap(
    (f) => album.parse(yaml.load(readFileSync(join(dir, f), "utf8"))).tracks,
  )
  .filter((t) => t.lyrics);

describe("lyrics", () => {
  for (const t of tracks) {
    it(`${t.isrc} ${t.name}`, () => {
      assert.equal(g2mm(t.lyrics, "genius"), t.lyrics.trim());
    });
  }
});
