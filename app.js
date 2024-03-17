/* eslint-disable max-len */
const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const helmet = require("helmet");
const cors = require("cors");

require("dotenv").config();

const router = require("./routes/index");

// const errorHandler = require("./middlewares/error"); //+
const { requestLogger, errorLogger } = require("./middlewares/logger"); //+
const { limiter } = require("./middlewares/rateLimit");
const MONGO_URL = require("./utils/config");

const { PORT = 3000 } = process.env;
const app = express();
const options = {
  origin: [
    "http://movie.rafael.nomoredomainsmonster.ru",
    "https://movie.rafael.nomoredomainsmonster.ru",
    "http://localhost:3000",
  ],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ["Content-Type", "origin", "Authorization"],
  credentials: true,
};
app.use(cors(options));
app.use(helmet());

// app.use(cors);
// app.use((req, res, next) => {
//   const { origin } = req.headers;
//   const { method } = req;
//   const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
//   const requestHeaders = req.headers["access-control-request-headers"];
//   if (allowedCors.includes(origin)) {
//     res.header("Access-Control-Allow-Origin", origin);
//   }
//   if (method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
//     res.header("Access-Control-Allow-Headers", requestHeaders);
//     return res.end();
//   }

//   return next();
// });

app.use(express.json());
app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log("Подключение установлено");
  })
  .catch((err) => {
    console.error("Ошибка подключения:", err.message);
  });

app.use(limiter);
app.use(router);
app.use(errorLogger); // логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Ссылка на сервер: ${PORT}`);
});
