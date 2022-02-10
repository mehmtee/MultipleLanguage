const mongose = require('mongoose');
const langSchema = mongose.Schema({
 
    code : {
        type : String
    },
    name : {
        type : String
    },
    projectId : {
        type : String
    }
})
const langs = mongose.model('langs', langSchema)
module.exports = langs
