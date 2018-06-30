var jwt = require('jsonwebtoken'),
    config = require('../config/database'),
    User = require('../models/User');

var userLogin = (req, res, next) => {
    var username = req.body.username,
        password = req.body.password;

    User.findOne({username:username} ,(err, user) =>{
        if(err) {
            console.log(err);
        }
        else if(!user){
            return res.status(201).json({
                success: false,
                message: 'User doesn\'t exist'
            });
        }
        else{
            // console.log(user);

            User.comparePassword(password, user.password, (err, match) =>{
                if(err)
                {
                    // console.log('Here the problem' +err);
                }
                else if(match){

                    var token = jwt.sign(user.toJSON(), config.secret, {expiresIn: config.tokenexp});
                    return res.status(201).json({success: true, data: user, token: token });

                }else {
                    return res.status(201).json({
                        success: false,
                        message:'Password don\'t mathch'
                    })
                }
            })
        }
    })
}

module.exports = {
    userLogin
}