var formatters = require('../pullup/formatters');
var Method = require('../pullup/method');

function Local(pullup) {
    this._requestManager = pullup._requestManager;
    var self = this;
    methods().forEach(function (method) {
        method.attachToObject(self);
        method.setRequestManager(self._requestManager);
    });
}

var methods = function () {
    var accountList = new Method({
        name: 'accountList',
        call: 'pullup_account_list',
        params: 0,
    });

    var accountDetail = new Method({
        name: 'accountDetail',
        call: 'pullup_account_detail',
        params: 1,
        inputFormatter: [formatters.inputParamAddressFormatter],
    });

    var executeContract = new Method({
        name: 'executeContract',
        call: 'pullup_execute_contract',
        params: 1,
    });

    return [
        accountList, accountDetail, executeContract
    ];
}

module.exports = Local;