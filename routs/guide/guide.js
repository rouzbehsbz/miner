const router = express.Router();

router.get('/', (req, res, next)=>{

    try{

        res.render('guide');

    }
    catch(error){

        next(error);

    }

})

module.exports = router;