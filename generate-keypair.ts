import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import "dotenv/config"
import { Keypair } from "@solana/web3.js";
/* 
const keyPair = Keypair.generate();

console.log(keyPair.publicKey.toBase58())
console.log(keyPair.secretKey)
*/

const keyPair = getKeypairFromEnvironment("SECRET_KEY")
console.log(keyPair.publicKey.toBase58());