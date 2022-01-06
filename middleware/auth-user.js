const auth = require("basic-auth");
const bcrypt = require("bcryptjs");
const e = require("express");
const { User } = require("../models");

exports.authenticateUser = async (req, res, next) => {
  let message;

  const credentials = auth(req);
  console.log("credeeeeeeentials", credentials);

  if (credentials) {
    const user = await User.findOne({
      where: { emailAdress: credentials.name },
    });
    if (user) {
      const authenticated = bcrypt.compareSync(
        credentials.pass,
        user.confirmedPassword
      );
      if (authenticated) {
        console.log(`Authenticatio successful for username: ${user.username}`);

        req.currentUser = user;
      } else {
        message = `Authentication failure for usename: ${user.username}`;
      }
    } else {
      message = `User not found for username: ${user.username}`;
    }
  } else {
    message = `Auth header not found`;
  }

  if (message) {
    console.warn(message);
    res.status(401).json({ message: "Access Denied" });
  } else {
    next();
  }
};
