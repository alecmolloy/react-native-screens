const fs = require("node:fs/promises");
const metro = require("metro");

async function bundle() {
  const config = await metro.loadConfig({
    cwd: process.cwd(),
    config: "./metro.config.js",
  });
  await metro.runBuild(config, {
    entry: "index.js",
    out: "ios/main.jsbundle",
    platform: "ios",
    dev: false,
    minify: false,
  });
  await fs.rename("ios/main.jsbundle.js", "ios/main.jsbundle");
}

bundle().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
