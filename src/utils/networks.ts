import { RINKEBY_URL } from "@/constants";
import { INetwork, NetworkId } from "@/interfaces";
import { entries } from "@/utils/typeUtils";

export const networkIds = {
  MAINNET: 1,
  HARDHAT: 31337,
  RINKEBY: 4,
} as const;

// TODO integrate deploymentInfo.json with this
const networks: { [K in NetworkId]: INetwork } = {
  [networkIds.MAINNET]: {
    label: "ETH Mainnet",
    url: `https://mainnet.infura.io/v3/`,
  },
  [networkIds.HARDHAT]: {
    label: "Hardhat",
    url: `http://localhost:8545`,
  },
  [networkIds.RINKEBY]: {
    label: "Rinkeby",
    url: `${RINKEBY_URL}`,
  },
};

export const supportedNetworkIds = Object.keys(networks).map(
  Number
) as NetworkId[];

export const supportedNetworkURLs = entries(networks).reduce<{
  [networkId: number]: string;
}>(
  (acc, [networkId, network]) => ({
    ...acc,
    [networkId]: network.url,
  }),
  {}
);

export const isSupportedNetwork = (networkId?: number): boolean => {
  if (!validNetworkId(networkId)) return false;
  return supportedNetworkIds.includes(networkId);
};

export const validNetworkId = (networkId?: number): networkId is NetworkId => {
  return !!networkId && networks[networkId as NetworkId] !== undefined;
};
