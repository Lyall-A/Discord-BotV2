const global = require("../global");

module.exports = (url, options = {}, data) => {
    return new Promise((resolve, reject) => {
        const { http, https, functions } = global;
        const { log } = functions;
        if (!url.startsWith("http://") && !url.startsWith("https://")) url = `https://${url}`;

        const domain    = url.split("://")[1].split("/")[0].split(":")[0];
        const port      = url.split("://")[1].split("/")[0].split(":")[1];
        const path      = url.replace(`${url.split("://")[0]}://${domain}${port ? `:${port}` : ""}`, "") || "/";
        const prot      = url.split("://")[0] === "https" ? https : http;

        if (!options.method)                                    options.method  = "GET"; else options.method = options.method.toUpperCase();
        if (!options.host)                                      options.host    = domain;
        if (!options.path)                                      options.path    = path;
        if (!options.port && port !== "443" && port !== "80")   options.port    = Number(port); else if (options.port == 443 || options.port == 80) options.port = undefined; else options.port = Number(options.port);

        const req = prot.request(options, res => {
            let data;
            res.on("data", d => data ? data = new Buffer.concat([data, Buffer.from(d)]) : data = Buffer.from(d));
            res.on("end", () => {
                res.data = data;
                res.parsed = {};
                try {
                    res.parsed.json = JSON.parse(data);
                } catch (err) { };
                try {
                    res.parsed.string = data.toString();
                } catch (err) { };
                log(`Sent ${options.method} request to ${url.split("://")[0]}://${domain}${port ? `:${port}` : ""}${path}`, "http");
                resolve(res);
            });
            res.on("error", err => {
                log(`HTTP error with ${options.method} to ${url.split("://")[0]}://${domain}${port ? `:${port}` : ""}${path}! Error: ${err.message}`, "error");
                reject(err);
            });
        });
        
        req.on("error", err => {
            log(`HTTP error with ${options.method} to ${url.split("://")[0]}://${domain}${port ? `:${port}` : ""}${path}! Error: ${err.message}`, "error");
            reject(err);
        });
        if (data) if (typeof data === "object") req.write(JSON.stringify(data)); else req.write(data);
        req.end();
    });
}