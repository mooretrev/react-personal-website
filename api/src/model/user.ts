import mongoose, { Schema, Document } from 'mongoose';

export interface UserModel {
  username: string;
  password: string;
  email: string;
  approved?: boolean;
  jwtToken?: string;
}

export interface UserInterface extends UserModel, Document { }

const userSchema = new Schema<UserInterface>({
  username: mongoose.Schema.Types.String,
  password: mongoose.Schema.Types.String,
  email: mongoose.Schema.Types.String,
  approved: {
    type: mongoose.Schema.Types.Boolean,
    default: false,
  },
  jwtToken: {
    type: mongoose.Schema.Types.String,
    default: '',
  },
});

const User = mongoose.model('User', userSchema);

export default User;
