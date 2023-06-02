module.exports = {
    discordApiUrl: "https://discord.com/api/v10",
    debug: false,
    logs: {
        // Default values
        includeTimestamp: false,
        timestampSuffix: ":",
        timestampBgColor: "gray",
        typePrefix: "[",
        typeSuffix: "]",
        typeBgColor: "white",

        // Custom values for type
        types: {
            info: {
                typeBgColor: "cyan",
                textColor: "cyan"
            },
            debug: {
                typeBgColor: "gray",
                textColor: "gray",
                debug: true
            },
            http: {
                typeBgColor: "blue",
                textColor: "blue",
                debug: true
            },
            fatal: {
                typeBgColor: "red",
                textColor: "red",
                fatal: true
            },
            error: {
                typeBgColor: "yellow",
                textColor: "yellow"
            }
        }
    }
}