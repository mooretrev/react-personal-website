import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
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
