const express = require("express");
const router = express.Router({mergeParams:true});
const Listing=require("../models/listing.js")
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewValidation, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const Review =require("../models/review.js");

const reviewController = require("../controllers/reviews.js");

//post review route
router.post("/",isLoggedIn,reviewValidation,wrapAsync(reviewController.createReview));

//delete review route
router.delete("/:reviewId",
    isLoggedIn,isReviewAuthor,
    wrapAsync(reviewController.destroyReview));

module.exports = router;