import { initializeKeypair } from "./initializeKeypair";
import * as web3 from "@solana/web3.js";
import Dotenv from "dotenv"
Dotenv.config()

let programId = new web3.PublicKey(
    "CbTAU3ennX5j4LaQ8hoH6Hub4RzVMwDQcZuPpFCbFfa6"
)

let connection = new web3.Connection("http://localhost:8899","confirmed")

async function main() {
    let payer = await initializeKeypair(connection)
    // await connection.requestAirdrop(payer.publicKey, web3.LAMPORTS_PER_SOL * 1)

    const transactionSignature = await sayHello(payer)

    console.log(
        `transactionSignature:${transactionSignature}`
    )//https://explorer.solana.com/tx/qTq1J5oYmu5iq1YEGeHxMdR6vMdEf6s1wVA41Mv6To89CxgpMdAvWYPV6pQNN4JQ4q5k5MJPZZHDKejEs4vF7Hk?cluster=custom&customUrl=http%3A%2F%2Flocalhost%3A8899
}

main()
    .then(() => {
        console.log("Finished successfully")
    })
    .catch((error) => {
        console.error(error)
    })

export async function sayHello(
    payer: web3.Keypair
): Promise<web3.TransactionSignature> {
    const transaction = new web3.Transaction()

    const instruction = new web3.TransactionInstruction({
        keys: [],
        programId,
    })

    transaction.add(instruction)

    const transactionSignature = await web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [payer]
    )

    return transactionSignature
}
