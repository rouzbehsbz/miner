const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        req.session.userInfo = await userModel.findOne({username : req.session.userInfo.username});
        res.render('game');

    }
    catch(error){

        next(error);

    }

})

module.exports = router;