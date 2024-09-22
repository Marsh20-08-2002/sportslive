const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const Acad = require("./../models/academyModel");

const catchAsync = require("./../utils/catchAsync");

const factory = require("./handlerFunction");
const ExcelJS = require("exceljs");
const Booking = require("../models/acadRegisterModel");
const AppError = require("../utils/appError");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked comp
  const acad = await Acad.findById(req.params.acadId);
  console.log(acad);

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    //we wont use thsi simple url because we will be storing the data in the database so we will use the advanced version which is below
    // success_url: `${req.protocol}://${req.get('host')}/`,
    success_url: `${req.protocol}://${req.get("host")}/?acad=${
      req.params.acadId
    }&user=${req.user.id}&price=${acad.price}`,
    //upper one lecture 214
    cancel_url: `${req.protocol}://${req.get("host")}/acad/${acad._id}`,
    customer_email: req.user.email,
    client_reference_id: req.params.acadId,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `${acad.name} Competition`,
            description: acad.description,
            images: acad.imageCover,
          },
          unit_amount: acad.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
  });

  // 3) Create session as response
  res.status(200).json({
    status: "success",
    session,
  });
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  const { acad, user, price } = req.query;

  if (!acad && !user && !price) return next();

  await Booking.create({ acad, user, price });
  res.redirect(req.originalUrl.split("?")[0]);
});

exports.createBooking = factory.createOne(Booking);

exports.getAllBookings = catchAsync(async (req, res, next) => {
  const doc = await Booking.find();

  if (!doc) {
    return next(new AppError("no booking found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      doc,
    },
  });
});

exports.getMyCompetitions = catchAsync(async (req, res, next) => {
  // 1) Get the current user's competitions (as an organizer)
  const Academies = await Acad.find({ owner: req.user.id });

  // 2) Check if any Academies were found
  if (!Academies) {
    return next(new AppError("No Academies found for this organizer", 404));
  }

  // 3) Send response
  res.status(200).json({
    status: "success",
    results: Academies.length,
    data: {
      Academies,
    },
  });
});

// exports.getbookingstats = catchAsync(async (req, res, next) => {
//   const stats = await Booking.aggregate([{}]);
// });
