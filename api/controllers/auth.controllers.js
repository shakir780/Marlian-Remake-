import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorhandler } from "../utils/error.js";
export const signUp = async (req, res, next) => {
  const { firstName, lastName, email, password, telephone, subscribe, policy } =
    req.body;
  if (!firstName && !lastName && !email && !password && !subscribe && !policy) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields!" });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    firstName,
    lastName,
    telephone,
    email,
    subscribe,
    policy,
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

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      // Set expiresIn to null or omit it to make the token not expire
      expiresIn: "30d", // Token expires in 30 days
    });
    const { password: pass, ...rest } = newUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      })
      .status(201)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorhandler(404, "User not found "));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorhandler(404, "Wrong credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      // Set expiresIn to null or omit it to make the token not expire
      expiresIn: "30d", // Token expires in 30 days
    });
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(200);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been Logged out");
  } catch (error) {
    next(error);
  }
};

export const checkAuthorization = (req, res, next) => {
  console.log(req.cookies);
  const token = req?.cookies?.access_token;
  if (!token) return next(errorhandler(401, "Unauthorized"));
  console.log(token.object, "ssss");
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorhandler(403, "Forbidden"));
    req.user = user;
    next();
  });
};
