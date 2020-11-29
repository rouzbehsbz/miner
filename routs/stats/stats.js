const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        res.render('stats');

    }
    catch(error){

        next(error);

    }

})

module.exports = router;