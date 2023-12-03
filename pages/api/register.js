import dbConnect from "../../lib/mongoose";
import userModel from "../../models/userModel";

export default async function userAPI(req, res) {
  try {
    await dbConnect();

    const user = await new userModel(req.body.details);
    const newUser = await user.save();

    // res.json({ user: user, token: token });
    if (newUser._id) {
      res.json({ status: 200, msg: "Successfully Registered" });
    } else
      res.json({ status: 500, msg: "Something went wrong try again later." });
    // res.json(user);
  } catch (error) {
    if (error.code === 11000) {
      res.json({ status: 11000, msg: "Already Registered." });
    } else {
      res.send({ msg: error.message });
    }
  }
}
