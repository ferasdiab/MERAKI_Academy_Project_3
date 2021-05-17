const mongoose = require("mongoose");

const option = {
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
mongoose.connect("mongodb://localhost:27017/project_3_v01", option).then(
  () => {
    console.log("DB connected");
  },
  (err) => {
    console.log(err);
  }
);