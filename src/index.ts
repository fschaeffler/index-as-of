import * as NDX from './NDX'
import { ChangelogEntry } from './types'

export const getIndexMakeupAsOf = (index: 'NDX', date: string) => {
  let changelog: ChangelogEntry[]
  let changelogInitTickers: string[]

  switch (index) {
    case 'NDX':
      changelog = NDX.changelog
      changelogInitTickers = NDX.changelogInitTickers
      break
    default:
      throw new Error(`invalid index ${index}`)
  }

  const tickers = new Set<string>(changelogInitTickers)

  const changelogEntries = changelog.filter((entry) => entry.date > date).sort((a, b) => (a.date < b.date ? 1 : -1))

  changelogEntries.forEach((entry) => {
    if (entry.action === 'added') {
      tickers.delete(entry.ticker)
    }

    if (entry.action === 'removed') {
      tickers.add(entry.ticker)
    }

    if (entry.action === 'renamed') {
      const [from, to] = entry.ticker.split(':')

      if (tickers.has(to)) {
        tickers.add(from)
        tickers.delete(to)
      }
    }
  })

  return Array.from(tickers).sort()
}
