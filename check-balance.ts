import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import publicKey from "./generate-keypair";

const pubkey = process.argv[2] || publicKey;
if (!pubkey) {
  throw new Error("Provide a public key to check the balance of!");
}

const connection = new Connection("https://api.devnet.solana.com", "confirmed"); // Connecting to a solana cluster
const address = new PublicKey(pubkey);

const balance_lamports = await connection.getBalance(address);
const balance_sol = balance_lamports / LAMPORTS_PER_SOL;
console.log(balance_lamports);

export default connection;
