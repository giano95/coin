let { addWallet, getAllWallets, getWallet } = require('../src/wallet')
let { sendCoin, getState, getBalance } = require('../src/client')

module.exports = {
    addWallet,
    getAllWallets,
    getWallet,
    sendCoin,
    getState,
    getBalance
}
