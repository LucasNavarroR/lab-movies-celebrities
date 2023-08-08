const express = require("express");
const router = express.Router();

// Llamada a los modelos

const Movie = require("../models/Movie.model.js")
const Celebrity = require("../models/Celebrity.model.js")



//Rutas Movie

//GET Show a form to create a movie
router.get("/create", async (req, res, next) => {

    try {
        const eachCharacter = await Celebrity.find()
        res.render("movies/new-movie.hbs", {
            eachCharacter
        })
    } catch (error) {
        next(error)
    }
})





//POST Send the data from the form to this route to create the movie and save it to the database
router.post("/create", async (req, res, next) => {

    const {title, genre, plot, cast} = req.body

    if( title === "" || genre === "" || plot === "" || cast === "") {

        console.log("Alguno de los campos esta vacio")
        res.render("movies/new-movie", {
            errorMessage: "Todos los campos son obligatorios",
            previousTitleValue: title ,
            previousGenreValue: genre,
            previousPlotValue: plot,
            previousCastValue: cast
        })
        return
    }

try {
    await Movie.create({
        title,
        genre,
        plot,
        cast
    })

    res.redirect("/movies")

} catch (error) {
    next(error)
}

})




//GET Show all movies
router.get("/", async(req, res, next) => {

    try {
        const allMovies = await Movie.find().select({title: 1})
        res.render("movies/movies.hbs", {
            allMovies
        })
    } catch (error) {
        next(error)
    }
})




















module.exports = router;