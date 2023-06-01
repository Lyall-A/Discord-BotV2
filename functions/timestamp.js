const global = require("../global");

module.exports = (use24h) => {
    const { config } = global;
    const date = new Date();
    if (typeof use24h === "undefined") use24h = config.timestamp24h;

    const hours = (use24h ? date.getHours() : date.getHours() % 12).toString().length === 1 ? `0${use24h ? date.getHours() : date.getHours() % 12}` : use24h ? date.getHours() : date.getHours() % 12;
    const minutes = date.getMinutes().toString().length === 1 ? `0${date.getMinutes()}` : date.getMinutes();
    const seconds = date.getSeconds().toString().length === 1 ? `0${date.getSeconds()}` : date.getSeconds();

    const day = date.getDate().toString().length === 1 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth().toString().length === 1 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const year = date.getFullYear().toString().length === 1 ? `0${date.getFullYear()}` : date.getFullYear();

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}${use24h ? "" : date.getHours() > 12 ? " PM" : " AM"}`;
}