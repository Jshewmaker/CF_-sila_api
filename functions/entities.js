const Sila = require('sila-sdk').default;
const db = require('./database');
const lib = require("./config");
const userConverter = require("./models/user");
const userTest = require("./models/user copy");
const authentication = require("./authentication");
Sila.configure(config);

register_user("4321");

async function check_handle(userID) {

    var res;

    do {
        var userHandle = createUserHandle();
        res = await Sila.checkHandle(userHandle);

    } while (res.statusCode != 200)

    var data = {
        "sila_handle": userHandle,
    }

    db.instance.collection('users').doc(userID).set(data, { merge: true })

    console.log(res.statusCode); // 200
    console.log(res.data.reference); // your unique id
    console.log(res.data.status); // SUCCESS
    console.log(res.data.message);
    return userHandle;

};


async function register_user(userID) {
    authentication.createUserEthData(userID); //connects to the db just fine

    //the rest is fucked 
    const postSnap = await db.instance.collection('users').doc(userID).get();
    let user = userTest.fromFirestore(postSnap);
    var test = user.test;

    // db.instance.collection('users').doc(userID).withConverter(userTestConverter).get().then(function (doc) {
    //     if (doc.exists) {
    //         console.log("SUCCESS")
    //         var userData = doc.data();
    //         const user = new Sila.User();
    //         user.handle = userData.sila_handle;
    //         user.firstName = userData.name;//.split(" ")[0];
    //         user.lastName = userData.name;//.split(" ")[1];
    //         user.address = userData.address;
    //         user.city = userData.city;
    //         user.state = userData.state;
    //         user.zip = userData.zip;
    //         user.phone = userData.phone;
    //         user.email = userData.email;
    //         user.dateOfBirth = userData.dateOfBirth;
    //         user.ssn = userData.identityValue;
    //         user.cryptoAddress = userData.wallet;
    //         var response = Sila.register(user);
    //         return response;
            
    //     } else {
    //         console.log("No such document!");
    //     }
    // }).catch(function (error) {
    //     console.log("Error getting document:", error);
    // });

}


async function check_kyc() {
    const res = await Sila.checkKYC(userHandle, walletPrivateKey);
}

function createUserHandle() {
    var randValue = Math.floor(100000 + Math.random() * 900000);
    console.log(`divvy-${randValue}`);
    return `divvy-${randValue}`;
}

module.exports = { check_handle };
