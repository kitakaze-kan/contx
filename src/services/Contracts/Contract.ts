import * as ethers from "ethers";
import deploymentInfo from "@/hardhat/deployments/deploymentInfo.json";
import { BulkPayment, BulkPayment__factory } from "@/hardhat/typechain";
import { NetworkId } from "@/interfaces/common";

type SignerOrProvider = ethers.providers.Provider | ethers.ethers.Signer;

export class Contracts {
  bulkPayment: BulkPayment;

  networkId: NetworkId;

  constructor(
    contracts: {
      bulkPayment: BulkPayment;
    },
    networkId: NetworkId
  ) {
    this.bulkPayment = contracts.bulkPayment;
    this.networkId = networkId;
  }

  connect(signer: ethers.Signer): void {
    this.bulkPayment = this.bulkPayment.connect(signer);
  }

  static fromNetwork(
    networkId: NetworkId,
    signerOrProvider: SignerOrProvider
  ): Contracts {
    return Contracts.fromAddresses(
      {
        bulkPayment: (deploymentInfo as any)[networkId].BulkPayment.address,
      },
      signerOrProvider,
      networkId
    );
  }

  static fromAddresses(
    addresses: {
      bulkPayment: string;
    },
    signerOrProvider: SignerOrProvider,
    networkId: NetworkId
  ): Contracts {
    const bulkPayment = BulkPayment__factory.connect(
      addresses.bulkPayment,
      signerOrProvider
    );
    return new Contracts(
      {
        bulkPayment,
      },
      networkId
    );
  }
}
