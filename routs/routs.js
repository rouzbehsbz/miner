const router = express.Router();

router.use('/', require('./index'));
router.use('/profile', require('./profile'));
router.use('/stats', require('./stats'));

module.exports = router;