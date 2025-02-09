import Logger from '@/lib/singletons/logger';

class ServiceError extends Error {
  /**
   * Extends the base Error class, for use with service call exceptions
   * @param errorMessage
   * @param parsedResponse
   */
  constructor(errorMessage, parsedResponse) {
    super(errorMessage);
    this.name = 'ServiceError';

    // Log the error message and data via the Logger
    Logger.logError(errorMessage, parsedResponse);

    // Save the parsed response, so we can refer to it further up the chain
    this.parsedResponse = parsedResponse;
  }
}

export default ServiceError;
