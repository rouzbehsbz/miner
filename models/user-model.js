let schema = new mongoose.Schema({
    username : {
        type : String,
        unique : true,
        set : function(username){
            return username.toLocaleLowerCase();
        }
    },
    password : String,
    trophy : {
        type : Number,
        default : 0,
        min : 0,
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
        let aboveList = await userModel.find({trophy: {$gte: findUser.trophy}}).sort({trophy : -1, username: 1});
        let tempList = [];

        for(let doc of aboveList){
            tempList.push(doc.username);
        }

        return {
            trophy : findUser.trophy,
            rank : tempList.indexOf(data.username) + 1,
        }

    },

    getStats : async()=>{

        return await userModel.find().sort({trophy : -1, username:1}).limit(100);

    },

    updateTrophy : async(username, calTrophy)=>{

        let findUser = await userModel.findOne({username : username});
        let tempTrophy = calTrophy;

        if(calTrophy < 0){

            findUser.trophy + calTrophy < 0 ? tempTrophy = (-1)*findUser.trophy : tempTrophy = calTrophy;

        }

        return await userModel.findOneAndUpdate({username : username}, {$inc : {trophy : tempTrophy}});

    }

};

module.exports = userModel = mongoose.model('user', schema);
