const User = require('../models/user');

const createUserIfNotExist = async (userData) => {
    try {
        let user = await User.findOne({ id: userData.id });
        if (!user) {
            user = new User(userData);
            await user.save();
        }
        return user;
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};

module.exports = {
    createUserIfNotExist,
};