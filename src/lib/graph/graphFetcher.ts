import { createClient, gql } from "urql";
const APIURL = "https://api.studio.thegraph.com/query/21459/contx/v0.0.1";

const PAID_LIST_QUERY = `
{
  payments(where: { payee: $payee }) {
    id
    txHash
    payer
    payee
  }
}
`;
const PAYER_QUERY = gql`
query payerList($payer){
  getPayments (payer: $payer){
    id
    txHash
    payer
    payee
  }
}`;

const PAYEE_QUERY = gql`
query payeeList($payee){
  getPayments (payee: $payee){
    id
    txHash
    payer
    payee
  }
}`;

export const fetchPaidList = async (address: string) => {
  const client = createClient({
    url: APIURL,
  });
  const data = await client.query(PAYER_QUERY, { payer: address }).toPromise();
  console.log("data", data);
};
