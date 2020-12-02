const router = express.Router();

router.use(async(req, res, next)=>{

    try{

        let parsed_url = req._parsedUrl.pathname;

        if(!parsed_url.endsWith('/')){

            parsed_url += '/';
            parsed_url = parsed_url.split('/')[1];

        }

        if(isUndefined(req.session.userInfo)){

            if(notAllowedUrls.includes(parsed_url)){

                return res.redirect(`${url}`);

            }
            else{

                next();

            }

        }
        else{

            if('/'.includes(parsed_url)){

                return res.redirect(`${url}game`);

            }

            res.locals.userInfo = req.session.userInfo;
            next();

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;