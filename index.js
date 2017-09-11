const colors = require('colors');
wantStderr = false;
/*
 * ===============================================================
 * ==== O V E R R I D E ==========================================
 * ====================== C O N S O L E . I N F O ================
 * ===============================================================
 */
const dataI = {
    greenBg: "\x1b[42m",
    greenFG: "\x1b[32m",
    textColor: "\x1b[30m",
    reset: "\x1b[0m",
};
console.old_info = console.info;
console.info = function() {
    console.old_info(dataI.greenBg + dataI.textColor, "[INFO]",
        dataI.reset, dataI.greenFG, ...arguments, dataW.reset);
};
module.exports = console.info;
/*
 * ===============================================================
 * ==== O V E R R I D E ==========================================
 * ====================== C O N S O L E . W A R N ================
 * ===============================================================
 */
const dataW = {
    yellowBg: "\x1b[43m",
    yellowFg: "\x1b[33m",
    textColor: "\x1b[30m",
    reset: "\x1b[0m",
};
console.old_warn = console.warn;
console.warn = function() {
    console.old_warn(dataW.yellowBg + dataW.textColor, "[WARNING]",
        dataW.reset, dataW.yellowFg, ...arguments, dataW.reset);
};
module.exports = console.warn;
/*
 * ===============================================================
 * ==== O V E R R I D E ==========================================
 * ====================== C O N S O L E . E R R O R ==============
 * ===============================================================
 */
const dataE = {
    redBg: "\x1b[41m",
    redFg: "\x1b[31m",
    textColor: "\x1b[30m",
    reset: "\x1b[0m",
};
if (wantStderr) { console.old_error = console.error; } else { console.old_error = console.other; }
console.error = function() {
    console.log(dataE.redBg + dataE.textColor, "[ERROR]", dataE.reset, dataE.redFg, ...arguments, dataE.reset, dataW.reset, dataW.reset);
};
module.exports = console.error;
/*
 * ===============================================================
 * ==== O V E R R I D E ==========================================
 * ====================== C O N S O L E . D E B U G ==============
 * ===============================================================
 */
const dataD = {
    blueBg: "\x1b[44m",
    blueFg: "\x1b[36m",
    textColor: "\x1b[30m",
    reset: "\x1b[0m",
};
console.old_debug = console.log;
console.debug = function() {
    console.old_debug(dataD.blueBg + dataD.textColor, "[DEBUG]", dataD.reset, dataD.blueFg, ...arguments, dataW.reset, dataW.reset);
};
module.exports = console.debug;



console.old_log = console.log;
console.log = function() {
    console.old_log(...arguments, dataW.reset);
};
/*
 * ===============================================================
 * ==== O V E R R I D E ==========================================
 * ====================== C O N S O L E . D E B U G ==============
 * ===============================================================
 */
//module.exports = console.log;
/*
 *   Print empty line
 */
exports.ln = function(msg) {
    console.log("\n");
};

function readInLogFile(msg) {
    const path = (require("shelljs").pwd()).stdout;
    var fs = require('fs');
    var util = require('util');
    if (!fs.existsSync(path + "/log/")) {
        fs.mkdir(path + "/log");
    }
    let time = new Date();
    fs.appendFileSync((require("shelljs").pwd().stdout + "/log/error.log"),
        "[" + (time.getHours() > 9 ? time.getHours() : "0" + time.getHours()) + ":" +
        (time.getMinutes() > 9 ? time.getMinutes() : "0" + time.getMinutes()) + ":" +
        (time.getSeconds() > 9 ? time.getSeconds() : "0" + time.getSeconds()) + ":" +
        (time.getMilliseconds() > 99 ? time.getMilliseconds() :
            time.getMilliseconds() > 9 ? "0" + time.getMilliseconds() : "00" + time.getMilliseconds()) +
        "] " + msg + "\n");
}