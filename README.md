# Crypto Split

## About
**Crypto Split** is a fun little app that splits a given USD amount into two different allocations of cryptocurrency. The default split is 70/30 for `BTC`/`ETH`, but I've gone ahead and made it so you can do splits based on any of the coins returned by the `https://api.coinbase.com/v2/exchange-rates?currency=USD` exchange rates endpoint. It is also possible to set the split percentage between each coin via range slider.

This app is built in [Vue.js](https://vuejs.org/)!

## Setup

Setup is easy, just `cd` into the `crypto-split` folder and run:
```bash
npm i && npm run dev
```

## Notes

Due to time constraints there are few choices I made to speed up development, as well as some things I would probably change if I were to keep working on this:

- I used `axios` for the service requests, mostly because it has dependable error handling that `fetch()` doesn't have out of the box—there is a world where I'd build out base-service methods around `fetch()` to avoid the additional dependency, but not this time
- A lot has changed since I lasted used Vue.js (Vue2), so I prioritized acquainting myself with the Vue3 Composition API over writing this app in TypeScript—if I had more time I'd rewrite this in TypeScript to save some redundant type checking (and because Vue.js has native support for it)
-  I did a little bit of extra tooling on this, including breaking external requests out into services and stubbing out a `Logger` singleton (which would otherwise report errors to an service like Rollbar or Sentry, but for the purposes of this assignment just logs to the `console`)
- I included descriptive `aria-labels` for form fields and kept the form elements native to make this as accessible as possible without spending too much time on it—the app and it's forms can be easily navigated with a screen reading assistant (such as Mac `Cmd`-`F5`)
- Styling the `range` input is tedious, so I'm just relying on the native browser styles for that element for now—if I had more time I'd spiff it up to match the other form inputs
- I'm unaware of how frequenty `https://api.coinbase.com/v2/exchange-rates?currency=USD` updates it's exchange rate tables, but for the sake of debouncing the investable assets field—and to reduce the number if external calls this app makes—I've cached the returned exchange rates with a 30 second TTL, after which any changes to the form will re-request the rates
