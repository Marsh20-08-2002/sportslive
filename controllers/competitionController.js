const multer = require("multer");
const sharp = require("sharp");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const catchAsync = require("../utils/catchAsync");
const Org = require("../models/organizerModel");
const AppError = require("../utils/appError");

// Multer file filter for image uploads
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload an image.", 400));
  }
};

// Multer storage for temporary image storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: multerFilter,
});

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware to handle single image upload
exports.uploadimage = upload.single("imageCover");

// Middleware to resize image and upload it to Cloudinary
exports.resizeProductImage = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(); // If no image is uploaded, move on to the next middleware
  }

  const imagePath = req.file.path; // Original image path
  const resizedImagePath = `./public/temp/${req.file.filename}-resized.jpeg`;

  // Resize the image using Sharp
  await sharp(imagePath)
    .resize({ width: 474, height: 497 })
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(resizedImagePath);

  // Upload resized image to Cloudinary
  try {
    const result = await cloudinary.uploader.upload(resizedImagePath, {
      resource_type: "image",
    });

    // Log the result to see what's coming from Cloudinary
    console.log("Cloudinary upload result:", result);

    // Assign Cloudinary URL to imageCover field in req.body
    req.body.imageCover = result.secure_url;

    // Delete temporary files
    fs.unlinkSync(imagePath);
    fs.unlinkSync(resizedImagePath);

    next();
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return next(new AppError("Error uploading image to Cloudinary", 500));
  }
});

// Controller to fetch all competitions
exports.getAllcompetition = catchAsync(async (req, res, next) => {
  const competitions = await Org.find().sort({ createdAt: -1 });

  if (!competitions.length) {
    return next(new AppError("No competitions found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: competitions,
    },
  });
});

// Controller to create a new competition
exports.createCompetition = catchAsync(async (req, res, next) => {
  // Log the req.body to inspect what data is coming in
  console.log("Request body on createCompetition:", req.body);

  // Set the current user as the organizer
  req.body.organizer = req.user.id;

  const newCompetition = await Org.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      data: newCompetition,
    },
  });
});

// Controller to fetch competitions for the logged-in user
exports.mycompetition = catchAsync(async (req, res, next) => {
  const competitions = await Org.find({ organizer: req.user.id });

  if (!competitions.length) {
    return next(new AppError("No competitions found for this user", 404));
  }

  res.status(200).json({
    status: "success",
    results: competitions.length,
    data: {
      data: competitions,
    },
  });
});

// Controller to fetch a single competition by its ID
exports.singlecompetition = catchAsync(async (req, res, next) => {
  const competition = await Org.findById(req.params.id).populate(
    "organizer",
    "name"
  );

  if (!competition) {
    return next(new AppError("No competition found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: competition,
    },
  });
});

// Controller to update a competition
exports.updatecompetition = catchAsync(async (req, res, next) => {
  const updatedCompetition = await Org.findOneAndUpdate(
    { _id: req.params.id, organizer: req.user.id },
    req.body,
    {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators
    }
  );

  if (!updatedCompetition) {
    return next(
      new AppError(
        "No competition found with that ID or you are not the organizer",
        404
      )
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      data: updatedCompetition,
    },
  });
});

// Controller to delete a competition (only for the competition organizer)
exports.deleteCompetition = catchAsync(async (req, res, next) => {
  const competition = await Org.findOneAndDelete({
    _id: req.params.id,
    organizer: req.user.id,
  });

  if (!competition) {
    return next(
      new AppError(
        "No competition found with that ID or you are not the organizer",
        404
      )
    );
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

// Controller for admin to delete any competition
exports.deleteCompetitionByAdmin = catchAsync(async (req, res, next) => {
  const competition = await Org.findByIdAndDelete(req.params.id);

  if (!competition) {
    return next(new AppError("No competition found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
