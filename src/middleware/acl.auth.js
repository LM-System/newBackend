"use strict";

function acl(perm) {
  return (req, res, next) => {
    if (req.user.capabilities.includes(perm)) {
      next();
    } else {
      next("Not allowd to enter");
    }
  };
}

module.exports = acl;
