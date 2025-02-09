import { reactive, readonly, shallowRef, ref } from 'vue';
import {
  DEFAULT_COIN_KEY_A,
  DEFAULT_COIN_KEY_B,
  DEFAULT_SPLIT_A,
  DEFAULT_SPLIT_B,
  EXCHANGE_RATES_TTL
} from '@/lib/constants';

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
export const coinSplitA = ref(DEFAULT_SPLIT_A);

/**
 * The split for coin B
 */
export const coinSplitB = ref(DEFAULT_SPLIT_B);

/**
 * List of coins to be used for rendering dropdowns or search
 * @type {Ref<*[], *[]> & {[ShallowRefMarker]?: true}}
 */
export const coinList = shallowRef([]);

/**
 * Our exchange rates data store
 * @type {Reactive<{}>}
 */
export const exchangeRatesBase = reactive({
  rates: {},
  ttl: null
});

/**
 * A read only copy of the exchange rates store that will be used for rendering
 * @type {DeepReadonly<UnwrapNestedRefs<Reactive<{}>>>}
 */
export const exchangeRates = readonly(exchangeRatesBase);

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
export function setCoinSplits(valueA, valueB) {
  // TODO: Type and sum checking here (int)?
  coinSplitA.value = valueA;
  coinKeyB.value = valueB;
}

/**
 * Takes fetched rates object and sets the keys into the shallow coinList ref
 * @param rates
 */
export function setCoinList(rates) {
  Object.keys(rates).forEach((key) => {
    coinList.value.push(key);
  });
}

/**
 * Takes fetched rates object and updates our exchange rates, sets TTL for one minute
 * @param rates
 */
export function setExchangeRates(rates) {
  exchangeRatesBase.rates = rates;
  exchangeRatesBase.ttl = Date.now() + EXCHANGE_RATES_TTL;
}
