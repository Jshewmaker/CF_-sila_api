/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable camelcase */
const Sila = require("sila-sdk").default;
// const db = require('./database');
const lib = require("./config");
const userConverter = require("./models/user");
const firestore = require("./services/firebase");
const authentication = require("./authentication");
// const admin = require("firebase-admin");
Sila.configure(config);

const functions = require("firebase-functions");
const entities = require("./entities.js");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const {log} = require("firebase-functions/lib/logger");
const app = express();
app.use(cors({origin: true}));


async function sila_check_handle() {
  let res;

  do {
    var userHandle = createUserHandle();
    res = await Sila.checkHandle(userHandle);
  } while (res.statusCode != 200);


  return userHandle;
}


async function sila_register_user(user, userHandle) {
  const silaUser = new Sila.User();
  silaUser.handle = userHandle;
  silaUser.firstName = user.name.split(" ")[0];
  silaUser.lastName = user.name.split(" ")[1];
  silaUser.address = user.street_address;
  silaUser.city = user.city;
  silaUser.state = user.state;
  silaUser.zip = user.postal_code;
  silaUser.phone = user.phone;
  silaUser.email = user.email;
  silaUser.dateOfBirth = user.date_of_birth;
  silaUser.ssn = user.identity_value;
  silaUser.cryptoAddress = user.wallet;
  response = await Sila.register(silaUser);
  console.log("registerUSer response from sila: " + response.data.message);
  return response;
}

async function sila_request_kyc(userID) {
  const user = await firestore.getUserData(userID);
  const res = await Sila.requestKYC(user.sila_handle, user.private_key);
  console.log("requestKYC response from sila: " + res.data.message);
  return res;
}
async function sila_get_entity(userID) {
  const user = await firestore.getUserData(userID);
  const res = await Sila.getEntity(user.sila_handle, user.private_key);
  console.log("requestKYC response from sila: " + res.data.message);
  return res;
}

async function sila_check_kyc(userID) {
  const user = await firestore.getUserData(userID);
  const res = await Sila.checkKYC(user.sila_handle, user.private_key);
  console.log("checkKYC response from sila: " + res.data.message);
  return res;
}

async function sila_add_email(userID, email) {
  const user = await firestore.getUserData(userID);
  const res = await Sila.addEmail(user.sila_handle, user.private_key, email);
  console.log("addEmail response from sila: " + res.data.message);
  return res;
}

async function sila_add_phone(userID, phone) {
  const user = await firestore.getUserData(userID);
  const res = await Sila.addPhone(user.sila_handle, user.private_key, phone);
  console.log("addPhone response from sila: " + res.data.message);
  return res;
}

async function sila_add_identity(userID, identity) {
  const user = await firestore.getUserData(userID);
  const ssn = {
    uuid: "30e14438-8e89-4d59-a4c5-9de76cd5b115",
    alias: "SSN",
    value: "968927541",
  };
  const res = await Sila.updateIdentity(user.sila_handle, user.private_key, ssn);
  console.log(ssn.alias) + ssn.value;
  console.log("addIdentity response from sila: " + res.data.message);
  return res;
}

// eslint-disable-next-line camelcase
async function sila_add_address(userID, address) {
  const user = await firestore.getUserData(userID);
  // eslint-disable-next-line max-len
  const res = await Sila.addAddress(user.sila_handle, user.private_key, address);
  console.log("addAddress response from sila: " + res.data.message);
  return res;
}
function createUserHandle() {
  const randValue = Math.floor(100000 + Math.random() * 900000);
  console.log(`divvy-${randValue}`);
  return `divvy-${randValue}`;
}

async function register_user(userID) {
  const userHandle = await sila_check_handle();
  await authentication.createUserEthData(userID);
  const user = await firestore.getUserData(userID);
  const response = await sila_register_user(user, userHandle);
  // eslint-disable-next-line no-constant-condition
  if (response.staus_code = 200) {
    const data = {
      "sila_handle": userHandle,
    };

    await admin.firestore().collection("users").doc(user.id).set(data, {merge: true});
  }
  return user.toJSON();
}


module.exports = {check_handle: sila_check_handle, register_user, sila_request_kyc, sila_check_kyc, sila_add_email, sila_add_phone, sila_add_identity, sila_add_address, sila_get_entity};
