export const formatCurrency = (value: number): string => {
  const positiveValue = Math.abs(value)
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
  return formatter.format(positiveValue / 100)
}

export const parseCurrency = (value: string): number => {
  const numericString = value.replace(/[^0-9]/g, '')
  return parseInt(numericString, 10) || 0
}
