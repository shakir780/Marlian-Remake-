import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const signUp = async (req, res, next) => {
  const { firstName, lastName, email, password, telephone } = req.body;
  if ((!firstName, !lastName, !email, !password)) {
    return res.json(400).json({ error: "Please provide all required fields!" });
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    firstName,
    lastName,
    telephone,
    email,
    password: hashedPassword,
  });

  try {
    // check if theres an existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exist" });
    }
    // this saves it inside the database
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = newUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(201)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
