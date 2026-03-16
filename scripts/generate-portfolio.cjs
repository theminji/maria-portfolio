const fs = require('fs');
const { spawnSync } = require('child_process');

const env = Object.assign({}, process.env, { PORTFOLIO_PLAIN_OUTPUT: '1' });
const candidates = ['pwsh', 'powershell'];
let result = null;

for (const cmd of candidates) {
  try {
    result = spawnSync(cmd, ['-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-File', 'portfolio.ps1'], {
      encoding: 'utf8',
      env,
    });
    if (result && result.status === 0 && typeof result.stdout === 'string' && result.stdout.length > 0) {
      break;
    }
  } catch (e) {
    // try next
  }
}

if (!result || typeof result.stdout !== 'string' || result.stdout.length === 0) {
  console.error('Error: failed to execute PowerShell to generate portfolio output.');
  if (result) {
    console.error('stderr:', result.stderr);
  }
  process.exit(1);
}

const output = result.stdout;

// Write raw ANSI output
fs.writeFileSync('portfolio.ansi', output, 'utf8');

// Write TypeScript module exporting the string (JSON.stringify preserves escapes)
const ts = 'export const portfolioText = ' + JSON.stringify(output) + ' as const\n';
fs.writeFileSync('portfolioText.ts', ts, 'utf8');

console.log('Generated portfolio.ansi and portfolioText.ts');
