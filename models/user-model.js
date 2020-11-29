let schema = new mongoose.Schema({
    username : {
        type : String,
        unique : true,
        set : function(username){
            return username.toLocaleLowerCase()
        }
    },
    password : String,
    trophy : {
        type : Number,
        default : 0,
    },
});

schema.statics = {

    auth : async (data)=>{

        let findUser = await userModel.findOne({
            username : data.username
        });

        if(findUser){

            if(findUser.password == data.password){

                return findUser;

            }
            else{

                return 'رمز عبور صحیح نمی باشد.'

            }

        }
        else{

            try{

                let newUser = new userModel(data);
                return await newUser.save();
    
            }
            catch(err){
    
                return 'نام کاربری قبلا انتخاب شده است.';
    
            }

        }

    },

    getUserRank : async(data)=>{

        let findUser = await userModel.findOne(data)
        let aboveList = await userModel.find({_id: {$ne: findUser._id}, trophy: {$gte: findUser.trophy}}).sort({trophy : 1, username:1});

        return aboveList.length + 1;

    },

    getStats : async()=>{

        return await userModel.find().sort({trophy : -1, username:1}).limit(100);

    }

};

module.exports = userModel = mongoose.model('user', schema);
