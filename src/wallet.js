let keys = require('./keys')                // Keys module: user written
let fs = require('fs')                      // FileSystem module: necessary for the Input/Output operation
let { connect } = require('lotion')         // LotionClient module: necessary to connect to our Lotion application
let GCI = '0b8701fde1ff9b42bcc4b003fd61ca5de7ca81b334db021243d8428e1a4f6988'    // Global Chain Identifier: identifies our application from any computer in the world
let walletsJSON = './db/wallets.json' 

// generates a new wallet by checking that its public key is not already present in the blockchain
let genWallet = async () =>
{
    let { state } = await connect(GCI)
    let privateKey
    let publicKey

    do {
        privateKey = keys.generatePrivateKey();
        publicKey = keys.generatePublicKey(privateKey)
    } while (state.balances[publicKey] === true)

    return {
        privateKey: privateKey,
        publicKey: publicKey
    }
}

// add a new wallet to the wallets db which will be identified by the id parameter 
let addWallet = async (id) =>
{
    let wallets = JSON.parse(fs.readFileSync(walletsJSON).toString())

    if (wallets[id])
    {
        console.log('Error: the choosen id is already in use')
        return
    }

    wallets[id] = await genWallet()

    fs.writeFileSync(walletsJSON, JSON.stringify(wallets, null, '\t'))
}

let getAllWallets = () =>
{
    return JSON.parse(fs.readFileSync(walletsJSON).toString())
}

let getWallet = (id) =>
{
    let wallets =  JSON.parse(fs.readFileSync(walletsJSON).toString())

    return wallets[id]
}


module.exports = {
    addWallet,
    getAllWallets,
    getWallet
}
