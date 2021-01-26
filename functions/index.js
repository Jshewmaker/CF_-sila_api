const functions = require("firebase-functions");
const entities = require("./entities.js")
const express = require("express");
const Sila = require('sila-sdk').default;
const cors = require("cors");
const admin = require("firebase-admin");
const testFunctions = require("./testing_helpers.js");
const { log } = require("firebase-functions/lib/logger");
const app = express();
app.use(cors({origin: true}));
admin.initializeApp();



app.get('/', async (req, res) => {
  var userData = await entities.register_user("1234");
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
