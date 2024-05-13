import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Keypair } from "@solana/web3.js";

require("dotenv").config();

// const keyPair_generate = Keypair.generate(); To Generate a new Key Pair
// Save the generated secretKEY in a .env file and load them here
const key = getKeypairFromEnvironment("SECRET_KEY");

// console.log("The public key is:" + key.publicKey.toBase58());
// console.log("The secret key is:" + key.secretKey);

const publicKey = key.publicKey;
export default publicKey;
