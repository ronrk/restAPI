const express = require("express");
const { asyncHandler } = require("../middleware/async-handler");
const { authenticateUser } = require("../middleware/auth-user");
const { User, Course } = require("../models");

const router = express.Router();

router.get("/", asyncHandler(async(req, res) => {
    const courses = await Course.findAll({
        include: {
            model: User,
            as: 'Student'
        }
    });
    console.log('KURSSS', courses)
    res.status(200).json({
        courses
    })
}));

router.get('/:id', asyncHandler(async(req, res) => {
    const course = await Course.findOne({
        where: {
            id: req.params.id,
        },
        include: {
            model: User,
            as: 'Student'
        }
    })
    res.status(200).json({
        course
    })
}))

router.post('/', asyncHandler(async(req, res) => {
    try {
        const course = await Course.create({
            title: req.body.title,
            description: req.body.description,
            estimatedTime: req.body.estimatedTime,
            materialsNeeded: req.body.materialsNeeded
        })
    } catch (error) {
        console.log('ERROR: ', error)
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map((err) => err.message);
            res.status(400).json({ errors });
        } else {
            throw error
        }
    }
}))


module.exports = router;

/* 
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
 */