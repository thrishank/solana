import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import publicKey from "./generate-keypair";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const address = new PublicKey(publicKey);

const balance_lamports = await connection.getBalance(address);
const balance_sol = balance_lamports / LAMPORTS_PER_SOL;
console.log(balance_lamports, balance_sol);
