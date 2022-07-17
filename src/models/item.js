const mongoose = require("mongoose");
const ItemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      
    },
   
    price: {
      type: Number,
      default: 0
      
    },
    quantity: {
      type: Number,
      default: 0
    },
    image: {
      type: String,
      default: '',
      trim: true,
    },
    
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("item", ItemSchema);



