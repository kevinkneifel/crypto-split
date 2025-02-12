# Crypto Split

## About
**Crypto Split** is a fun little app that calculates how to split a given amount of USD between two different cryptocurrencies. The default split is 70/30 for `BTC`/`ETH`, but I've gone ahead and made it so you can do splits based on any of the coins returned by the `https://api.coinbase.com/v2/exchange-rates?currency=USD` exchange rates endpoint. It is also possible to set the split percentage between each coin via the range slider.

This app is built in [Vue.js](https://vuejs.org/)!

## Setup

Setup is easy, just `cd` into the `crypto-split` folder and run:
```bash
npm i && npm run dev
```

## Notes

Due to time constraints there are some choices I made to speed up development, as well as some things I would probably change if I were to keep working on this:

- A lot has changed since I last used Vue.js, so I prioritized acquainting myself with the Vue3 Composition API over writing this app in TypeScript—if I had more time I'd rewrite this in TypeScript to save some redundant type checking (and because Vue.js has native support for it)
- I did a little bit of extra tooling, including breaking external requests out into services and stubbing out a `Logger` singleton (which would eventually send errors to something like Rollbar or Sentry)
- I used `axios` for external service requests, mostly because it has dependable error handling that `fetch()` doesn't have out of the box
- I included descriptive `aria-label`s for form fields and kept the form elements native to make this as accessible as possible—the app is easily navigated with a screen reading assistant (such as Mac `Cmd`+`F5`)
- Styling the `range` input element is tedious, so I'm just relying on the native browser styles for now—if I had more time I'd spiff it up to match the other form inputs
- I'm unaware of how frequenty `https://api.coinbase.com/v2/exchange-rates?currency=USD` updates it's exchange rate tables, but for the sake of debouncing the investable assets field, and reducing external service calls, I've cached the exchange rates with a 30 second TTL (after which any change to the form will re-request the rates)
- There are like 500 different coins that are returned from the exchange rates endpoint, so ideally you'd be able to search for the coins you want—for now I'm just using some really large `select` dropdowns
