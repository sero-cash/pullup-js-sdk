var Pullup = require("../../index");
var BigNumber = require("bignumber.js");
var abi = require("./SRC20-ABI");
var data = require("./SRC20-data");
var serojs = require("serojs");

var pullup = new Pullup();
pullup.setProvider(new pullup.providers.HttpProvider('http://127.0.0.1:2345'));


// define base account
var from = "56k6dtdD4uhx4L45jNCGpiXmbMUuEPm1c3Y1cnYJx8y17buxNi7JuFPUaqKmBr7cExPmxqurLs3cPoSMPspkDqge";
var mainPKr = "fHBQfR5t9j3D4CsKQG78sQ3Qzdz9SS6m3XsgvgkNcpKjD1TMBEVmcJ4vhDUpkZrvPtE47DnzxRjz4Gk7xMaGZfxstnMeBjZF1dWeQaC3dxLrPPa4wQoGdXeJuihdTKwxf5K";
var methods = ["name", "symbol", "totalSupply", "balanceOf", "decimals"];
var contractAddress = "UFsgesDBcSNhHVj8pPspPE3iBmigMcU95U2ZK892GBHgkwGyYebGueTJjD8MAs9ZqLT2EhvSsmdWHZ3iSJLsFEY";
var contract = serojs.callContract(abi, contractAddress)

// ========== test SRC20 Token packMethod
testSRC20();

transfer();

function testSRC20() {
    console.log("====================== Result SEROJS Begin ==========================");
    for (let method of methods) {
        console.log(method, " = ", call(contract, method, []));
    }
    console.log("====================== Result SEROJS End ==========================");
}

/**
 *
 ====================== Result SEROJS Begin ==========================
 name  =  SLS
 symbol  =  JSLSJD
 totalSupply  =  BigNumber { s: 1, e: 21, c: [ 10000000 ] }
 balanceOf  =  BigNumber { s: 1, e: 20, c: [ 9900000 ] }
 decimals  =  BigNumber { s: 1, e: 1, c: [ 19 ] }
 ====================== Result SEROJS End ==========================
 */

function call(contract, method, args) {
    var packData = contract.packData(method, args);
    var callParams = {
        from: mainPKr,
        to: contractAddress,
        data: packData
    }
    var callData = pullup.sero.call(callParams, "latest");
    if (callData !== "0x") {
        var res = contract.unPackData(method, callData);
        return res;
    }
    return "";
}

function execute(contract, method, args) {
    var packData = contract.packData(method, args);
    var executeData = {
        from: mainPKr,
        to: contractAddress,
        value: "0x0",//SERO
        data: packData,
        gas_price: "0x"+new BigNumber("1000000000").toString(16),
    };
    var estimateGas = pullup.sero.estimateGas(estimateParam);
    executeData["gas"] = new BigNumber(estimateGas, 16).toString(10);
    var res = pullup.local.executeContract(executeData)
    return res;
}


function transfer() {
    var _contractAddress = contractAddress;
    var _toAddress = '2QSNnS98Vdj29kX8Ps4xWLP6SCjjYiQVFLwtHcoxevxrQyEi8z21Tycw8gd9xzMGU9XJQASa5VMtehmhgyRqNxgvP7fjF7AkK3cag9BgX1Fjhvv3rmaLbqyXqPcdpCcs17GS';
    var _value = '0x0';
    var _decimal = new BigNumber(10).pow(18);//SERO
    if (_contractAddress && _toAddress && _value && from) {
        var args = [
            _toAddress,
            "0x" + new BigNumber(_value).multipliedBy(_decimal).toString(16)
        ];
        var res = execute(contract, "transfer", args)
        console.log(res);
    }
}
