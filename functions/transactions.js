const Sila = require('sila-sdk').default;
const lib = require("./config");
const wallets = require("./wallets.js")
const firestore = require("./services/firebase");
Sila.configure(config);
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({ origin: true }));


async function sila_issue(req){
    const userID = req.user_id;
    const amount = req.amount;
    const user = await firestore.getUserData(userID);
    console.log("handle: " + user.sila_handle);
    console.log("private key: " + user.private_key);
    const response = await Sila.issueSila(
        amount,
        user.sila_handle,
        user.private_key,
        "default",
      );
    return response;
}

async function sila_transfer(req){
    const userID = req.user_id;
    console.log("userID: "+userID);
    const amount = req.amount;
    const destinationHandle = req.destination_handle;
    const descriptor = req.descriptor;
    const destinationUserID = req.destination_user_id;
    const user = await firestore.getUserData(userID);
    const destinationWalletResponse = wallets.sila_get_wallet(destinationUserID);
    const test =  destinationWalletResponse;
    return test;
    
    //const test =  JSON.parse(destinationWalletResponse);
    return test.data;
    const walletAddress = destinationWalletResponse.data.wallet.blockchain_address;

    const response = await Sila.transferSila(
        amount,
        user.sila_handle,
        user.private_key,
        destinationHandle,
        //walletNickname,
        walletAddress,
        descriptor,
        //businessUuid,
      );
      

    return response;
}

async function sila_redeem(userID){
    const walletResponse = await sila_get_wallet(userID);
    const address = walletResponse.data.wallet.blockchain_address;
    try{
        const response = await Sila.getSilaBalance(address);
        return response;
    }
    catch(_){
        return _;
    }
    
}

async function sila_get_transactions(userID){
    const walletResponse = await sila_get_wallet(userID);
    const address = walletResponse.data.wallet.blockchain_address;
    try{
        const response = await Sila.getSilaBalance(address);
        return response;
    }
    catch(_){
        return _;
    }
    
}



module.exports = {
    sila_issue,
    sila_transfer,
}