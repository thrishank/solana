import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "../wba-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("9jyEAn15hMY7f5iKdUTPE5ZGaxD4BfsbHggwHFYvgF61");

// Recipient address
const toaddr = new PublicKey("VTwKNtmXi4TQCLZraksAkasMAJmgLgjVT6txUc4mjxN");

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
        const from = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey)
        
        const to = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, toaddr);
        // Get the token account of the toWallet address, and if it does not exist, create it

        const tx = await transfer(connection, keypair, from.address, to.address, keypair.publicKey, 1n)
        // Transfer the new token to the "toTokenAccount" we just created
        console.log(tx)
    } catch (e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();
// 7wxVFNuK35shzgrF1wjdrTmfkUd3SSkRCXrZqxYjQVDX