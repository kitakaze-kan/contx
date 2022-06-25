import { injected, WalletConnect } from "@/lib/wallet/connector";
import { Web3Provider } from "@ethersproject/providers";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { useToast } from "./useToast";
import { isMobile } from "react-device-detect";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { useEffect } from "react";
import { getWCService } from "@/services/WorkCredential/WorkCredentialService";
import { getEtherService } from "@/services/Ether/EtherService";
import web3 from "web3";

export const useWalletAccount = () => {
  const { library, account, active, activate, deactivate, chainId } =
    useWeb3React<Web3Provider>();
  const etherService = getEtherService();
  const wcService = getWCService();
  const { contxError } = useToast();

  useEffect(() => {
    let isMounted = true;
    if (
      library &&
      isMounted &&
      (!wcService.provider || !etherService.provider)
    ) {
      wcService.setProvider(library);
      etherService.setProvider(library);
    }
    return () => {
      isMounted = false;
    };
  }, [library]);

  const connectWallet = async () => {
    await activate(injected, async (error) => {
      if (error instanceof NoEthereumProviderError) {
        if (isMobile) {
          openMetamaskViaDeepLink();
        } else {
          contxError(
            "Error: Please install MetaMask on desktop or visit from a dApp browser on mobile."
          );
        }
      } else if (error instanceof UnsupportedChainIdError) {
        if (
          (window as any).ethereum &&
          (window as any).ethereum.networkVersion !== chainId
        ) {
          try {
            await switchNetwork(1);
            await activate(injected, async (error) => {
              contxError("Error: Something wrong for connecting wallet...");
            });
          } catch (error) {
            contxError("Error: You're connected to an unsupported network.");
          }
        } else {
          contxError("Error: You're connected to an unsupported network.");
        }
      } else if (error instanceof UserRejectedRequestErrorInjected) {
        contxError(
          "Error: Please authorize this website to access your Ethereum account."
        );
      } else {
        contxError("Error: Something wrong for connecting wallet...");
      }
    });
  };

  const connectWalletWithWC = async () => {
    await activate(WalletConnect, async (error) => {
      console.log("error", error);
      if (error instanceof UnsupportedChainIdError) {
        if (
          (window as any).ethereum &&
          (window as any).ethereum.networkVersion !== chainId
        ) {
          try {
            await switchNetwork(1);
            await activate(WalletConnect, async (error) => {
              contxError("Error: Something wrong for connecting wallet...");
            });
          } catch (error) {
            contxError("Error: You're connected to an unsupported network.");
          }
        } else {
          contxError("Error: You're connected to an unsupported network.");
        }
      } else if (error instanceof UserRejectedRequestErrorInjected) {
        contxError(
          "Error: Please authorize this website to access your Ethereum account."
        );
      } else {
        contxError("Error: Something wrong for connecting wallet...");
      }
    });
  };

  const disconnectWallet = () => {
    deactivate();
  };

  const openMetamaskViaDeepLink = () => {
    //TODO: set url to env
    window.open("https://metamask.app.link/dapp/testnet.cvoxel.xyz/", "_blank");
  };

  const switchNetwork = async (chainId: number) => {
    try {
      if (!(window as any).ethereum) return;
      await (window as any).ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: web3.utils.toHex(chainId) }],
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    connectWallet,
    connectWalletWithWC,
    disconnectWallet,
    switchNetwork,
    active,
    chainId,
    injected,
    library,
    account,
  };
};
