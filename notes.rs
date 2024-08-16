/*
 Importing files in rust -
    1. mod.rs file is used to import files in rust
    2. directory
        - test.rs
            pub struct Test {}
        - mod.rs
            mod test;
            use mode test::*;
    3. To use this code in another file, we can use the following code:
        mod test;
        use test::*;
*/
