export const formatCurrency = (value: number) => {
  return `$${Math.abs(value).toLocaleString('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })}`
}

export const formatSignedCurrency = (value: number) => {
  const sign = value < 0 ? '-' : '+'

  return `${sign}$ ${Math.abs(value).toLocaleString('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })}`
}

export const formatAmount = (value: number, suffix?: string) => {
  const formatted = value.toLocaleString('en-US', {
    maximumSignificantDigits: 8,
  })

  return suffix ? `${formatted} ${suffix}` : formatted
}
