import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";

import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import { Wallet } from "ethers";

dotenv.config({ path: "env/.env" });

import { HardhatAccount } from "./src/HardhatAccount";

function getAccounts() {
    if (HardhatAccount.keys.length !== 0) return HardhatAccount.keys;

    const accounts: string[] = [];
    const reg_bytes64: RegExp = /^(0x)[0-9a-f]{64}$/i;
    if (
        process.env.ADMIN_KEY !== undefined &&
        process.env.ADMIN_KEY.trim() !== "" &&
        reg_bytes64.test(process.env.ADMIN_KEY)
    ) {
        accounts.push(process.env.ADMIN_KEY);
    } else {
        process.env.ADMIN_KEY = Wallet.createRandom().privateKey;
        accounts.push(process.env.ADMIN_KEY);
    }

    if (
        process.env.USER_KEY !== undefined &&
        process.env.USER_KEY.trim() !== "" &&
        reg_bytes64.test(process.env.USER_KEY)
    ) {
        accounts.push(process.env.USER_KEY);
    } else {
        process.env.USER_KEY = Wallet.createRandom().privateKey;
        accounts.push(process.env.USER_KEY);
    }

    accounts.push(
        ...[
            "0x9d2429c952658c82f79befec739d0720db81626d8e8ff676301a5ad49b0afdde",
            "0xd76745ab33164cc5c9d5c21a10a6f8f4480f13c5cc14ce92e800dabbc671658e",
            "0xdbea5fbe17f3de1ca1aa774ef4254b206dda04a5a55c18a8e3b32420ed1f6055",
            "0xf29f063377935b95eaa877df8c394f54630cd6aeabe9846004ff32bf3d5e9cd6",
            "0xe442d76e052fa57b8db33ea92e68d3ac9072cafb5264d0f225f2f3b587aef1b6",
            "0x8cfb9e6b4c6686895ffa669e7ac8d60901fba4e60e2c9f633d786368c30772cf",
            "0x619c218c789ddeb0da55895f9dd1b60e5094c3be2b5b8ee5a192a01effdc14c6",
            "0xb1f04ee534808fb837ec68c071690b31dc5ea41501c864ae6b9a4497267c775d",
            "0xd1b96cf5d36dc1e4fe361a64f4fd4db5ab992e632f9f7e4686d1c73c603dbfcc",
            "0x20c8b18ad29cba82c446e00046ace3af707cb91159a4a320d94b53313c1c5c6d",
            "0xa80ca4b6ef6215b2772ca242be54a15c0d537c6c2f6b4b36b12b8440f605300e",
            "0x133f57731b3df03d5badd5c825f8a28f52321c3b3d18d64e40a86854712b7e9f",
            "0xa396fd3c164e906d5a6d15107de9b37d3f1a41341b4e4c0b6375689ab9f6f94b",
            "0xc1776c699e2e059bee8f2208f6a401139ec73194ddf47e259ca198f4fee71953",
            "0x1b30015e4e74e62f38455e364162754555613520aeb36f7c479a1c7495862c55",
            "0xfd06a08945a0f6a6158e507217073964e88c7aa8e1f71e53a3abc8871fc01809",
            "0xb6823e64e06eee50a03059eb2a7c32b395cc3f3e52403b165fee82b203430279",
            "0xf392802c5c6f47d01869e1e861183a8817356a609b53c0d9d65136bbca199923",
            "0xdea24d778d933bcee2f1627ec540ffeea93e21542b4d0cc3ae49fda7d24d523d",
            "0x201aa68f74b6ceaf26bd9b30f9ffdf95b835f5ca6870571c7fb7674aca529ea9",
        ]
    );

    for (const account of accounts) {
        HardhatAccount.keys.push(account);
    }

    return HardhatAccount.keys;
}

function getTestAccounts() {
    const defaultBalance = "20000000000000000000000000000";
    const acc = getAccounts();
    return acc.map((m) => {
        return {
            privateKey: m,
            balance: defaultBalance,
        };
    });
}

const config: HardhatUserConfig = {
    solidity: {
        compilers: [
            {
                version: "0.8.2",
            },
        ],
        settings: {
            optimizer: {
                enabled: true,
                runs: 5000000,
            },
        },
    },
    networks: {
        hardhat: {
            accounts: getTestAccounts(),
        },
        mainnet: {
            url: process.env.MAINNET_URL || "",
            chainId: 2151,
            accounts: getAccounts(),
        },
        testnet: {
            url: process.env.TESTNET_URL || "",
            chainId: 2019,
            accounts: getAccounts(),
        },
        devnet: {
            url: process.env.DEVNET_URL || "",
            chainId: 24680,
            accounts: getAccounts(),
        },
    },
};

export default config;
