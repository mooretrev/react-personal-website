import mongoose, { Schema, Document } from 'mongoose';

export type PositionType = 'LONG' | 'SHORT' | 'LONG CALL' | 'LONG PUT' | 'SHORT CALL' | 'SHORT PUT';

export type InstrumentType = 'STOCK' | 'OPTION';

export interface StockPositionModel {
    positionType: PositionType;
    ticker: string;
    instrumentType: InstrumentType;
    quantity: number;
    entryDate: Date;
    exitDate?: Date;
    entryPrice: number;
    exitPrice?: number;
    comments?: string;
    initialPositionSize?: number;
    gainOrLoss?: number;
    finalPositionSize?: number;
}

export interface StockPositionInterface extends StockPositionModel, Document {}

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

StockPositionSchema.virtual('initialPositionSize')
  .get(function initPosition(this: StockPositionInterface) {
    return this.quantity * this.entryPrice;
  });

StockPositionSchema.virtual('finalPositionSize')
  .get(function gainOrLost(this: StockPositionInterface) {
    if (this.exitPrice !== undefined) { return this.quantity * this.exitPrice; }
    return null;
  });

StockPositionSchema.virtual('gainOrLoss')
  .get(function gainOrLost(this: StockPositionInterface) {
    if (this.exitPrice !== undefined) { return (this.exitPrice - this.entryPrice) * this.quantity; }
    return null;
  });

StockPositionSchema.set('toObject', { virtuals: true });
StockPositionSchema.set('toJSON', { virtuals: true });

export default mongoose.model('StockPosition', StockPositionSchema);
