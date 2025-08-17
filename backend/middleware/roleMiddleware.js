// middleware/roleMiddleware.js
const asyncHandler = require("express-async-handler");

const authorizeRoles = (...roles) => {
  return asyncHandler((req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error("Not authorized for this action");
    }
    next();
  });
};

module.exports = { authorizeRoles };
