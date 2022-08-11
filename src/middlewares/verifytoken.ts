import { client } from "../config/redis";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerToken = req.header("Authorization");
  if (!bearerToken) return res.status(401).json({ msg: "Unauthorized" });
  const token = bearerToken.split(" ")[1];
  type MyToken = {
    email: string;
    display_name: string;
    id: string;
    role: string;
    photo: string;
  };
  jwt.verify(
    token,
    `${process.env.ACCESS_TOKEN}`,
    async (err, payload): Promise<unknown> => {
      try {
        if (err && err.name === "TokenExpiredError")
          return res.status(401).json({ msg: "Your time is expired" });
        if (!payload)
          return res.status(401).json({ msg: "Please login first" });
      } catch (error) {
        console.log(error);
      }
    }
  );
  const decodedToken: unknown = jwt.verify(
    token,
    `${process.env.ACCESS_TOKEN}`
  );

  function verifyDecodedToken(data: unknown): asserts data is MyToken {
    if (!(data instanceof Object))
      throw new Error("Decoded token error. Token must be an object");
    if (!("id" in data))
      throw new Error('Decoded token error. Missing required field "id"');
  }
  verifyDecodedToken(decodedToken);

  const getChacheToken = async () => {
    try {
      const cacheToken = await client.get(`token-${decodedToken.id}`);
      if (token !== cacheToken)
        return res.status(401).json({
          msg: "Unauthorized, please login again",
        });
      req.user = decodedToken;
      next();
    } catch (error) {
      console.log(error);
    }
  };
  getChacheToken();
};
