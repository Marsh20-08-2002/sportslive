require("dotenv").config();

const connectDB = require("./db/connect");
const Club = require("./models/clubs");

const ClubJson = require("./clubs.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    await Club.create(ClubJson);
    console.log("success");
  } catch (error) {
    console.log(error);
  }
};

start();
