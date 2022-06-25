import { Web3Provider } from "@ethersproject/providers";
import { getSignature } from "@/utils/providerUtils";

export class WorkCredentialService {
  provider = undefined as Web3Provider | undefined;

  constructor(provider?: Web3Provider) {
    this.provider = provider;
  }

  setProvider(provider?: Web3Provider) {
    this.provider = provider;
  }

  getMessageHash = async (
    tx: string,
    address: string,
    summary: string,
    description?: string,
    deliverable?: string
  ): Promise<{ [x: string]: any }> =>
    new Promise(async (resolve, reject) => {
      try {
        const { signature, hash } = await getSignature(
          tx,
          address,
          summary,
          description,
          deliverable,
          this.provider
        );
        resolve({ signature, hash });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
}

let workCredentialService: WorkCredentialService;

export const getWCService = (): WorkCredentialService => {
  if (workCredentialService) {
    return workCredentialService;
  }
  workCredentialService = new WorkCredentialService();
  return workCredentialService;
};
