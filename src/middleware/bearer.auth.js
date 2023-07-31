"use strict";

const { Users } = require("../../src/models/index");

function bearerAuth(req, res, next) {
  if (req.headers.authorization) {
    const parsedToken = req.headers.authorization.split(" ")[1];
    Users.bearerToken(parsedToken)
      .then((data) => {
        req.user = data;
        next();
      })
      .catch((err) => {
        next(err);
      });
  } else {
    next("Error in bear");
  }
}

module.exports = bearerAuth;
