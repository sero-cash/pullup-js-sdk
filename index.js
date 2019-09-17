var Pullup = require("./lib/pullup");
// dont override global variable
if (typeof window !== 'undefined' && typeof window.Pullup === 'undefined') {
    window.Pullup = Pullup;
}

module.exports = Pullup;