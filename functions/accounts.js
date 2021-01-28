const Sila = require('sila-sdk').default;
const lib = require("./config");
const userConverter = require("./models/user");
const firestore = require("./services/firebase");
const authentication = require("./authentication");
Sila.configure(config);

const functions = require("firebase-functions");
const entities = require("./entities.js")
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const { log } = require("firebase-functions/lib/logger");
const app = express();
app.use(cors({ origin: true }));

async function sila_link_bank_account(userID, plaidToken){
    const user = await firestore.getUserData(userID);
// Plaid verification flow (recommended)
const response = await Sila.linkAccount(
    user.sila_handle,
    user.private_key,
    plaidToken,
  ); // Account Name and Account Id parameters are not required
  return response;
}

async function sila_get_bank_accounts(userID){
    const user = await firestore.getUserData(userID);
    const response = await Sila.getAccounts(user.sila_handle, user.private_key);

    return response;
}



module.exports = {
    sila_link_bank_account,
    sila_get_bank_accounts,
}