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



async function sila_check_handle() {

    var res;

    do {
        var userHandle = createUserHandle();
        res = await Sila.checkHandle(userHandle);

    } while (res.statusCode != 200)


    return userHandle;

};




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
    console.log("response from sila: " + response.data.message);
    return response;

}

async function sila_request_kyc(userID) {
    const user = await firestore.getUserData(userID);
    const res = await Sila.requestKYC(user.sila_handle, user.private_key);
    console.log("response from sila: " + res.data.message);
    return res;
}

function createUserHandle() {
    var randValue = Math.floor(100000 + Math.random() * 900000);
    console.log(`divvy-${randValue}`);
    return `divvy-${randValue}`;
}

async function register_user(userID) {
    var userHandle = await sila_check_handle();
    await authentication.createUserEthData(userID);
    const user = await firestore.getUserData(userID);
    var response = await sila_register_user(user, userHandle);
    if (response.staus_code = 200) {

        var data = {
            "sila_handle": userHandle,
        }

        await admin.firestore().collection('users').doc(user.id).set(data, { merge: true });
    }
    return user.toJSON();

}


module.exports = { check_handle: sila_check_handle, register_user, sila_request_kyc };
