const fs = require('fs');
const path = require('path');
const cp = require("child_process");
const gitLib = require('./gitLib');

// Returns true if file exists otherwise it returns false.
module.exports.fileExists = function fileExists(filePath){
	try
	{
		return fs.statSync(filePath).isFile();
	}
	catch (err)
	{
		return false;
	}
};

/**
 * Extract everything between two tokens and returns the result.
 * @param {string} content Original content where .
 * @param {string} startToken newContent will be inserted after The first instance found matching the text in this token.
 * @param {string} endToken  newContent will be inserted before First instance of this text, found after startToken.
 * @returns {string|null} On success, the content between the two tokens.  On error, the return value is null.
 */
module.exports.extractContent = function extractContent (content, startToken, endToken) {
  let start = content.indexOf(startToken);
  let end = content.indexOf(endToken,start+startToken.length);
  if (start < 0 ) { console.error(`startToken "${startToken}" not found!`); return null;  }
  if (end   < 0 ) { console.error(`endToken "${endToken}" not found!`);     return null;  }
  let ret = content.substring(start+startToken.length, end);
  return ret;
};
/**
 * Replaces everything between two tokens and returns the result.
 * @param {string} content Original content which shall be changed.
 * @param {string} startToken newContent will be inserted after The first instance found matching the text in this token.
 * @param {string} endToken  newContent will be inserted before First instance of this text, found after startToken.
 * @param {string} newContent New content which will be inserted between the start and end tokens.
 * @returns {string|null} On success, the modified content.  On error, the return value is null.
 */
module.exports.replaceContent = function replaceContent (content, startToken, endToken, newContent) {
    let start = content.indexOf(startToken);
    let end = content.indexOf(endToken,start);
    if (start < 0 ) { console.error(`startToken "${startToken}" not found!`); return null;  }
    if (end   < 0 ) { console.error(`endToken "${endToken}" not found!`);     return null;  }
    let ret = content.substring(0, start+startToken.length);
    ret+=newContent;
    ret+=content.substring(end);
    return ret;
};

/**
 * Replaces one matching string between two tokens and returns the result.
 * @param {string} content Original content which shall be changed.
 * @param {string} startToken newContent will be inserted after The first instance found matching the text in this token.
 * @param {string} endToken  newContent will be inserted before First instance of this text, found after startToken.
 * @param {string} oldString  newContent will be inserted before First instance of this text, found after startToken.
 g* @param {string} newString New content which will replace oldString if oldString is found between the start and end tokens.
 * @returns {string|null} On success, the modified content.  On error, the return value is null.
 */
module.exports.replaceContentString = function replaceContentString (content, startToken, endToken, oldString, newString) {
  let start = content.indexOf(startToken);
  let end = content.indexOf(endToken,start);
  if (start < 0 ) { console.error(`startToken "${startToken}" not found!`); return null;  }
  if (end   < 0 ) { console.error(`endToken "${endToken}" not found!`);     return null;  }
  let old = content.indexOf(oldString,start);
  if (old   < 0 ) { console.error(`old string "${endToken}" not found!`);     return null;  }
  if (old   > end ) { console.error(`old string "${endToken}" after endToken!`);     return null;  }
  let ret = content.slice(0, start) + content.slice(start).replace(oldString, newString);
  return ret;
};

/**
 * 
 * @param   {string} workspaceDir Directory containing files package.json and package-lock.json
 * @returns {string|null} On success: new new version number string.  On error: null.
 */
module.exports.bump = function bump(workspaceDir){
    let filePackage     = path.join(workspaceDir, "package.json"),
        filePackageLock = path.join(workspaceDir, "package-lock.json"),
        fileBugReportYml = path.join(workspaceDir, ".github/ISSUE_TEMPLATE/bug_report.yml"),
        fileChangeLog    = path.join(workspaceDir, "CHANGELOG.md");

	if (! module.exports.fileExists(filePackage) || ! module.exports.fileExists(filePackageLock)) {
        console.error(`Files "package.json" and "package-lock.json" must be found in provided directory (${workspaceDir}).`);
        return null;
    }
    let packageContent     = require(filePackage),
        packageLockContent = require(filePackageLock);
    let oldVersion=packageContent.version;
    if (oldVersion === undefined || packageLockContent.version === undefined) { return null;}
    let oldVersionArr=oldVersion.split('.');
    if (oldVersionArr.length < 1) {return null;}
    let oldNumStr=oldVersionArr[oldVersionArr.length-1];
    if (!module.exports.isPositiveInteger(oldNumStr, true)) { return null; }
    oldVersionArr[oldVersionArr.length-1]=Number(oldNumStr) + 1;
    let newVersion=oldVersionArr.join('.');
    packageContent.version=newVersion;
    packageLockContent.version=newVersion;
    packageLockContent.packages[""].version=newVersion;
    var newContent = JSON.stringify(packageContent, null, 2);

    try { fs.writeFileSync(filePackage, newContent); } catch(err) { console.error(err);console.log('Unable to write to file package.json');return null; }

    newContent = JSON.stringify(packageLockContent, null, 2);
    try { fs.writeFileSync(filePackageLock, newContent); } catch(err) { console.error(err);console.log('Unable to write to file package-lock.json');return null; }
    module.exports.bumpBugReportFile(fileBugReportYml, oldVersion, newVersion);
    module.exports.bumpChangeLog(fileChangeLog, newVersion);

    return newVersion;
};
module.exports.isPositiveInteger = function isPositiveInteger(str, treatZeroAsPositive) {
  if (typeof str !== 'string') {
    return false;
  }
  
  const num = Number(str);
  
  if (Number.isInteger(num) && num > 0) {
    return true;
  }
  
  return treatZeroAsPositive? str === '0': false;
};

