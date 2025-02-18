import type { HighlighterCore } from "shiki/core";

import json from "@shikijs/langs/json";
import toml from "@shikijs/langs/toml";
import vesper from "@shikijs/themes/vesper";
import { createHighlighterCore } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";
import getWasmInstance from "shiki/wasm";

let instance: HighlighterCore;

export async function getHighlighter() {
  if (!instance) {
    instance = await createHighlighterCore({
      themes: [vesper],
      langs: [json, toml],
      engine: createOnigurumaEngine(getWasmInstance),
    });
  }
  return instance;
}
