import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  roles: {
    type: [String],
    validate: (v) => v.length > 0,
    required: true,
  },
});

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  roles: string[];
}
