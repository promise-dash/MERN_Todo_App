import express from 'express';
import UserModel from '../models/user.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await UserModel.findOne({username});
        if (user) {
            return res.status(400).json("Username already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        res.status(201).json('User registered successfully');
    } catch (error) {
        res.status(500).json({ message: 'Registration Error', error });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json("No user exist with this email");
        }
        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword){
            return res.status(400).json("Incorrect password");
        }
        const token =  jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

        res.status(201).json({ token: token });
    } catch (error) {
         res.status(500).json({ message: 'Login Error', error });
    }
});


export { router as authRouter };
