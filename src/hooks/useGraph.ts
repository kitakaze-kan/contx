import { Payment } from "@/interfaces";
import { createClient, gql, useQuery } from "urql";
import { useMyCeramicAcount } from "./useCeramicAcount";

const PAYER_QUERY = `
query Payer($payer: String) {
    payments(where:{payer: $payer}) {
      id
      txHash
      payer
      payee
    }
  }`;

const PAYEE_QUERY = `
query Payee($payee: String) {
    payments(where:{payee: $payee}) {
      id
      txHash
      payer
      payee
    }
  }`;

export const useGraph = () => {
  const { account } = useMyCeramicAcount();
  const [payerList] = useQuery<{ payments: Payment[] }>({
    query: PAYER_QUERY,
    variables: { payer: account },
    pause: !account,
  });

  const [payeeList] = useQuery<{ payments: Payment[] }>({
    query: PAYEE_QUERY,
    variables: { payee: account },
    pause: !account,
  });

  return {
    payerList,
    payeeList,
  };
};
