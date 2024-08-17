import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Vault } from "../target/types/vault";
import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram } from "@solana/web3.js";
import { BN } from "bn.js";
import { expect } from "chai";


describe("vault", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Vault as Program<Vault>;
  const user = new Keypair();
  const withdraw_limit = Math.floor(Date.now() / 1000) + 5; // 5 seconds
  const LAMPORTS_PER_SOL = 1_000_000_000;

  const [state] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("state"), user.publicKey.toBytes()],
    program.programId
  );
  const [vault] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), state.toBytes()],
    program.programId
  );

  const getBalance = async (publicKey: anchor.web3.PublicKey) => {

    let x = await provider.connection.getBalance(publicKey);
    console.log(x / LAMPORTS_PER_SOL);
    return x / LAMPORTS_PER_SOL;
  }

  const airdrop = async (publicKey: anchor.web3.PublicKey, amount: number) =>
    await provider.connection.confirmTransaction(
      await provider.connection.requestAirdrop(publicKey, amount)
    );


  const initializeVault = async () =>
    await program.methods
      .init()
      .accountsPartial({
        signer: user.publicKey,
        state: state,
        vault: vault,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([user])
      .rpc();

  const deposit = async () => {
    await program.methods.deposit(new BN(1 * LAMPORTS_PER_SOL)).accounts({
      signer: user.publicKey,
      // @ts-ignore
      vault: vault,
      state: state,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([user]).rpc()
  }

  const withdraw = async () => {
    await program.methods.withdraw(new BN(0.5 * LAMPORTS_PER_SOL)).accounts({
      signer: user.publicKey,
      // @ts-ignore
      vault: vault,
      state: state,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([user]).rpc()
  }

  const close = async () => {
    await program.methods.close().accounts({
      signer: user.publicKey,
      // @ts-ignore
      vault: vault,
      state: state,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([user]).rpc();
  }

  before(async () => {
    await airdrop(user.publicKey, 5 * LAMPORTS_PER_SOL);
  });

  it("init", async () => {
    await initializeVault();

    const userBalance = await getBalance(user.publicKey);
    const vaultBalance = await getBalance(vault);

    expect(userBalance).to.be.greaterThanOrEqual(4.9);
    expect(vaultBalance).to.be.equal(0);
  });

  it("deposit", async () => {
    await deposit();
    const userBalance = await getBalance(user.publicKey);
    const vaultBalance = await getBalance(vault);

    expect(userBalance).to.be.greaterThanOrEqual(3.9);
    expect(vaultBalance).to.be.equal(1);
  })

  it("withdraw", async () => {
    await withdraw();
    const userBalance = await getBalance(user.publicKey);
    const vaultBalance = await getBalance(vault);

    expect(userBalance).to.be.greaterThanOrEqual(4.3);
    expect(vaultBalance).to.be.equal(0.5);
  })

  it("close", async () => {
    await close();

    const userBalance = await getBalance(user.publicKey);
    const vaultBalance = await getBalance(vault);

    expect(userBalance).to.be.greaterThanOrEqual(4.8);
    expect(vaultBalance).to.be.equal(0);
  })
});


