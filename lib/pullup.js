var Local = require("./methods/local");
var Sero = require("./methods/sero");
var HttpProvider = require("./pullup/httpprovider");
var RequestManager = require("./pullup/requestmanager");

function Pullup(provider) {
    this._requestManager = new RequestManager(provider);
    this.local = new Local(this);
    this.sero = new Sero(this);
    this.providers = {
        HttpProvider: HttpProvider,
    };
}

Pullup.providers = {
    HttpProvider: HttpProvider,
};

Pullup.prototype.setProvider = function (provider) {
    this._requestManager.setProvider(provider);
};

module.exports = Pullup;