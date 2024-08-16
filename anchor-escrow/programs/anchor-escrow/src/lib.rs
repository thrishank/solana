use anchor_lang::prelude::*;

declare_id!("AzkWYp8HqmMdByJemXgSLkZzQmBqtdaFCwSaabRDvdQc");

mod contexts;
use contexts::*;

mod state;
use state::*;

#[program]
pub mod anchor_escrow {
    use super::*;

    pub fn make(ctx: Context<Make>, seed: u64, amount: u64, receive: u64) -> Result<()> {
        
        Ok(())
    }

    
    pub fn take(ctx: Context<Take>) -> Result<()> {

        Ok(())
    }
    
    pub fn refund(ctx: Context<Refund>) -> Result<()> {
         Ok(())
    }

}

