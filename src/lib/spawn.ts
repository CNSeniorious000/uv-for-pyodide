import type { Buffer } from "node:buffer";

import { spawn } from "node:child_process";

export async function run(command: string, cwd?: string) {
  const parts = command.split(" ");

  return new Promise<{ stdout: string; stderr: string; code: number | null }>((resolve) => {
    const process = spawn(`./node_modules/.bin/${parts[0]}`, parts.slice(1), {
      stdio: ["pipe", "pipe", "pipe"],
      cwd,
    });

    let stdout = "";
    let stderr = "";

    process.stderr.on("data", (data: Buffer) => {
      const text = data.toString();
      console.error(text);
      stderr += text;
    });

    process.stdout.on("data", (data: Buffer) => {
      const text = data.toString();
      stdout += text;
    });

    process.on("close", (code) => {
      resolve({ code, stdout, stderr });
    });
  });
}
