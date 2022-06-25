import { getAddress } from "ethers/lib/utils";

export const isAddress = (address: string): boolean => {
  try {
    getAddress(address);
  } catch (e) {
    return false;
  }
  return true;
};

export const isContract = async (
  provider: any,
  address: string
): Promise<boolean> => {
  const code = await provider.getCode(address);
  return code && code !== "0x";
};

export const shortHash = (hash: string, maxLength: number = 20) => {
  const half = Math.floor(maxLength / 2);
  const remaining = half - maxLength;
  return hash.length <= maxLength
    ? hash
    : `${hash.slice(0, half)}...${hash.slice(remaining)}`;
};

export const convertDateToTimestampStr = (date: Date): string => {
  return Math.floor(date.getTime() / 1000).toString();
};

export const shortenStr = (str?: string, length = 20): string => {
  if (!str) return "";
  if (length < 20) {
    length = 20;
  }
  const half = Math.floor(length / 2);
  const remaining = half - 3 - length;
  return str.length <= length
    ? str
    : `${str.slice(0, half)}...${str.slice(remaining)}`;
};

export const getExploreLink = (hash: string, chainId: number = 1): string => {
  if (chainId === 137) {
    return `https://polygonscan.com/tx/${hash}`;
  }
  return chainId === 1
    ? `https://etherscan.io/tx/${hash}`
    : `https://rinkeby.etherscan.io/tx/${hash}`;
};
