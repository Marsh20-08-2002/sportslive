const express = require("express");

const compController = require("./../controllers/competitionController");

const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/competitions")
  .get(compController.getAllcompetition)
  .post(
    authController.protect,
    authController.restrictTo("organizer"),
    compController.createCompetition
  );

router.get(
  "/mycompetition",
  authController.protect,
  authController.restrictTo("organizer"),
  compController.mycompetition
);

router
  .route("/comp/:id")
  .patch(
    authController.protect,
    authController.restrictTo("organizer"),
    compController.updatecompetition
  )
  .delete(
    authController.protect,
    authController.restrictTo("organizer"),
    compController.deleteCompetition
  );

router
  .route("/admin/comp/:id")
  .delete(
    authController.protect,
    authController.restrictTo("organizer"),
    compController.deleteCompetitionByAdmin
  );

module.exports = router;
