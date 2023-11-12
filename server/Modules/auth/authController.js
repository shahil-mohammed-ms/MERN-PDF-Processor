const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserAuth = require('../../src/db/Models/UserSchema')
const otherHelper = require('../../Helper/other.helper')
const { JWT_SECRET } = process.env;
const authController = {}


//signin
authController.Signin=async(req,res)=>{

  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await UserAuth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserAuth({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Create a JWT token for the new user
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: '1h',
    });
console.log(token)
    otherHelper.sendResponse(res,'Sign up success',token)

    // res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

authController.Login=async(req,res)=>{

  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await UserAuth.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Create a JWT token for the authenticated user
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: '1h',
    });
    console.log(token)
    // res.json({ token });
    otherHelper.sendResponse(res,'Login success',token)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


module.exports=authController