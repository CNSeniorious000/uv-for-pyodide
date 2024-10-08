import extractorSvelte from "@unocss/extractor-svelte";
import { defineConfig, presetIcons, presetTypography, presetUno, presetWebFonts, transformerDirectives, transformerVariantGroup } from "unocss";

const config = defineConfig({
  extractors: [extractorSvelte()],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  presets: [presetUno(), presetWebFonts({ provider: "bunny", fonts: { mono: { name: "JetBrains Mono Variable", provider: "none" } } }), presetIcons(), presetTypography()],
});

export default config;
