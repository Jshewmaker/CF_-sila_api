const EthCrypto = require('eth-crypto');

const firestore = require("./services/firebase");
const admin = require("firebase-admin");

async function createUserEthData(userID) {
  const identity = EthCrypto.createIdentity();
  var data = {
    "wallet": identity.address,
    "private_key": identity.privateKey,
    "public_key": identity.publicKey,
  }
  console.log("1: " + identity.address);

  await admin.firestore().collection('users').doc(userID).set(data, { merge: true });


  /* > {
    address: '0x3f243FdacE01Cfd9719f7359c94BA11361f32471',
    privateKey: '0x107be946709e41b7895eea9f2dacf998a0a9124acbb786f0fd1a826101581a07',
    publicKey: 'bf1cc3154424dc22191941d9f4f50b063a2b663a2337e5548abea633c1d06ece...'
} */
}

module.exports = { createUserEthData }