module.exports = (color, bg) => {
    if (!color) return;

    switch (color.toLowerCase()) {
        case "black"    : bg ? color = "\x1b[40m"   : color = "\x1b[30m"; break;
        case "red"      : bg ? color = "\x1b[41m"   : color = "\x1b[31m"; break;
        case "green"    : bg ? color = "\x1b[42m"   : color = "\x1b[32m"; break;
        case "yellow"   : bg ? color = "\x1b[43m"   : color = "\x1b[33m"; break;
        case "blue"     : bg ? color = "\x1b[44m"   : color = "\x1b[34m"; break;
        case "magenta"  : bg ? color = "\x1b[45m"   : color = "\x1b[35m"; break;
        case "cyan"     : bg ? color = "\x1b[46m"   : color = "\x1b[36m"; break;
        case "white"    : bg ? color = "\x1b[47m"   : color = "\x1b[37m"; break;
        case "gray"     : bg ? color = "\x1b[100m"  : color =  "\x1b[90m"; break;
    }

    return color || "";
}