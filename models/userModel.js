import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  mobileNo: { type: String, required: true },
});

// productsSchema.index({ name: "text", category: "text" });
const userModel = mongoose.models.Users || mongoose.model("Users", userSchema);
// module.exports =  employeeModel;
export default userModel;
