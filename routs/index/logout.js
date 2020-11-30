const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        req.session.destroy();
        res.redirect(url);

    }
    catch(error){

        next(error);

    }

})

module.exports = router;