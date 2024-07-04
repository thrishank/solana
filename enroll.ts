import { AnchorProvider, Program, Wallet } from "@coral-xyz/anchor";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, PublicKey } from "@solana/web3.js";
import { IDL, WbaPrereq } from "./programs/wba_prereq";
import "dotenv/config";

const connect = new Connection("https://api.devnet.solana.com");
const keyPair = getKeypairFromEnvironment("SECRET_KEY");

const github = Buffer.from("thrishank", "utf8")

const provider = new AnchorProvider(connect, new Wallet(keyPair), { commitment: "confirmed" });

const program: Program<WbaPrereq> = new Program(IDL, provider)

const enrollment_seeds = [Buffer.from("prereq"), keyPair.publicKey.toBuffer()];
const [enrollment_key, _bump] = PublicKey.findProgramAddressSync(enrollment_seeds, program.programId);

const hash = await program.methods.complete(github).accounts({ signer: keyPair.publicKey }).signers([keyPair]).rpc()

console.log(`Check out your TX here:
    https://explorer.solana.com/tx/${hash}?cluster=devnet`);