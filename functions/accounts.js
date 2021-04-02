/* eslint-disable no-undef */
/* eslint-disable camelcase */
const Sila = require("sila-sdk").default;
const firestore = require("./services/firebase");
Sila.configure(config);

const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({origin: true}));

async function sila_link_bank_account(userID, plaidToken) {
  const user = await firestore.getUserData(userID);
  // Plaid verification flow (recommended)
  const response = await Sila.linkAccount(
      user.sila_handle,
      user.private_key,
      plaidToken,
  ); // Account Name and Account Id parameters are not required
  return response;
}

async function sila_get_bank_accounts(userID) {
  const user = await firestore.getUserData(userID);
  const response = await Sila.getAccounts(user.sila_handle, user.private_key);

  return response;
}


module.exports = {
  sila_link_bank_account,
  sila_get_bank_accounts,
};
