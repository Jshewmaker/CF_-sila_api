/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const Sila = require("sila-sdk").default;
const lib = require("./config");
const wallets = require("./wallets.js");
const firestore = require("./services/firebase");
Sila.configure(config);
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({origin: true}));


async function sila_issue(req) {
  const userID = req.user_id;
  const amount = req.amount;
  const user = await firestore.getUserData(userID);
  const response = await Sila.issueSila(
      amount,
      user.sila_handle,
      user.private_key,
      "default",
  );
  return response;
}

async function sila_transfer(req) {
  const userID = req.user_id;
  const amount = req.amount;
  const destinationHandle = req.destination_handle;
  const descriptor = req.descriptor;
  const user = await firestore.getUserData(userID);

  const response = await Sila.transferSila(
      amount,
      user.sila_handle,
      user.private_key,
      destinationHandle,
      "",
      "",
      descriptor,
      // businessUuid,
  );


  return response;
}

async function sila_redeem(req) {
  const userID = req.user_id;
  const amount = req.amount;
  const descriptor = req.descriptor;
  const user = await firestore.getUserData(userID);
  const reponse = await Sila.redeemSila(
      amount,
      user.sila_handle,
      user.private_key,
      "default",
      descriptor,
      // businessUuid,
      // processingType,
  );
  return reponse;
  /*
      Account Name is optional but defaults to 'default'.
      Descriptor is optional and sets the transaction description
      BusinessUuid is optional and sets the ACH Name of the transaction
      ProcessingType is optional and can be one of STANDARD_ACH or SAME_DAY_ACH
      */
}

async function sila_get_transactions(userID) {
  const user = await firestore.getUserData(userID);
  const response = await Sila.getTransactions(user.sila_handle, user.private_key); // Filters are optional. Use Sila.TransactionFilters for a complete list of possible filters
  return response;
}


module.exports = {
  sila_issue,
  sila_transfer,
  sila_redeem,
  sila_get_transactions,
};
