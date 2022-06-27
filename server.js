//initialising express
const express= require('express')
const app =express()
app.use(express.json())
var Web3=require('web3');
const Provider=require('@truffle/hdwallet-provider');
const SmartContractAddress="0x771c2717B3afF8B1159D4e239CF0C4c38B674a0c";
var SmartContractABI= [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "patientarray",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "patientid",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "fullname",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "adds",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "gender",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_patientid",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_fullname",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_adds",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_gender",
          "type": "string"
        }
      ],
      "name": "addPatient",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
var address="0xA53fb38d97135515C1817288e329b8B5ba42E3F9";
var privatekey="17b820ebc5a9b9cea86b60eb794f73632a8b6143e63426070c62103389d32ae1";
var rpcurl="HTTP://127.0.0.1:7545";

//using sql query for getting the rows in the data

const {Client}=require('pg')

const client=new Client({
    host:"localhost",
    port:5432,
    user:"postgres",
    password:"123",
    database:"postgres"
})

var someVar = [];
client.on('connect',function(err){
    if(!err){
        console.log('connected');
        client.query(`SELECT * FROM myfirsttable`, async (err, result)=> {
            if (err) throw err;
            //console.log(result.rows);
                sendData(result.rows);
          })
        
        app.listen(5500, () => {
            console.log('listening on port 5500');
         })
    }

});




const sendData=async(element)=>{
    console.log("in function");
    var provider=new Provider(privatekey,rpcurl);
    var web3= new Web3(provider);
    var myContract=new web3.eth.Contract(SmartContractABI,SmartContractAddress);
    for(let i=0;i<element.length;i++)
    {
        console.log(element[i]);
        var receipt=await myContract.methods.addPatient(Number(element[i].personid),element[i].fullname,element[i].address,element[i].gender).send({from:address});
    }
}
client.connect();



