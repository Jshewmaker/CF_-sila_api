/* eslint-disable no-async-promise-executor */
/* eslint-disable no-undef */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable max-len */
const Sila = require("sila-sdk").default;
const userConverter = require("../models/user");
Sila.configure(config);

const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const app = express();
app.use(cors({origin: true}));

function getUserData(userID) {
  return new Promise(async (resolve, reject) => {
    admin.firestore().collection("users").doc(userID).withConverter(userConverter.userConverter).get().then(function(doc) {
      if (doc.exists) {
        const userData = doc.data();
        resolve(userData);
      } else {
        console.log("No such document!");
        reject("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
      reject("Error getting document:", error);
    });
  });
}


module.exports = {getUserData};
