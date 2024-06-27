use anchor_lang::prelude::*;

declare_id!("Cn9779zFFj7GvSef1TMLTKanwG7pZSCkRb1zSsBcHt2q");

#[program]
pub mod anchor {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
