import { BlobOptions } from "buffer";
import * as fs from "fs";

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
    static isFileAccessExecutable(fullFilename: string) {
        try {
            let num = fs.statSync(fullFilename).mode & parseInt("111", 8);
            let ret = num === parseInt("111", 8);
            return ret;
        } catch (err) {
            return false;
        }
        return false;
    }

    static addFileAccessExecutable(fullFilename: string) {
        try {
            let stats = fs.statSync(fullFilename);
            // 775 == -rwxrwxr-x.
            //to view all file permission numbers in a directory:  stat -c "%a %n" *
            let num = stats.mode & parseInt("777", 8);
            num = num | parseInt("111", 8); //111 octal = 73 decimal (adding executable for user group and public)
            return this.chmod(fullFilename, num);
        } catch (err) {
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
