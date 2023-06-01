const global = require("../global");
const r = "\x1b[0m";

module.exports = (type = "info", text = "No text provided! You should probably fix that", options = { }) => {
    const { config, functions } = global;
    const { logs } = config;
    const { colors } = functions;
    console.log(colors(logs.types[type]?.timestampBgColor || options.timestampBgColor || logs.timestampBgColor, true))

    const typeColor = colors(logs.types[type]?.typeColor || options.typeColor || logs.typeColor) || "";
    const typeBgColor = colors(logs.types[type]?.typeBgColor || options.typeBgColor || logs.typeBgColor, true) || "";
    const typePrefix = logs.types[type]?.typePrefix || options.typePrefix || logs.typePrefix || "";
    const typeSuffix = logs.types[type]?.typeSuffix || options.typeSuffix || logs.typeSuffix || "";
    
    const textColor = colors(logs.types[type]?.textColor || options.textColor || logs.textColor) || "";
    const textBgColor = colors(logs.types[type]?.textBgColor || options.textBgColor || logs.textBgColor, true) || "";
    const textPrefix = logs.types[type]?.textPrefix || options.textPrefix || logs.textPrefix || "";
    const textSuffix = logs.types[type]?.textSuffix || options.textSuffix || logs.textSuffix || "";

    let includeTimestamp = logs.types[type]?.includeTimestamp;
    if (typeof includeTimestamp === "undefined") includeTimestamp = options.includeTimestamp;
    if (typeof includeTimestamp === "undefined") includeTimestamp = logs.includeTimestamp;
    if (typeof includeTimestamp === "undefined") includeTimestamp = true;

    const timestampColor = colors(logs.types[type]?.timestampColor || options.timestampColor || logs.timestampColor) || "";
    const timestampBgColor = colors(logs.types[type]?.timestampBgColor || options.timestampBgColor || logs.timestampBgColor, true) || "";
    const timestampPrefix = logs.types[type]?.timestampPrefix || options.timestampPrefix || logs.timestampPrefix || "";
    const timestampSuffix = logs.types[type]?.timestampSuffix || options.timestampSuffix || logs.timestampSuffix || "";

    console.log(`${includeTimestamp ? `${timestampColor}${timestampBgColor}${timestampPrefix}${functions.timestamp()}${timestampSuffix}${r} ` : ""}${typeColor}${typeBgColor}${typePrefix}${type}${typeSuffix}${r} ${textColor}${textBgColor}${textPrefix}${text}${textSuffix}${r}`);
}