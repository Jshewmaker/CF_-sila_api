/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const firestore = require("./services/firebase");
const admin = require("firebase-admin");


async function testAddDataToFirestore() {
  const data = {
    "id": "0Woej2JWoWVsxmRhqm4tkado5MQ2",
    "name": "Joshua Shewmaker",
    "date_of_birth": "1991-12-11",
    "identity_value": "134763456",
    "street_address": "344 E Camborne",
    "city": "Ferndale",
    "state": "MI",
    "country": "US",
    "postal_code": "43882",
    "phone": "345-653-6865",
    "email": "test@test.com",
    "private_key": "0x683a7bb9a3b02ac4be462c6e5009ef5c3e02685e0f77bbcc7c8d3f1ee4692893",
    "public_key": "0366cc7b8674d34248d2d7ed30076fe597dcabed8b84d0899de27dd476e78d1c38b64ee2cfbbadb5cf1132012e0422aef0641c7c95ec2701226ed2c1c28031e0",
    "sila_handle": "divvy-295074",
    "wallet": "0x6913842Ce67aA3CE7398551Fe96C0CE537cb0dA0",
  };
  await admin.firestore().collection("users").doc("0Woej2JWoWVsxmRhqm4tkado5MQ2").set(data);
}

module.exports = {testAddDataToFirestore};

