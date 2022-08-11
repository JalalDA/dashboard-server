import Users from "../models/UserModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { client } from "../config/redis";

export const register = async (req: Request, res: Response) => {
  try {
    const { display_name, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    await Users.create({
      display_name,
      email,
      password: hashPassword,
    });
    res.status(200).json({
      msg: "Register success, please check your email",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Register failed",
      error,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await Users.findAll({
      where: { email: email },
    });
    if (!result) return res.status(404).json("Email is not registered");
    console.log(result);
    const dbPass = result[0].getDataValue("password");
    if (!dbPass) return res.status(404).json("You don't have any password yet");
    const display_name = result[0].getDataValue("email");
    const photo = result[0].getDataValue("photo");
    const id = result[0].getDataValue("id");
    const role = result[0].getDataValue("role");
    const match = bcrypt.compare(password, dbPass);
    if (!match) return res.status(401).json("Wrong email or password");
    const accessToken = jwt.sign(
      { email, display_name, id, role, photo },
      `${process.env.ACCESS_TOKEN}`,
      {
        expiresIn: "300s",
      }
    );
    await client.set(`token-${id}`, accessToken);
    res.status(200).json({
      msg: "Login success",
      token: accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Login failed",
      error,
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    type MyToken = {
      display_name: string;
      id: string;
      role: string;
      photo: string;
    };
    const user = req.user;
    function verifyDecodedToken(data: unknown): asserts data is MyToken {
      if (!(data instanceof Object))
        throw new Error("Decoded token error. Token must be an object");
      if (!("id" in data))
        throw new Error('Decoded token error. Missing required field "id"');
    }
    verifyDecodedToken(user);
    const { id } = user;
    const cacheToken = await client.get(`token-${id}`);
    if (!cacheToken) return res.status(400).json(`Cannot logout`);
    await client.del(`token-${id}`);
    res.status(200).json({
      msg: `Logout success`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Logout fail", error });
  }
};
