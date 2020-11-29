const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let data = {
            stats : await userModel.getStats()
        };

        res.render('stats', data);

    }
    catch(error){

        next(error);

    }

})

module.exports = router;