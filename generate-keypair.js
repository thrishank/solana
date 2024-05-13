"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var web3_js_1 = require("@solana/web3.js");
var key = web3_js_1.Keypair.generate();
console.log("The public key is:" + key.publicKey.toBase58());
console.log("The secret key is:" + key.secretKey);
