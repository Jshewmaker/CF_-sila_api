const functions = require("firebase-functions");
const entities = require("./entities.js");
const accounts = require("./accounts.js");
const wallets = require("./wallets.js");
const transactions = require("./transactions.js");
const express = require("express");
// const Sila = require('sila-sdk').default;
const cors = require("cors");
const admin = require("firebase-admin");
const testFunctions = require("./testing_helpers.js");
// const { log } = require("firebase-functions/lib/logger");
const app = express();
app.use(cors({origin: true}));
admin.initializeApp();


// "id": '0Woej2JWoWVsxmRhqm4tkado5MQ2',
// "token": "public-sandbox-05542b25-2ff0-48ce-b58a-6ad0bf572c16"


// ///////////////////////////////////////////////////////////////////////////
// Test Functions

app.post("/", async (req, res) => {
  const userData = await entities.register_user("0Woej2JWoWVsxmRhqm4tkado5MQ2");
  res.status(200).send(JSON.stringify(userData));
});

app.post("/create_test_user", async (req, res) => {
  await testFunctions.testAddDataToFirestore();
  res.status(200).send();
});

app.post("/check_handle", async (req, res) => {
  const userID = req.body.user_id;
  const userHandle = await entities.check_handle(userID);
  functions.logger.log(userHandle);
  const responseBody = {"user_handle": userHandle};
  res.status(200).send(responseBody);
});


// ///////////////////////////////////////////////////////////////////////////
// Entities


app.post("/register_user", async (req, res) => {
  const userID = req.body.user_id;
  const userData = await entities.register_user(userID);
  res.set(userData.headers);
  res.status(userData.statusCode).send(JSON.stringify(userData.data));
});

app.post("/request_kyc", async (req, res) => {
  const userID = req.body.user_id;
  const userData = await entities.sila_request_kyc(userID);
  res.set(userData.headers);
  res.status(userData.statusCode).send(JSON.stringify(userData.data));
});

app.post("/check_kyc", async (req, res) => {
  const userID = req.body.user_id;
  const userData = await entities.sila_check_kyc(userID);
  res.set(userData.headers);
  res.status(userData.statusCode).send(JSON.stringify(userData.data));
});

app.post("/update/email", async (req, res) => {
  const userID = req.body.user_id;
  const email = req.body.email;
  const userData = await entities.sila_add_email(userID, email);
  res.set(userData.headers);
  res.status(userData.statusCode).send(JSON.stringify(userData.data));
});

app.post("/update/phone", async (req, res) => {
  const userID = req.body.user_id;
  const phone = req.body.phone;
  const userData = await entities.sila_add_phone(userID, phone);
  res.set(userData.headers);
  res.status(userData.statusCode).send(JSON.stringify(userData.data));
});

/*
{
"user_id": "0Woej2JWoWVsxmRhqm4tkado5MQ2",
"alias": "SSN",
"value": "123235123"
}
*/
app.post("/update/identity", async (req, res) => {
  const userID = req.body.user_id;

  const userData = await entities.sila_add_identity(userID, req.body);
  res.set(userData.headers);
  res.status(userData.statusCode).send(JSON.stringify(userData.data));
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
  const userID = req.body.user_id;
  const userData = await entities.sila_add_address(userID, req.body);
  res.set(userData.headers);
  res.status(userData.statusCode).send(JSON.stringify(userData.data));
});


// ///////////////////////////////////////////////////////////////////////////
// Accounts

/*
Body:
{
    "user_id": "0Woej2JWoWVsxmRhqm4tkado5MQ2",
   "token": "public-sandbox-b7c81247-88a7-42d5-b1b1-6331fdcbf474"
}
*/
app.post("/link_bank_account", async (req, res) => {
  const userID = req.body.user_id;
  const plaidToken = req.body.token;
  const userData = await accounts.sila_link_bank_account(userID, plaidToken);
  res.set(userData.headers);
  res.status(userData.statusCode).send(JSON.stringify(userData.data));
});

app.post("/get_bank_accounts", async (req, res) => {
  const userID = req.body.user_id;

  const userData = await accounts.sila_get_bank_accounts(userID);
  res.set(userData.headers);
  res.status(userData.statusCode).send(JSON.stringify(userData.data));
});

// ///////////////////////////////////////////////////////////////////////////
// Wallets


app.post("/get_wallet", async (req, res) => {
  const userID = req.body.user_id;
  const userData = await wallets.sila_get_wallet(userID);
  res.set(userData.headers);
  res.status(userData.statusCode).send(JSON.stringify(userData.data));
});

app.post("/get_sila_balance", async (req, res) => {
  const userID = req.body.user_id;
  const userData = await wallets.sila_get_balance(userID);
  res.set(userData.headers);
  res.status(userData.statusCode).send(JSON.stringify(userData.data));
});


// ///////////////////////////////////////////////////////////////////////////
// Transactions

/*
Body:
{
    "user_id": "0Woej2JWoWVsxmRhqm4tkado5MQ2",
   "amount": "100"
}
*/
app.post("/issue_sila", async (req, res) => {
  const userData = await transactions.sila_issue(req.body);
  res.set(userData.headers);
  res.status(userData.statusCode).send(JSON.stringify(userData.data));
});

app.post("/transfer_sila", async (req, res) => {
  const userData = await transactions.sila_transfer(req.body);
  res.set(userData.headers);
  res.status(userData.statusCode).send(JSON.stringify(userData.data));
});

app.post("/redeem_sila", async (req, res) => {
  const userData = await transactions.sila_redeem(req.body);
  res.set(userData.headers);
  res.status(userData.statusCode).send(JSON.stringify(userData.data));
});

app.post("/get_transactions", async (req, res) => {
  const userID = req.body.user_id;
  const userData = await transactions.sila_get_transactions(userID);
  res.set(userData.headers);
  res.status(userData.statusCode).send(JSON.stringify(userData.data));
});

app.post("/get_entity", async (req, res) => {
  const userID = req.body.user_id;
  const userData = await entities.sila_get_entity(userID);
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
