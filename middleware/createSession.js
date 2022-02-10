const jwt = require('jsonwebtoken');
module.exports = (req,res,next) => {

    if(req.headers["api-token"]) {
        const account = jwt.decode(req.headers["api-token"]);
        req.session.user = account.user;
    } else {
        req.session.null = null;
    }

    next();

    
}