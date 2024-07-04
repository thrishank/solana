import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { createMint } from "@solana/spl-token";
import { Connection } from "@solana/web3.js";
import "dotenv/config";

const connect = new Connection("http://127.0.0.1:8899");

async function main() {
    console.log("Getting keypair from environment...");
    const user = getKeypairFromEnvironment("SECRET_KEY");
    console.log("Keypair retrieved. PublicKey:", user.publicKey.toString());

    console.log("Creating mint...");
    const tokenmint = await createMint(connect, user, user.publicKey, null, 2);
    console.log("Mint created. Token address:", tokenmint.toString());

    const link = getExplorerLink("address", tokenmint.toString(), "localnet");
    console.log("Explorer link:", link);
}

main().catch(err => {
    console.error("Error:", err);
});