#### Problem
When I create a new account using the following two methods, there is no fund by default and cannot be transferred.
1. use the `@solana/web3.js`
```typescript
import { Keypair } from "@solana/web3.js";

const keypair = Keypair.generate();

console.log(`The public key is: `, keypair.publicKey.toBase58());
```
Error message：
```
      throw new SendTransactionError(
            ^


SendTransactionError: failed to send transaction: Transaction simulation failed: Transaction results in an account (1) with insufficient funds for rent
    at Connection.sendEncodedTransaction (D:\web3_code\solana_learn\node_modules\@solana\web3.js\src\connection.ts:5921:13)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at Connection.sendRawTransaction (D:\web3_code\solana_learn\node_modules\@solana\web3.js\src\connection.ts:5880:20)
    at Connection.sendTransaction (D:\web3_code\solana_learn\node_modules\@solana\web3.js\src\connection.ts:5868:12)
    at sendAndConfirmTransaction (D:\web3_code\solana_learn\node_modules\@solana\web3.js\src\utils\send-and-confirm-transaction.ts:35:21)    
    at <anonymous> (d:\web3_code\solana_learn\solanatransfer.ts:50:53) {
  logs: [
    'Program 11111111111111111111111111111111 invoke [1]',
    'Program 11111111111111111111111111111111 success'
  ]
}

Node.js v18.18.2
```
2. use solana cli
```sh
solana-keygen new --force
solana transfer HV4egCuRfqnoGipQxVGRLLVRRfbmPH6EWdxKDKdyLktg 0.1
```
Error message：
```
Error: The recipient address (HV4egCuRfqnoGipQxVGRLLVRRfbmPH6EWdxKDKdyLktg) is not funded. Add `--allow-unfunded-recipient` to complete the transfer
```


#### Proposed Solution
1. use solana cli
```sh
solana transfer --allow-unfunded-recipient 9w4egkmzj6Byop2iEA8ecP3m65zVn9ayNFFD1DNSdNPA 0.1 
```
2. use the `@solana/web3.js`
I don't know how to deal with this problem, like I don't know why the newly created account is unfunded and can't be transferred