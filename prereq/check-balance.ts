import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import "dotenv/config"

const keyPair = getKeypairFromEnvironment("SECRET_KEY");

const connect = new Connection('https://api.devnet.solana.com', 'confirmed');
const address = new PublicKey(keyPair.publicKey);

(async () => {
    const balance = await connect.getBalance(address) / LAMPORTS_PER_SOL;
    console.log(balance);
})()