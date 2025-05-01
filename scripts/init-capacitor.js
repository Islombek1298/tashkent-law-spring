const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure dist directory exists
if (!fs.existsSync(path.join(__dirname, '../dist'))) {
  console.log('Building app first...');
  execSync('npm run build', { stdio: 'inherit' });
}

// Initialize Capacitor
console.log('Initializing Capacitor...');
execSync('npm run cap:init', { stdio: 'inherit' });

// Add platforms
console.log('Adding Android and iOS platforms...');
execSync('npm run cap:add', { stdio: 'inherit' });

// Sync capacitor
console.log('Syncing Capacitor...');
execSync('npm run cap:sync', { stdio: 'inherit' });

console.log('Capacitor initialization complete!');
console.log('');
console.log('To open in Android Studio, run: npm run cap:android');
console.log('To open in Xcode, run: npm run cap:ios');
