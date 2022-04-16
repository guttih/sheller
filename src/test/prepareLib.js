const fs = require('fs');
const path = require('path');

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
 * 
 * @param   {string} workspaceDir Directory containing files package.json and package-lock.json
 * @returns {string|null} On success: new new version number string.  On error: null.
 */
module.exports.bump = function bump(workspaceDir){
    let filePackage     = path.join(workspaceDir, "package.json"),
        filePackageLock = path.join(workspaceDir, "package-lock.json");

	if (! module.exports.fileExists(filePackage) || ! module.exports.fileExists(filePackageLock)) {
        console.error(`Files "package.json" and "package-lock.json" must be found in provided directory (${workspaceDir}).`);
        return null;
    }
    let packageContent     = require(filePackage),
        packageLockContent = require(filePackageLock);
    let oldVersion=packageContent.version;
    if (oldVersion === undefined || packageLockContent.version === undefined) { return null;}
    let i = oldVersion.lastIndexOf('.');
    if (i < 2) {return null;}
    let prefix=oldVersion.substring(0,i);
    let oldNumStr=oldVersion.substring(i+1);
    if (!module.exports.isPositiveInteger(oldNumStr)) { return null; }
    let newNum=Number(oldNumStr) + 1;
    let newVersion=`${prefix}.${newNum.toString()}`;
    // console.log(` packageContent.version:${packageContent.version} packageLockContent.version:${packageLockContent.version} packageLockContent.packages.versionX:${packageLockContent.packages[""].version}`);
    packageContent.version=newVersion;
    packageLockContent.version=newVersion;
    packageLockContent.packages[""].version=newVersion;
    // console.log(` packageContent.version:${packageContent.version} packageLockContent.version:${packageLockContent.version} packageLockContent.packages.versionX:${packageLockContent.packages[""].version}`);
    var newContent = JSON.stringify(packageContent, null, 2);
    try { fs.writeFileSync(filePackage, newContent); } catch(err) { console.error(err);console.log('Unable to write to file package.json');return null; }

    newContent = JSON.stringify(packageLockContent, null, 2);
    try { fs.writeFileSync(filePackageLock, newContent); } catch(err) { console.error(err);console.log('Unable to write to file package-lock.json');return null; }
      
    return newVersion;
};

module.exports.isPositiveInteger = function isPositiveInteger(str) {
    if (typeof str !== 'string') {
      return false;
    }
  
    const num = Number(str);
  
    if (Number.isInteger(num) && num > 0) {
      return true;
    }
  
    return false;
  };
