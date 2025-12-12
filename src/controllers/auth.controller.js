import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from "../models/user.model.js";
import { response } from 'express';

// Sign Up a new user
export const signUp = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create(
            {
                username,
                email,
                password: hashedPassword,
                role
            });
        return res.status(201).json({ message: "User created successfully", user });

    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
// Sign In a user
export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        // email chech
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User doesn't exist" });
        // password check
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN });
        res.status(200).json({ result: user, token });
        response.status(200).json({ message: "User signed in successfully", user, token });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
}