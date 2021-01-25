const Sila = require('sila-sdk').default;
// const db = require('./database');
const lib = require("./config");
const userConverter = require("./models/user");
const firestore = require("./services/firebase");
const authentication = require("./authentication");
// const admin = require("firebase-admin");
Sila.configure(config);

const functions = require("firebase-functions");
const entities = require("./entities.js")
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const { log } = require("firebase-functions/lib/logger");
const app = express();
app.use(cors({ origin: true }));



async function check_handle(userID) {

    var res;

    do {
        var userHandle = createUserHandle();
        res = await Sila.checkHandle(userHandle);

    } while (res.statusCode != 200)

    var data = {
        "sila_handle": userHandle,
    }

    admin.firestore().collection('users').doc(userID).set(data, { merge: true })

    console.log(res.statusCode); // 200
    console.log(res.data.reference); // your unique id
    console.log(res.data.status); // SUCCESS
    console.log(res.data.message);
    return userHandle;

};


async function register_user(userID) {

    await authentication.createUserEthData(userID);
    const user = await firestore.getUserData(userID);
    await registerSilaUser(user);
    return user.toJSON();

}

async function registerSilaUser(user) {
    const silaUser = new Sila.User();
    silaUser.handle = user.sila_handle;
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
    console.log("3: " + silaUser.cryptoAddress);
    console.log("response from sila: " + response.data.message);
}

async function check_kyc() {
    const res = await Sila.checkKYC(userHandle, walletPrivateKey);
}

function createUserHandle() {
    var randValue = Math.floor(100000 + Math.random() * 900000);
    console.log(`divvy-${randValue}`);
    return `divvy-${randValue}`;
}


module.exports = { check_handle, register_user };
