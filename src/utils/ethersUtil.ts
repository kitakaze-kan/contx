import { formatUnits, parseUnits } from "@ethersproject/units";
import { BigNumberish } from "ethers";

export const formatBigNumber = (
  value: BigNumberish,
  precision = 2,
  decimals: string = "18"
): string =>
  Number(formatUnits(value, decimals)).toLocaleString(undefined, {
    maximumFractionDigits: precision,
  });

export const parseBigNumber = (value: string, decimals: number = 18): string =>
  parseUnits(value, decimals).toString();
