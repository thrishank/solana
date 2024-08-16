use anchor_lang::prelude::*;

declare_id!("3C5pfvzQjYTR2nGx3xGxnmsVVU7CXpn4ShYRk1C6wE2C");

#[program]
pub mod anchor_escrow {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
    pub fn deposit(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
    pub fn withdraw(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
    pub fn close(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
