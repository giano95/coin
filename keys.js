let secp256k1 = require('secp256k1')
let { randomBytes } = require('crypto')
let { toBuffer } = require('./util')


let generatePrivateKey = () =>
{
    let privateKey

    do {
        privateKey = randomBytes(32) // get 32 random bytes
    } while (!secp256k1.privateKeyVerify(privateKey)) // if it's not a valid private key redo it

    return privateKey.toString('hex')
}

let generatePublicKey = (privateKey) =>
{
    return secp256k1.publicKeyCreate(toBuffer(privateKey)).toString('hex')
}

module.exports = {
    generatePrivateKey,
    generatePublicKey
}
