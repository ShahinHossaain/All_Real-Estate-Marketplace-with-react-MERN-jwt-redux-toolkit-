import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { errorHandler } from "../utilitis/error.js";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10)
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        console.log(req.body);
        res.status(201).json('user is created successfully Alhamdulillah');
    } catch (err) {
        next(err);
    }
}