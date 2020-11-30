const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let data = {
            userInfo : {
                username : req.session.userInfo.username,
                trophy : req.session.userInfo.trophy
            }
        };

        res.render('game', data);

    }
    catch(error){

        next(error);

    }

})

module.exports = router;