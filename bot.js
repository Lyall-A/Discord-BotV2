const global = require(`./global`);
global.init().then(() => {
    const { config, secret } = global;
});