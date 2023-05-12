import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.model';

// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async addUser(email, password, name, roles): Promise<{ id: string }> {
    const newUser = new this.userModel({ email, password, name, roles });
    const user = await newUser.save();
    return { id: user.id as string };
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email }).lean();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getUsers(): Promise<User[] | undefined> {
    return this.userModel.find({});
  }
}
