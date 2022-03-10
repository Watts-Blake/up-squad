const { User, Event, Rsvp, Venue, Type } = require("../../db/models");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
//------------------------------------------------------middle-ware------------------------------------------
const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const router = express.Router();

// const validateEventCreate = [
//   check("email")
//     .exists({ checkFalsy: true })
//     .isEmail()
//     .withMessage("Please provide a valid email."),
//   check("username")
//     .exists({ checkFalsy: true })
//     .isLength({ min: 4 })
//     .withMessage("Please provide a username with at least 4 characters."),
//   check("username").not().isEmail().withMessage("Username cannot be an email."),
//   check("password")
//     .exists({ checkFalsy: true })
//     .isLength({ min: 6 })
//     .withMessage("Password must be 6 characters or more."),
//   handleValidationErrors,
// ];

//------------------------------------------------------middle-ware------------------------------------------
//
//
//
//------------------------------------------------------routes------------------------------------------
router
  .route("/")
  .get(
    //get events
    asyncHandler(async (req, res) => {
      const events = await Event.findAll({
        include: [
          { model: User },
          { model: Type },
          { model: Venue },
          { model: Rsvp, include: [{ model: User }] },
        ],
      });

      return res.json(events);
    })
  )
  .post(
    //create events
    requireAuth,
    asyncHandler(async (req, res) => {
      const event = await Event.create(req.body);
      return res.json(event);
    })
  );
router
  .route("/:id")
  .get(
    //get specific event
    asyncHandler(async (req, res) => {
      const eventId = req.params.id * 1;
      const event = await Event.findByPk(eventId);
      return res.json(event);
    })
  )
  .put(
    //update
    requireAuth,
    asyncHandler(async (req, res) => {
      const event = await Event.findByPk(req.params.id);
      event.update(req.body);
      return res.json(event);
    })
  )
  .delete(
    //delete
    requireAuth,
    asyncHandler(async (req, res) => {
      const eventId = req.params.id * 1;
      // console.log("hereeeeeeeeeeeeeeeeeeeeeeeeeeee", eventId);
      const event = await Event.findByPk(eventId);

      // if (req.session.auth.userId !== event.hostId) {
      //   const err = new Error("You are not authorized");
      //   return next(err);
      // }

      await event.destroy();
      return res.json({ eventId });
      // } else {
      //   const err = new Error("Event Does Not Exist!");
      //   return next(err);
      // }
    })
  );
//---------------------------------------------rsvp's
router
  .route("/:id/rsvp")
  .get(
    // get rsvp list

    asyncHandler(async (req, res) => {
      const eventId = req.params.id * 1;
      const rsvpList = await Rsvp.findAll({
        where: { eventId },
        include: {
          model: User,
        },
      });
      return res.json(rsvpList);
    })
  )
  .post(
    //rsvp to an event
    requireAuth,
    asyncHandler(async (req, res) => {
      const eventId = req.params.id * 1;
      const userId = req.body.userId;
      console.log("hereeeeeeeeeeeeeeeeeeeeeeeee", userId);
      const rsvpFind = await Rsvp.create({ eventId, userId });
      const rsvp = await Rsvp.findByPk(rsvpFind.id, { include: User });
      return res.json(rsvp);
    })
  );

router.route("/:id/:userId").delete(
  //delete your rsvp to an event
  requireAuth,
  asyncHandler(async (req, res) => {
    const eventId = req.params.id * 1;
    console.log("hereeeeeeeeeeeeeeeeeeeeeeeee is the event id", eventId);
    const userId = req.body.userId;
    console.log(
      "hereeeeeeeeeeeeeeeeeeeeeeeee is the userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr id",
      eventId
    );
    const rsvp = await Rsvp.findOne({ where: { eventId, userId } });
    await rsvp.destroy();
    return res.json(rsvp);
  })
);

//------------------------------------------------------routes------------------------------------------
//
//
//
//------------------------------------------------------exports------------------------------------------
module.exports = router;
