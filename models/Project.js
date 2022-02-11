const mongose = require('mongoose');
const projectSchema = mongose.Schema({
 
    accountId : {
        type : String
    },
    projectName : {
        type : String
    },
    langs : {
        type : Array
    }
})
const project = mongose.model('project', projectSchema)
module.exports = project;
