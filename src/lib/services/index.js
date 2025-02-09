/**
 * Determines if we have a valid response based on status and presence of a desired key/value
 * @param response
 * @param key
 * @returns {boolean}
 */
export function validateObjResponse(response, key) {
  return response.status === 200 && response.data.hasOwnProperty(key) && typeof response.data[key] === 'object';
}
