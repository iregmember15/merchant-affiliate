const { spawn } = require('child_process');

// Set environment variable to disable ESLint
process.env.DISABLE_ESLINT_PLUGIN = 'true';

// Start react-scripts
const child = spawn('npx', ['react-scripts', 'start'], {
  stdio: 'inherit',
  shell: true
});

child.on('error', (error) => {
  console.error('Error starting the application:', error);
});
