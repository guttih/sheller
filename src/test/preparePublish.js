var Logger = require('./colors.js');
var logger = new Logger();

const fs = require('fs');
const path = require('path');
const { exit } = require('process');
var lib = require('./prepareLib');

let slash = '/';
if (__dirname.indexOf('\\') > 0) {
    slash = '\\';
}
let workspaceDir = __dirname.replace(`${slash}src${slash}test`, "");
let snippetDirs = workspaceDir + `${slash}snippets`;
let mdFile = workspaceDir + `${slash}README.md`;


let programArgs = process.argv.slice(2);
let bumping = false;
if (programArgs.length > 0) {

    if (programArgs.includes('-bump')) {

        programArgs = programArgs.filter(e => e !== '-bump');
        const newVersion = lib.bump(workspaceDir);
        if (newVersion === null) {
            console.error(`Unable to bump package: ${programArgs[0]}`);
            exit(1);
        }
        console.log(`Version bumped to ${newVersion}`);
        bumping = true;
    } else {
        console.error(`Invalid argument: ${programArgs[0]}`);
        exit(1);
    }
}
//fs.constants.R_OK
const packageJson = require(workspaceDir + `${slash}package.json`);
var mdStart = () => {
    //| Prefix  | Title | Description |
    return `
|:--------|:------|:------------|
`;
};

var mdTableEntry = (key, snippet) => {
    let prefix = snippet.prefix.toString().replace(/,/g, ",<br>");
    return `| ${prefix} | ${key} | ${snippet.description} |\n`;
};
var mdEnd = () => "\n\n";



filenames = fs.readdirSync(snippetDirs);
var snippetList = [];
var mdContent = mdStart();
filenames.forEach(function (file, index) {
    // Make one pass and make the file complete
    var filePath = path.join(snippetDirs, file);
    let stat = fs.statSync(filePath);

    if (stat.isFile()) {
        console.log("Reading '%s' ", filePath);
        snippetList.push(JSON.parse(fs.readFileSync(filePath)));
    }
});

snippetList.forEach(fileContent => {
    Object.keys(fileContent).forEach(function (key) {
        mdContent += mdTableEntry(key, fileContent[key]);
    });
});
mdContent += mdEnd();
console.log(`Exporting snippet list to markdown file ${mdFile}`);
if (lib.fileExists(mdFile)) {
    console.log('File exists');
}
let newContent = lib.replaceContent(fs.readFileSync(mdFile).toString(),
    "| Prefix  | Title | Description |",
    "[Top](#sheller)",
    mdContent
);

console.log("==================\n"); console.log(newContent); console.log("==================\n");
fs.writeFileSync(mdFile, newContent);
console.log(`To create a new package with this \nversion, give the following command:\n\n    vsce package ${packageJson.version}\n`);
//https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
const highlight = "\x1b[1m";
const bright = "\x1b[1m";
const norm = "\x1b[0m";
if (bumping) {
    logger.display(
        logger.format.yellowFg, "Remember to add this line: ", 
        logger.format.reverse    , `      - ${packageJson.version}`,
        logger.format.reset, logger.format.yellowFg , " to this form ", 
        logger.format.reset, logger.format.cyanFg,   "https://github.com/guttih/sheller/edit/master/.github/ISSUE_TEMPLATE/bug_report.yml", 
        logger.format.reset    , "\n");

}
