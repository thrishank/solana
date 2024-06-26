import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const suppliedtoPubKey = process.argv[2] || null;

if (!suppliedtoPubKey) {
  throw new Error("Please provide a destination wallet");
}
const toPubkey = new PublicKey(suppliedtoPubKey);
const senderKeyPair = getKeypairFromEnvironment("SECRET_KEY");
const transaction = new Transaction();

const sendSolInstruction = SystemProgram.transfer({
  toPubkey,
  fromPubkey: senderKeyPair.publicKey,
  lamports: 1000,
});

transaction.add(sendSolInstruction);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const signature = await sendAndConfirmTransaction(connection, transaction, [
  senderKeyPair,
]);

console.log(signature);
