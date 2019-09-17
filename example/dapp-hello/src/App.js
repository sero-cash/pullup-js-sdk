import React, {Component} from 'react';
import './App.css';
import Pullup from 'pullup-js-sdk'
import serojs from 'serojs'
import abi from './ABI'
import BigNumber from 'bignumber.js'

let pullup = new Pullup();
pullup.setProvider(new pullup.providers.HttpProvider('http://127.0.0.1:2345'));

let contractAddress = "54ZJqe8orGqAucdFqcZRupMa1WFeL6e5raCUw7FcBit9G9GZ5JFHXhNEKkhBPWRDEf1kDRLbX3qiPqSJ5H5Kasit";
let contract = serojs.callContract(abi, contractAddress);

let acmap = [];
class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fromPK: '',
            fromPKr: '',
            selectAccount:'',
            name:"",
            res:"",
        }
    }

    componentDidMount() {

        this.getAccounts();
    }

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

    getAccounts(){
        let accounts = pullup.local.accountList();
        let acArr = [];
        let i = 0 ;
        for (let account of accounts){
            console.log(account);
            if (i == 0){
                this.setState({
                    fromPK:account.PK,
                    fromPKr:account.MainPKr,
                })
            }
            acArr.push(<option value={account.MainPK} key={i++} >{account.PK}</option>)
            acmap[account.PK] = account.MainPKr;
        }
        this.setState({
            selectAccount:acArr,
        })
    }

    setName(){
        let name = this.state.name;
        console.log("name:",name);
        if (name){
            var hash = this.execute('setName',[name]);
            if(hash){
                alert("submit tx successful,hash :"+hash);
            }

        }
    }

    sayHello(){
        let res = this.call("sayHello",[]);
        alert(res);
    }


    render(){
        return (
            <div className="App">
                Select Account:
                <select onChange={(e)=>{
                    let PK= e.target.value;
                    let mainPKr = acmap[PK];
                    console.log(mainPKr)
                    this.setState({
                        fromPK:PK,
                        fromPKr:mainPKr
                    })
                }}>
                    {this.state.selectAccount}
                </select>
                <br/><br/>
                <span>Name</span><input type="text" onBlur={(o)=>{
                    this.setState({
                        name:o.target.value
                    })
                }}/>
                <br/><br/>
                <button onClick={()=>this.setName()}>Set Name</button>
                <br/><br/>

                <button onClick={()=>this.sayHello()}>Say Hello</button>
                <br/><br/>
                <h2>{this.state.res}</h2>
            </div>
        );
    }


}

export default App;
