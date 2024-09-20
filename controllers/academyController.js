const catchAsync = require("../utils/catchAsync");
const Academy = require("../models/academyModel");

const Email = require("../utils/email");
const AppError = require("../utils/appError");

exports.getAllacadmey = catchAsync(async (req, res, next) => {
  const academies = await Academy.find().sort({ createdAt: -1 });
  if (!academies) {
    return next(new AppError("no academies found", 404));
  }
  res.status(200).json({
    status: "success",
    results: academies.length,
    data: {
      academies,
    },
  });
});

exports.getMyacademy = catchAsync(async (req, res, next) => {
  const academy = await Academy.findOne({ owner: req.user._id });

  if (!academy) {
    return res.status(404).json({
      status: "fail",
      message: "No academy found for this owner",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      academy,
    },
  });
});

exports.updateMyacademy = catchAsync(async (req, res, next) => {
  const updatedAcademy = await Academy.findOneAndUpdate(
    { owner: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedAcademy) {
    return res.status(404).json({
      status: "fail",
      message: "No academy found for this owner",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      academy: updatedAcademy,
    },
  });
});

exports.deleteMyacademy = catchAsync(async (req, res, next) => {
  const academy = await Academy.findOneAndDelete({ owner: req.user._id });

  if (!academy) {
    return res.status(404).json({
      status: "fail",
      message: "No academy found for this owner",
    });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.deleteAcademy = catchAsync(async (req, res, next) => {
  const academy = await Academy.findByIdAndDelete(req.params.id);

  if (!academy) {
    return res.status(404).json({
      status: "fail",
      message: "No academy found with that ID",
    });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
