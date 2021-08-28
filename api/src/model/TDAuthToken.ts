import mongoose, { Schema, Document } from 'mongoose';

export interface TDAuthTokenModal {
    access_token: string;
    refresh_token: string;
    time_stamp: number;
    refresh_time_stamp: number;
}

export interface TDAuthTokenInterface extends TDAuthTokenModal, Document {}

const TDAuthTokenSchema = new Schema<TDAuthTokenInterface>({
  access_token: { type: String, required: true },
  refresh_token: { type: String, required: true },
  time_stamp: { type: Number, required: true },
  refresh_time_stamp: { type: Number, required: true },
});

export default mongoose.model('TDAuthToken', TDAuthTokenSchema);
