import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useMemo, useState } from "react";
import { usePortfolio } from "../context/usePortfolio";
import { Tooltip } from "./Tooltip";
import {
  formatAmount,
  formatCurrency,
  formatSignedCurrency,
} from "../utils/formatters";
import { getHoldingId } from "../utils/taxHarvesting";

const headerCellClass =
  "h-10 bg-kx-surface-muted px-3 py-2 font-medium whitespace-nowrap text-kx-text";
const bodyCellClass = "h-14 border-b border-kx-border px-3 py-3 align-middle";
const mutedTextClass =
  "mt-px block truncate text-xs leading-tight font-normal text-kx-muted";
const checkboxClass = "kx-checkbox m-0 h-4 w-4";
const getBodyCellClass = (isSelected: boolean, alignment = "text-right") =>
  `${bodyCellClass} ${alignment} ${isSelected ? "bg-kx-selected" : "bg-kx-surface"}`;
const getHeaderCellClass = (alignment = "text-right") =>
  `${headerCellClass} ${alignment}`;

const visibleRowCount = 4;

type SortKey = "stcg" | "ltcg";
type SortDirection = "asc" | "desc";

const sortLabels = {
  stcg: "Short-term",
  ltcg: "Long-term",
};

export const HoldingsTable = () => {
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const {
    holdings,
    selectedCoins,
    allHoldingsSelected,
    showAll,
    toggleHolding,
    toggleAllHoldings,
    toggleShowAll,
  } = usePortfolio();

  const sortedHoldings = useMemo(() => {
    if (!sortKey) {
      return holdings;
    }

    return [...holdings].sort((a, b) => {
      const difference = a[sortKey].gain - b[sortKey].gain;

      return sortDirection === "asc" ? difference : -difference;
    });
  }, [holdings, sortDirection, sortKey]);

  const visibleHoldings = showAll
    ? sortedHoldings
    : sortedHoldings.slice(0, visibleRowCount);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((currentDirection) =>
        currentDirection === "asc" ? "desc" : "asc",
      );
      return;
    }

    setSortKey(key);
    setSortDirection("desc");
  };

  const getSortIcon = (key: SortKey) => {
    if (sortKey !== key) {
      return <ArrowUpDown size={14} aria-hidden="true" />;
    }

    return sortDirection === "asc" ? (
      <ArrowUp size={14} aria-hidden="true" />
    ) : (
      <ArrowDown size={14} aria-hidden="true" />
    );
  };

  const renderSortableHeader = (key: SortKey) => (
    <button
      className="inline-flex items-center justify-end gap-1 text-inherit"
      type="button"
      onClick={() => toggleSort(key)}
      aria-label={`Sort by ${sortLabels[key]} gain ${
        sortKey === key && sortDirection === "asc" ? "descending" : "ascending"
      }`}
    >
      <span>{sortLabels[key]}</span>
      {getSortIcon(key)}
    </button>
  );

  const renderCurrentPrice = (price: number) => (
    <Tooltip content={formatCurrency(price)} placement="top">
      <span className="inline-block">{formatCurrency(price)}</span>
    </Tooltip>
  );

  const renderAverageBuyPrice = (price: number) => (
    <small className={mutedTextClass}>{formatCurrency(price)}</small>
  );

  const renderGain = (gain: number, balance: number, symbol: string) => (
    <>
      <Tooltip content={formatSignedCurrency(gain)} placement="top">
        <span className={gain >= 0 ? "text-kx-success" : "text-kx-danger"}>
          {formatSignedCurrency(gain)}
        </span>
      </Tooltip>
      <small className={mutedTextClass}>{formatAmount(balance, symbol)}</small>
    </>
  );

  const renderHoldingRow = (holding: (typeof holdings)[number]) => {
    const id = getHoldingId(holding);
    const isSelected = selectedCoins.has(id);

    return (
      <tr className="transition-colors hover:[&_td]:bg-kx-selected" key={id}>
        <td className={getBodyCellClass(isSelected, "text-center")}>
          <input
            className={checkboxClass}
            type="checkbox"
            aria-label={`Select ${holding.coinName}`}
            checked={isSelected}
            onChange={() => toggleHolding(id)}
          />
        </td>
        <td className={getBodyCellClass(isSelected, "text-left")}>
          <div className="flex min-w-0 items-center gap-2">
            
            <img
              className="h-6 w-6 shrink-0 rounded-full"
              src={holding.logo}
              alt=""
            />
            <span className="min-w-0">
              <strong className="block truncate font-medium">
                {holding.coin}
              </strong>

              <small className={mutedTextClass}>{holding.coinName}</small>
            </span>
          </div>
        </td>
        <td className={getBodyCellClass(isSelected)}>
          <strong className="font-medium">
            {formatAmount(holding.totalHolding, holding.coin)}
          </strong>
          {renderAverageBuyPrice(holding.averageBuyPrice)}
        </td>
        <td className={getBodyCellClass(isSelected)}>
          {renderCurrentPrice(holding.currentPrice)}
        </td>
        <td className={getBodyCellClass(isSelected)}>
          {renderGain(holding.stcg.gain, holding.stcg.balance, holding.coin)}
        </td>
        <td className={getBodyCellClass(isSelected)}>
          {renderGain(holding.ltcg.gain, holding.ltcg.balance, holding.coin)}
        </td>
        <td className={getBodyCellClass(isSelected)}>
          {isSelected ? formatAmount(holding.totalHolding, holding.coin) : "-"}
        </td>
      </tr>
    );
  };

  return (
    <section className="rounded-lg bg-kx-surface px-3 pb-3 pt-5">
      <h2 className="m-0 text-base font-semibold leading-snug">Holdings</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[920px] table-fixed border-collapse text-sm">
          <colgroup>
            <col className="w-12" />
            <col className="w-48" />
            <col className="w-44" />
            <col className="w-36" />
            <col className="w-44" />
            <col className="w-44" />
            <col className="w-40" />
          </colgroup>
          <thead>
            <tr>
              <th
                className={`${getHeaderCellClass("text-center")} rounded-l-md`}
                aria-label="Select all"
              >
                <input
                  className={`${checkboxClass} text-transparent`}
                  type="checkbox"
                  aria-label="Select all holdings"
                  checked={allHoldingsSelected}
                  onChange={toggleAllHoldings}
                />
              </th>
              <th className={getHeaderCellClass("text-left")}>Asset</th>
              <th className={getHeaderCellClass()}>
                <span>Holdings</span>
                <small className={mutedTextClass}>Avg Buy Price</small>
              </th>
              <th className={getHeaderCellClass()}>Current Price</th>
              <th className={getHeaderCellClass()}>
                {renderSortableHeader("stcg")}
              </th>
              <th className={getHeaderCellClass()}>
                {renderSortableHeader("ltcg")}
              </th>
              <th className={`${getHeaderCellClass()} rounded-r-md`}>
                Amount to Sell
              </th>
            </tr>
          </thead>
          <tbody>{visibleHoldings.map(renderHoldingRow)}</tbody>
        </table>
      </div>
      {holdings.length > visibleRowCount && (
        <button
          className="mt-3 text-sm text-kx-primary underline"
          type="button"
          onClick={toggleShowAll}
        >
          {showAll ? "View less" : "View all"}
        </button>
      )}
    </section>
  );
};
