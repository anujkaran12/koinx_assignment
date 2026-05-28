import type { ICapitalGains, IGainTerm, IHolding } from '../types'

export const getHoldingId = (holding: IHolding) => `${holding.coin}-${holding.coinName}`

const cloneGains = (gains: ICapitalGains): ICapitalGains => ({
  stcg: { ...gains.stcg },
  ltcg: { ...gains.ltcg },
})

const addGain = (term: IGainTerm, gain: number) => {
  if (gain > 0) {
    term.profits += gain
  }

  if (gain < 0) {
    term.losses += Math.abs(gain)
  }
}

export const getNetGain = (term: IGainTerm) => term.profits - term.losses

export const getRealisedGains = (gains: ICapitalGains) => {
  return getNetGain(gains.stcg) + getNetGain(gains.ltcg)
}

export const getHarvestedGains = (baseGains: ICapitalGains, selectedHoldings: IHolding[]) => {
  const gains = cloneGains(baseGains)

  selectedHoldings.forEach((holding) => {
    addGain(gains.stcg, holding.stcg.gain)
    addGain(gains.ltcg, holding.ltcg.gain)
  })

  return gains
}
