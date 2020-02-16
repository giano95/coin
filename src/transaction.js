let secp256k1 = require('secp256k1')
let { toBuffer } = require('./util')
let { createHash } = require('crypto')


// tx => transaction
//
// Transaction data structure
// {
//    amount, sender, receiver, nonce, signature    
// }

let hashTx = (tx) =>
{
    return toBuffer(createHash('sha256').update(tx.toString()).digest('hex'))
}

let signTx = (privateKey, tx) =>
{
    let txHash = hashTx(tx)
    let { signature } = secp256k1.sign(txHash, toBuffer(privateKey)) // create the signature

    let signedTx = Object.assign({}, tx) // make a copy of the transaction
    signedTx.signature = signature.toString('hex') // add the signature field

    return signedTx
}

let verifyTx = (tx) =>
{
    let rawTx = Object.assign({}, tx) // make a copy of the transaction

    delete rawTx.signature      // remove the originale signature of the transaction -->
    let txHash = hashTx(rawTx)  // --> in order to get the original hash 

    // verify the signature by using the original hash and the private key associated to the public key (sender)
    return secp256k1.verify(txHash, toBuffer(tx.signature), toBuffer(tx.sender))
}

let fullyVerifyTx = (tx, senderBalance, nonce) =>
{
    if(!verifyTx(tx))
        return false
    else if (tx.sender === tx.receiver)
        return false
    else if (!Number.isInteger(tx.amount) || tx.amount < 0 || tx.amount > senderBalance)
        return false
    else if (tx.nonce !== nonce)
        return false
    else
        return true
}

module.exports = {
    signTx,
    verifyTx,
    fullyVerifyTx
}
