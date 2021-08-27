import mongoose, { Schema, Document } from 'mongoose';

export type PositionType = 'LONG' | 'SHORT' | 'LONG CALL' | 'LONG PUT' | 'SHORT CALL' | 'SHORT PUT';

export type InstrumentType = 'STOCK' | 'OPTION';

export interface StockPositionInterface extends Document {
    positionType: PositionType;
    ticker: string;
    instrumentType: InstrumentType;
    quantity: number;
    entryDate: Date;
    exitDate?: string;
    entryPrice: number;
    exitPrice?: number;
    comments?: string;
}

const StockPositionSchema = new Schema<StockPositionInterface>({
  positionType: { type: String, required: true },
  ticker: { type: String, required: true },
  instrumentType: { type: String, required: true },
  quantity: { type: Number, required: true },
  entryDate: { type: Date, required: true },
  exitDate: Date,
  entryPrice: { type: Number, required: true },
  exitPrice: Number,
  comments: String,
});

export default mongoose.model('StockPosition', StockPositionSchema);
