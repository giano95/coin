//let { addWallet, getAllWallets, getWallet } = require('./src/wallet');
//let { sendCoin, getState, getBalance } = require('./src/client');

declare namespace coin {
    export function genWallet(): object;
    export function addWallet(id: string);
    export function getAllWallets(): object;
    export function sendCoin(senderWallet: object, receiver: string, amount: number): any;
    export function getState(): object;  
    export function getBalance(publicKey: string): number;
}

export = coin;
