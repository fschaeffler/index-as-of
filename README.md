# Index As Of

The NPM-module gets the included tickers of an index as of a specific historic date. This can be useful for back-testing trading strategies which make use of an index membership. Currently, only NASDAQ 100 (NDX) is supported.

**Note: I'm absolute certain that there are invalid and also missing tickers within the data. Use this data always with precaution.**

## Logic

The index makeup of a specific date is done with the following logic.

1. get all known tickers which are part of the index by the data init data (NDX: 2024-12-23)
2. check all changelog entries to remove, add, or update entries until the requested data is reached

## Usage

```TypeScript
import { getIndexMakeupAsOf } from '@fschaeffler/index-as-of'

// retrieves all tickers that were part of NDX as of 2022-10-18
const tickersNDX = getIndexMakeupAsOf('NDX', '2022-10-18')

//   [
//     'AAPL', 'ABNB', 'ADBE',  'ADI',  'ADP',  'ADSK', 'AEP',
//     'ALGN', 'AMAT', 'AMD',   'AMGN', 'AMZN', 'ANSS', 'ASML',
//     'ATVI', 'AVGO', 'AZN',   'BIDU', 'BIIB', 'BKNG', 'CDNS',
//     'CEG',  'CHTR', 'CMCSA', 'COST', 'CPRT', 'CRWD', 'CSCO',
//     'CSGP', 'CSX',  'CTAS',  'CTSH', 'DDOG', 'DLTR', 'DOCU',
//     'DXCM', 'EA',   'EBAY',  'EXC',  'FAST', 'FISV', 'FTNT',
//     'GILD', 'GOOG', 'GOOGL', 'HON',  'IDXX', 'ILMN', 'INTC',
//     'INTU', 'ISRG', 'JD',    'KDP',  'KHC',  'KLAC', 'LCID',
//     'LRCX', 'LULU', 'MAR',   'MCHP', 'MDLZ', 'MELI', 'META',
//     'MNST', 'MRNA', 'MRVL',  'MSFT', 'MU',   'NFLX', 'NTES',
//     'NVDA', 'NXPI', 'ODFL',  'OKTA', 'ORLY', 'PANW', 'PAYX',
//     'PCAR', 'PDD',  'PEP',   'PYPL', 'QCOM', 'REGN', 'ROST',
//     'SBUX', 'SIRI', 'SNPS',  'SPLK', 'SWKS', 'TEAM', 'TMUS',
//     'TSLA', 'TTD',  'TXN',   'VRSK', 'VRSN', 'VRTX', 'WBA',
//     'WDAY', 'XEL',
//     ... 1 more item
//   ]
console.log(tickersNDX)
```

## Work Approach for the example NASDAQ 100

I'm making use of OpenAI with the o1-preview-2024-09-12 model.

**Step 1:** initial data creation

This step is repeated for each year between 2008 and 2024.

```
I want a complete list of changelog entries with changes - addition, removal, ticker renaming - to the NASDAQ 100 for the year 2009.

Use official NASDAQ press releases and news. This data source can be assume as 100% correctness. Use other reliable public sources like e.g. Bloomberg, Reuters, etc. into account. Cross-check everything with Wikipedia, but check discrepancies very carefully. Use archive.org where it does make sense.

I want the list complete and correct. It's acceptable if it takes some time to get me the results. Take extra time to cross-check your results. Take other reliable public sources into account. Use archive.org if that might help you. Evaluate if the everything is correct as much as possible. I don't care when you have an answer. However, the answer must - under any circumstances - by complete and correct.

Get me the results as an array of the following structure. The 'renamed' action is only used if ticker has changed like e.g. BBRY to BB on 2017-10-01. The ticker for this renaming would be 'BBRY:BB'.

export interface ChangelogEntry {
  date: string
  action: 'added' | 'removed' | 'renamed'
  ticker: string
}
```

**Step 2:** cross-check with data from Wikipedia

```
Take the following text from Wikipedia into consideration. Recheck and validate the results very carefully.

On January 20, 2009, News Corporation was added to the index, replacing Focus Media Holding, which did not meet the minimum monthly weight requirements. On July 17, 2009, Cerner replaced Sun Microsystems after Sun Microsystems was acquired by Oracle. On October 29, 2009, Priceline.com replaced Juniper Networks after Juniper transferred its listing to the NYSE. On December 21, 2009, seven stocks joined the Nasdaq-100 index before the market open: Vodafone, Mattel, BMC Software, Mylan, Qiagen, SanDisk and Virgin Media. These stocks replaced Akamai Technologies, Hansen Natural, IAC/InterActiveCorp, Liberty Global, Pharmaceutical Product Development, Ryanair and Steel Dynamics.
```

**Step 3:** re-check the created changelog and apply fixes accordingly

This step is repeated for each year between 2008 and 2024.

```
check every single changelog entry of the NASDAQ 100 for plausibility and validity. This is for the year 2021. Tell me which changelog entries as invalid and also which entries are missing. I want the results to be complete and perfect. Take your time. Correctness is valued more than speed. Use any available source that you have at hand including among others NASDAQ news, Reuters, Bloomberg, CNBC, FT, Wikipedia, etc. as well as useful snapshots in archive.org.

Get me a corrected list in the same format as the input.

  { date: '2021-04-12', action: 'added', ticker: 'ALGN' }, // re-check because missing in Wikipedia
  { date: '2021-04-12', action: 'removed', ticker: 'LBTYA' }, // re-check because missing in Wikipedia
  { date: '2021-07-21', action: 'added', ticker: 'HON' },
  { date: '2021-07-21', action: 'removed', ticker: 'ALXN' },
  { date: '2021-08-26', action: 'added', ticker: 'CRWD' },
  { date: '2021-08-26', action: 'removed', ticker: 'MXIM' },
  { date: '2021-12-20', action: 'added', ticker: 'ABNB' },
  { date: '2021-12-20', action: 'added', ticker: 'DDOG' },
  { date: '2021-12-20', action: 'added', ticker: 'FTNT' },
  { date: '2021-12-20', action: 'added', ticker: 'LCID' },
  { date: '2021-12-20', action: 'added', ticker: 'PANW' },
  { date: '2021-12-20', action: 'added', ticker: 'ZS' },
  { date: '2021-12-20', action: 'removed', ticker: 'CDW' },
  { date: '2021-12-20', action: 'removed', ticker: 'CERN' },
  { date: '2021-12-20', action: 'removed', ticker: 'CHKP' },
  { date: '2021-12-20', action: 'removed', ticker: 'FOXA' },
  { date: '2021-12-20', action: 'removed', ticker: 'FOX' },
  { date: '2021-12-20', action: 'removed', ticker: 'INCY' },
  { date: '2021-12-20', action: 'removed', ticker: 'TCOM' },
```

**Step 4:** merge all changelog entries into one single result
