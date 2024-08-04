import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { createMint } from "@solana/spl-token";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import "dotenv/config";

const connection = new Connection(clusterApiUrl("devnet"));

async function main() {
    const user = getKeypairFromEnvironment("SECRET_KEY");
    const tokenmint = await createMint(connection, user, user.publicKey, null, 6);
    console.log(tokenmint.toBase58());
    // getorcreated
    // mint tx
}

main().catch(err => {
    console.error("Error:", err);
});
