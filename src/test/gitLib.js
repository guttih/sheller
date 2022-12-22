const cp = require("child_process");
var prepareLib = require('./prepareLib');
const { exit } = require('process');

// Returns last commit  if file exists otherwise it returns false.


/**
 * Get the last commit Id
 * @returns {string | null } Return value is: on success a string containing the commit Id, on error null.
 */
module.exports.getLastCommitId = function getLastCommitId() {
    let command = cp.spawnSync('git', ["log", "--no-decorate", "--max-count=1"]);
    let lines = command.stdout.toString().split('\n');
    if (lines.length < 3) { return null; }
    let lastCommit = lines[0].substring(7);
    if (lastCommit.length < 40) { return null; }
    return lastCommit;
};

/**
 * Get names of all added snippets
 */

module.exports.getSubStringAndIndices = function getSubStringAndIndices(content, startToken, endToken, startIndex = 0) {
    let iStart, iEnd;
    let strFindStart, strFindEnd;
    strFindStart = startToken;
    iStart = content.indexOf(strFindStart, startIndex);
    if (iStart < 0) { return null; }
    iStart += strFindStart.length;
    strFindEnd = endToken;
    iEnd = content.indexOf(strFindEnd, iStart);
    if (iEnd < 0) { return null; }
    return {
        start: iStart,
        end: iEnd,
        str: content.substring(iStart, iEnd)
    };
};

module.exports.getAddedSnippets = function getAddedSnippets(snippetFile) {
    let command = cp.spawnSync('git', ["--no-pager", "diff", "origin/master", snippetFile]);
    let diff = command.stdout.toString();
    let subTitle, subPrefix, subDesc;
    subTitle = module.exports.getSubStringAndIndices(diff, "+\"", "\"", 0);
    if (subTitle === null) { return null; }
    subPrefix = module.exports.getSubStringAndIndices(diff, "+    \"prefix\": \"", "\"", subTitle.end);
    if (subPrefix === null) { return null; }
    subDesc = module.exports.getSubStringAndIndices(diff, "+    \"description\": \"", "\"", subPrefix.end);
    if (subDesc === null) { return null; }
    let lines = [];

    while (subTitle !== null && subPrefix !== null && subDesc !== null) {
        lines.push({ "title": `${subTitle.str}`, "prefix": `${subPrefix.str}`, "description": `${subDesc.str}` });

        subTitle = module.exports.getSubStringAndIndices(diff, "+\"", "\"", subDesc.end);
        if (subTitle !== null) {
            subPrefix = module.exports.getSubStringAndIndices(diff, "+    \"prefix\": \"", "\"", subTitle.end);
            if (subPrefix !== null) {
                subDesc = module.exports.getSubStringAndIndices(diff, "+    \"description\": \"", "\"", subPrefix.end);
            }
        }

    }
    return lines;
};
module.exports.getAddedSnippetsNames = function getAddedSnippetsNames() {
    let arr = [ "shellscript.json",
                "strings.json",
                "dateFunctions.json",
                "diskFunctions.json",
               ];

    let totalChanges=[];
    arr.forEach(elm => {
        let fileChanges = module.exports.getAddedSnippets(`./snippets/${elm}`);
        if (fileChanges !== null) {
            fileChanges.forEach(change => { totalChanges.push(change); });
        }
    });
    return totalChanges;

};