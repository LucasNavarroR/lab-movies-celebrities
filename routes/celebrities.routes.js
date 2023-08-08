
const express = require("express");
const router = express.Router();

// Llamada a los modelos

const Celebrity = require("../models/Celebrity.model.js")



// GET Show a form to create a celebrity

router.get("/create", (req, res, next) => {

 res.render("celebrities/new-celebrity")
})



// POST Send the data from the form to this route to create the celebrity and save it to the database

router.post("/create", async (req, res, next) => {

    const {name, occupation, catchPhrase} = req.body

if( name === "" || occupation === "" || catchPhrase === "") {

    console.log("Alguno de los campos esta vacio")
    res.render("celebrities/new-celebrity", {
        errorMessage: "Todos los campos son obligatorios",
        previousNameValue: name ,
        previousOccupationValue: occupation,
        previousCatchPhraseValue: catchPhrase
    })

    return
}



    try {

        await Celebrity.create({
            name,
            occupation,
            catchPhrase
        })

        res.redirect("/celebrities")
        
    } catch (error) {
        next(error)
    }


})


// GET Show all celebrities

router.get("/", async (req, res, next) => {

    try {
       const eachCelebrity = await Celebrity.find().select({name: 1})
       res.render("celebrities/celebrities.hbs", {
        eachCelebrity
       })
    } catch (error) {
       next(error) 
    }
})




















module.exports = router;