const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        res.render('profile');

    }
    catch(error){

        next(error);

    }

})

module.exports = router;