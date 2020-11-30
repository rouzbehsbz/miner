const router = express.Router();

router.post('/', async (req, res, next)=>{

    try{
        
        let {username_inp, password_inp} = req.body;

        if(!/^[\w.-]{4,15}$/.test(username_inp)){

            return res.json('نام کاربری باید بین 4 تا 15 حرف و نمی تواند شامل حروف فارسی و غیر مجاز باشد.');

        }
        if(password_inp.length < 8){

            return res.json('رمز عبور باید بیشتر از 8 حرف باشد.');

        }

        let authData = {
            username : username_inp,
            password : password_inp
        }

        let result = await userModel.auth(authData);

        if(typeof result == 'string'){

            return res.json(result);

        }
        else{

            req.session.userInfo = result;
            return res.json({
                status : 'success',
                url : `${url}game`
            });

        }

    }
    catch(error){

        next(error);

    }

});

module.exports = router;