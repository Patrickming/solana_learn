import dotenv from 'dotenv';
dotenv.config();
let DEVNET_RPC = process.env.DEVNET_RPC || ''
console.log(DEVNET_RPC);