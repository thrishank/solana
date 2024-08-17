use crate::state::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct InitVault<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(
        init,
        payer = signer,
        seeds = [b"state", signer.key().as_ref()],
        bump,
        space = VaultState::LEN
    )]
    pub state: Account<'info, VaultState>,
    #[account(seeds = [b"vault", state.key().as_ref()], bump)]
    pub vault: SystemAccount<'info>,
    pub system_program: Program<'info, System>,
}

impl<'info> InitVault<'info> {
    pub fn init(&mut self, bumps: &InitVaultBumps) -> Result<()> {
        self.state.vault_bump = bumps.vault;
        self.state.state_bump = bumps.state;
        Ok(())
    }
}
