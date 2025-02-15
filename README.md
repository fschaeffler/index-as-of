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
