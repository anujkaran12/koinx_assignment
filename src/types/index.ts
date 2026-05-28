export type IGainTerm = {
  profits: number;
  losses: number;
};

export type ICapitalGains = {
  stcg: IGainTerm;
  ltcg: IGainTerm;
};

export type ICapitalGainsResponse = {
  capitalGains: ICapitalGains;
};

export type IHolding = {
  coin: string;
  coinName: string;
  logo: string;
  currentPrice: number;
  totalHolding: number;
  averageBuyPrice: number;
  stcg: {
    balance: number;
    gain: number;
  };
  ltcg: {
    balance: number;
    gain: number;
  };
};

export type IHarvestingSummary = {
  title: string;
  gains: ICapitalGains;
  realisedGains: number;
  savings?: number;
};
