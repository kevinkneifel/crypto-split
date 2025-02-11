/**
 * Simple formula for calculating the coin allocation based on percentage of total investment
 * @param total
 * @param percent
 * @param rate
 * @returns {number}
 */
export function calculateAllocation(total, percent, rate) {
  const floatTotal = parseFloat(total);
  if (floatTotal !== floatTotal) {
    // Return zero if we can't convert value to a float (redundant, but safe)
    return 0;
  } else {
    return floatTotal * (percent / 100) * rate;
  }
}

/**
 * Parses rates object and returns an array of keys
 * @param rates
 * @returns {*[]}
 */
export function parseCoinList(rates) {
  const list = [];
  Object.keys(rates).forEach((key) => {
    list.push(key);
  });
  return list;
}

/**
 * Determines if we have a valid response based on status and presence of a desired key/value
 * @param response
 * @param key
 * @returns {boolean}
 */
export function validateObjResponse(response, key) {
  return response.status === 200 && response.data.hasOwnProperty(key) && typeof response.data[key] === 'object';
}
