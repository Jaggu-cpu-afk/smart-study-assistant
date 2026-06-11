const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

async function reset() {
  await mongoose.connect(process.env.MONGO_URI);
  const email = "jagapathinaidu07122006@gmail.com";
  const user = await User.findOne({ email });
  
  if (user) {
    user.password = await bcrypt.hash("12345678", 10);
    await user.save();
    console.log("Password reset successfully to 12345678");
  } else {
    console.log("User not found");
  }
  process.exit(0);
}

reset();
