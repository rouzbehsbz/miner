const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        if(isUndefined(req.session.useInfo)){

            res.render('index');

        }
        else{

            res.render('game');

        }

    }
    catch(error){

        next(error);

    }

})

module.exports = router;