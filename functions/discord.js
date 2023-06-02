const global = require("../global");

module.exports = (path = "/", options = { }, data) => {
    return new Promise(async (resolve, reject) => {
        const { functions, config, secret, httpTypesWithCodes } = global;
        const { log, fetch } = functions;
        if (!options.headers?.Authorization) options.headers ? options.headers.Authorization = `Bot ${secret.token}` : options.headers = { Authorization: `Bot ${secret.token}` };
        fetch(`${config.discordApiUrl}${path}`, options).then(res => {
            if (httpTypesWithCodes.error[res.statusCode.toString()]) {
                log(`Discord API error occurred! HTTP status: ${res.statusCode}, ${res.parsed.json ? discordErrorParse(res.parsed.json) ? `Discord error: ${discordErrorParse(res.parsed.json, true)}` : "No information about error" : "No information about error"}`, "error");
                reject({ errorType: "discord", status: res.statusCode, data: res.data, ...res.parsed });
            }
            resolve(res)
        }).catch(err => {
            log(`Fetch error occurred with Discord API request! ${err}`, "error");
            reject({ errorType: "http", err });
        });
    });
}