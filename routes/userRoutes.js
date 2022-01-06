const express = require("express");
const { asyncHandler } = require("../middleware/async-handler");
const { authenticateUser } = require("../middleware/auth-user");
const { User, Course } = require("../models");

const router = express.Router();

router.get(
  "/",
  authenticateUser,
  asyncHandler(async (req, res) => {
    const user = req.currentUser;
    res.json({
      user,
    });
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    try {
      await User.create(req.body);
      res.status(201).json({
        message: "Acount successfuly created",
      });
    } catch (error) {
      console.log("ERROR!: ", error.name);
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

module.exports = router;
