const fs = require('fs');
const htmlFile = './romancestory/index.html';
const storyFile = './romancestory/story.txt';

let html = fs.readFileSync(htmlFile, 'utf8');
let story = fs.readFileSync(storyFile, 'utf8');

const startIndex = html.indexOf('const storyScript = {');
const endIndexStr = '        let satisfactions = {';
const endIndex = html.indexOf(endIndexStr);

if (startIndex !== -1 && endIndex !== -1) {
    const before = html.substring(0, startIndex);
    const after = html.substring(endIndex);
    fs.writeFileSync(htmlFile, before + story + ';\n\n' + after, 'utf8');
    console.log('Update done');
} else {
    console.log('Could not match');
}
