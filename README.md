# pullup-js-sdk

js sdk for pullup DApp market.

## Whate is pullup-js-sdk?

pullup-js-sdk provided to developers who need to develop DApps in the pullup DApp market. It provides an interface method for querying accounts and executing smart contract methods.

## How to use pullup-js-sdk

### Installation

#### nodejs

```
npm install pullup-js-sdk
````

### Usage

``` 
import Pullup from 'pullup-js-sdk'

...

let pullup = new Pullup();
pullup.setProvider(new pullup.providers.HttpProvider('http://127.0.0.1:2345'));

```


## Modules

>- pullup.local.* is for calling pullup local methods. eg: pullup.local.accountList is get all account list.
>- pullup.sero.* is for calling gero node rpc when execute smart contract. eg: pullup.sero.call().

If you need to call gero other rpc interfaces directly, you can use sero-web3

```
npm install sero-web3
```

## Document

### pullup.local.*

#### Data Struct

>- `PK` is the address of the account, can be used as a tag for the account, not as a transfer from address.
>- `MainPKr` can be used as a common address, `call` and `execute` smart contract.
>- `MainOldPKr` has Deprecated.
>- `Balance` is a map. key = currency ,value = Minimum unit amount. 
>- `PkrBase58` is Dynamic collection address. Refresh every time a transaction occurs.

```
let accounts = pullup.local.accountList();
```
Result: 
```
[{
	"PK": "kvaztfuz3ZS6sNcksQYZpdGC1rUwcuv1aPkuzkLdgeNSvq5FQiURuBsqghLCY3MkxZLNm7WQ9yV2ib2UWoRpJys",
	"MainPKr": "fHBQfR5t9j3D4CsKQG78sQ3Qzdz9SS6m3XsgvgkNcpKjD1TMBEVmcJ4vhDUpkZrvPtE47DnzxRjz4Gk7xMaGZfxstnMeBjZF1dWeQaC3dxLrPPa4wQoGdXeJuihdTKwxf5K",
	"MainOldPKr": "2QwcGasRUYwF3BdTDFh2gLAMYdayBRLqVhiKrBi7apqB1ftZmaUtLYN8AdTY87K3mGW2EZgh1tVCizzdy1HWM8fGBP9ZErPKawPUPexaVXqZqSa1uPbNXb5c755H1kCUn7c3",
	"Balance": {
		"SERO": 88999438296000000000
	},
	"UtxoNums": {
		"SERO": 2
	},
	"PkrBase58": "TXSgCTk7vVRDkVxmiPiWBakQtcrf5FJKcyRvGmfHh1SXBUnzopi6fqohd8K4ZCyEmvkVwzdZC2AdotcZh2B3XcnXZHRkUxrZQ76u1tzf1CURjtbchDbs4ZNRjTB86nvBGWK"
}, {
	"PK": "4xxrya2a8g6QLQuQBtdpyF49axHTnkUeDjomfk5zqG7eDZubPPubHMVkPqggZ9iE8Zy6WQVD7riRcX8TSfihs3nq",
	"MainPKr": "22ogQ9vrpiPxBgTep59koxnNzRmHAY2zi94EKp3VAhjo4r7bzETxbgqTfgUqHuuFAe5on4iagFAhXVfaooLH5JMLEhKSmzucPvHftgefGVTzAfDJLs53Pw7YnP2rcSSStxoT",
	"MainOldPKr": "Wubp9ZYJPdxLyyesrth4j3AsZVouNgt5NNgCBHiwqhUpN1ZhbmTLRWViUwxzvhpezKDgXi5ck7iXm3bjwLAHfRnSTC8FMhRTqPLvUs6vbXKXQ9VMpDefHLR4PDDLVotkbd9",
	"Balance": {},
	"UtxoNums": {},
	"PkrBase58": "22ogQ9vrpiPxBgTep59koxnNzRmHAY2zi94EKp3VAhjo4r7bzETxbgqTfgUqHuuFAe5on4iagFAhXVfaooLH5JMLEhKSmzucPvHftgefGVTzAfDJLs53Pw7YnP2rcSSStxoT"
}]
```


```
let account = pullup.local.accountDetail(`pk`);
```
Result: 
```
{
	"PK": "kvaztfuz3ZS6sNcksQYZpdGC1rUwcuv1aPkuzkLdgeNSvq5FQiURuBsqghLCY3MkxZLNm7WQ9yV2ib2UWoRpJys",
	"MainPKr": "fHBQfR5t9j3D4CsKQG78sQ3Qzdz9SS6m3XsgvgkNcpKjD1TMBEVmcJ4vhDUpkZrvPtE47DnzxRjz4Gk7xMaGZfxstnMeBjZF1dWeQaC3dxLrPPa4wQoGdXeJuihdTKwxf5K",
	"MainOldPKr": "2QwcGasRUYwF3BdTDFh2gLAMYdayBRLqVhiKrBi7apqB1ftZmaUtLYN8AdTY87K3mGW2EZgh1tVCizzdy1HWM8fGBP9ZErPKawPUPexaVXqZqSa1uPbNXb5c755H1kCUn7c3",
	"Balance": {
		"SERO": 88999438296000000000
	},
	"UtxoNums": {
		"SERO": 2
	},
	"PkrBase58": "TXSgCTk7vVRDkVxmiPiWBakQtcrf5FJKcyRvGmfHh1SXBUnzopi6fqohd8K4ZCyEmvkVwzdZC2AdotcZh2B3XcnXZHRkUxrZQ76u1tzf1CURjtbchDbs4ZNRjTB86nvBGWK",
}
```

### pullup.sero.*

Here need install serojs to `pack` and `unpack` data.
```
npm install serojs
```


```

// you can use remix solidity complie to web3deploy to get abi. and deploy with gero to get contract address.
let contractAddress = "54ZJqe8orGqAucdFqcZRupMa1WFeL6e5raCUw7FcBit9G9GZ5JFHXhNEKkhBPWRDEf1kDRLbX3qiPqSJ5H5Kasit";
let contract = serojs.callContract(abi, contractAddress);

// execute contract methods
execute(method, args) {
        let that = this;
        try{
            let packData = contract.packData(method, args);
            let executeData = {
                from: that.state.fromPKr,
                to: contractAddress,
                value: "0x0",//SERO
                data: packData,
                gas_price: "0x"+new BigNumber("1000000000").toString(16),
            };
            executeData["gas"] = pullup.sero.estimateGas(executeData);
            let res = pullup.local.executeContract(executeData);

            return res;
        }catch (e) {
            alert(e.message);
        }
    }

// call contract methods
call(method, args) {
    let that = this;
    try{
        let packData = contract.packData(method, args);
        let callParams = {
            from: that.state.fromPKr,
            to: contractAddress,
            data: packData
        }
        console.log(callParams);
        let callData = pullup.sero.call(callParams, "latest");
        if (callData !== "0x") {
            let res = contract.unPackData(method, callData);
            return res;
        }
        return "";
    }catch (e) {
        alert(e.message);
    }
}

```

### More Info 

Please refer to the example directory
