let written = false;

module.exports = (...text) => {
    process.stdout.write(`${written ? "\n" : ""}${text.join(" ")}`);
    written = true;
}