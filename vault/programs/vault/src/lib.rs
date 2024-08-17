use anchor_lang::prelude::*;

declare_id!("AXZy7AeBci8GKkPKY5C3gYG38o4WFDmNGk9PSHAbio1o");

mod contexts;
use contexts::*;

mod state;

#[program]
pub mod vault {
    use super::*;
    pub fn init(ctx: Context<InitVault>) -> Result<()> {
        ctx.accounts.init(&ctx.bumps)
    }

    pub fn deposit(ctx: Context<Deposit>, amount: u64) -> Result<()> {
        ctx.accounts.deposit(amount)
    }

    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
        ctx.accounts.withdraw(amount)
    }

    pub fn close(ctx: Context<Close>) -> Result<()> {
        ctx.accounts.close()
    }
}
