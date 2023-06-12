import { BlobOptions } from "buffer";
const fs = require('fs');

export enum FileExecutionStatus {
    alreadyExecutable = 'already_executable',
    nowExecutable = 'now_executable',
    failedToChangeAccess = 'failed_to_change_access',
    unknownStatus = 'unknown_status',
  }

export class DiskFunctions {
    static readFromFile(file: string): String | null {
        try {
            return fs.readFileSync(file).toString();
        } catch (err) {
            return null;
        }
    }
    constructor() {}
    static fileExists(file: string) {
        try {
            return fs.statSync(file).isFile();
        } catch (err) {
            return false;
        }
    }
    static dirExists(file: string) {
        try {
            return fs.statSync(file).isDirectory();
        } catch (err) {
            return false;
        }
    }
    static chmod(fullFilename: string, newFileAccessMode: number) {
        try {
            let stats = fs.statSync(fullFilename);
            if (stats.mode === newFileAccessMode) {
                return true;
            }
            fs.chmodSync(fullFilename, newFileAccessMode);
        } catch (err) {
            return false;
        }

        return true;
    }
    static makeFileExecutable(filePath: string): FileExecutionStatus {
        let status: FileExecutionStatus = FileExecutionStatus.unknownStatus;
    
        try {
          fs.accessSync(filePath, fs.constants.X_OK);
          status = FileExecutionStatus.alreadyExecutable;
        } catch (error) {
          try {
            fs.chmodSync(filePath, '755');
            status = FileExecutionStatus.nowExecutable;
          } catch (error) {
            status = FileExecutionStatus.failedToChangeAccess;
          }
        }
    
        return status;
    }
    static isFileAccessExecutable(fullFilename: string) {
        try {
            fs.accessSync(fullFilename, fs.constants.X_OK);
            return true;
          } catch (error) {
            return false;
          }
    }
    
    /**
     * Extract a path from a path to a file
     * @param path path to a file (must include a directory / or \\ )
     * @returns if path not found an empty string is returned
     */
    static getDirectoryFromFilePath(path: string): string {
        let pos = path.lastIndexOf("/");
        if (pos < 0) {
            pos = path.lastIndexOf("\\");
        }
        if (pos < 0) {
            return "";
        }

        return path.substring(0, pos);
    }
    static getFilenameFromFilePath(path: string): string {
        let pos = path.lastIndexOf("/");
        if (pos < 0) {
            pos = path.lastIndexOf("\\");
        }
        if (pos < 0) {
            return path;
        }

        return path.substring(pos+1);
    }
    static createDirectory(dir: string, createPathRecursively: boolean = false): Boolean {
        try {
            if (!DiskFunctions.dirExists(dir)) {
                return fs.mkdirSync(dir, { recursive: createPathRecursively }) !== undefined;
            }
        } catch (err) {
            return false;
        }
        return true;
    }
    static writeToFile(file: string, content: string, createPath: boolean = false): Boolean {
        try {
            if (createPath) {
                const dir = this.getDirectoryFromFilePath(file);
                if (dir.length < 1) {
                    return false;
                }
                if (!this.createDirectory(dir, true)) {
                    return false;
                }
            }
            fs.writeFileSync(file, content);
            return true;
        } catch (err) {
            return false;
        }
    }
    static deleteFile(file: string): Boolean {
        try {
            fs.unlinkSync(file);
            return true;
        } catch (err) {
            return false;
        }
    }
}
