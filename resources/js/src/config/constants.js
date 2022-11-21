import BigNumber from "bignumber.js"

export const MERKLE_ROOT_HASH = "0xf4af13e8bed76cd3210d829738bbe4f65a1c4dfbf71fe43317a38f5e3832eeaf"
export const WHITELISTED_USERS = [
    "0x192B642006431b88a0EC6b5d84bcCEffeEb56155",
    "0x2Fb3a4C805DFe044411A44a766601074022B02DA",
    "0x64D4593D57BAb1B6A2F830015D9b7DA015588FB7",
    "0xF368AaB2FCD497eDaa9C1bae782D8F5733E4FaDE",
]
export const ARES_NFT_ADDRESS = "0xAEF4654D15e45F91890858d4a5c3D02D2008C798" //"0xb81A3659Ca24b3312F285A649870220a68AC5287" // goerli testnet
export const WHITELIST_ALLOWANCE = 3
export const PUBLIC_ALLOWANCE = 2
export const WHITELIST_NFT_PRICE = new BigNumber("8600000000000") // 0.00086
export const PRESALE_NFT_PRICE = new BigNumber("15000000000000") // 0.15
export const PUBLIC_SALE_NFT_PRICE = new BigNumber("20000000000000") // 0.2
export const SECONDS_PER_BLOCK = 3 // s
export const WHITELIST_BLOCKS = 1200
export const PUBLIC_PRESALE_BLOCKS = 600
export const PUBLIC_BLOCKS = 3600*10;
export const BSC_TESTNET_PROVIDER = "https://data-seed-prebsc-1-s1.binance.org:8545"
export const CONTRACT_STATE = {
    OFF: 0,
    WHITELIST: 1,
    PRESALE: 2,
    PUBLIC: 3
}