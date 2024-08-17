use anchor_lang::{ prelude::*, system_program::{ transfer, Transfer } };

use crate::state::VaultState;

#[derive(Accounts)]
pub struct Close<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(
        mut,
        seeds = [b"vault", state.key().as_ref()],
        bump = state.vault_bump,
    )]
    pub vault: SystemAccount<'info>,
    #[account(
        mut,
        close = signer,
        seeds = [b"state", signer.key().as_ref()],
        bump = state.state_bump,
    )]
    pub state: Account<'info, VaultState>,
    pub system_program: Program<'info, System>,
}

impl<'info> Close<'info> {
    pub fn close(&mut self) -> Result<()> {
        let accounts = Transfer {
            from: self.vault.to_account_info(),
            to: self.signer.to_account_info(),
        };
        let seeds = &[
            b"vault",
            self.state.to_account_info().key.as_ref(),
            &[self.state.vault_bump],
        ];
        let pda_signer = &[&seeds[..]];

        let ctx = CpiContext::new_with_signer(
            self.system_program.to_account_info(),
            accounts,
            pda_signer
        );
        let amount = self.vault.lamports();
        transfer(ctx, amount).unwrap();
        Ok(())
    }
}
