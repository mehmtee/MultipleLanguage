const jwt = require('jsonwebtoken');

const secretKey = "mehmet"

module.exports =  {
    validate : (req,res,next) => {
        jwt.verify(req.headers['api-token'],secretKey,(err,response) => {
            if(err) {
                res.json({status:'false',message:'invalid token'});
            }else{
                req.session.user = {...response.user,accountId : response.user['_id']};
                next();
            }
        })
    }
}