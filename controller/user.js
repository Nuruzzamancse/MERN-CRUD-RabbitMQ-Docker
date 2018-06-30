var User = require('../models/User');

var createUser = (req, res, next) => {
    console.log('this is create user');


    var name = req.body.name,
        phone = req.body.phone,
        email = req.body.email,
        username = req.body.username,
        password = req.body.password;


    var myUser = new User({
        name: name,
        email: email,
        username: username,
        password: password,
    });

    User.addUser(myUser, (err, user) => {
        if (err) {
            console.log(err);
            res.status(404).json({
                message: 'This message form error: ' + err
            })
        } else {
            res.status(201).json({
                success:true,
                data: user
            })
        }

    });

    // myUser.save((err, user) => {
    //     if(err) {
    //         return res.status(404).json({
    //             message: err,
    //             success: false
    //         });
    //     }
    //     else {
    //         return res.status(200).json({
    //             success: true,
    //             data: user
    //         });
    //     }
    // });
};


var getUser = (req, res, next) => {
    User.findById(req.params.id, (err, User) => {
        if(err){
            return res.status(404).json({
                message: err,
                success: false
            });
        }
        else {
            return res.status(200).json({
                success: true,
                data: User
            });
        }
    });
}

var getAllUser = (req, res, next) => {
    User.find( (err, User) => {
        if(err){
            return res.status(404).json({
                message: err,
                success: false
            });
        }
        else {
            return res.status(200).json({
                success: true,
                data: User
            });
        }
    });
}

var updateUser = (req, res, next) => {

    console.log('In Update User');

    var firstName = req.body.firstName,
        lastName = req.body.lastName,
        staffId = req.body.staffId,
        address = req.body.address,
        phone = req.body.phone,
        email = req.body.email,
        username = req.body.username,
        password = req.body.password,
        category =req.body.category;

    User.findById(req.params.id, (err, User) => {
        if(err){
            return res.status(404).json({
                message: err,
                success: false
            });
        }
        else {
            User.firstName = firstName || User.firstName;
            User.lastName = lastName || User.lastName;
            User.staffId = staffId || User.staffId;
            User.address = address || User.address;
            User.phone = phone || User.phone;
            User.email = email || User.email;
            User.username = username || User.username;
            User.password = password || User.password;
            User.category = category || User.category;


            User.save((err, User) => {
                if(err){

                    console.log('Update error' + err);

                    return res.status(404).json({
                        message: err,
                        success: false
                    });
                }
                else {
                    console.log('Update successfully');

                    return res.status(200).json({
                        success: true,
                        data: User
                    });
                }
            });
        }
    });
}


var deleteUser = (req, res, next) => {

    console.log('Here delete');

    User.findByIdAndRemove(req.params.id, (err) => {
        if(err){

            console.log('In error' +err);

            return res.status(404).json({
                message: err,
                success: false
            });
        }
        else {

            console.log('Here in success');

            return res.status(200).json({
                message: "User deleted",
                success: true
            });
        }
    });
}

module.exports = {
    createUser,
    deleteUser,
    getAllUser,
    getUser,
    updateUser
}