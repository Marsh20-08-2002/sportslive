const catchAsync = require("../utils/catchAsync");
const Organizer = require("../models/organizerModel");

const Email = require("../utils/email");
const AppError = require("../utils/appError");

exports.getAllcompetition = catchAsync(async (req, res, next) => {
  const doc = await Organizer.find().sort({ createdAt: -1 });
  if (!doc) {
    return next(new AppError("no Competition found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.createCompetition = catchAsync(async (req, res, next) => {
  req.body.organizer = req.user._id;

  const doc = await Organizer.create(req.body);

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.mycompetition = catchAsync(async (req, res, next) => {
  const Competition = await Organizer.find({ organizer: req.user._id });

  if (!Competition.length) {
    return next(new AppError("No competition found for this!", 404));
  }

  res.status(200).json({
    status: "success",
    results: Competition.length,
    data: {
      Competition,
    },
  });
});

exports.updatecompetition = catchAsync(async (req, res, next) => {
  // Find the turf by its ID and ensure it belongs to the logged-in user (turfowner)
  const organizer = await Organizer.findOneAndUpdate(
    { _id: req.params.id, organizer: req.user._id },
    req.body,
    {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators on update
    }
  );

  if (!organizer) {
    return next(
      new AppError(
        "No organizer found with that ID or you do not own this turf!",
        404
      )
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      organizer,
    },
  });
});

exports.deleteCompetition = catchAsync(async (req, res, next) => {
  const competition = await Organizer.findOneAndDelete({
    _id: req.params.id,
    organizer: req.user._id,
  });

  if (!competition) {
    return next(
      new AppError(
        "No competition found with that ID or you do not own this competition!",
        404
      )
    );
  }

  res.status(204).json({
    status: "success",
    data: "competition successfully deleted!",
  });
});

exports.deleteCompetitionByAdmin = catchAsync(async (req, res, next) => {
  const competition = await Organizer.findByIdAndDelete(req.params.id);

  if (!competition) {
    return next(new AppError("No competition found with that ID!", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
