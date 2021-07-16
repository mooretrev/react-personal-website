import mongoose, { Schema } from 'mongoose'

export interface TDAuthToken {
    access_token: string;
    refresh_token: string;
    time_stamp: number;
    refresh_time_stamp: number;
}

const TDAuthTokenSchema = new Schema<TDAuthToken>({
    access_token: { type: String, required: true },
    refresh_token: { type: String, required: true },
    time_stamp: { type: Number, required: true },
    refresh_time_stamp: { type: Number, required: true }
})

export default mongoose.model('TDAuthToken', TDAuthTokenSchema)