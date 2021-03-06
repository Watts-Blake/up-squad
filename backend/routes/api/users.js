const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { handleValidationErrors } = require("../../utils/validation");
//-----------------------------------------------------------------------middle-ware----------------------------------------------------------------------------

const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];
//-----------------------------------------------------------------------middle-ware----------------------------------------------------------------------------
//
//
//
//--------------------------------------------------------------------------routes-------------------------------------------------------------
// Sign up
router
  .route("/")
  .get(
    asyncHandler(async (req, res) => {
      const users = await User.findAll();
      res.json(users);
    })
  )
  .post(
    validateSignup,
    asyncHandler(async (req, res) => {
      const { email, password, username } = req.body;
      const user = await User.signup({ email, username, password });

      await setTokenCookie(res, user);

      return res.json({
        user,
      });
    })
  );

//
//--------------------------------------------------------------------------routes-------------------------------------------------------------
module.exports = router;
