/**
 * The default A coin when app loads
 * @type {string}
 */
export const DEFAULT_COIN_KEY_A = 'BTC';

/**
 * The default B coin when app loads
 * @type {string}
 */
export const DEFAULT_COIN_KEY_B = 'ETH';

/**
 * The default range for coin splits when app loads
 * @type {number}
 */
export const DEFAULT_RANGE_PERCENT = 70;

/**
 * Coinbase API endpoint for US crypto exchange rates
 * @type {string}
 */
export const ENDPOINT_US_EXCHANGE_RATES = 'https://api.coinbase.com/v2/exchange-rates?currency=USD';

/**
 * Our TTL for how long the exchange rates object is considered fresh, default is 60 seconds
 * @type {number}
 */
export const EXCHANGE_RATES_TTL = 60 * 1000;
