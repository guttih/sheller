const fs = require('fs');
const path = require('path');

var mdStart = () => {
return `# List of all snippets

**Prefix** is what you type to select the desired snippet.

| Prefix  | Title | Description |
|:--------|:------|:------------|
`;
};

var mdTableEntry = (key, snippet) => {
    return `| ${snippet.prefix} | ${key} | ${snippet.description} |\n`;
};
var mdEnd = ()=> "\nBack to [README.md](./README.md)\n";



let slash='/';
if (__dirname.indexOf('\\')>0) {
    slash='\\';
}
let workspaceDir = __dirname.replace(`${slash}src${slash}test`, "");
let snippetDirs = workspaceDir+`${slash}snippets`;
let mdFile=workspaceDir+`${slash}snippetList.md`;

filenames = fs.readdirSync(snippetDirs);
var jsons = [];
var mdContent=mdStart();
filenames.forEach(function (file, index) {
    // Make one pass and make the file complete
    var filePath = path.join(snippetDirs, file);
    let stat = fs.statSync(filePath);

    if (stat.isFile()) {
        console.log("Reading '%s' ", filePath);
        jsons.push(JSON.parse(fs.readFileSync(filePath)));
    }
    // console.log(jsons);
});

jsons.forEach(fileContent => {
    Object.keys(fileContent).forEach(function(key) {
        mdContent+=mdTableEntry(key, fileContent[key]);
    });
    // fileContent.forEach(element => {
        // console.log(`prefix: ${element.prefix}`);
        // });
    });
    mdContent+=mdEnd();
    console.log(`Exporting snippet list to markdown file ${mdFile}.`);
    fs.writeFileSync(mdFile, mdContent);


