const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const Comp = require("./../models/organizerModel");

const catchAsync = require("./../utils/catchAsync");

const factory = require("./handlerFunction");

const Booking = require("../models/compRegisterModel");
const AppError = require("../utils/appError");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked comp
  const comp = await Comp.findById(req.params.compId);
  console.log(comp);

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    //we wont use thsi simple url because we will be storing the data in the database so we will use the advanced version which is below
    // success_url: `${req.protocol}://${req.get('host')}/`,
    success_url: `${req.protocol}://${req.get("host")}/?comp=${
      req.params.compId
    }&user=${req.user.id}&price=${comp.price}`,
    //upper one lecture 214
    cancel_url: `${req.protocol}://${req.get("host")}/comp/${comp._id}`,
    customer_email: req.user.email,
    client_reference_id: req.params.compId,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `${comp.name} Competition`,
            description: comp.description,
            images: comp.imageCover,
          },
          unit_amount: comp.price * 100,
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
  const { comp, user, price } = req.query;

  if (!comp && !user && !price) return next();

  await Booking.create({ comp, user, price });
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
  const competitions = await Comp.find({ organizer: req.user.id });

  // 2) Check if any competitions were found
  if (!competitions) {
    return next(new AppError("No competitions found for this organizer", 404));
  }

  // 3) Send response
  res.status(200).json({
    status: "success",
    results: competitions.length,
    data: {
      competitions,
    },
  });
});
