const config = require("config.json");
const mongoose = require("mongoose");
const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(
  config.connectionString,
  connectionOptions
).then((res) => {
  console.log("db connected");
}).catch((e) => {
  console.log("error connecting db", e)
});
mongoose.Promise = global.Promise;

module.exports = {
  Account: require("accounts/account.model"),
  isValidId,
};

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}
