import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

const supportedChainIds = [1, 3, 4, 5, 42, 31337];

export const injected = new InjectedConnector({
  supportedChainIds: supportedChainIds,
});

export const WalletConnect = new WalletConnectConnector({
  infuraId: `${process.env.NEXT_PUBLIC_INFURA_KEY}`,
  supportedChainIds: supportedChainIds,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});
