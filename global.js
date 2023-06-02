module.exports = {
    init: function() {
        return new Promise(resolve => {
            // Rename init function to reinit
            this.reinit = this.init;
            delete this.init;

            // Modules
            this.http   = http  = require("http");
            this.https  = https = require("https");
            this.fs     = fs    = require("fs");
            this.ws     = ws    = require("ws");
            
            this.config = require("./config"); // Config
            this.secret = JSON.parse(fs.readFileSync("./secret", "utf-8"));

            this.httpCodes, httpCodes = http.STATUS_CODES; // HTTP status codes

            // HTTP status codes with type
            const httpInformationalType = { };
            const httpSuccessfulType    = { };
            const httpRedirectionType   = { };
            const httpClientErrorType   = { };
            const httpServerErrorType   = { };

            for (let i = 100; i < 599; i++) if (httpCodes[i.toString()])
                if (i <= 199)       httpInformationalType[i.toString()] = httpCodes[i.toString()];
                else if (i <= 299)  httpSuccessfulType[i.toString()]    = httpCodes[i.toString()];
                else if (i <= 399)  httpRedirectionType[i.toString()]   = httpCodes[i.toString()];
                else if (i <= 499)  httpClientErrorType[i.toString()]   = httpCodes[i.toString()];
                else if (i <= 599)  httpServerErrorType[i.toString()]   = httpCodes[i.toString()];
            this.httpTypesWithCodes = { informational: httpInformationalType, successful: httpSuccessfulType, redirection: httpRedirectionType, clientError: httpClientErrorType, serverError: httpServerErrorType, error: httpClientErrorType, httpServerErrorType };

            // Find JS files inside directories, this is for reading functions, events and commands
            function findJs(path = "./") {
                const dir = fs.readdirSync(path);
                let files = { };
                dir.forEach(file => {
                    if (file.endsWith(".js")) files[file.substring(0, file.length - 3)] = require(`${path}/${file}`);
                    else if (fs.statSync(`${path}/${file}`).isDirectory()) files = { ...files, ...findJs(`${path}/${file}`) }
                });
                return files;
            };

            this.functions  = functions = findJs("./functions");    // Functions
            this.commands   = commands  = findJs("./commands");     // Commands
            this.events     = events    = findJs("./events");       // Events

            return resolve(this); // Done
        });
    }
}