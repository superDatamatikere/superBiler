const User = require('../models/user');
const bcrypt = require('bcrypt');

async function authenticateUser(username, password) {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('Bruger ikke fundet');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Forkert kodeord');
    }

    return user;
}

module.exports = authenticateUser;
