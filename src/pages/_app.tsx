import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from "jotai";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { Provider as SelfIDProvider } from "@self.id/framework";
import type { ModelTypesToAliases } from "@glazed/types";
import { aliases as workCredentialAliases } from "@/__generated__/aliases";
import { BaseLayout } from '@/components/layout/BaseLayout';
import { CERAMIC_NETWORK, CERAMIC_URL } from "@/constants/common";
import { ModelTypes } from '@/interfaces/workcredential';

const aliases: ModelTypesToAliases<ModelTypes> = workCredentialAliases;

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function MyApp({ Component, pageProps }: AppProps) {
  const { state, ...props } = pageProps;
  return (
    <>
      <Provider>
        <Web3ReactProvider getLibrary={getLibrary}>
          <SelfIDProvider
              client={{
                ceramic: CERAMIC_URL,
                connectNetwork: CERAMIC_NETWORK,
                aliases,
              }}
              state={state}
            >
            <BaseLayout>
              <Component {...pageProps} />
            </BaseLayout>
          </SelfIDProvider>
        </Web3ReactProvider>
      </Provider>
    </>
  )
}

export default MyApp
