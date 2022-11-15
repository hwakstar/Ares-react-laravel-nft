import BigNumber from "bignumber.js"

export const MERKLE_ROOT_HASH = "0x9a240a5c9f380aead95328fc13f86a6d3def5aee53fa7431a6305e06c1891a70"
export const WHITELISTED_USERS = [
    "0x8082DF9449fa8945e677621cb3A6BEAD210CcC0d",
    "0xd545a7f27eF82b003147D3bEc69DB1FDE3C518E8",
    "0xe30027478902b381e02DA8c745C51B11daCa0579"
]
export const ARES_NFT_ADDRESS = "0xbc72799297f6B8ab49904dEf2A863d72865e8065" // goerli testnet
export const WHITELIST_ALLOWANCE = 3
export const PUBLIC_ALLOWANCE = 2
export const WHITELIST_NFT_PRICE = new BigNumber("8600000000000000") // 0.0086
export const PRESALE_NFT_PRICE = new BigNumber("15000000000000000") // 0.015
export const PUBLIC_SALE_NFT_PRICE = new BigNumber("20000000000000000") // 0.02
export const SECONDS_PER_BLOCK = 12 // s
export const WHITELIST_BLOCKS = 7200
export const PUBLIC_PRESALE_BLOCKS = 14400
export const BSC_TESTNET_PROVIDER = "https://goerli.infura.io/v3/fcbd5e4aded041b9bf226eb446608dd1"
export const CONTRACT_STATE = {
    OFF: 0,
    WHITELIST: 1,
    PRESALE: 2,
    PUBLIC: 3
}