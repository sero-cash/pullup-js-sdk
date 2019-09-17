var formatters = require('../pullup/formatters');
var Method = require('../pullup/method');

function Sero(pullup) {
    this._requestManager = pullup._requestManager;
    var self = this;
    methods().forEach(function (method) {
        method.attachToObject(self);
        method.setRequestManager(self._requestManager);
    });
}

var methods = function () {

    /**
     * use to new smart contract
     * param = {abi,data,args}
     * @type {Method}
     */
    var packConstruct = new Method({
        name: 'packConstruct',
        call: 'sero_packConstruct',
        params: 3,
    });

    /**
     * use to call contract method
     * param = {abi,contractAddress,method,methodArgs}
     * @type {Method}
     */
    var packMethod = new Method({
        name: 'packMethod',
        call: 'sero_packMethod',
        params: 4,
    });

    /**
     * use to call estimate Gas
     * param = {from,to,data(result of packMethod),value:0x0}
     * @type {Method}
     */
    var estimateGas = new Method({
        name: 'estimateGas',
        call: 'sero_estimateGas',
        params:1,
    });

    /**
     * use to call
     * param = {from,to,data(result of packMethod)}
     * @type {Method}
     */
    var call = new Method({
        name: 'call',
        call: 'sero_call',
        params: 2,
    });

    /**
     * use to un pack result
     * param = {abi,method,data(result of sero_call)}
     * @type {Method}
     */
    var unPack = new Method({
        name: 'unPack',
        call: 'sero_unPack',
        params: 3,
    });

    return [
        packConstruct, packMethod, estimateGas, call, unPack
    ];
}

module.exports = Sero;