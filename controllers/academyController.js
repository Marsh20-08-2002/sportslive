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

exports.createAcademy = catchAsync(async (req, res, next) => {
  // Ensure the logged-in user is present
  if (!req.user) {
    return next(
      new AppError("You must be logged in to create an academy", 401)
    );
  }

  // Assign the logged-in user as the academy owner
  const academyData = {
    ...req.body, // Data from the request body (name, price, etc.)
    owner: req.user.id, // Set the owner to the logged-in user's ID
  };

  // Create the academy
  const newAcademy = await Academy.create(academyData);

  // Send the response
  res.status(201).json({
    status: "success",
    data: {
      academy: newAcademy,
    },
  });
});

exports.getMyacademy = catchAsync(async (req, res, next) => {
  const academy = await Academy.findOne({ owner: req.user.id });

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
    { owner: req.user.id },
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
  const academy = await Academy.findOneAndDelete({ owner: req.user.id });

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
