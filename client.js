let { addWallet, getAllWallets, getWallet } = require('./wallet')     // Wallet module: user written
let { signTx } = require('./transaction')   // Transaction module: user written
let { connect } = require('lotion')         // LotionClient module: necessary to connect to our Lotion application
let GCI = '0b8701fde1ff9b42bcc4b003fd61ca5de7ca81b334db021243d8428e1a4f6988' // Global Chain Identifier: identifies our application from any computer in the world


// tmp
let sender = {
    privateKey: 'b5fe383249dcf819245804b9711c366b9cee2254a2a266e72cc4b0c9fe6c23b7',
    publicKey: '036f4e8e4f959ffd8457ae1401a05fdabd776fe154470f22d817f4c7d6b0839596'
}

// send a certain amount of coin from the sender's wallet to the receiver's wallet
let sendCoin = async (senderWallet, receiver, amount) =>
{
    let sender = senderWallet.publicKey
    let privateKey = senderWallet.privateKey

    let { state, send } = await connect(GCI)
    let nonce = await state.nonces[sender] || 0

    let tx = { amount, sender, receiver, nonce }
    let signedTx = signTx(privateKey, tx)

    let result = await send(signedTx)
    return result
}

// return the state of the blockchain
let getState = async () =>
{
    let { state } = await connect(GCI)
    
    return await state
}

// return the balance of a certain wallet
let getBalance = async (publicKey) =>
{
    let { state } = await connect(GCI)

    return await state.balances[publicKey] || 0
}



//sendCoin(sender, getWallet('giano').publicKey, 1)
getState().then(state => {console.log(state)})
getBalance(getWallet('giano').publicKey).then(balance => {console.log('giano: ' + balance)})
getBalance(getWallet('campa').publicKey).then(balance => {console.log('campa: ' + balance)})
getBalance(getWallet('luca').publicKey).then(balance => {console.log('luca: ' + balance)})
//console.log(getAllWallets())
//addWallet('abdul')
