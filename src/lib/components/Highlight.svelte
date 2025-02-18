<script module lang="ts">
  interface Props {
    lang: "json" | "toml";
    source: string;
  }
</script>

<script lang="ts">
  import type { HighlighterCore } from "shiki/core";

  import { browser } from "$app/environment";

  const { lang, source }: Props = $props();

  let highlighter = $state<HighlighterCore>();

  async function init() {
    const { getHighlighter } = await import("../highlight");
    highlighter = await getHighlighter();
  }

  browser && init();

  const html = $derived(highlighter?.codeToHtml(source, { lang, theme: "vesper" }) ?? "");
</script>

<div class="text-xs line-height-relaxed [&_*]:font-mono [&>pre]:!bg-transparent">
  {@html html}
</div>
