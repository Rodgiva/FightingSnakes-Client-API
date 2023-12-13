import {
  _addUser,
  _getUsers,
  _getUserByUsername,
} from "../models/users.model.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const usersAuth = [];

dotenv.config();

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await _getUserByUsername(username.toLowerCase());
    if (user.length === 0) {
      return res.status(404).json({ msg: "Username not found" });
    }

    const match = bcrypt.compareSync(password + "", user[0].password);
    if (!match) {
      return res.status(404).json({ msg: "Wrong password" });
    }

    const userId = user[0].id;
    const userUsername = user[0].username;
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const expiration = process.env.TIME_EXPIRATION;
    const accessToken = jwt.sign({ userId, userUsername }, secret, {
      expiresIn: expiration,
    });
    usersAuth.push(userUsername);
    res.cookie("token", accessToken, {
      httpOnly: true,
      maxAge: expiration,
    });

    res.json({ accessToken });
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "Something went wrong" });
  }
};

const register = async (req, res) => {
  const { username, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password + "", salt);
  try {
    const user = await _addUser(username.toLowerCase(), hash);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "Something went wrong" });
  }
};

// const getUsersAuth = () => {
//   return usersAuth;
// };

export { login, register };
