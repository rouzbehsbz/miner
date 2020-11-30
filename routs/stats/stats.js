const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let playersList = await userModel.getStats();

        let data = {
            stats : playersList,
            totalPopulation : playersList.length
        };

        res.render('stats', data);

    }
    catch(error){

        next(error);

    }

})

module.exports = router;