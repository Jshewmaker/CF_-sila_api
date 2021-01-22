const EthCrypto = require('eth-crypto');

function createUserPrivateKey() {
    const identity = EthCrypto.createIdentity();
    /* > {
      address: '0x3f243FdacE01Cfd9719f7359c94BA11361f32471',
      privateKey: '0x107be946709e41b7895eea9f2dacf998a0a9124acbb786f0fd1a826101581a07',
      publicKey: 'bf1cc3154424dc22191941d9f4f50b063a2b663a2337e5548abea633c1d06ece...'
  } */
}