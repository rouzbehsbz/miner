const userModel = require("../../models/user-model");

const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let result = await userModel.findOne({username : req.session.userInfo.username});

        let data = {
            userInfo : {
                username : result.username,
                trophy : result.trophy
            }
        };

        res.render('game', data);

    }
    catch(error){

        next(error);

    }

})

module.exports = router;