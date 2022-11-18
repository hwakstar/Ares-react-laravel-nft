import { createClient, defaultChains, configureChains } from "wagmi";

import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import metamaskLogo from "../images/meta-mask.svg";
import coinbaseLogo from "../images/coinbase.svg";
import walletConnectLogo from "../images/wallet-connect.svg";

import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
const bscTestnet = {
  id: 97,
  name: 'bscTestnet',
  network: 'bscTestnet',
  nativeCurrency: {
    decimals: 18,
    name: 'bnb',
    symbol: 'BNB',
  },
  rpcUrls: {
    default: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  },
  blockExplorers: {
    default: { name: 'bscscan', url: 'https://testnet.bscscan.com/' },
  },
  testnet: true,
}

const { chains, provider, webSocketProvider } = configureChains([
  // defaultChains, 
  bscTestnet], [
  // infuraProvider({
  //   apiKey: "fcbd5e4aded041b9bf226eb446608dd1",
  // }),
  // publicProvider(),
  jsonRpcProvider({
    rpc: (chain) => {
      if (chain.id !== bscTestnet.id) return null
      return { http: chain.rpcUrls.default }
    },
  }),
]);

export const connectors = [
  {
    connector: new MetaMaskConnector({ chains }),
    logo: metamaskLogo,
  },
  {
    connector: new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    logo: coinbaseLogo,
  },
  {
    connector: new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    logo: walletConnectLogo,
  },
];

export const wagmiClient = createClient({
  autoConnect: true,
  connectors: connectors.map((each) => each.connector),
  provider,
  webSocketProvider,
});
