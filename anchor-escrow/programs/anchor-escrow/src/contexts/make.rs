use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{Mint, TokenAccount, TokenInterface},
};

use crate::program::AnchorEscrow;

#[derive(Accounts)]
pub struct Make<'info> {
    #[account(mut)]
    maker: Signer<'info>,
    #[account(
        mint::token_program = token_program
    )]
    mint_a: Account<'info, Mint>,
    #[account(
        mint::token_program = token_program
    )]
    #[account(mut)]
    maker_ata_a: InterfaceAccount<'info, TokenAccount>,
    escrow: Account<'info, AnchorEscrow>,
    vault: InterfaceAccount<'info, TokenAccount>,
    mint_b: Account<'info, Mint>,
    assocaiated_token_a: Account<'info, AssociatedToken>,
    token_program: Interface<'info, TokenInterface>,
    system_program: Program<'info, System>,
}
