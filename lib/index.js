let { genWallet } = require('../src/wallet')
let { sendCoin, getState, getBalance } = require('../src/client')

module.exports = {
    genWallet,
    sendCoin,
    getState,
    getBalance
}
