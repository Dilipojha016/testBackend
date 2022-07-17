exports.SUCCESSCODE    = 200;
exports.ERRORCODE      = 400;
exports.REGERRORCODE   = 204;
exports.SESSIONCODE    = 401;
exports.EXCEPTIONCODE  = 500;
exports.ERRORMESSAGE   = "We are currently facing some problem. Please Try again after some time";
exports.SECRETKEY      = "thisisareallylongandbigsecrettoken";
var jwt                = require('jsonwebtoken');
exports.getString =  () => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 10; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *charactersLength));
    }
   return result;
}

exports.bindSession = function(userId,type) {
    return jwt.sign({ userId:userId,type:type}, this.SECRETKEY);
};
exports.destroySession = function(token) {
   jwt.destroy(token);
   
};
exports.isEmptyObject = function(obj) {
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0) return false;   
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
}

const selfKey = this;
global.response = {
    statusCode  : selfKey.SUCCESSCODE,
    message : '',
    data    : null,
    errors  : null,
    error   :""
};

function NullResponseValue(){
    const self = this;
    global.response = {
        statusCode  : self.SUCCESSCODE,
        message : '',
        data    : null,
        errors  : null,
        error   :""
    };
    return true;
}

exports.SendResponse = function(res, status) {
    res.status(200).send(response);
    NullResponseValue();
};

exports.auth = function(req, res, next){
   next();
}
