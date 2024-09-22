const turf = require("./../models/turfModel");
const catchAsync = require("./../utils/catchAsync");

const Email = require("./../utils/email");

const AppError = require("../utils/appError");
const Turf = require("./../models/turfModel");

exports.getAlltours = catchAsync(async (req, res, next) => {
  const doc = await Turf.find().sort({ createdAt: -1 });
  if (!doc) {
    return next(new AppError("no turf found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.createTurf = catchAsync(async (req, res, next) => {
  req.body.turfowner = req.user.id;

  const doc = await Turf.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.myturf = catchAsync(async (req, res, next) => {
  const turfs = await Turf.find({ turfowner: req.user.id });

  if (!turfs.length) {
    return next(new AppError("No turfs found for this owner!", 404));
  }

  res.status(200).json({
    status: "success",
    results: turfs.length,
    data: {
      turfs,
    },
  });
});

exports.updateTurf = catchAsync(async (req, res, next) => {
  // Find the turf by its ID and ensure it belongs to the logged-in user (turfowner)
  const turf = await Turf.findOneAndUpdate(
    { _id: req.params.id, turfowner: req.user.id },
    req.body,
    {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators on update
    }
  );

  if (!turf) {
    return next(
      new AppError(
        "No turf found with that ID or you do not own this turf!",
        404
      )
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      turf,
    },
  });
});

exports.deleteTurf = catchAsync(async (req, res, next) => {
  const turf = await Turf.findOneAndDelete({
    _id: req.params.id,
    turfowner: req.user.id,
  });

  if (!turf) {
    return next(
      new AppError(
        "No turf found with that ID or you do not own this turf!",
        404
      )
    );
  }

  res.status(204).json({
    status: "success",
    data: "Turf successfully deleted!",
  });
});

exports.deleteTurfByAdmin = catchAsync(async (req, res, next) => {
  const turf = await Turf.findByIdAndDelete(req.params.id);

  if (!turf) {
    return next(new AppError("No turf found with that ID!", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
