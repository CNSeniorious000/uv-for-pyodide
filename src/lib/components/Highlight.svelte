<script lang="ts">
  import type { BundledLanguage, BundledTheme } from "shiki";

  import { codeToHtml } from "shiki";

  export let lang: BundledLanguage | "ansi" | "text";
  export let source: string;
  export let theme: BundledTheme = "vesper";

  let html = "";

  $: codeToHtml(source, { lang, theme }).then((out) => (html = out));
</script>

<div class="text-xs line-height-relaxed [&_*]:font-mono [&>pre]:!bg-transparent">
  {@html html}
</div>
