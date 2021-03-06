const { Venue } = require("../../db/models");

//------------------------------------------------------middle-ware------------------------------------------
const express = require("express");
const asyncHandler = require("express-async-handler");

const router = express.Router();

router.route("/").get(
  asyncHandler(async (req, res) => {
    const venues = await Venue.findAll();
    return res.json(venues);
  })
);

module.exports = router;
