import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from "../models/user.model.js";


// Sign Up a new user
export const signUp = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        //validation check

        if (!name || !email || !password) {     
        return res.status(400).json({
    message: "All fields are required"
});
}
            
        //existance check
        const exists = await User.findOne({ email });

        if (exists) {
            return res.status(400).json({ message: "email already exists" });
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 12);
        //create user
        const user = await User.create(
            {
                name,
                email,
                password: hashedPassword,
                role
            });
        return res.status(201).json({ message: "User created successfully", user });
    
    
    } catch (err) {
        console.error("SIGNUP ERROR:", err.message); 
        res.status(500).json({ message: "Something went wrong" });
        

    }
};


// Sign In an existing user
export const signIn = async (req, res) => {
    try {
        const { email, password, role } = req.body; // ✅ MOVED UP

        // validation check
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password required"
            });
        }

        // email check
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User doesn't exist" });
        }

        // password check
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // role check (optional)
        if (role && user.role !== role) {
            return res.status(403).json({ message: "Access denied for this role" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
        );

        return res.status(200).json({
            message: "User signed in successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        });

    } catch (err) {
        console.error("SIGNIN ERROR:", err.message);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
