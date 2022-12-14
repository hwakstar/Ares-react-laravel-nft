import Web3 from "web3"
import { ethers } from 'ethers'
import { MerkleTree } from 'merkletreejs'
import BigNumber from "bignumber.js"
import { Contract } from '@ethersproject/contracts'
// import { defaultChain } from "../config/connectors"
import { abi as ARES_NFT_ABI } from "../config/ares_nft_abi"
import { ARES_NFT_ADDRESS, BSC_TESTNET_PROVIDER, CONTRACT_STATE, PRESALE_NFT_PRICE, PUBLIC_ALLOWANCE, PUBLIC_BLOCKS, PUBLIC_PRESALE_BLOCKS, PUBLIC_SALE_NFT_PRICE, SECONDS_PER_BLOCK, WHITELISTED_USERS, WHITELIST_ALLOWANCE, WHITELIST_BLOCKS, WHITELIST_NFT_PRICE } from "../config/constants"

const {keccak256} = ethers.utils

export const mint = async (amount, address, signer, contractState) => {
    const web3 = new Web3(BSC_TESTNET_PROVIDER)
    const nft_contract = new Contract(ARES_NFT_ADDRESS, ARES_NFT_ABI, signer)
    let result
    try {
        const userBalance = await web3.eth.getBalance(address)
        // const gasPrice = await web3.eth.getGasPrice()
        // console.log(contractState, CONTRACT_STATE.WHITELIST)
        if (contractState === CONTRACT_STATE.WHITELIST) {
            const {leave, hexProof} = getMerkleTreeCallData(address)
            // console.log(leave, hexProof)
            const ethersAmount = WHITELIST_NFT_PRICE.times(amount)
            if (ethersAmount.gt(BigNumber(userBalance))) return {
                status: false,
                error: "Not enough balance"
            }
            result = await nft_contract.mintWhitelist(
                amount,
                hexProof,
                leave, {
                    value: "0x" + (ethersAmount.integerValue()).toString(16),
                    // gasPrice: gasPrice
                })
        }
        if (contractState === CONTRACT_STATE.PRESALE) {
            const ethersAmount = PRESALE_NFT_PRICE.times(amount)
            if (ethersAmount.gt(BigNumber(userBalance))) return {
                status: false,
                error: "Not enough balance"
            }
            result = await nft_contract.mintPresale(
                amount,{
                value: "0x" + (ethersAmount.integerValue()).toString(16),
                // gasPrice: gasPrice
            })
        }
        if (contractState === CONTRACT_STATE.PUBLIC) {
            const ethersAmount = PUBLIC_SALE_NFT_PRICE.times(amount)
            if (ethersAmount.gt(BigNumber(userBalance))) return {
                status: false,
                error: "Not enough balance"
            }
            result = await nft_contract.mintPublic(
                amount, {
                value: "0x" + (ethersAmount.integerValue()).toString(16),
                // gasPrice: gasPrice
            })
        }
        return {
            status: true,
            hash: result.hash
        }
    } catch (e) {
        console.log(e)
        return {
            status: false,
            error: "Mint failed"
        }
    }
    // return nft_contract
}

export const getMerkleTreeCallData = (address) => {
    const leaves = WHITELISTED_USERS.map((user) => keccak256(user.toLowerCase()))
    const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true })
    const hexProof = merkleTree.getHexProof(keccak256(address.toLowerCase()))
    const leave = keccak256(address.toLowerCase())
    return {
        leave,
        hexProof
    }
}

export const getContractData = async () => {
    const web3 = new Web3(BSC_TESTNET_PROVIDER)
    const nft_contract = new web3.eth.Contract(ARES_NFT_ABI, ARES_NFT_ADDRESS)
    try {
        const startBlockNumber = await nft_contract.methods.mintStartBlock().call()
        const currentBlockNumber = await web3.eth.getBlockNumber()
        const contractState = await nft_contract.methods.getContractState().call()
        const currentPhase = await nft_contract.methods.currentPhase().call()
      
        const remainTime = contractState == CONTRACT_STATE.WHITELIST ? 
            (WHITELIST_BLOCKS - (currentBlockNumber - startBlockNumber)) * SECONDS_PER_BLOCK : (
                contractState == CONTRACT_STATE.PRESALE ? 
                    (PUBLIC_PRESALE_BLOCKS+WHITELIST_BLOCKS- (currentBlockNumber - startBlockNumber)) * SECONDS_PER_BLOCK : 0
            )
        return {
            status: true,
            _contractState: Number(contractState),
            _remainTime: remainTime,
            _currentPhase: Number(currentPhase)
        }
    } catch {
        return {
            status: false,
            _contractState: 0,
            _remainTime: 0,
            _currentPhase: 0
        }
    }
}

export const getUserData = async (address, signer) => {
    const nft_contract = new Contract(ARES_NFT_ADDRESS, ARES_NFT_ABI, signer)
    try {
        const currentPhase = await nft_contract.currentPhase()
        const userBalance = await nft_contract.balanceOf(address)
        const userPhaseBalance = await nft_contract.mintsPerAddress(currentPhase, address)
        console.log(currentPhase,"userPhaseBalance");
        let whitelisted = false
        if (WHITELISTED_USERS.map(each => each.toLowerCase()).includes(address.toLowerCase())) {
            whitelisted = true
        }
        return {
            status: true,
            _whiteListed: whitelisted,
            _userBalance: userBalance,
            _userPhaseBalance: userPhaseBalance,
        }
    } catch(e) {
        console.log(e)
        return {
            status: false,
            _whiteListed: false,
            _userBalance: 0,
            _userPhaseBalance: 0
        }
    }
}

export const getTransactionState = async (hash) => {
    const web3 = new Web3(BSC_TESTNET_PROVIDER)
    const result = await web3.eth.getTransactionReceipt(hash)
    console.log(result)
    if (!result) return "pending"
    else if (result.status) return "success"
    else return "failed"
}
