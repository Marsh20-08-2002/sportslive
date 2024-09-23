const express = require("express");
const bookingController = require("../controllers/compRegisterController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router.get("/checkout-session/:compId", bookingController.getCheckoutSession);
router
  .route("/mycomp")
  .get(
    authController.restrictTo("organizer"),
    bookingController.getMyCompetitions
  );
router
  .route("/orgreport")
  .get(
    authController.restrictTo("organizer"),
    bookingController.createOrganizerReport
  );

router.use(authController.restrictTo("admin"));
router
  .route("/")
  .get(bookingController.getAllBookings)
  .post(bookingController.createBooking);
router.route("/report").get(bookingController.createreport);

module.exports = router;
