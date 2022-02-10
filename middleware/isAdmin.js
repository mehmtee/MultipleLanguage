module.exports = (req,res,next) => {
    try{
        if(req.session.user.accountType == '1') {
            next();
        }else res.json({status : 'false',message : 'Permission denied !'});
    }catch(err){
        res.json({status : 'false',message : 'Permission denied !'});
    }
}