let lotion = require('lotion')
let { fullyVerifyTx } = require('./transaction')
const homedir = require('os').homedir();


let app = lotion(
    {
        initialState:
        {
            balances:
            {
                '036f4e8e4f959ffd8457ae1401a05fdabd776fe154470f22d817f4c7d6b0839596': 1000
            },
            nonces: {}
        },
        keyPath: homedir + '/.lotion/networks/ff1a1d70c61522405336d4d11a7cdd7b/config/priv_validator_key.json',
        genesisPath: homedir + '/.lotion/networks/ff1a1d70c61522405336d4d11a7cdd7b/config/genesis.json',
    }
)

let handlerTx = (state, tx) =>
{   
    // se non trovo nessun bilancio (o nonce) con quel address allora sarà 0
    let senderBalance = state.balances[tx.sender] || 0
    let receiverBalance = state.balances[tx.receiver] || 0
    let nonce = state.nonces[tx.sender] || 0

    // verify the Tx conditions
    if(!fullyVerifyTx(tx, senderBalance, nonce))
        return

    // update state
    state.balances[tx.sender] = senderBalance - tx.amount
    state.balances[tx.receiver] = receiverBalance + tx.amount
    state.nonces[tx.sender] = nonce + 1
}

app.use(handlerTx)
app.start().then(appInfo => console.log(appInfo.GCI))
