const User = require('../models/User');
const { getUserProfile, fetchCodeForToken } = require('../utils/github')

module.exports = class UserService {
  static async create(code) {
    const token = await fetchCodeForToken(code);
    const userProfile = await getUserProfile(token);
    const user = await User.findByUserName(userProfile);

    if(user) return user;
    return User.insert(userProfile);
  }
};
