import { StylesConfig } from "react-select";

export type TokenType = {
  label: string;
  value: string;
  decimal: number;
  networkId: string;
  address: string;
};
export const tokenList: TokenType[] = [
  {
    label: "ETH (Rinkeby)",
    value: "ETH",
    decimal: 18,
    networkId: "4",
    address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  },
  {
    label: "USDC (Rinkeby)",
    value: "USDC",
    decimal: 6,
    networkId: "4",
    address: "0xeb8f08a975Ab53E34D8a0330E0D34de942C95926",
  },
  // {
  //   label: "USDC (Test)",
  //   value: "USDC-TEST",
  //   decimal: 6,
  //   networkId: "31337",
  //   address: "0xC9a43158891282A2B1475592D5719c001986Aaec",
  // },
  // {
  //   label: "ETH (Local)",
  //   value: "ETH-LOCAL",
  //   decimal: 18,
  //   networkId: "31337",
  //   address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  // },
  // {
  //   label: "DAI (Test)",
  //   value: "DAI-TEST",
  //   decimal: 6,
  //   networkId: "31337",
  //   address: "0x46b142DD1E924FAb83eCc3c08e4D46E82f005e0E",
  // },
  // {
  //   label: "MATIC",
  //   value: "MATIC",
  //   decimal: 18,
  //   networkId: "137",
  //   address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  // },
  // {
  //   label: "USDC (Polygon)",
  //   value: "USDC",
  //   decimal: 6,
  //   networkId: "137",
  //   address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
  // },
];

export const isETH = (token: string) =>
  token === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

export const tokenColorStyle: StylesConfig<TokenType> = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#242424",
    border: 0,
    boxShadow: "none",
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
  }),
  option: (styles, { isFocused, isSelected }) => {
    return {
      ...styles,
      color: "white",
      backgroundColor: isSelected
        ? "#323232"
        : isFocused
        ? "#323232"
        : "#242424",
      ":active": {
        ...styles[":active"],
        backgroundColor: "#323232",
      },
      ":hover": {
        ...styles[":hover"],
        backgroundColor: "#323232",
      },
      fontWeight: "bold",
    };
  },
  input: (styles) => ({ ...styles, fontWeight: "bold" }),
  placeholder: (styles) => ({
    ...styles,
    color: "white",
    fontWeight: "bold",
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "white",
    fontWeight: "bold",
  }),
};
