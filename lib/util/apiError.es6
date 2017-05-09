/**
 * The service error type module
 * @module
 */

"use strict";

/**
 * Represents a service error.
 * @class
 */
export default class ApiError {

  /**
   * @constructor
   * @param {string} errorType The type of the error. Currently either "ValidationError" or "Error".
   * @param {Array<string>} messages Collection of error messages.
   * @param {Error} innerError The original native JavaScript error.
   * @param {Number} statusCode the Http status code for JavaScript error.
   */
  constructor(errorType, messages, innerError, statusCode) {

    /** @member {string} errorType The type of the error. Currently either "ValidationError" or "Error". */
    this.errorType = errorType;

    /** @member {string} messages Collection of error messages. */
    this.messages = messages;

    /** @member {Error} innerError The original native JavaScript error. */
    this.innerError = innerError;

    this.statusCode = statusCode;
  }
}
