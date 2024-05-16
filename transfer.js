import {
  airdropIfRequired,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import "dotenv/config";

async function main() {
  const suppliesToPubkey = process.argv[2] || null;

  if (!suppliesToPubkey) {
    console.log(`Please provide a public key to send to`);
    process.exit(1);
  }

  const toKey = new PublicKey(suppliesToPubkey);
  const senderKey = getKeypairFromEnvironment("SECRET_KEY");

  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );

  try {
    const { blockhash } = await connection.getLatestBlockhash();
    const transaction = new Transaction();
    transaction.recentBlockhash = blockhash;
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: senderKey.publicKey,
        toPubkey: toKey,
        lamports: 5000,
      })
    );

    const signature = await sendAndConfirmTransaction(connection, transaction, [
      senderKey,
    ]);
    console.log("Transaction confirmed with signature:", signature);
  } catch (error) {
    console.error("Failed to send transaction:", error);
  }
}

main();
