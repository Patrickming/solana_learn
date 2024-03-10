import * as web3 from '@solana/web3.js'
import * as borsh from '@project-serum/borsh'
import { initializeKeypair } from "./initializeKeypair"
import dotenv from 'dotenv'
dotenv.config()

async function main() {
    let DEVNET_RPC = process.env.DEVNET_RPC || ''
    const connection = new web3.Connection(DEVNET_RPC, "confirmed");
    let signer = await initializeKeypair(connection)
    // await connection.requestAirdrop(signer.publicKey, web3.LAMPORTS_PER_SOL * 1)


    const movieProgramId = new web3.PublicKey('Hkc6buvun8j15ApTC3DrLRpYAqsatzsiWgoeX7LdpBR')
    await sendTestMovieReview(signer, movieProgramId, connection)
}

const movieInstructionLayout = borsh.struct([
    borsh.u8('variant'),
    borsh.str('title'),
    borsh.u8('rating'),
    borsh.str('description')
])

async function sendTestMovieReview(signer: web3.Keypair, programId: web3.PublicKey, connection: web3.Connection) {
    let buffer = Buffer.alloc(1000)
    const movieTitle = `Braveheart2`
    movieInstructionLayout.encode(
        {
            variant: 1, //这里选择1或者0
            title: movieTitle,
            rating: 2,
            description: 'A bad movie'
        },
        buffer
    )

    // buffer = buffer.slice(0, movieInstructionLayout.getSpan(buffer))

    // const [pda] = await web3.PublicKey.findProgramAddress(
    //     [signer.publicKey.toBuffer(), Buffer.from(movieTitle)],
    //     programId
    // )

    // 使用 Buffer.subarray 替代 Buffer.slice
    buffer = buffer.subarray(0, movieInstructionLayout.getSpan(buffer))//得到有效部分

    // 使用同步版本的 findProgramAddress
    const [pda] = web3.PublicKey.findProgramAddressSync(
        //传入种子
        [signer.publicKey.toBuffer(), Buffer.from(movieTitle)],
        programId
    )

    console.log("PDA is:", pda.toBase58())

    const instruction = new web3.TransactionInstruction({
        programId: programId,
        data: buffer,
        keys: [
            {
                pubkey: signer.publicKey,
                isSigner: true,
                isWritable: false
            },
            {
                pubkey: pda,
                isSigner: false,
                isWritable: true
            },
            {
                pubkey: web3.SystemProgram.programId,
                isSigner: false,
                isWritable: false
            }
        ]
    })
    const transaction = new web3.Transaction()
    transaction.add(instruction)
    const tx = await web3.sendAndConfirmTransaction(connection, transaction, [signer])
    console.log(`https://explorer.solana.com/tx/${tx}?cluster=devnet`)
}



main().then(() => {
    console.log('Finished successfully')
    process.exit(0)
}).catch(error => {
    console.log(error)
    process.exit(1)
})