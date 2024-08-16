use anchor_lang::prelude::*;

#[account]
pub struct escrow {
    seed: u64,
    maker: Pubkey,
    mint_a: Pubkey,
    ming_b: Pubkey,
    bump: u8
}
