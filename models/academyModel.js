const academySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A academy must have a name"],
      unique: true,
      trim: true,
      maxlength: [40, "not more than 40 characters for the name"],
    },
    slug: String,
    PhoneNumber: Number,
    sports: [
      {
        type: String,
      },
    ],
    price: {
      type: Number,
      required: [true, "A academy must have a price"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "A academy must have a description"],
    },
    imageCover: String,
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
    coaches: [
      {
        name: {
          type: String,
          required: [true, "A coach must have a name"],
        },
        sport: {
          type: String,
          required: [true, "A coach must have a sport"],
        },
        image: {
          type: String,
          required: [true, "A coach must have an image"],
        },
      },
    ],
    // Add owner field
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "User", // Assuming you have a User model for academy owners
      required: [true, "Academy must have an owner"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

academySchema.index({ price: 1 });
academySchema.index({ slug: 1 });

academySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Academy = mongoose.model("Academy", academySchema);

module.exports = Academy;
