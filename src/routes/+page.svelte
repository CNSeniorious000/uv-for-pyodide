<script lang="ts">
  import type { PageServerData } from "./$types";

  import Highlight from "$lib/components/Highlight.svelte";

  export let data: PageServerData;

  async function fetchResult(content: string, indexUrl?: string) {
    const res = await fetch("/api/lock/pyodide", { method: "POST", body: JSON.stringify({ "pyproject.toml": content, "index-url": indexUrl ?? undefined }) });
    return await res.json();
  }

  let content = data.example;
  let indexUrl: string | undefined;
</script>

<div class="m-6 h-full w-90vw flex flex-col gap-4 lg:m-10 sm:m-8 [&>section]:(h-90vh w-full flex flex-col gap-3 overflow-scroll rounded-md <sm:h-[calc(50vh-2rem)]) sm:flex-row md:gap-6 xl:gap-8">
  <section class="h-full flex flex-col">
    <div class="ml-5 mt-4 text-sm font-mono">
      pyproject.toml
    </div>
    <div class="relative h-full overflow-scroll rounded-md bg-neutral-8/50 ring-neutral-6 ring-inset transition-shadow [&_*]:bg-transparent focus-within:ring-1.3">
      <div class="relative mx-5 my-4 h-[calc(100%-2rem)] min-h-fit min-w-fit w-[calc(100%-2.5rem)]">
        <Highlight lang="toml" source={content} />
        <textarea bind:value={content} class="absolute inset-0 resize-none overflow-hidden ws-pre text-xs text-transparent leading-relaxed font-mono caret-white outline-none" />
      </div>
    </div>
    <div class="ml-5 mt-4 text-sm font-mono">
      index-url
    </div>
    <input type="url" bind:value={indexUrl} class="rounded-md bg-neutral-8/50 px-5 py-3 outline-none ring-neutral-6 ring-inset transition-shadow focus:ring-1.3 placeholder-neutral-6" placeholder="https://pypi.org/simple">
  </section>
  <section class="bg-neutral-8/50 px-5 py-4">
    {#await fetchResult(content, indexUrl)}
      <div class="grid h-full w-full place-items-center text-neutral-5">
        <div class="i-svg-spinners-bars-rotate-fade" />
      </div>
    {:then data}
      <Highlight lang="json" source={JSON.stringify(data, null, 2)} />
    {/await}
  </section>
</div>
