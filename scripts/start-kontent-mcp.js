const path = require('node:path');
const { spawn } = require('node:child_process');

const projectRoot = path.resolve(__dirname, '..');

require('dotenv').config({
  path: path.join(projectRoot, '.env'),
  quiet: true,
});

for (const name of ['KONTENT_API_KEY', 'KONTENT_ENVIRONMENT_ID']) {
  if (!process.env[name]) {
    console.error(`Missing ${name}: set it in the environment or project .env`);
    process.exit(1);
  }
}

const server = spawn('npx', ['-y', '@kontent-ai/mcp-server@latest', 'stdio'], {
  cwd: projectRoot,
  env: process.env,
  stdio: 'inherit',
});

server.on('error', (error) => {
  console.error(`Could not start Kontent MCP: ${error.message}`);
  process.exit(1);
});

server.on('exit', (code) => {
  process.exit(code ?? 1);
});
