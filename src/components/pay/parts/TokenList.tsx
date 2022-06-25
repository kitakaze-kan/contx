import { FC, useMemo } from "react";
import { TokenType, tokenColorStyle, tokenList } from "@/constants";
import Select, { ActionMeta, OnChangeValue } from "react-select";
import { getToken } from "@/utils/tokenUtil";

type TokenListProps = {
  handleToken: (t: TokenType) => void;
  token?: string;
};

export const TokenList: FC<TokenListProps> = ({ handleToken, token }) => {
  const handleChange = (
    newValue: OnChangeValue<TokenType, false>,
    actionMeta: ActionMeta<TokenType>
  ) => {
    if (!newValue) return;
    handleToken(newValue);
  };

  const defaultVal = useMemo(() => {
    return !token ? tokenList[0] :getToken(token)
  }, [token]);

  return (
    <Select
        defaultValue={defaultVal}
        onChange={handleChange}
        isMulti={false}
        options={tokenList}
        styles={tokenColorStyle}
        placeholder={"Select Token"}
        className={"rounded-lg border-none hover:border-none focus:outline-white"}
      />
  );
};
