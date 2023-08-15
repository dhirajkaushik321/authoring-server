const User = require('../models/userModel');

async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        const savedUser=await user.save();
        res.status(201).json({ message: 'User registered successfully' ,savedUser});
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error: 'An error occurred' });
    }
}
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        const token = user.generateAuthToken();
        res.status(200).json({ message:"User logged in successfully!!",token });
    } catch (error) {
        res.status(401).json({ error: 'Invalid login credentials' });
    }
 }
 
 

module.exports = {
    registerUser,
    loginUser  };

