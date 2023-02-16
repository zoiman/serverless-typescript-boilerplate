// eslint-disable-next-line @typescript-eslint/no-var-requires
const { spawn } = require('child_process');

const args = process.argv.slice(2);

const child = spawn(
  `aws-vault exec ${args[0]} -- npx sls ${args[1]} --stage ${args[2]}`,
  [],
  { shell: true },
);
child.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

child.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

process.stdin.setEncoding('utf-8');
process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    child.stdin.write(chunk);
  }
});
child.on('close', (code) => {
  console.log(`aws-vault process exited with code ${code}`);
});
