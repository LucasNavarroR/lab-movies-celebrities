const express = require("express");
const router = express.Router();

// Llamada a los modelos

const Movie = require("../models/Movie.model.js");
const Celebrity = require("../models/Celebrity.model.js");

//Rutas Movie

// CREATE -----------------------------

//GET Show a form to create a movie
router.get("/create", async (req, res, next) => {
  try {
    const eachCharacter = await Celebrity.find();
    res.render("movies/new-movie.hbs", {
      eachCharacter,
    });
  } catch (error) {
    next(error);
  }
});

//POST Send the data from the form to this route to create the movie and save it to the database
router.post("/create", async (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  if (title === "" || genre === "" || plot === "" || cast === "") {
    console.log("Alguno de los campos esta vacio");
    res.render("movies/new-movie", {
      errorMessage: "Todos los campos son obligatorios",
      previousTitleValue: title,
      previousGenreValue: genre,
      previousPlotValue: plot,
      previousCastValue: cast,
    });
    return;
  }

  try {
    await Movie.create({
      title,
      genre,
      plot,
      cast,
    });

    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

// --------------------------------------

//GET Show all movies
router.get("/", async (req, res, next) => {
  try {
    const allMovies = await Movie.find().select({ title: 1 });
    res.render("movies/movies.hbs", {
      allMovies,
    });
  } catch (error) {
    next(error);
  }
});

//-----------------------------------------

router.get("/:moviesId", async (req, res, next) => {
  try {
    const movieDetails = await Movie.findById(req.params.moviesId).populate("cast");

    res.render("movies/movie-details", {
      movieDetails,
    });
  } catch (error) {
    next(error);
  }
});


router.post("/:moviesId/delete", async (req, res, next) => {

try {
    
await Movie.findByIdAndDelete(req.params.moviesId)
res.redirect("/movies")

} catch (error) {
    next(error)
}

})

//GET show a form to edit a movie
router.get("/:moviesId/edit", async (req, res, next) => {

    try {
      const thisMovie = await Movie.findById(req.params.moviesId)  
      const allCelebrities = await Celebrity.find().select({name: 1})

      const cloneAllCelebrities = JSON.parse( JSON.stringify(allCelebrities) )
      console.log(thisMovie)
      cloneAllCelebrities.forEach((cadaCelebrity) => {
      if (thisMovie.cast.toString() === cadaCelebrity._id.toString()) {
       console.log("tu celebrity es:", cadaCelebrity)
       cadaCelebrity.isSelected = true
      }
      })

        res.render("movies/edit-movie.hbs", {
        thisMovie,
        allCelebrities: cloneAllCelebrities
      })
    } catch (error) {
        next(error)
    }
})


//POST Send the data from the form to this route to update the specific movie
router.post("/:moviesId/edit", (req, res, next) => {

    const movieId = req.params.moviesId
    const {title, genre, plot, cast} = req.body
    
    Movie.findByIdAndUpdate(movieId, {
        title,
        genre,
        plot,
        cast
    })
    .then(() => {
    res.redirect("/movies")
    })
    .catch((error) => {
        next(error)
    })
})


module.exports = router;
