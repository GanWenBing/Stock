// const API = 'GNR709P4YLGGCJRE'
// const API = 'HGJWFG4N8AQ66ICD'
// HGJWFG4N8AQ66ICD
// const API = '1YB64755JWVBCS3'
// const API = 'D03VFL5XJ25QWELA'
// const API = 'SFGAGF3673EYRY'
 const API = 'KOE7PMEOOPD18BYD'
//  const API = 'RNZPXZ6Q9FEFMEHM'      
 //const API = "50M3AP1K3Y"
//const API = 'V3PCACJXPX0KM5W3'

export const Autosearch = (symbol) => `https://www.alphavantage.co/query?function=Overview&symbol=${symbol}&apikey=${API}`;
export const Timechart = (symbol) => `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API}`;
export const Newssentiment = (symbol) => `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${symbol}&topics=technology&apikey=${API}`
export const Endpoint = (symbol) =>`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${API}`


//TIME_SERIES_DAILY_ADJUSTED, TIME_SERIES_WEEKLY,TIME_SERIES_WEEKLY_ADJUSTED,TIME_SERIES_MONTHLY



// alphavantage

// GNR709P4YLGGCJRE