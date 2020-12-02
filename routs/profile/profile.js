const userModel = require("../../models/user-model");

const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let result = await userModel.getUserRank({username : req.session.userInfo.username})
        let data = {
            myRank : result.rank,
            trophy : result.trophy
        }

        res.render('profile', data);

    }
    catch(error){

        next(error);

    }

})

module.exports = router;