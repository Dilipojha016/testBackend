const userModel = require("../models/user");
const bcrypt = require("bcrypt");
module.exports = {

  
  /**
   * Api to register a user
   * @param {*} req :- {
   *                      "email": String,
   *                      "password": String,
   *                      "name": String,
  
   *                   }
   */
  create: async (req, res) => {
    try {
      req.body.email = req.body.email.toLowerCase();
      const existQuery = { email: req.body.email};
      const existingUser = await userModel.findOne(existQuery);
      if (existingUser && existingUser.deleted === 0) {
        response.statusCode = routes.ERRORCODE;
        response.message = "Email address already exist";
        return routes.SendResponse(res);
      } 
      const hash = await bcrypt.hash(req.body.password, 10);
      req.body.password = hash;
      const userObj = new userModel(req.body);
      userObj.sessionId = await routes.bindSession(userObj._id, "user");
      const saveUserData = await userObj.save();
      response.statusCode = routes.SUCCESSCODE;
      response.message = "User created Successfully!";
      response.data = saveUserData;
      return routes.SendResponse(res);
    } catch (error) {
      response.statusCode = routes.EXCEPTIONCODE;
      response.message = error.message ? error.message : routes.ERRORMESSAGE;
      return routes.SendResponse(res);
    }
  },

  /**
   * Login api
   * @param {*} req :- {
   *                       "email":string,
   *                       "password":string
   *                   }
   */
  login: async (req, res) => {
    try {
     
      const existingUser = await userModel.findOne({ email: req.body.email});
      if (!existingUser) {
        response.statusCode = routes.ERRORCODE;
        response.message = "User not found";
        return routes.SendResponse(res);
      }else if (existingUser.deleted === 1) {
        response.statusCode = routes.REGERRORCODE;
        response.message =
          "Email found but deactivated account \n Are you want to activate!";
        return routes.SendResponse(res);
      }
      const matchPassword = await bcrypt.compare(
        req.body.password,
        existingUser.password
      );
      if (!matchPassword) {
        response.statusCode = routes.ERRORCODE;
        response.message = "Invalid credentials";
        return routes.SendResponse(res);
      }
      existingUser.sessionId = routes.bindSession(
        existingUser._id,
        "user"
      );
      response.statusCode = routes.SUCCESSCODE;
      response.message = "Successfully Loggedin!";
      response.data = existingUser;
      return routes.SendResponse(res);
    } catch (error) {
      response.statusCode = routes.EXCEPTIONCODE;
      response.message = error.message ? error.message : routes.ERRORMESSAGE;
      return routes.SendResponse(res);
    }
  },

  logout: async (req, res) => {
    try {
      const query = {
        _id: req.user._id,
        deleted: 0,
      };
      const userData = await userModel.findOneAndUpdate(
        query,
        { $unset: { sessionId: 1 } },
        { new: true }
      );
      if (!userData) {
        response.statusCode = routes.ERRORCODE;
        response.message = "User not found";
        return routes.SendResponse(res);
      }
      response.statusCode = routes.SUCCESSCODE;
      response.message = "Logout successfull!";
      return routes.SendResponse(res);
    } catch (error) {
      response.statusCode = routes.EXCEPTIONCODE;
      response.message = error.message ? error.message : routes.ERRORMESSAGE;
      return routes.SendResponse(res);
    }
  },

}
