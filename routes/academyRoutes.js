const express = require("express");

const academyController = require("./../controllers/academyController");

const authController = require("./../controllers/authController");

const router = express.Router();

router.route("/academies").get(academyController.getAllacadmey).post(
  authController.protect,
  authController.restrictTo("admin", "owner"), // Only admin or academy owner can create academies
  academyController.createAcademy // Add this method if you want to create academies
);

router.route("/:id").get(academyController.singleAcademy);
// Route for the academy owner to get/update/delete their academy
router
  .route("/myacademy")
  .get(
    authController.protect,
    authController.restrictTo("owner"),
    academyController.getMyacademy
  )
  .patch(
    authController.protect,
    authController.restrictTo("owner"),
    academyController.updateMyacademy
  )
  .delete(
    authController.protect,
    authController.restrictTo("owner"),
    academyController.deleteMyacademy
  );

// Route for the admin to delete any academy by ID
router
  .route("/admin/academy/:id")
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    academyController.deleteAcademy
  );

module.exports = router;
