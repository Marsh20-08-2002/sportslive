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
    cancel_url: `${req.protocol}://${req.get("host")}/comp/${comp.id}`,
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

exports.createreport = catchAsync(async (req, ers, next) => {
  const workbook = new Exceljs.Workbook();
  const worksheet = workbook.addWorksheet("competitionlist");

  worksheet.columns = [
    { heade: "S.no", key: "s_no", width: 5 },
    { header: "competition ID", key: "competitionId", width: 29 },
    { header: "competition Name", key: "competitionName", width: 29 },
    { header: "User Name", key: "userName", width: 29 },
    { header: "User Email", key: "userEmail", width: 29 },
    { header: "Price", key: "price", width: 29 },
    { header: "Paid", key: "paid", width: 5 },
    { header: "Date and Time", key: "datetime", width: 29 },
  ];
  const { year } = req.query; // Extract selected year from query parameters

  let query = {};

  // Filter bookings based on the selected year
  if (year) {
    const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
    const endDate = new Date(`${year}-12-31T23:59:59.999Z`);
    query.createdAt = { $gte: startDate, $lte: endDate };
  }
  const book = await Booking.find(query);
  const bookings = book.filter((booking) => booking.competition != null);
  let rowNum = 2;

  bookings.forEach((booking, index) => {
    worksheet.addRow({
      s_no: index + 1,
      competitioId: booking.competition.id,
      competitionName: booking.competition.name,
      userName: booking.user.name,
      userEmail: booking.user.email,
      price: booking.price,
      paid: booking.paid ? "yes" : "No",
      dateTime: booking.createdAt,
    });
  });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=bookingsdata.xlsx"
  );
  await workbook.xlsx.write(res);
});

exports.createOrganizerReport = catchAsync(async (req, res, next) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Competition List");

  worksheet.columns = [
    { header: "S.no", key: "s_no", width: 5 },
    { header: "Competition ID", key: "competitionId", width: 29 },
    { header: "Competition Name", key: "competitionName", width: 29 },
    { header: "User Name", key: "userName", width: 29 },
    { header: "User Email", key: "userEmail", width: 29 },
    { header: "Price", key: "price", width: 29 },
    { header: "Paid", key: "paid", width: 5 },
    { header: "Date and Time", key: "datetime", width: 29 },
  ];

  // 1) Get the current year from query or default to all
  const { year } = req.query;

  let query = { organizer: req.user.id }; // Filter competitions by the logged-in organizer

  if (year) {
    const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
    const endDate = new Date(`${year}-12-31T23:59:59.999Z`);
    query.createdAt = { $gte: startDate, $lte: endDate };
  }

  // 2) Find all competitions organized by the user
  const competitions = await Comp.find({ organizer: req.user.id });

  // 3) Get only bookings related to those competitions
  const bookings = await Booking.find({
    competition: { $in: competitions.map((comp) => comp._id) },
  })
    .populate("competition")
    .populate("user");

  let rowNum = 2;

  bookings.forEach((booking, index) => {
    worksheet.addRow({
      s_no: index + 1,
      competitionId: booking.competition.id,
      competitionName: booking.competition.name,
      userName: booking.user.name,
      userEmail: booking.user.email,
      price: booking.price,
      paid: booking.paid ? "Yes" : "No",
      datetime: booking.createdAt,
    });
  });

  // 4) Set headers and generate the Excel file for download
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${req.user.name}_bookings.xlsx`
  );
  await workbook.xlsx.write(res);
});
