import type { PageServerLoad } from "./$types";

export const load = (async ({ fetch }) => {
  const example = await fetch("https://github.com/promplate/reasonify/raw/refs/heads/main/pyproject.toml").then(res => res.text());
  return { example };
}) satisfies PageServerLoad;
