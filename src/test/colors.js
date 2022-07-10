// colors.js
'use strict';

module.exports = class Logger {


    format = {
        "reset": "\x1b[0m",
        "bright": "\x1b[1m",
        "dim": "\x1b[2m",
        "underscore": "\x1b[4m",
        "blink": "\x1b[5m",
        "reverse": "\x1b[7m",
        "hidden": "\x1b[8m",

        "blackFg": "\x1b[30m",
        "redFg": "\x1b[31m",
        "greenFg": "\x1b[32m",
        "yellowFg": "\x1b[33m",
        "blueFg": "\x1b[34m",
        "magentaFg": "\x1b[35m",
        "cyanFg": "\x1b[36m",
        "whiteFg": "\x1b[37m",

        "blackBg": "\x1b[40m",
        "redBg": "\x1b[41m",
        "greenBg": "\x1b[42m",
        "yellowBg": "\x1b[43m",
        "blueBg": "\x1b[44m",
        "magentaBg": "\x1b[45m",
        "cyanBg": "\x1b[46m",
        "whiteBg": "\x1b[47m",

    };

    constructor() {
        this.isWindows = process.platform === 'win32';
    }

    formatString() {
        let isFormatter;
        let str = "";
        for (let i = 0; i < arguments.length; i++) {
            isFormatter = Object.keys(this.format).map(val => this.format[val]).filter(item => item === arguments[i]).length > 0;
            str += (this.isWindows && isFormatter) ? "" : arguments[i];
        }
        return str;
    }
    display(...args) {
        console.log(this.formatString(...args));
    }
};