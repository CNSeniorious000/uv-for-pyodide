import type { RequestHandler } from "./$types";
import type { LockData, PyprojectToml } from "./types";

import { error, json } from "@sveltejs/kit";
import { run } from "$lib/spawn";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { packages } from "pyodide/pyodide-lock.json";
import { parse, stringify } from "smol-toml";

export const POST: RequestHandler = async ({ request }) => {
  const { "pyproject.toml": content, "index-url": index } = await request.json();
  if (!content)
    error(400, "Missing pyproject.toml");

  const { project: { dependencies, "requires-python": requirePython = ">=3.12", name: projectName = "anonymous", version = "0" } } = parse(content) as unknown as PyprojectToml;
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "lock-uv-"));
  await fs.writeFile(path.join(dir, "pyproject.toml"), stringify({ project: { "name": projectName, version, dependencies, "requires-python": requirePython } }));
  await run(index ? `uv lock -i ${index}` : "uv lock", dir);
  const toml = (await fs.readFile(path.join(dir, "uv.lock"))).toString();
  fs.rm(dir, { recursive: true });
  const data = parse(toml) as unknown as LockData;

  const results: Record<string, { type: "pypi" | "pyodide"; file: string } | false> = {};

  for (const { name, version, wheels, source: { editable } } of data.package) {
    if (name === projectName) {
      continue;
    }
    if (editable) {
      error(400, `Editable requirements ${name} shouldn't be there`);
    }

    const wheelUrl = wheels && (wheels.find(({ url }) => url.endsWith("py3-none-any.whl")))?.url;
    if (wheelUrl) {
      results[name] = { type: "pypi", file: wheelUrl };
      continue;
    } else {
      if (!Object.keys(packages).includes(name)) {
        results[name] = false; // resolution failed
        continue;
      }
      const { file_name, version: lockedVersion } = packages[name as keyof typeof packages];
      results[name] = { type: "pyodide", file: file_name };
      if (version !== lockedVersion) {
        // pyodide locked version is different from the one in the lock file (because uv don't know these constraints)
        console.error({ name, version, lockedVersion });
      }
    }
  }

  return json(results);
};
