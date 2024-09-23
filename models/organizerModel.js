const mongoose = require("mongoose");
const slugify = require("slugify");

const orgschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tournament must have a name"],
      unique: true,
      trim: true,
      maxlength: [40, "notmorethan 40 for the name"],
    },
    slug: String,
    PhoneNumber: Number,
    sports: {
      type: String,
    },

    price: {
      type: Number,
      required: [true, "A turf must have a price"],
    },

    description: {
      type: String,
      trim: true,
      // required: [true, "A turf must have a description"],
    },
    imageCover: {
      type: String,
    },
    Location: {
      type: { type: String, default: "Point", enum: ["Point"] },
      coordinates: [Number],
      address: String,
      description: String,
    },
    googlelocation: String,
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    organizer: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },

    date: {
      type: Date,
      // required: [true, "A tournament must have a date"],
    },
    time: {
      type: String,
      // required: [true, "A tournament must have a time"],
    },
    turf: {
      type: mongoose.Schema.ObjectId,
      ref: "Turf",
      // Optional: If the tournament is on a turf, you might want to make this required
      // required: true
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
orgschema.index({ price: 1 });
orgschema.index({ slug: 1 });
orgschema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const org = mongoose.model("Org", orgschema);

module.exports = org;
