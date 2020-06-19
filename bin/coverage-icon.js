const fs = require('fs');
const path = require('path');

const coveragePath = path.join(__dirname, '..', 'coverage', 'coverage-summary.json');
const coverage = JSON.parse(fs.readFileSync(coveragePath, { encoding: 'utf8' }));

const readmePath = path.join(__dirname, '..', 'README.md');
const readme = fs.readFileSync(readmePath, { encoding: 'utf8' });

fs.writeFileSync(readmePath, readme.replace(/coverage-[0-9.]+%25-green/gm, `coverage-${coverage.total.statements.pct}%25-green`));

const packagePath = path.join(__dirname, '..', 'package.json');
const package = fs.readFileSync(packagePath, { encoding: 'utf8' });

fs.writeFileSync(packagePath, package.replace(/coverage-[0-9.]+%25-green/gm, `coverage-${coverage.total.statements.pct}%25-green`));





