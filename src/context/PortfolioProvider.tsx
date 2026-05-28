/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getCapitalGains, getHoldings } from "../api/taxHarvestingApi";
import type { ICapitalGains, IHolding } from "../types";
import {
  getHarvestedGains,
  getHoldingId,
  getRealisedGains,
} from "../utils/taxHarvesting";

type PortfolioProviderProps = {
  children: ReactNode;
};

export type PortfolioContextValue = {
  capitalGains: ICapitalGains | null;
  holdings: IHolding[];
  selectedCoins: Set<string>;
  allHoldingsSelected: boolean;
  showAll: boolean;
  loading: boolean;
  error: string;
  afterGains: ICapitalGains | null;
  preRealisedGains: number;
  afterRealisedGains: number;
  savings?: number;
  toggleHolding: (id: string) => void;
  toggleAllHoldings: () => void;
  toggleShowAll: () => void;
};

export const PortfolioContext = createContext<PortfolioContextValue | null>(
  null,
);

export const PortfolioProvider = ({ children }: PortfolioProviderProps) => {
  const [capitalGains, setCapitalGains] = useState<ICapitalGains | null>(null);
  const [holdings, setHoldings] = useState<IHolding[]>([]);
  const [selectedCoins, setSelectedCoins] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [capitalGainsResponse, holdingsResponse] = await Promise.all([
          getCapitalGains(),
          getHoldings(),
        ]);

        setCapitalGains(capitalGainsResponse.capitalGains);
        setHoldings(
          [...holdingsResponse].sort(
            (a, b) =>
              b.totalHolding * b.currentPrice - a.totalHolding * a.currentPrice,
          ),
        );
      } catch {
        setError("Unable to load tax harvesting data.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);


  const selectedHoldings = useMemo(() => {
    return holdings.filter((holding) =>
      selectedCoins.has(getHoldingId(holding)),
    );
  }, [holdings, selectedCoins]);


  const holdingIds = useMemo(() => holdings.map(getHoldingId), [holdings]);

  
  const allHoldingsSelected =
    holdingIds.length > 0 && holdingIds.every((id) => selectedCoins.has(id));

  const afterGains = capitalGains
    ? getHarvestedGains(capitalGains, selectedHoldings)
    : null;
  const preRealisedGains = capitalGains ? getRealisedGains(capitalGains) : 0;
  const afterRealisedGains = afterGains ? getRealisedGains(afterGains) : 0;
  const savings =
    preRealisedGains > afterRealisedGains
      ? preRealisedGains - afterRealisedGains
      : undefined;

  const toggleHolding = (id: string) => {
    setSelectedCoins((selectedIds) => {
      const nextSelectedIds = new Set(selectedIds);

      if (nextSelectedIds.has(id)) {
        nextSelectedIds.delete(id);
      } else {
        nextSelectedIds.add(id);
      }

      return nextSelectedIds;
    });
  };

  const toggleAllHoldings = () => {
    setSelectedCoins(allHoldingsSelected ? new Set() : new Set(holdingIds));
  };

  const value = {
    capitalGains,
    holdings,
    selectedCoins,
    allHoldingsSelected,
    showAll,
    loading,
    error,
    afterGains,
    preRealisedGains,
    afterRealisedGains,
    savings,
    toggleHolding,
    toggleAllHoldings,
    toggleShowAll: () => setShowAll((currentShowAll) => !currentShowAll),
  };

  return <PortfolioContext value={value}>{children}</PortfolioContext>;
};
