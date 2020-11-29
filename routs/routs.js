const router = express.Router();

router.use(require('../middlewares/check-login'));

router.use('/', require('./index/index'));
router.use('/profile', require('./profile/profile'));
router.use('/stats', require('./stats/stats'));

router.use('/auth', require('./index/auth'));
router.use('/logout', require('./index/logout'));


router.use(async (req, res, next)=>{

    res.status(404).send(`Oops! can't find this page :(`);

});


router.use(async (error, req, res, next)=>{

    res.status(500).send(`Oops! catch an Internal server error! *${error}* Please report this to my telegram : @rouzbeh78`)

});

module.exports = router;