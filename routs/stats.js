const router = express.Router();

router.get('/', (req, res)=>{

    res.render('stats')

})

module.exports = router;