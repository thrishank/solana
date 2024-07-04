## Transcation link
https://explorer.solana.com/tx/3YK7jkmvyqco2PS2MQrQ8H1Tym1Vfaywr4amq8HqTFQsgCjkg3brvf485PjY3933GqiqZ9nzk3PnCPVyw371tWHX?cluster=devnet

## Setup
```
git clone https://github.com/thrishank/solana

cd solana 

npm install

touch .env

// Place your secret Key in SECRET_KEY = "[]"

npx esrun enroll.ts // example to run the code I don't use ts-node

```

1. generate-keypair.ts - Script to generate a new keypair.
2. check-balance.ts -  Script to check the balance of a given account.
3. airdrop.ts - Script to request an airdrop of SOL tokens.
4. transfer.ts -  Script to transfer SOL tokens between accounts.
5. token-mint.ts - Script to mint new tokens.
6. enroll.ts - Script to enroll a user in the WBA prerequisite program.
