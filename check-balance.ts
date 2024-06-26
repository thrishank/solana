import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";
import "dotenv/config"

const keyPair = getKeypairFromEnvironment("SECRET_KEY");

const connect = new Connection(clusterApiUrl("devnet"))
const address = new PublicKey(keyPair.publicKey);
// const address = new PublicKey("MJKqp326RZCHnAAbew9MDdui3iCKWco7fsK9sVuZTX2")

const balance = await connect.getBalance(address) / LAMPORTS_PER_SOL;
console.log(balance);