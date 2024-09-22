const mongoose = require("mongoose");
const slugify = require("slugify");
const bookingSchema = new mongoose.Schema({
  competition: {
    type: mongoose.Schema.ObjectId,
    ref: "Org",
    required: [true, "Booking must belong to a competition!"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Booking must belong to a User!"],
  },
  price: {
    type: Number,
    require: [true, "Booking must have a price."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: true,
  },
});
bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user", // Path to the `user` field
    select: "name email", // Fields to select from the `user`
  }).populate({
    path: "competition", // Path to the `competition` field
    select: "name", // Fields to select from the `competition`
  });
  next();
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