module.exports.bumpBugReportFile = function bumpBugReportFile(file, oldVersion, newVersion) {
    let content = fs.readFileSync(file).toString().replaceAll("\r\n", "\n");
    const TOKEN_VERSION_PREFIX = "      - ";
    const TOKEN_CONTENT_START = "    options:\n";
    const TOKEN_CONTENT_END = "  validations:";
    let versionListString = module.exports.extractContent(content, `${TOKEN_CONTENT_START}${TOKEN_VERSION_PREFIX}`, TOKEN_CONTENT_END);
    versionListString = `${TOKEN_VERSION_PREFIX}${versionListString}`;
    let arr = versionListString.split('\n').map((element) => {
        return element.substring(TOKEN_VERSION_PREFIX.length).replace('\r', '');
    });
    arr.push(newVersion);
    arr = arr.filter(element => { return module.exports.isVersionValid(element); });

    newArr = [...new Set(arr)];
    newArr = newArr.sort(function (a, b) { return module.exports.compareVersionStrings(a, b); }).reverse();

    let outArray = newArr.map(element => {
        return `${TOKEN_VERSION_PREFIX}${element}\r\n`;
    });
    outArray[0] = outArray[0].substring(TOKEN_VERSION_PREFIX.length);

    let newContent = module.exports.replaceContent(content, `${TOKEN_CONTENT_START}${TOKEN_VERSION_PREFIX}`, TOKEN_CONTENT_END, outArray.join(""));
    fs.writeFileSync(file, newContent);

};

module.exports.bumpChangeLog = function bumpChangeLog(file, newVersion) {
    console.log(`  file ${file}  NewVersion ${newVersion}`);
    let content = fs.readFileSync(file).toString();
    const TOKEN_VERSION_SECTION=`\n\n## [${newVersion}]\n\n`;
    const TOKEN_CONTENT_START = "All notable changes to the \"sheller\" extension are documented in this file.";
    const TOKEN_CONTENT_END = "## [";
    let addedSnippets=gitLib.getAddedSnippetsNames();
    let snippetList="";
    if (addedSnippets.length > 0) {
        addedSnippets.forEach(elm =>{
            snippetList+=`    - ${elm.title}: \`${elm.prefix}\` - ${elm.description}\n`;
        });
    } else { 
        addedSnippets = "    - *name_of_snippet_added* - description_for_snippet_added \n"; 
    }
    let newText = `${TOKEN_VERSION_SECTION}### Added\n\n  - Snippets\n${snippetList}`;
    newText+=`\n\n`;
    newContent = module.exports.replaceContent(content, TOKEN_CONTENT_START, TOKEN_CONTENT_END, newText);
    // gitLib.getLastCommitId();
    fs.writeFileSync(file, newContent);
    cp.exec(file);
};

/**
 * Checks if a string contains a valid number
 * @param {*} strNum String to check if it's a number
 */
isNumInvalid = function isNumInvalid(strNum) {
    return (strNum === null || strNum.length < 1 || isNaN(strNum));
};

/**
 * Compares two version strings
 *
 * @param {*} versionA First semantic version string on the form major.minor.patch.build
 * @param {*} versionB Second semantic version string on the form major.minor.patch.build
 * @param {*} [invalidIsBigger=false] When one version section is invalid and the other one is not, should the invalid version section be handled as a bigger value, or smaller?
 * @returns {-1 | 0 | 1 } Return value is:  0 if both versions are equal,1 if versionA is bigger or -1 if versionB is bigger.
 */
module.exports.compareVersionStrings = function compareVersionStrings(versionA, versionB, invalidIsBigger) {
    const retAisBigger = 1, retBisBigger = -1, retEqual = 0;
    const flipper = invalidIsBigger ? retAisBigger : retBisBigger;
    if (versionA === versionB) { return retEqual; }
    if (versionA === null) { return retBisBigger * flipper; }
    if (versionB === null) { return retAisBigger * flipper; }
    if (versionA.length < 1) { return retBisBigger * flipper; }
    if (versionB.length < 1) { return retAisBigger * flipper; }
    verA = versionA.split('.');
    verB = versionB.split('.');
    let lenDiff = verA.length - verB.length;
    if (lenDiff !== 0) {
        let shorterArray = lenDiff < 0 ? verA : verB;
        let longerArray = lenDiff < 0 ? verB : verA;
        while (shorterArray.length < longerArray.length) {
            shorterArray.push('0');
        }
    }
    let ret;
    for (let i = 0; i < verA.length; i++) {
        if (isNumInvalid(verA[i]) || isNumInvalid(verB[i])) {
            // one or more version has an invalid number
            if (isNumInvalid(verA[i]) && isNumInvalid(verB[i])) {
                return verA[i] - verB[i] * flipper;
            } else if (isNumInvalid(verA[i])) {
                return retAisBigger * flipper;
            } else {
                return retBisBigger * flipper;
            }
        } else {
            // Both numbers are valid
            ret = Number(verA[i]) - Number(verB[i]);
            if (ret !== 0) {
                return ret;
            }
        }
    }
    return 0;
};

/**
 * Checks if a version string is valid or not
 *
 * @param {*} versionA A semantic version string on the form major.minor.patch.build
 */
module.exports.isVersionValid = function isVersionValid(version) {
    if (version === null || version.trim().length < 1) {
        return false;
    }
    let ver = version.split('.');

    for (let i = 0; i < ver.length; i++) {
        if (ver[i].trim().length < 1 || isNaN(ver[i]))  {
            return false;
        }
    }
    return true;
};
