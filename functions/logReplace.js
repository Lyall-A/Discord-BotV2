module.exports = (...text) => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(text.join(" "));
}