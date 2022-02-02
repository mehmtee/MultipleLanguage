const loginMiddleware = require('../middleware/loginMiddleware');
const loginRouter = require('./loginRouter')
const userRouter = require('./userRouter');
const translationRouter = require('./translationRouter');
const projectRouter = require('./projectRouter');
module.exports = (app) => {

    


    app.use('/login',loginRouter);

    app.use('/user',userRouter);

    app.use('/translation',translationRouter);
    
    app.use('/project',projectRouter);

    app.use('/token/validate',loginMiddleware.validate,(req,res) => {
        res.send(200)
    });


}