import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUserId } from '../utils/auth';
import CustomError from '../errors/CustomError';

class User {
  constructor(db) {
    this.db = db;
  }

  _getToken(userId) {
    return jwt.sign({ userId }, process.env.SECRET_OR_KEY, {expiresIn: '1h'});
  }

  async signup(input) {
    const userExist = await this.db.users.findUnique({where: {email: input.email}});
    if (userExist) throw new CustomError('User with the email is already exists');

    const salt = await bcrypt.genSalt(3);
    const hashedPassword = await bcrypt.hash(input.password, salt);

    const data = { ...input, password: hashedPassword };
    const user = await this.db.users.create({ data });

    const token = this._getToken(user.id);

    return { user, token };
  }

  async login(input) {
    const {email, password} = input;
      
    const user = await this.db.users.findUnique({where: {email}});
    if (!user) throw new CustomError('User with email not found');
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new CustomError.authError();

    
    const token = this._getToken(user.id);
    
    return {token, user}
  }

  async update(input, request) {
    const userId = getUserId(request);

    const data = {...input};
    if (data.age) data.age = Number(data.age);

    return await this.db.users.update({
      where: { id: userId }, data
    });
  }

  async delete(request) {
    const userId = getUserId(request);

    return await this.db.users.delete({ where: { id: userId } });
  }
}

module.exports = User;
