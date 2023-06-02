const global = require(`./global`);

global.init().then(async () => {
    const { config, secret, functions } = global;
    const { log, discord, loadingText, logReplace } = functions;
    log("Global initialized", "debug");
    loadingText(log("Verifying bot token", "info", false, true));
    const botUser = await discord("/users/@me").catch(err => functions.log(err.type === "discord" ? `Discord API error occurred while trying to verify token! HTTP status: ${err.status}, ${err.json ? discordErrorParse(err.json) ? `Discord error: ${discordErrorParse(err.json), true}` : "No information about error" : "No information about error"}` : `Fetch error occurred while trying to verify token! ${err.err.message}`, "fatal"));
    if (!botUser.parsed.json?.username) return log(`Discord API user response does not contain username! Data: ${JSON.stringify(botUser.parsed.json) || botUser.data}`);
    global.user, user = botUser.parsed.json;
    logReplace(log(`User: ${user.username}${user.discriminator ? `#${user.discriminator}` : ""} (${user.id}${user.display_name ? ` | ${user.display_name}` : ""})`, "info", false, true));
});

process.on("exit", () => process.stdout.write("\x1b[0m"));