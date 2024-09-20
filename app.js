const path = require("path");
const express = require("express");
const morgan = require("morgan");
const limiter = require("express-rate-limit");
const monogsantize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const helmet = require("helmet");
const hpp = require("hpp");
const cookieparser = require("cookie-parser");
const compression = require("compression");
const AppError = require("./utils/appError");

const userRouter = require("./routes/userRoutes");

const turfRouter = require("./routes/turfRoutes");

const compRouter = require("./routes/competitionRoutes");
const bookingRouter = require("./routes/compRegisterRoutes");
const app = express();

app.use(helmet({ contentSecurityPolicy: false }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const ratelimiter = limiter({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "too many request from this api please try again in an hour",
});

app.use("/api", ratelimiter);
app.use(express.json({ limit: "10kb" }));

app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(cookieparser());

//data sanitization against NoSQL query injection
app.use(monogsantize());
//Data sanitization--malicious html code
app.use(xss());

app.use(express.static(`${__dirname}/public`));

app.use(compression());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

// app.use('/', viewRouter);
// app.use('/api/v1/tours', tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/turf", turfRouter);
app.use("/api/v1/comp", compRouter);
app.use("/api/v1/compreg", bookingRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`can't find the ${req.originalUrl} url`));
});

module.exports = app;
