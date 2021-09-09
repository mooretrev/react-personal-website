import mongoose, { Schema, Document } from 'mongoose';

export interface TDAuthTokenModal {
    access_token: string; // eslint-disable-line camelcase
    refresh_token: string; // eslint-disable-line camelcase
    time_stamp: number; // eslint-disable-line camelcase
    refresh_time_stamp: number; // eslint-disable-line camelcase
}

export interface TDAuthTokenInterface extends TDAuthTokenModal, Document {}

const TDAuthTokenSchema = new Schema<TDAuthTokenInterface>({
  access_token: { type: String, required: true },
  refresh_token: { type: String, required: true },
  time_stamp: { type: Number, required: true },
  refresh_time_stamp: { type: Number, required: true },
});

export default mongoose.model('TDAuthToken', TDAuthTokenSchema);
