const global = require("../global");
let changingTextInterval;

module.exports = (text, stages = 3, delay = 250) => {
    const { functions } = global;

    if (!text) {
        if (changingTextInterval) clearInterval(changingTextInterval);
        return;
    } else if (typeof text === "boolean") {
        if (changingTextInterval) clearInterval(changingTextInterval);
        return process.stdout.write("\x1b[0m");
    }

    let stage = 0;
    if (changingTextInterval) clearInterval(changingTextInterval);
    functions.logWrite(text);
    changingTextInterval = setInterval(() => {
        if (stage > stages - 1) {
            functions.logReplace(text);
            stage = 0;
        } else {
            stage++;
            functions.logAdd(".");
        }
    }, delay);
}