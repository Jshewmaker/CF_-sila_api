const admin = require("firebase-admin");
admin.initializeApp();
const instance = admin.firestore();
module.exports = {instance};