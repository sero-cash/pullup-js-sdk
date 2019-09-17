var Pullup = require("../../index");

var pullup = new Pullup();

pullup.setProvider(new pullup.providers.HttpProvider('http://127.0.0.1:2345'));

//Query Account List
console.log(pullup.local.accountList());

//Query Account Detail
console.log("Detail: ",pullup.local.accountDetail('56k6dtdD4uhx4L45jNCGpiXmbMUuEPm1c3Y1cnYJx8y17buxNi7JuFPUaqKmBr7cExPmxqurLs3cPoSMPspkDqge'));

