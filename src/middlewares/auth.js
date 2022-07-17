
var jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

exports.checkUserSession = async function (req, res, next) {
    try {
        
    var checkStatus = 0;
    var token = req.headers.authentication;
    if (token) {
        const decoded = await jwt.verify(token, routes.SECRETKEY);
        if (decoded && decoded.userId) {
            const result = await UserModel.findOne({ _id: decoded.userId, deleted: 0});
            if (result && result._id) {
                req.user = result
                checkStatus = 1;
            }
        }
    }
    if (checkStatus == 1) {
        next();
    } else {
        response.error = true;
        response.statusCode = routes.SESSIONCODE;
        response.message = "Oops! Your session has expired1..";
        return routes.SendResponse(res, routes.SESSIONCODE);
    }
    } catch (error) {
        console.log(error)
        response.error = true;
        response.statusCode = routes.SESSIONCODE;
        response.message = "Oops! Your session has expired..";
        return routes.SendResponse(res, routes.SESSIONCODE); 
    }
    
}
exports.checkUserSocketSession = async function (data) {
    try {
    let info = false    
    let token = data.token
    if (token) {
        const decoded = await jwt.verify(token, routes.SECRETKEY);
        if (decoded && decoded.userId) {
            const result = await UserModel.findOne({ _id: decoded.userId, deleted: 0});
            if (result && result._id) {
                info = result
            }
        }
    }
    return info
    } catch (error) {
        console.log(error)
       return false
    }
    
}

