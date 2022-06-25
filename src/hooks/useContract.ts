import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { Contracts } from "@/services/Contracts/Contract";
import { isSupportedNetwork } from "@/utils/networks";
import { NetworkId } from "@/interfaces";

function useContracts(): Contracts | undefined {
  const { library, active, chainId } = useWeb3React<Web3Provider>();

  return useMemo((): Contracts | undefined => {
    if (!(chainId && library)) return undefined;
    if (!isSupportedNetwork(chainId)) return undefined;
    return Contracts.fromNetwork(chainId as NetworkId, library.getSigner());
  }, [active, library, chainId]);
}

function useReadOnlyContracts(): Contracts | undefined {
  const { library, active, chainId } = useWeb3React<Web3Provider>();

  return useMemo((): Contracts | undefined => {
    if (!(chainId && library)) return undefined;
    if (!isSupportedNetwork(chainId)) return undefined;
    return Contracts.fromNetwork(chainId as NetworkId, library);
  }, [active, library, chainId]);
}

export { useContracts, useReadOnlyContracts };
