import { computed, reactive, readonly, ref } from 'vue';
import {
  DEFAULT_COIN_KEY_A,
  DEFAULT_COIN_KEY_B,
  DEFAULT_RANGE_PERCENT,
  EXCHANGE_RATES_TTL
} from '@/lib/constants';
import { parseCoinList } from '@/lib/utils';
import { fetchExchangeRates } from '@/lib/services/rate-service';

/**
 * The key for the A coin in our split
 */
export const coinKeyA = ref(DEFAULT_COIN_KEY_A);

/**
 * The key for the B coin in our split
 */
export const coinKeyB = ref(DEFAULT_COIN_KEY_B);

/**
 * The split for coin A
 */
export const coinSplitA = ref(DEFAULT_RANGE_PERCENT);

/**
 * The split for coin B
 */
export const coinSplitB = computed(() => 100 - coinSplitA.value);

/**
 * List of coins to be used for rendering dropdowns or search
 * @type {Ref<*[], *[]> & {[ShallowRefMarker]?: true}}
 */
export const coinList = ref([DEFAULT_COIN_KEY_A, DEFAULT_COIN_KEY_B]);

/**
 * Our exchange rates data store
 * @type {Reactive<{}>}
 */
const _exchangeRates = reactive({
  rates: {
    [DEFAULT_COIN_KEY_A]: '0',
    [DEFAULT_COIN_KEY_B]: '0'
  },
  ttl: Date.now()
});

/**
 * A read only copy of the exchange rates store that will be used for rendering
 * @type {DeepReadonly<UnwrapNestedRefs<Reactive<{}>>>}
 */
export const exchangeRates = readonly(_exchangeRates);

/**
 * Sets the key value for coin A
 * @param value
 */
export function setCoinKeyA(value) {
  // TODO: Type checking here (str)?
  coinKeyA.value = value;
}

/**
 * Sets the key value for coin B
 * @param value
 */
export function setCoinKeyB(value) {
  // TODO: Type checking here (str)?
  coinKeyB.value = value;
}

/**
 * Sets the splits for coin A and B, these ints should always === 100
 * @param valueA
 * @param valueB
 */
export function setCoinSplits(value) {
  // TODO: Type and sum checking here (int)?
  coinSplitA.value = value;
}

/**
 * Takes fetched rates object and sets the keys into the shallow coinList ref
 * @param rates
 */
export function setCoinList(rates) {
  coinList.value = parseCoinList(rates);
}

/**
 * Takes fetched rates object and updates our exchange rates, sets TTL for one minute
 * @param rates
 */
export function setExchangeRates(rates) {
  _exchangeRates.rates = rates;
  _exchangeRates.ttl = Date.now() + EXCHANGE_RATES_TTL;
}

/**
 * Refreshes exchange rates based on whether the TTL for the last set of rates has passed
 * @returns {Promise<unknown>}
 */
export function refreshExchangeRates(init = false) {
  return new Promise((resolve, reject) => {
    if (Date.now() > _exchangeRates.ttl || init === true) {
      fetchExchangeRates()
        .then((rates) => {
          // Set our exchange rates and the TTL until we query this again
          setExchangeRates(rates);
          if (init === true) {
            // Set the coin list ref, we only want to do this on init (for page load)
            setCoinList(rates);
          }
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        })
    } else {
      resolve(true);
    }
  });
}
