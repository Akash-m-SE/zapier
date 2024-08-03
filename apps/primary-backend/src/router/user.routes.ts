import { Router } from "express";
import { authMiddleware } from "../middleware";
import { SigninSchema, SignupSchema } from "../types";
import prisma from "../lib/prisma";
import jwt from "jsonwebtoken";
import "dotenv/config";

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const body = req.body;
    const parsedData = SignupSchema.safeParse(body);

    if (!parsedData.success) {
      console.log("Error while parsing data = ", parsedData.error);
      return res.status(411).json({
        message: "Incorrect Inputs",
      });
    }

    const userExists = await prisma.user.findFirst({
      where: {
        email: parsedData.data.username,
      },
    });

    if (userExists) {
      return res.status(403).json({
        message: "User already exists!",
      });
    }

    const user = await prisma.user.create({
      data: {
        email: parsedData.data.username,
        // TODO: encrypt the passwords before storing them in db
        password: parsedData.data.password,
        name: parsedData.data.name,
      },
    });

    // await send Email (sends out email to the user to verify)

    return res.json({
      message: "Please verify your account by checking your email",
    });
  } catch (error) {
    console.log("Error occured while signing up", error);
    res.status(500).json({
      message: "An error ocurred while signing up",
    });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const body = req.body;
    const parsedData = SigninSchema.safeParse(body);

    if (!parsedData.success) {
      return res.status(411).json({
        message: "Incorrect Inputs",
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: parsedData.data.username,
        password: parsedData.data.password,
      },
    });

    // TODO: check the password separately after fetching the user details from the db
    if (!user) {
      return res.status(403).json({
        message: "Incorrect Credentials",
      });
    }

    // TODO: Sign the JWT
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_PASSWORD as string,
    );

    res.json({
      token: token,
    });
  } catch (error) {
    console.log("Error occured while signing in", error);
    res.status(500).json({
      message: "An error ocurred while signing in",
    });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    // Fix the type
    // @ts-ignore
    const id = req.id;
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        name: true,
        email: true,
      },
    });

    return res.json({
      user,
    });
  } catch (error) {
    console.log("Error occured while fetching user", error);
    return res.status(500).json({
      message: "An error ocurred while fetching user",
    });
  }
});

export const userRouter = router;
