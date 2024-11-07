// src/services/auth.service.ts
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';

export class AuthService {
    async getUser(username: string): Promise<{ username: string; email: string }> {
      throw new Error('Method not implemented.');
  }
  async register(username: string, password: string, email: any) {
    const newUser = new User({ username, password, email });
    await newUser.save();
    return {id:newUser._id, username: newUser.username, email: newUser.email };
  }

  async login(username: string, password: string, email: string): Promise<any | null> {
    let userFound;
    if (!username) {
        userFound = await User.findOne({ email });
    } else if (!email) {
        userFound = await User.findOne({ username });
    } else {
        userFound = await User.findOne({ username,email });
    }

    // const user = await User.findOne({ username,email });
    if (userFound && (await userFound.comparePassword(password))) {
      return {
        user: {
            username: userFound.username,
            email: userFound.email,
        },
        token: jwt.sign({ id: userFound._id, username: userFound.username }, process.env.JWT_SECRET as string, {
            expiresIn: '1h',
          })
      }
    }
    return null;
  }
}

export default new AuthService();
