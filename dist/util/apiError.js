/**
 * The service error type module
 * @module
 */

"use strict";

/**
 * Represents a service error.
 * @class
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApiError =

/**
 * @constructor
 * @param {string} errorType The type of the error. Currently either "ValidationError" or "Error".
 * @param {Array<string>} messages Collection of error messages.
 * @param {Error} innerError The original native JavaScript error.
 * @param {Number} statusCode the Http status code for JavaScript error.
 */
function ApiError(errorType, messages, innerError, statusCode) {
  _classCallCheck(this, ApiError);

  /** @member {string} errorType The type of the error. Currently either "ValidationError" or "Error". */
  this.errorType = errorType;

  /** @member {string} messages Collection of error messages. */
  this.messages = messages;

  /** @member {Error} innerError The original native JavaScript error. */
  this.innerError = innerError;

  this.statusCode = statusCode;
};

exports.default = ApiError;
//# sourceMappingURL=apiError.js.map
