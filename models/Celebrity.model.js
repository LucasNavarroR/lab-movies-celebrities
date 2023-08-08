//  Add your code here
const mongooose = require("mongoose")

const celebritySchema = new mongooose.Schema({

    name: String,
    occupation: String,
    catchPhrase: String
})


const Celebrity = mongooose.model("Celebrity", celebritySchema)

module.exports = Celebrity
