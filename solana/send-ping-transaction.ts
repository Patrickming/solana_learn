import * as web3 from "@solana/web3.js";
import dotenv from 'dotenv';
import base58 from "bs58";
import { getKeypairFromEnvironment, requestAndConfirmAirdropIfRequired } from "@solana-developers/helpers";
dotenv.config();

const payer = getKeypairFromEnvironment('SECRET_KEY2')
const connection = new web3.Connection("https://devnet.helius-rpc.com/?api-key=6e693598-a890-40f8-8777-117c3deacf51", "confirmed")

const newBalance = await requestAndConfirmAirdropIfRequired(
    connection,
    payer.publicKey,
    1 * web3.LAMPORTS_PER_SOL,
    0.5 * web3.LAMPORTS_PER_SOL,
);
// 链上程序，每次 ping 时都会使计数器加一
const PING_PROGRAM_ADDRESS = new web3.PublicKey('ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa')
// 程序数据账户
const PING_PROGRAM_DATA_ADDRESS =  new web3.PublicKey('Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod')


const transaction = new web3.Transaction()
const programId = new web3.PublicKey(PING_PROGRAM_ADDRESS)
const pingProgramDataId = new web3.PublicKey(PING_PROGRAM_DATA_ADDRESS)

const instruction = new web3.TransactionInstruction({
    keys: [
      {
        pubkey: pingProgramDataId,
        isSigner: false,
        isWritable: true
      },
    ],
    programId
  })


  transaction.add(instruction)

const signature = await web3.sendAndConfirmTransaction(
  connection,
  transaction,
  [payer]
)

//Transaction completed! Signature is 3ezLDyYCBaKaj5xcJg64ZszC6XeNSH7yjqwxD8efG4nTqVoCsfV67vivS2XyHkLfuXjeN4Me6Kk7npFAgvC3Qjpe
// console.log(`✅ Transaction completed! Signature is ${signature}`)
console.log(`You can view your transaction on the Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)