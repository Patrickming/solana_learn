

## course/1-6





```powershell
solana-keygen new --force

Wrote new keypair to /root/.config/solana/id.json
====================================================================================
pubkey: HeAbYKogB3hiNN1NxmsN563NwPqYBcV6jRsyAcdAo3Ro
====================================================================================
Save this seed phrase and your BIP39 passphrase to recover your new keypair:
limb medal prison trumpet disagree isolate almost lyrics merge find material because
====================================================================================
```
> 创建账户

```
 spl-token create-token
 
 Creating token 58aUPxbi23fn1TU8cre8ERDx5XCBafGsbiB3tf1ZgGgY under program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA

Address:  58aUPxbi23fn1TU8cre8ERDx5XCBafGsbiB3tf1ZgGgY
Decimals:  9

Signature: 47ySzAt7ucEvr26VM37pDXvD5RAQWnGUPjKJ7ZJ8KPyDHtbamcPpWS2FHpjhx5wR8Sq75jFL5nNfBaG3Rt4PY1d3
 
```
> 创建token

```
 spl-token create-account 58aUPxbi23fn1TU8cre8ERDx5XCBafGsbiB3tf1ZgGgY
 
 Creating account 23n3BVQT33EWsA5wfuUtND2HujZW4gyP9ofo3d6wj2hE

Signature: 3F82Bsad9zPJtyhnabFcEv7LG1J4iQb3riD69qaKHV7Df1K3NGee3suTyLKdrmojD59cgDqrCXRuZNLd63T2aCP1
```

> 这里实际上调用了ATA合约，并创建了ATA账号：23n3BVQT33EWsA5wfuUtND2HujZW4gyP9ofo3d6wj2hE

```
spl-token mint  58aUPxbi23fn1TU8cre8ERDx5XCBafGsbiB3tf1ZgGgY 100 23n3BVQT33EWsA5wfuUtND2HujZW4gyP9ofo3d6wj2hE

Minting 100 tokens
  Token: 58aUPxbi23fn1TU8cre8ERDx5XCBafGsbiB3tf1ZgGgY
  Recipient: 23n3BVQT33EWsA5wfuUtND2HujZW4gyP9ofo3d6wj2hE

Signature: 3PR6BVpc9LrY7PLyswuJcvqgEYJrp8fP61Ku6nsrBEqhUp3jJ3hcbpp6gcNEzV1yNYWGvyEPyPsSMjVwoUF3KySM
```

> 给自己的这个Token Account发送（mint）



```
spl-token balance 58aUPxbi23fn1TU8cre8ERDx5XCBafGsbiB3tf1ZgGgY

100
```

> 查询代币自己余额 如果我们再mint一次这里也会增加对应的余额



```
spl-token transfer --fund-recipient  58aUPxbi23fn1TU8cre8ERDx5XCBafGsbiB3tf1ZgGgY 1 HekxQd1SGHP33Pg8y2u1SVM3iE39mDnj5kBJQN3c7hX3

Transfer 1 tokens
  Sender: 23n3BVQT33EWsA5wfuUtND2HujZW4gyP9ofo3d6wj2hE
  Recipient: HekxQd1SGHP33Pg8y2u1SVM3iE39mDnj5kBJQN3c7hX3
  Recipient associated token account: 9cQHEwCneNfztPz1odj8XY2biidpLzwyUjtUs4i13ebG
  Funding recipient: 9cQHEwCneNfztPz1odj8XY2biidpLzwyUjtUs4i13ebG

Signature: 4Lmgxg1ChWTRe3djvLK215VUXGngBQijMUd53LEobhQo6B9JomWGdBFugKuaKuqMbT7D8EAsqEXVSQQnewoVWmDV
```

> 给某一个账户转币
