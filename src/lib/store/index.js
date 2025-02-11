import { computed, reactive, readonly, ref } from 'vue';
import {
  ALERT_TYPE_ERROR,
  DEFAULT_COIN_KEY_A,
  DEFAULT_COIN_KEY_B,
  DEFAULT_RANGE_PERCENT,
  EXCHANGE_RATES_TTL,
} from '@/lib/constants';
import { parseCoinList } from '@/lib/utils';
import { fetchExchangeRates } from '@/lib/services/rate-service';

/**
 * List for app alerts, errors, messages, etc
 * @type {Reactive<*[]>}
 * @private
 */
const _alerts = ref([]);

/**
 * Readonly copy of the alerts list
 * @type {DeepReadonly<UnwrapNestedRefs<Reactive<*[]>>>}
 */
export const alerts = readonly(_alerts);

/**
 * Iterative ref for managing unique alert IDs
 * @type {Ref<UnwrapRef<number>, UnwrapRef<number> | number>}
 * @private
 */
const _alertID = ref(0);

/**
 * The key for the A coin in our split
 * @type {Ref<UnwrapRef<string>, UnwrapRef<string> | string>}
 * @private
 */
const _coinKeyA = ref(DEFAULT_COIN_KEY_A);

/**
 * Readonly copy of the A coin key
 * @type {DeepReadonly<UnwrapNestedRefs<Ref<UnwrapRef<string>, UnwrapRef<string>|string>>>}
 */
export const coinKeyA = readonly(_coinKeyA);

/**
 * The key for the B coin in our split
 * @type {Ref<UnwrapRef<string>, UnwrapRef<string> | string>}
 * @private
 */
const _coinKeyB = ref(DEFAULT_COIN_KEY_B);

/**
 * Readonly copy of the B coin key
 * @type {DeepReadonly<UnwrapNestedRefs<Ref<UnwrapRef<string>, UnwrapRef<string>|string>>>}
 */
export const coinKeyB = readonly(_coinKeyB);

/**
 * The percentage split for coin A
 * @type {Ref<UnwrapRef<number>, UnwrapRef<number> | number>}
 * @private
 */
const _coinSplitA = ref(DEFAULT_RANGE_PERCENT);

/**
 * Readonly copy of coin A split
 * @type {DeepReadonly<UnwrapNestedRefs<Ref<UnwrapRef<number>, UnwrapRef<number>|number>>>}
 */
export const coinSplitA = readonly(_coinSplitA);

/**
 * The percentage split for coin B
 * @type {ComputedRef<unknown>}
 * @private
 */
const _coinSplitB = computed(() => 100 - _coinSplitA.value);

/**
 * Readonly copy of the coin B split
 * @type {DeepReadonly<UnwrapNestedRefs<ComputedRef<unknown>>>}
 */
export const coinSplitB = readonly(_coinSplitB);

/**
 * List of coins that can be selected for splits
 * @type {Ref<UnwrapRef<string[]>, UnwrapRef<string[]> | string[]>}
 * @private
 */
const _coinList = ref([DEFAULT_COIN_KEY_A, DEFAULT_COIN_KEY_B]);

/**
 * Readonly copy of coins list
 * @type {DeepReadonly<UnwrapNestedRefs<Ref<UnwrapRef<string[]>, UnwrapRef<string[]>|string[]>>>}
 */
export const coinList = readonly(_coinList);

/**
 * Exchange rates datastore for calculating allocations
 * @type {Reactive<{rates: {[p: string]: string}, ttl: number}>}
 * @private
 */
const _exchangeRates = reactive({
  rates: {
    [DEFAULT_COIN_KEY_A]: '0',
    [DEFAULT_COIN_KEY_B]: '0'
  },
  ttl: Date.now()
});

/**
 * Readonly copy of the exchange rates datastore
 * @type {DeepReadonly<UnwrapNestedRefs<Reactive<{rates: {[p: string]: string}, ttl: number}>>>}
 */
export const exchangeRates = readonly(_exchangeRates);

/**
 * Sets an alert to be rendered by the alerts header
 * @param message
 * @param type
 */
export function setAlert(message, type=ALERT_TYPE_ERROR) {
  _alerts.value.push({ id: _alertID.value, message: message, type: type });
  _alertID.value++;
}

/**
 * Removes an alert from the alerts list
 * @param id
 */
export function unsetAlert(id) {
  _alerts.value = _alerts.value.filter((a) => a.id !== id);
}

/**
 * Sets the key value for coin A
 * @param value
 */
export function setCoinKeyA(value) {
  _coinKeyA.value = value;
}

/**
 * Sets the key value for coin B
 * @param value
 */
export function setCoinKeyB(value) {
  _coinKeyB.value = value;
}

/**
 * Sets the percentage splits for the coin refs, only coin A is set, coin B is a computed value
 * @param value
 */
export function setCoinSplits(value) {
  _coinSplitA.value = value;
}

/**
 * Takes fetched rates object and sets the keys into the shallow coinList ref
 * @param rates
 */
function setCoinList(rates) {
  _coinList.value = parseCoinList(rates);
}

/**
 * Takes fetched rates object and updates our exchange rates, sets TTL for one minute
 * @param rates
 */
function setExchangeRates(rates) {
  _exchangeRates.rates = rates;
  _exchangeRates.ttl = Date.now() + EXCHANGE_RATES_TTL;
}

/**
 * Refreshes exchange rates based on whether the TTL for the last set of rates has passed
 * @param init
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
