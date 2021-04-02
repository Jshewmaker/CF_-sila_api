/* eslint-disable no-undef */
/* eslint-disable camelcase */
const Sila = require("sila-sdk").default;
// const lib = require("./config");
const firestore = require("./services/firebase");
Sila.configure(config);
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({origin: true}));


async function sila_get_wallet(userID) {
  const user = await firestore.getUserData(userID);
  const response = await Sila.getWallet(user.sila_handle, user.private_key);
  return response;
}

async function sila_get_balance(userID) {
  const walletResponse = await sila_get_wallet(userID);
  const address = walletResponse.data.wallet.blockchain_address;
  try {
    const response = await Sila.getSilaBalance(address);
    return response;
  } catch (_) {
    return _;
  }
}


module.exports = {
  sila_get_wallet,
  sila_get_balance,
};
