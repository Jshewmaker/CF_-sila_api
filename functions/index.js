const functions = require("firebase-functions");
const express = require("express");
const Sila = require('sila-sdk').default;
const cors = require("cors");
const admin = require("firebase-admin");
const { log } = require("firebase-functions/lib/logger");
admin.initializeApp();
const app = express();
app.use(cors({origin: true}));



app.post("/", async (req, res) => {

  const wallet = Sila.generateWallet();
  console.log(wallet.address);
 
  
  // const user = req.body;
  // await admin.firestore().collection("wtf").add(user);
  res.status(201).send();
  functions.logger.log("hello worlds");
});


app.put("/:id", async (req, res) => {
  const body = req.body;
  await
  admin.firestore().collection("wtf").doc(req.params.id).update(body);
  res.status(200).send();
});

app.delete("/:id", async (req, res) => {
  await
  admin.firestore().collection("wtf").doc(req.params.id).delete();

  res.status(200).send();
});

exports.user = functions.https.onRequest(app);
