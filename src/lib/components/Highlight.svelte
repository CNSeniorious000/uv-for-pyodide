<script module lang="ts">
  import type { BundledLanguage, BundledTheme } from "shiki";

  interface Props {
    lang: BundledLanguage | "ansi" | "text";
    source: string;
    theme?: BundledTheme;
  }
</script>

<script lang="ts">
  import { codeToHtml } from "shiki";

  const { lang, source, theme = "vesper" }: Props = $props();

  let html = $state("");

  $effect(() => {
    codeToHtml(source, { lang, theme }).then((out) => (html = out));
  });
</script>

<div class="text-xs line-height-relaxed [&_*]:font-mono [&>pre]:!bg-transparent">
  {@html html}
</div>
