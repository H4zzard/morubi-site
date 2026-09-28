import { spawn, spawnSync } from "node:child_process";
import process from "node:process";

const nextBin = "node_modules/next/dist/bin/next";
const playwrightBin = "node_modules/@playwright/test/cli.js";
const testPort = 3100;
const testBaseUrl = `http://127.0.0.1:${testPort}`;

const build = spawnSync(process.execPath, [nextBin, "build"], { stdio: "inherit", windowsHide: true });
if (build.status !== 0) process.exit(build.status ?? 1);

const server = spawn(process.execPath, [nextBin, "start", "-p", String(testPort)], { stdio: "inherit", windowsHide: true });

async function waitForServer() {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    try {
      const response = await fetch(testBaseUrl);
      if (response.ok) return;
    } catch { /* server still starting */ }
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  throw new Error("The Next.js server did not become ready in 30 seconds.");
}

function stopServer() {
  if (!server.pid) return;
  if (process.platform === "win32") {
    spawnSync("taskkill", ["/pid", String(server.pid), "/t", "/f"], { stdio: "ignore", windowsHide: true });
  } else {
    server.kill("SIGTERM");
  }
}

process.once("SIGINT", () => { stopServer(); process.exit(130); });
process.once("SIGTERM", () => { stopServer(); process.exit(143); });

try {
  await waitForServer();
  const tests = spawn(process.execPath, [playwrightBin, "test", ...process.argv.slice(2)], { stdio: "inherit", windowsHide: true, env: { ...process.env, PLAYWRIGHT_BASE_URL: testBaseUrl } });
  const code = await new Promise(resolve => tests.once("exit", exitCode => resolve(exitCode ?? 1)));
  stopServer();
  process.exit(code);
} catch (error) {
  console.error(error);
  stopServer();
  process.exit(1);
}
