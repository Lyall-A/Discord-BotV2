const global = require(`./global`);

global.init().then(async () => {
    const { config, secret, functions } = global;
    const { log, discord, loadingText } = functions;
    log("Global initialized", "debug");
    loadingText(functions.log("Verifying bot token", "info", false, true));
    const botUser = await discord("/users/@me").catch(err => functions.log(err.type === "discord" ? `Discord API error occurred while trying to verify token! HTTP status: ${err.status}, ${err.json ? discordErrorParse(err.json) ? `Discord error: ${discordErrorParse(err.json), true}` : "No information about error" : "No information about error"}` : `Fetch error occurred while trying to verify token! ${err.err.message}`, "fatal"));
});