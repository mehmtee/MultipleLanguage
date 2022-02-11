const mongose = require('mongoose');
const translationSchema = mongose.Schema({
 
    key: {
        type: String,
        required: true,
    },
    value:{
        type: String,
    },
    projectId : {
        type : [{ type: mongose.Schema.Types.ObjectId, ref: 'project' }]
    },
    langId : {
        type : String
    },
    accountId : {
        type : String
    }
})
const Translation = mongose.model('Translation', translationSchema)
module.exports = Translation
