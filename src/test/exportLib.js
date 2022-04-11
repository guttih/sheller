const fs = require('fs');

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