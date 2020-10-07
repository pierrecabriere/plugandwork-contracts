const AdmZip = require('adm-zip');
const packageJson = require('./package.json');
const zip = new AdmZip();

// Add following root files to archives
const files = ['package.json', 'package-lock.json', 'Readme.md', 'Changelog.md'];
// Add following root folders to archives
const folders = ['src', 'dist'];

files.forEach(file => zip.addLocalFile(file));
folders.forEach(folder => zip.addLocalFolder(folder, folder));
// Write zipfile with package name
zip.writeZip(`${packageJson.name}.zip`);

console.log('Package archived !')