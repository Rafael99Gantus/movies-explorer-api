const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Много запросов для этого IP, повторите попытку через час",
  headers: true,
});

module.exports = { limiter };
