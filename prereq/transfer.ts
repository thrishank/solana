import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import "dotenv/config";

const sendKeyPair = getKeypairFromEnvironment("SECRET_KEY");
const toPubkey = new PublicKey("BD6BUUzunY1ToNmZeHZ9vBkgFqaSY336bzcCKaA2sUFM");

const connect = new Connection("https://api.devnet.solana.com", "confirmed");

const transaction = new Transaction();

// instructions
const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: sendKeyPair.publicKey,
    toPubkey,
    lamports: 100000000
})

transaction.add(sendSolInstruction);

(async () => {
    const signature = await sendAndConfirmTransaction(connect, transaction, [sendKeyPair])
    console.log(signature);
})()