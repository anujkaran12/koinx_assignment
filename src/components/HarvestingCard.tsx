import type { IHarvestingSummary } from '../types'
import { formatSignedCurrency } from '../utils/formatters'
import { getNetGain } from '../utils/taxHarvesting'

type HarvestingCardProps = {
  summary: IHarvestingSummary
  variant?: 'default' | 'accent'
}

const capitalGainLabel = {
  default: 'Realised Capital Gains:',
  accent: 'Effective Capital Gains:',
}

export const HarvestingCard = ({ summary, variant = 'default' }: HarvestingCardProps) => {
  const className =
    variant === 'accent'
      ? 'min-h-56 rounded-lg bg-linear-to-br from-kx-gradient-start to-kx-gradient-end px-3 py-3 text-white [&_*]:text-white [&_.text-kx-subtle]:text-white/80'
      : 'min-h-56 rounded-lg bg-kx-surface px-3 py-3'

  const rows = [
    {
      label: 'Profits',
      shortTerm: summary.gains.stcg.profits,
      longTerm: summary.gains.ltcg.profits,
    },
    {
      label: 'Losses',
      shortTerm: summary.gains.stcg.losses,
      longTerm: summary.gains.ltcg.losses,
    },
    {
      label: 'Net Capital Gains',
      shortTerm: getNetGain(summary.gains.stcg),
      longTerm: getNetGain(summary.gains.ltcg),
    },
  ]

  return (
    <article className={className}>
      <h2 className="m-0 text-base font-semibold leading-snug">{summary.title}</h2>
      <div className="mt-2 grid gap-3 text-sm" role="table" aria-label={summary.title}>
        <div className="grid grid-cols-3 items-center text-xs text-kx-subtle" role="row">
          <span role="columnheader" />
          <span className="text-right" role="columnheader">Short-term</span>
          <span className="text-right" role="columnheader">Long-term</span>
        </div>
        {rows.map((row) => (
          <div className="grid grid-cols-3 items-center" role="row" key={row.label}>
            <span className="font-semibold" role="rowheader">{row.label}</span>
            <span className="text-right" role="cell">{formatSignedCurrency(row.shortTerm)}</span>
            <span className="text-right" role="cell">{formatSignedCurrency(row.longTerm)}</span>
          </div>
        ))}
      </div>

      <p className="mt-5 flex items-center gap-5 text-base font-semibold">
        <span>{capitalGainLabel[variant]}</span>
        <strong className="text-2xl font-semibold">{formatSignedCurrency(summary.realisedGains)}</strong>
      </p>

      {summary.savings !== undefined && summary.savings > 0 && (
        <p className="mt-5 flex items-center gap-1 text-sm">
          <span aria-hidden="true">&#127881;</span>
          You're going to save <strong>{formatSignedCurrency(summary.savings)}</strong>
        </p>
      )}
    </article>
  )
}
