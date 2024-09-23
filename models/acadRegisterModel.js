const mongoose = require("mongoose");
const slugify = require("slugify");
const academyBookingSchema = new mongoose.Schema({
  academy: {
    type: mongoose.Schema.ObjectId,
    ref: "Academy", // Change "Org" to "Academy" to match the actual academy model
    required: [true, "Booking must belong to an academy!"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Booking must belong to a User!"],
  },
  duration: {
    type: String,
    enum: ["1 month", "3 months", "6 months", "1 year"],
    required: [true, "Booking must have a duration"],
  },
  price: {
    type: Number,
    required: [true, "Booking must have a price."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  paid: {
    type: Boolean,
    default: false, // Initially set to false until payment is made
  },
});

// Pre-save hook to adjust price based on duration
academyBookingSchema.pre("save", function (next) {
  // Adjust price based on the booking duration
  if (this.duration === "1 month") {
    this.price = 100; // Example price for 1 month
  } else if (this.duration === "3 months") {
    this.price = 270; // Example price for 3 months (10% discount)
  } else if (this.duration === "6 months") {
    this.price = 500; // Example price for 6 months (15% discount)
  } else if (this.duration === "1 year") {
    this.price = 900; // Example price for 1 year (25% discount)
  }

  next();
});

// Populate academy name and user details on find queries
academyBookingSchema.pre(/^find/, function (next) {
  this.populate("user").populate({
    path: "academy",
    select: "name",
  });
  next();
});

const AcademyBooking = mongoose.model("AcademyBooking", academyBookingSchema);

module.exports = AcademyBooking;
