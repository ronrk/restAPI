const express = require("express");
const { asyncHandler } = require("../middleware/async-handler");
const { authenticateUser } = require("../middleware/auth-user");
const { User } = require("../models");

const router = express.Router();

router.get(
    "/",
    asyncHandler(async(req, res) => {
        const user = await User.findAll();
        res.json({
            user,
        });
    })
);

router.post('/', asyncHandler(async(req, res) => {
    try {
        await User.create(req.body);
        res.status(201).json({ "message": "Account successfully created!" });
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });
        } else {
            throw error;
        }
    }
}));

module.exports = router;