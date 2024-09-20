const express = require("express");
const turfController = require("./../controllers/turfController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.route("/allturf").get(turfController.getAlltours);

router
  .route("/createturf")
  .post(
    authController.protect,
    authController.restrictTo("turfowner"),
    turfController.createTurf
  );

router.get(
  "/myturfs",
  authController.protect,
  authController.restrictTo("turfowner"),
  turfController.myturf
);

// Routes for Turf Owners
router
  .route("/myturfs")
  .get(
    authController.protect,
    authController.restrictTo("turfowner"),
    turfController.myturf
  ); // View your own turfs

router
  .route("/turfs/:id")
  .patch(
    authController.protect,
    authController.restrictTo("turfowner"),
    turfController.updateTurf
  ) // Update only your own turf
  .delete(
    authController.protect,
    authController.restrictTo("turfowner"),
    turfController.deleteTurf
  ); // Delete only your own turf

// Routes for Admins
router
  .route("/admin/turfs/:id")
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    turfController.deleteTurfByAdmin
  ); // Admin can delete any turf

module.exports = router;
