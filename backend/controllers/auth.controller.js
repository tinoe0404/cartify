import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

//creating the tokens 
const generateTokens = (userId) => {
  const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m',});

  const refreshToken = jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d',})

  return { accessToken, refreshToken }
};

//Stores a user's refresh token in Redis with a 7-day expiration.
const storeRefreshToken  = async(userId, refreshToken) =>{
  await redis.set(`refresh_token: ${userId}`,refreshToken,"EX",7*24*60*60); //7days
}

//creating a function for setCookies
const setCookies = (res, accessToken, refreshToken) => {
	res.cookie("accessToken", accessToken, {
		httpOnly: true, // prevent XSS attacks, cross site scripting attack
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
		maxAge: 15 * 60 * 1000, // 15 minutes
	});
	res.cookie("refreshToken", refreshToken, {
		httpOnly: true, // prevent XSS attacks, cross site scripting attack
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
	});
};

//signup function
export const signup = async (req, res) => {
  const { email, password, name} = req.body
  const userExists = await User.findOne({ email });
  
  try {
    if (userExists){
      return res.status(400).json({message: "User already exists"});
    }
  
    const user = await User.create({name,email,password})

    //authenticate user
    const { accessToken, refreshToken }  = generateTokens(user_id);
    await storeRefreshToken(user._id,refreshToken);

    setCookies(res, accessToken, refreshToken);
  
    res.status(201).json({user:{
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    }, message: "User created successfully"});
  } catch (error){
    res.status(500).json({ message: error.message });
  }
};

//login function
export const login = async (req, res) => {
  res.send('Login endpoint');
};

//logout function
export const logout = async (req, res) => {
  res.send('Logout endpoint');
};
