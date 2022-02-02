const mongose = require('mongoose');
const projectSchema = mongose.Schema({
 
    accountId : {
        type : String
    },
    projectName : {
        type : String
    }
})
const project = mongose.model('project', projectSchema)
module.exports = project
