const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true
    },
    name: {
      type: String,
      trim: true,
      required: true
    },
   
    password: {
      type: String
      
    },
    sessionId: {
      type: String
    },
    deleted: {
      type: Number,
      enum: [0, 1],
      default: 0
    },
    
  },
  {
    timestamps: true,
  }
);
UserSchema.index({createdAt:1});
UserSchema.index({email:1});

module.exports = mongoose.model("user", UserSchema);
/**
 * @swagger
 * definitions:
 *   login:
 *     properties:
 *       email:
 *        type: string
 *        format: email
 *        required: true
 *       password:
 *        type: string
 *        required: true
 */

/**
 * @swagger
 * definitions:
 *   create-user-registration:
 *     properties:
 *       email:
 *        type: string
 *        format: email
 *        required: true
 *       password:
 *        type: string
 *        required: true
 *       firstName:
 *        type: string
 *        required: true
 *       lastName:
 *        type: string
 *        required: true
 */


