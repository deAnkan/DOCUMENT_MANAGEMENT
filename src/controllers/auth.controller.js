import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from "../models/user.model.js";
import transporter from '../config/nodemailer.js';


// Sign Up a new user
export const signUp = async (req, res) => {
    try {
    const { name, email, password, role } = req.body;

    // validation check
        if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
    }

    // existence check
    const exists = await User.findOne({ email });
        if (exists) {
    return res.status(400).json({ message: "Email already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // generate OTP
    const generateOTP = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const otp = generateOTP();
    const otpExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    // create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        otp,
        otpExpiresAt,
        isVerified: false
    });

    // send OTP email
    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: user.email,
        subject: "Verify Your Email - OTP",
        text: `Hello ${user.name},

Your OTP for email verification is: ${otp}

This OTP is valid for 10 minutes.

If you did not request this, please ignore this email.

Best regards,
The Team`
    };

    await transporter.sendMail(mailOptions);

    console.log("OTP SENT TO:", user.email);

    
    // send welcome email
    const mailOptions2 = {
        from: process.env.SENDER_EMAIL,
        to: user.email,
        subject: "Welcome to Our Service",
        text: `Hello ${user.name},

Your account has been successfully created.

You can now sign in using your email and password.

Best regards,
The Team`
    };

    await transporter.sendMail(mailOptions2);

    console.log("SIGNUP SUCCESS:", user.email);

    return res.status(201).json({
        message: "User created successfully. ",
        email: user.email
    });

    } catch (err) {
    console.error("SIGNUP ERROR:", err.message);
    return res.status(500).json({ message: "Something went wrong" });
    }
};


// Sign In an existing user
export const signIn = async (req, res) => {
    try {
        const { email, password, role } = req.body; 

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

        console.log("SIGNIN SUCCESS:", user.email);
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


// Logout user (JWT-based)
export const logOut = async (req, res) => {
    try {
        console.log("LOGOUT SUCCESS");

        return res.status(200).json({
            message: "User logged out successfully"
        });
    } catch (err) {
        console.error("LOGOUT ERROR:", err.message);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
    try {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
        return res.status(400).json({ message: "User already verified" });
    }

    if (
        user.otp !== otp ||
        !user.otpExpiresAt ||
        user.otpExpiresAt < Date.now()
    ) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiresAt = undefined;

    await user.save();

    return res.status(200).json({ message: "Email verified successfully" });

    } catch (err) {
        console.error("VERIFY OTP ERROR:", err.message);
    return res.status(500).json({ message: "Something went wrong" });
    }
};