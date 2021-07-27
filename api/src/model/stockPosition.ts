import mongoose, { Schema } from 'mongoose'

export interface StockPositionInterface {
    ticker: string;
    quantity: number;
    entryDate: Date;
    exitDate?: Date;
    entryPrice: number;
    exitPrice?: number;
    comments?: string;
}

const StockPositionSchema = new Schema<StockPositionInterface>({
    ticker: { type: String, required: true },
    quantity: { type: Number, required: true },
    entryDate: { type: Date, required: true },
    exitDate: Date,
    entryPrice: { type: Number, required: true },
    exitPrice: Number,
    comments: String
})

export default mongoose.model('StockPosition', StockPositionSchema)