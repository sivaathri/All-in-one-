import UserModel from '../models/user.model.js';

export class UserRepository {
  async _execute(sql, params, connection = null) {
    return UserModel._execute(sql, params, connection);
  }

  async findById(userId, connection = null) {
    return UserModel.findById(userId, connection);
  }

  async findByEmail(email, connection = null) {
    return UserModel.findByEmail(email, connection);
  }

  async findByMobile(mobileNumber, connection = null) {
    return UserModel.findByMobile(mobileNumber, connection);
  }

  async findByIdentifier(identifier, connection = null) {
    return UserModel.findByIdentifier(identifier, connection);
  }

  async findExistingUser(email, mobileNumber, connection = null) {
    return UserModel.findExistingUser(email, mobileNumber, connection);
  }

  async create({ fullName, email, mobileNumber, accountStatus = 'pending' }, connection = null) {
    return UserModel.create({ fullName, email, mobileNumber, accountStatus }, connection);
  }

  async setEmailVerified(userId, accountStatus = null, connection = null) {
    return UserModel.setEmailVerified(userId, accountStatus, connection);
  }

  async setMobileVerified(userId, accountStatus = null, connection = null) {
    return UserModel.setMobileVerified(userId, accountStatus, connection);
  }

  async updateAccountStatus(userId, status, connection = null) {
    return UserModel.updateAccountStatus(userId, status, connection);
  }
}

export const userRepository = new UserRepository();
export default userRepository;
