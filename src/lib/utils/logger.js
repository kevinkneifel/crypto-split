let shared = null;

class Logger {
  /**
   * Returns the singleton instance
   * @returns {Logger}
   */
  static shared() {
    if (shared === null) {
      shared = new Logger();
    }
    return shared;
  }

  /**
   * This would eventually log to Rollbar or Sentry, logging to console for now
   * @param message
   * @param data
   */
  logError(message = '', data = null) {
    console.error(message, data);
  }

  /**
   * This would eventually log to Rollbar or Sentry, logging to console for now
   * @param message
   * @param data
   */
  logWarn(message = '', data = null) {
    console.warn(message, data);
  }

  /**
   * This would eventually log to Rollbar or Sentry, logging to console for now
   * @param message
   * @param data
   */
  logInfo(message = '', data = null) {
    console.info(message, data);
  }
}

const sharedLogger = Logger.shared();
export default sharedLogger;
