const fs = require('fs');
let data = fs.readFileSync('./romancestory/index.html', 'utf8');

// The lines we want to affect are between 1000 and 2150 roughly
const lines = data.split('\n');

for (let i = 1000; i < 2150; i++) {
    if (lines[i]) {
        lines[i] = lines[i].replace(/觀察者/g, '{playerName}');
    }
}

fs.writeFileSync('./romancestory/index.html', lines.join('\n'));
console.log('Done!');
