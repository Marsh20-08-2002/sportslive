const mongoose = require("mongoose");
const slugify = require("slugify");
const timeSlotSchema = new mongoose.Schema({
  date: {
    type: Date,
    // required: true,
  },
  slots: [
    {
      time: { type: String, required: true },
      isBooked: { type: Boolean, default: false },
    },
  ],
});
const turfSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A turf must have a name"],
      unique: true,
      trim: true,
      maxlength: [40, "notmorethan 40 for the name"],
      minlength: [7, "min 7 length"],
    },
    slug: String,
    PhoneNumber: Number,
    sports: {
      type: [String],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "A turf must have a price"],
    },
    advancebooking: {
      type: Number,
    },
    description: {
      type: String,
      trim: true,
      required: [true, "A turf must have a description"],
    },
    imageCover: {
      type: String,
      //   required: [true, "A tour must have a cover image"],
    },
    Location: {
      type: { type: String, default: "Point", enum: ["Point"] },
      coordinates: [Number],
      address: String,
      description: String,
    },
    googlelocation: String,
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    turfowner: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    timeSlots: [timeSlotSchema],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
turfSchema.index({ price: 1, ratingsAverage: -1 });
turfSchema.index({ slug: 1 });
turfSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

turfSchema.pre(/^find/, function (next) {
  this.populate({ path: "turfowner", select: "-_v -passwordChangedAt" });
  next();
});

const Turf = mongoose.model("Turf", turfSchema);

module.exports = Turf;
