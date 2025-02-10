import axios from 'axios';
import ServiceError from '@/lib/exceptions/service-error';
import { ENDPOINT_US_EXCHANGE_RATES } from '@/lib/constants';
import { validateObjResponse } from '@/lib/services';

/**
 * Fetches the crypto exchange rates from coinbase
 * @returns {Promise<unknown>}
 */
export function fetchExchangeRates() {
  return new Promise((resolve, reject) => {
    return axios.get(ENDPOINT_US_EXCHANGE_RATES)
      .then((response) => {
        if (validateObjResponse(response, 'data')) {
          const { rates } = response.data.data;
          resolve(rates);
        } else {
          reject(new ServiceError('Rates data not found in response', response));
        }
      })
      .catch((error) => {
        reject(new ServiceError('Error fetching exchange rates', error));
      });
  });
}
