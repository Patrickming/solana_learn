import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import dotenv from 'dotenv';
dotenv.config();
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

// const publicKey = new PublicKey('BEZ1Jv5rTHGSb5VgUFL6QN3VE1QUJxsaRgctBoM8aLAW');
const publicKey = getKeypairFromEnvironment("SECRET_KEY2").publicKey;
let DEVNET_RPC = process.env.DEVNET_RPC || ''

const connection = new Connection(DEVNET_RPC, "confirmed");

const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
    `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`
);