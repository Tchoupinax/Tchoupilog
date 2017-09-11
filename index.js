const colors = require('colors');
wantStderr = false;
const textColor = "\x1b[30;1m";
const reset = "\x1b[0m";
const data = {
    greenBg: "\x1b[42m",
    greenFG: "\x1b[32m",
    yellowBg: "\x1b[43m",
    yellowFg: "\x1b[33m",
    redBg: "\x1b[41m",
    redFg: "\x1b[31m",
    blueBg: "\x1b[44m",
    blueFg: "\x1b[36m",
};

/*
 * ===============================================================
 * ==== O V E R R I D E ==========================================
 * ====================== C O N S O L E . I N F O ================
 * ===============================================================
 */
console.old_info = console.info;
console.info = function () {
    console.old_info(data.greenBg + textColor, "  [INFO] ",
        reset, data.greenFG, ...arguments, reset);
};
module.exports = console.info;

/*
 * ===============================================================
 * ==== O V E R R I D E ==========================================
 * ====================== C O N S O L E . W A R N ================
 * ===============================================================
 */
console.old_warn = console.warn;
console.warn = function () {
    console.old_warn(data.yellowBg + textColor, "[WARNING]",
        reset, data.yellowFg, ...arguments, reset);
};
module.exports = console.warn;

/*
 * ===============================================================
 * ==== O V E R R I D E ==========================================
 * ====================== C O N S O L E . E R R O R ==============
 * ===============================================================
 */
if (wantStderr) { console.old_error = console.error; } else { console.old_error = console.other; }
console.error = function () {
    console.log(data.redBg + textColor, " [ERROR] ",
        reset, data.redFg, ...arguments, reset);
};
module.exports = console.error;

/*
 * ===============================================================
 * ==== O V E R R I D E ==========================================
 * ====================== C O N S O L E . D E B U G ==============
 * ===============================================================
 */
console.old_debug = console.log;
console.debug = function () {
    console.old_debug(data.blueBg + textColor, " [DEBUG] ",
        reset, data.blueFg, ...arguments, reset);
};
module.exports = console.debug;

/*
 * ===============================================================
 * ==== O V E R R I D E ==========================================
 * ====================== C O N S O L E . D E B U G ==============
 * ===============================================================
 */
console.old_log = console.log;
console.log = function () {
    console.old_log(...arguments, reset);
};
module.exports = console.log

/*
 * ===============================================================
 * ==== P R I V A T E ============================================
 * ===============================================================
 */
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

console.warn("Bonbjour")
console.info("Bonbjour")
console.error("Bnojoru");
console.debug("Doe");