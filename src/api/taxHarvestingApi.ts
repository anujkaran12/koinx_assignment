import { mockCapitalGains } from "../data/mockCapitalGains";
import { mockHoldings } from "../data/mockHoldings";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getCapitalGains = async () => {
  await delay(700);

  return mockCapitalGains;
};

export const getHoldings = async () => {
  await delay(2000);
  return mockHoldings;
};
