import { describe, expect, it } from '@jest/globals'
import { getIndexMakeupAsOf } from '.'
import { changelog as changelogNDX } from './NDX/changelog'

describe('NDX', () => {
  const lastChangelogEntry = new Date(changelogNDX.at(-1)!.date)
  const firstChangelogEntry = new Date(changelogNDX.at(0)!.date)

  const firstToLastDiff = lastChangelogEntry.valueOf() - firstChangelogEntry.valueOf()
  const noOfDaysBetweenFirstAndLast = firstToLastDiff / (1000 * 60 * 60 * 24) + (firstToLastDiff % (1000 * 60 * 60 * 24) > 0 ? 1 : 0)

  const daysBetweenFirstAndLast = Array.from({ length: noOfDaysBetweenFirstAndLast }, (_, i) => i)
    .map((i) => new Date(firstChangelogEntry.valueOf() + i * 1000 * 60 * 60 * 24).toISOString().split('T')[0])
    .reverse()

  it('should get the index makeup for a future date', () => {
    expect(getIndexMakeupAsOf('NDX', '2050-01-01')).toEqual(getIndexMakeupAsOf('NDX', changelogNDX.at(-1)!.date))
  })

  it('should only have between 97 and 108 tickers', () => {
    const indexMakeupAsofOutsideRange: string[] = []

    daysBetweenFirstAndLast.forEach((date) => {
      const indexMakeup = getIndexMakeupAsOf('NDX', date)

      if (indexMakeup.length < 97 || indexMakeup.length > 108) {
        indexMakeupAsofOutsideRange.push(`${date}:${indexMakeup.length}`)
      }
    })

    expect(indexMakeupAsofOutsideRange.sort().reverse()).toHaveLength(0)
  })

  it('should get the index makeup for the specifc date - 2024-12-23 - last entry', () => {
    const indexMakeupBefore = getIndexMakeupAsOf('NDX', '2024-12-22')
    const indexMakeup = getIndexMakeupAsOf('NDX', '2024-12-23')
    const indexMakeupAfter = getIndexMakeupAsOf('NDX', '2024-12-24')

    expect(indexMakeupBefore).not.toContain('PLTR')
    expect(indexMakeupBefore).toContain('ILMN')

    expect(indexMakeup).toContain('PLTR')
    expect(indexMakeup).not.toContain('ILMN')

    expect(indexMakeupAfter).toContain('PLTR')
    expect(indexMakeupAfter).not.toContain('ILMN')
  })

  it('should get the index makeup for the specifc date - 2024-11-18 - tickers added and removed', () => {
    const indexMakeupBefore = getIndexMakeupAsOf('NDX', '2024-11-17')
    const indexMakeup = getIndexMakeupAsOf('NDX', '2024-11-18')
    const indexMakeupAfter = getIndexMakeupAsOf('NDX', '2024-11-19')

    expect(indexMakeupBefore).not.toContain('APP')
    expect(indexMakeupBefore).toContain('DLTR')

    expect(indexMakeup).toContain('APP')
    expect(indexMakeup).not.toContain('DLTR')

    expect(indexMakeupAfter).toContain('APP')
    expect(indexMakeupAfter).not.toContain('DLTR')
  })

  it('should get the index makeup for the specifc date - 2022-06-09 - ticker renamed', () => {
    const indexMakeupBefore = getIndexMakeupAsOf('NDX', '2022-06-08')
    const indexMakeup = getIndexMakeupAsOf('NDX', '2022-06-09')
    const indexMakeupAfter = getIndexMakeupAsOf('NDX', '2022-06-10')

    expect(indexMakeupBefore).not.toContain('META')
    expect(indexMakeupBefore).toContain('FB')

    expect(indexMakeup).toContain('META')
    expect(indexMakeup).not.toContain('FB')

    expect(indexMakeupAfter).toContain('META')
    expect(indexMakeupAfter).not.toContain('FB')
  })
})
