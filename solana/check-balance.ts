import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import dotenv from 'dotenv';
dotenv.config();
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

// const publicKey = new PublicKey('BEZ1Jv5rTHGSb5VgUFL6QN3VE1QUJxsaRgctBoM8aLAW');
const publicKey = getKeypairFromEnvironment("SECRET_KEY").publicKey;


const connection = new Connection("https://devnet.helius-rpc.com/?api-key=6e693598-a890-40f8-8777-117c3deacf51", "confirmed");

const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
    `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`
);