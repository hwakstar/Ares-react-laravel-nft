import { createClient, defaultChains, configureChains } from "wagmi";

import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
// import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import metamaskLogo from "../images/meta-mask.svg";
import coinbaseLogo from "../images/coinbase.svg";
import walletConnectLogo from "../images/wallet-connect.svg";

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  infuraProvider({
    apiKey: "fcbd5e4aded041b9bf226eb446608dd1",
  }),
  publicProvider(),
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
