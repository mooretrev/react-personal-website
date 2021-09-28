import mongoose, { Schema } from 'mongoose';

const powerliftingSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
});

const Powerlifting = mongoose.model('Powerlifting', powerliftingSchema);

export default Powerlifting;
