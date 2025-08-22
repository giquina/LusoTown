#!/usr/bin/env node
const { execSync } = require('child_process');

function run(cmd) {
  try {
    return execSync(cmd, { stdio: 'pipe' }).toString().trim();
  } catch (e) {
    return '';
  }
}

function main() {
  const hasBuildId = require('fs').existsSync('.next/BUILD_ID');
  const status = hasBuildId ? 'BUILD_OK' : 'BUILD_PENDING_OR_FAIL';
  const vercelUrl = run('vercel --prod --confirm --yes --prebuilt --scope default --cwd . --token "$VERCEL_TOKEN" 2>/dev/null | tail -n 1');
  console.log(JSON.stringify({ status, vercelUrl }));
}

main();
