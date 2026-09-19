const fs = require('fs');

const source = '.env.template';
const destination = '.env';

if (fs.existsSync(destination)) {
  console.log(`${destination} already exists, leaving it unchanged.`);
} else {
  fs.copyFileSync(source, destination);
  console.log(`${source} copied to ${destination}.`);
}
