const express = require("express");
const {
  getBootCamp,
  getBootCamps,
  createBootCamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require("../controllers/bootcamps");

const { protect, authorize } = require("../middleware/auth");

const Bootcamp = require("../models/Bootcamp");

const advancedResults = require("../middleware/advancedResults");

// Include other resource routers
const courseRouter = require("./courses");

const router = express.Router();

router.use("/:bootcampId/courses", courseRouter);

// Re-route into other resource routers

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

router
  .route("/:id/photo")
  .put(protect, authorize("publisher", "admin"), bootcampPhotoUpload);

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootCamps)
  .post(protect, authorize("publisher", "admin"), createBootCamp);

router
  .route("/:id")
  .get(getBootCamp)
  .put(protect, authorize("publisher", "admin"), updateBootcamp)
  .delete(protect, authorize("publisher", "admin"), deleteBootcamp);

module.exports = router;
