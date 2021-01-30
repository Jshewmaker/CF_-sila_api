const functions = require("firebase-functions");
const entities = require("./entities.js")
const accounts = require("./accounts.js")
const wallets = require("./wallets.js")
const transactions = require("./transactions.js")
const express = require("express");
const Sila = require('sila-sdk').default;
const cors = require("cors");
const admin = require("firebase-admin");
const testFunctions = require("./testing_helpers.js");
const { log } = require("firebase-functions/lib/logger");
const app = express();
app.use(cors({origin: true}));
admin.initializeApp();


// "id": '0Woej2JWoWVsxmRhqm4tkado5MQ2',
//"token": "public-sandbox-05542b25-2ff0-48ce-b58a-6ad0bf572c16"

app.post('/', async (req, res) => {
  var userData = await entities.register_user("0Woej2JWoWVsxmRhqm4tkado5MQ2");
  res.status(200).send(JSON.stringify(userData));
});



app.post("/create_test_user", async (req, res) => {
  await testFunctions.testAddDataToFirestore();
  res.status(200).send();
});

app.post("/check_handle", async (req, res) => {
  var userID = req.body.user_id;
  var userHandle = await entities.check_handle(userID);
  functions.logger.log(userHandle);
  var responseBody = {"user_handle" : userHandle};
  res.status(200).send(responseBody);
});

app.post("/register_user", async (req, res) => {
  var userID = req.body.user_id;
  var userData = await entities.register_user(userID);
  res.status(200).send(JSON.stringify(userData));
});

app.post("/request_kyc", async (req, res) => {
  var userID = req.body.user_id;
  var userData = await entities.sila_request_kyc(userID);
  res.status(200).send(JSON.stringify(userData));
});

app.post("/check_kyc", async (req, res) => {
  var userID = req.body.user_id;
  var userData = await entities.sila_check_kyc(userID);
  res.status(200).send(JSON.stringify(userData));
});

app.post("/update/email", async (req, res) => {
  var userID = req.body.user_id;
  var email = req.body.email;
  var userData = await entities.sila_add_email(userID, email);
  res.status(200).send(JSON.stringify(userData));
});

app.post("/update/phone", async (req, res) => {
  var userID = req.body.user_id;
  var phone = req.body.phone;
  var userData = await entities.sila_add_phone(userID, phone);
  res.status(200).send(JSON.stringify(userData));
});

/*
{
"user_id": "0Woej2JWoWVsxmRhqm4tkado5MQ2",
"alias": "SSN",
"value": "123235123"
}
*/
app.post("/update/identity", async (req, res) => {
  var userID = req.body.user_id;
  
  var userData = await entities.sila_add_identity(userID, req.body);
  res.status(200).send(JSON.stringify(userData));
});

/*
{
    "user_id": "0Woej2JWoWVsxmRhqm4tkado5MQ2",
    "alias": "home",
    "street_address_1": "324 Songbird Avenue",
    "city": "Portland",
    "state": "VA",
    "postal_code": "12345",
    "country": "US"
}
*/
app.post("/update/address", async (req, res) => {
  var userID = req.body.user_id;
  var userData = await entities.sila_add_address(userID, req.body);
  res.status(200).send(JSON.stringify(userData));
});

app.post("/link_bank_account", async (req, res) => {
  var userID = req.body.user_id;
  var plaidToken = req.body.token;
  var userData = await accounts.sila_link_bank_account(userID, plaidToken);
  res.status(200).send(JSON.stringify(userData));
});

app.post("/get_bank_accounts", async (req, res) => {
  var userID = req.body.user_id;
  
  var userData = await accounts.sila_get_bank_accounts(userID);
  res.status(200).send(JSON.stringify(userData));
});

/////////////////////////////////////////////////////////////////////////////
//Wallets


app.post("/get_wallet", async (req, res) => {
  var userID = req.body.user_id;
  var userData = await wallets.sila_get_wallet(userID);
  res.status(200).send(JSON.stringify(userData));
});

app.post("/get_sila_balance", async (req, res) => {
  var userID = req.body.user_id;
  var userData = await wallets.sila_get_balance(userID);
  res.status(200).send(JSON.stringify(userData));
});



/////////////////////////////////////////////////////////////////////////////
//Transactions


app.post("/issue_sila", async (req, res) => {
  var userData = await transactions.sila_issue(req.body);
  res.set(userData.headers);
  res.status(userData.statusCode).send(JSON.stringify(userData.data));});

app.post("/transfer_sila", async (req, res) => {
  var userData = await transactions.sila_transfer(req.body);
  res.set(userData.headers);
  res.status(userData.statusCode).send(JSON.stringify(userData.data));});

app.post("/redeem_sila", async (req, res) => {
  var userData = await transactions.sila_redeem(req.body);
  res.set(userData.headers);
  res.status(userData.statusCode).send(JSON.stringify(userData.data));});

app.post("/get_transactions", async (req, res) => {
  var userID = req.body.user_id;
  var userData = await transactions.sila_get_transactions(userID);
  res.set(userData.headers);
  res.status(userData.statusCode).send(JSON.stringify(userData.data));
});







// app.post("/", async (req, res) => {
//   const wallet = Sila.generateWallet();
//   console.log(wallet.address);
 
  
//   // const user = req.body;
//   // await admin.firestore().collection("wtf").add(user);
//   res.status(201).send();
//   functions.logger.log("hello worlds");
// });


// app.put("/:id", async (req, res) => {
//   const body = req.body;
//   await
//   admin.firestore().collection("wtf").doc(req.params.id).update(body);
//   res.status(200).send();
// });

// app.delete("/:id", async (req, res) => {
//   await
//   admin.firestore().collection("wtf").doc(req.params.id).delete();

//   res.status(200).send();
// });

 

exports.user = functions.https.onRequest(app);
