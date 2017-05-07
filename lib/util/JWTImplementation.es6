"use strict";

import jsonwebtoken from "jsonwebtoken";
import Q from "q";

class JWTImplementaion {

  constructor(secretKey) {
    this.secretKey = secretKey;
  }

  sign(payload, options) {

    let token = jsonwebtoken.sign(payload, this.secretKey, options);

    return token;
  }

  verifyToken(token) {
    return Q.ninvoke(jsonwebtoken, "verify", token, this.secretKey);
  }
}

export default JWTImplementaion;
