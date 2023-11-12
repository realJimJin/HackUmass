const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}


// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// singup user
const signupUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.signup(email, password);

        // create a token
        const token = createToken(user._id)

        // Ensure that the response includes the user's _id
        res.status(200).json({ _id: user._id, email: user.email, token: createToken(user._id) });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// Update user details
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { sex, age, height, weight } = req.body;

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid user ID' });
    }

    try {
        // Find the user by ID and update their details
        const updatedUser = await User.findByIdAndUpdate(
            { _id: id },
            { sex, age, height, weight },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            throw new Error('User not found');
        }

        // Respond with the updated user data
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { signupUser, loginUser, updateUser };
