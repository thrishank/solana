import { getKeypairFromEnvironment, getKeypairFromFile } from "@solana-developers/helpers";
import "dotenv/config"
import { Keypair } from "@solana/web3.js";


// To generate a new keypair
const keyPair = Keypair.generate();

console.log(keyPair.publicKey.toBase58())
console.log(keyPair.secretKey)


// Loading a wallet using the secret key from .env file
const kp = getKeypairFromEnvironment("SECRET_KEY")
console.log(kp.publicKey.toBase58());

// loading a wallet from the json file
const wallet = await getKeypairFromFile("wba-wallet.json");
console.log(wallet.secretKey)