import { usePortfolio } from '../context/usePortfolio'
import { ErrorState } from '../components/ErrorState'
import { HarvestingCard } from '../components/HarvestingCard'
import { HoldingsTable } from '../components/HoldingsTable'
import { InfoDisclosure } from '../components/InfoDisclosure'
import { LoaderState } from '../components/LoaderState'
import { Tooltip } from '../components/Tooltip'

export const TaxHarvestingPage = () => {
  const { capitalGains, afterGains, preRealisedGains, afterRealisedGains, savings, loading, error } =
    usePortfolio()

  return (
    <main className="mx-auto w-full max-w-8xl px-4 pb-6 pt-5 md:px-7">
      <header className="mb-4 flex items-baseline gap-3">
        <h1 className="m-0 text-lg font-semibold leading-tight">Tax Harvesting</h1>
        <Tooltip
          content={
            'Lorem ipsum dolor sit amet consectetur. Euismod id posuere nibh semper mattis scelerisque tellus. Vel mattis diam duis morbi tellus dui consectetur. Know More'
          }
        >
          <a href="/" className="text-xs text-kx-primary underline">
            How it works?
          </a>
        </Tooltip>
      </header>

      <InfoDisclosure />

      {loading && <LoaderState />}

      {!loading && error && <ErrorState message={error} />}

      {!loading && !error && capitalGains && afterGains && (
        <>
          <section className="mb-3 grid grid-cols-1 gap-5 md:grid-cols-2" aria-label="Tax harvesting summary">
            <HarvestingCard
              summary={{
                title: 'Pre Harvesting',
                gains: capitalGains,
                realisedGains: preRealisedGains,
              }}
            />
            <HarvestingCard
              summary={{
                title: 'After Harvesting',
                gains: afterGains,
                realisedGains: afterRealisedGains,
                savings,
              }}
              variant="accent"
            />
          </section>

          <HoldingsTable />
        </>
      )}
    </main>
  )
}
