const express = require("express");
const multer = require("multer");
const app = express();
const itemController = require("../../controllers/item");
const auth = require("../../middlewares/auth");
const { Joi, celebrate, errors } = require("celebrate");
const router = express.Router();


let storage = multer.diskStorage(
  {
      destination: 'public/files',
      filename: function ( req, file, cb ) {
          //req.body is empty...
          //How could I get the new_file_name property sent from client here?
          cb( null, Date.now()+file.originalname);
      }
  }
);

let upload = multer( { storage: storage } );

router.post("/uploadImage", upload.single("image"), auth.checkUserSession, itemController.uploadImage);
router.get("/itemList", auth.checkUserSession, itemController.getItems);
app.use(errors());
module.exports = router;
