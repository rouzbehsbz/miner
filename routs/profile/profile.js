const userModel = require("../../models/user-model");

const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let data = {
            myRank : await userModel.getUserRank({username : req.session.userInfo.username})
        };

        res.render('profile', data);

    }
    catch(error){

        next(error);

    }

})

module.exports = router;