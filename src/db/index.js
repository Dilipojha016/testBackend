const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false, "useCreateIndex", true);
mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...");
    process.exit(); // to close app Completely
  });
