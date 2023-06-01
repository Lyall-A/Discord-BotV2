const global = require(`./global`);
global.init().then(() => {
    const { config, secret, functions } = global;
    functions.log("info");
});