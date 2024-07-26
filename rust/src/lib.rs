mod programs;

// fn wallet_to_base58() {
//     println!("Input your private key as a wallet file byte array ");
//     let stdin = io::stdin();
//     let wallet = stdin
//         .lock()
//         .lines()
//         .next()
//         .unwrap()
//         .unwrap()
//         .trim_start_matches('[')
//         .trim_end_matches(']')
//         .split(',')
//         .map(|s| s.trim().parse::<u8>().unwrap())
//         .collect::<Vec<u8>>();
//     let base58 = bs58::encode(wallet).into_string();

//     println!("Your base string is {}", base58)
// }

// fn base58_to_wallet() {
//     println!("Enter your base58 private key to convert into a byte array wallet");
//     let stdin = io::stdin();
//     let base58 = stdin.lock().lines().next().unwrap().unwrap();
//     println!("Your wallet file is:");
//     let wallet = bs58::decode(base58).into_vec().unwrap();
//     println!("{:?}", wallet);
// }

#[cfg(test)]
mod tests {
    use std::str::FromStr;

    use crate::programs::wba_prereq::{CompleteArgs, UpdateArgs, WbaPrereqProgram};
    use solana_client::rpc_client::RpcClient;
    use solana_sdk::{
        self,
        pubkey::Pubkey,
        signature::{read_keypair_file, Keypair},
        signer::Signer,
        system_instruction::transfer,
        system_program,
        transaction::Transaction,
    };

    const RPC_URL: &str = "https://api.devnet.solana.com";

    #[test]

    fn keygen() {
        let kp = Keypair::new();
        println!("We have generated the keypair, {}", kp.pubkey().to_string());
        println!("");
        println!("To save your wallet, copy and paste the following into a JSON file:");
        print!("{:?}", kp.to_bytes())
        // let kp = read_keypair_file("dev-wallet.json").expect("wallet not found");
        // println!("The public key is, {}", kp.pubkey().to_string());
    }

    #[test]
    fn airdrop() {
        let connection = RpcClient::new(RPC_URL);
        let kp = read_keypair_file("dev-wallet.json").expect("Wallet not found");
        match connection.request_airdrop(&kp.pubkey(), 2) {
            Ok(s) => {
                println!("Transaction succesfull");
                println!("Here is the signature {}", s.to_string())
            }
            Err(e) => {
                println!("Shit happens {}", e.to_string())
            }
        }
    }

    #[test]
    fn transfer_sol() {
        let connection = RpcClient::new(RPC_URL);
        let kp = read_keypair_file("dev-wallet.json").expect("Wallet not found");
        let to_pubkey = Pubkey::from_str("DRgXaLJjRej9mQsae8iYpswHzRwdDFchFJns2WNPTwbs").unwrap();

        let recent_blockhash = connection
            .get_latest_blockhash()
            .expect("latest block hash not found");

        let transaction = Transaction::new_signed_with_payer(
            &[transfer(&kp.pubkey(), &to_pubkey, 1_000_000)],
            Some(&kp.pubkey()),
            &vec![&kp],
            recent_blockhash,
        );

        let sign = connection
            .send_and_confirm_transaction(&transaction)
            .expect("Signatire failed");

        println!("signature is {}", sign);
    }

    #[test]
    fn enroll() {
        let connection = RpcClient::new(RPC_URL);
        let signer = read_keypair_file("dev-wallet.json").expect("Wallet not found");

        let prereq = WbaPrereqProgram::derive_program_address(&[
            b"prereq",
            signer.pubkey().to_bytes().as_ref(),
        ]);

        let latest_blockhash = connection
            .get_latest_blockhash()
            .expect("Failed getting latest block hash");

        let args = CompleteArgs {
            github: b"thrishank".to_vec(),
        };

        let transaction = WbaPrereqProgram::complete(
            &[&signer.pubkey(), &prereq, &system_program::id()],
            &args,
            Some(&signer.pubkey()),
            &[&signer],
            latest_blockhash,
        );

        let signature = connection
            .send_and_confirm_transaction(&transaction)
            .expect("Trnasaction signature failed");
        println!(
            "Success! Check out your TX here: https://explorer.solana.com/tx/{}/?cluster=devnet",
            signature
        );
    }
}
