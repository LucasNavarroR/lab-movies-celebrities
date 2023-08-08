const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// Celebrity routes
const celebritiesRouter = require("./celebrities.routes.js")
router.use("/celebrities", celebritiesRouter)

// Movies routes
const moviesRouter = require("./movies.routes.js")
router.use("/movies", moviesRouter)


module.exports = router;
