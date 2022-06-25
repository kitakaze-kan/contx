import { tokenList, TokenType } from "@/constants";

export const getToken = (token?: string): TokenType | undefined => {
  if (!token || token === "") return;
  return tokenList.find((t) => t.value === token);
};
