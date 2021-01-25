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



async function check_handle() {

    var res;

    do {
        var userHandle = createUserHandle();
        res = await Sila.checkHandle(userHandle);

    } while (res.statusCode != 200)


    return userHandle;

};


async function register_user(userID) {
    var userHandle = await check_handle();
    await authentication.createUserEthData(userID);
    const user = await firestore.getUserData(userID);
    var response = await registerSilaUser(user, userHandle);
    if (response.staus_code = 200) {

        var data = {
            "sila_handle": userHandle,
        }

        await admin.firestore().collection('users').doc(user.id).set(data, { merge: true });
    }
    return user.toJSON();

}

async function registerSilaUser(user, userHandle) {
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
    console.log("response from sila: " + response.data.message);
    return response;

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
