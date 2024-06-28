import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";
import "dotenv/config";

const KeyPair = getKeypairFromEnvironment("SECRET_KEY");
const connect = new Connection(clusterApiUrl("devnet"));

const transaction_hash = await connect.requestAirdrop(KeyPair.publicKey, 2 * LAMPORTS_PER_SOL);

console.log(`Success! Check out your TX here: 
    https://explorer.solana.com/tx/${transaction_hash}?cluster=devnet`);
