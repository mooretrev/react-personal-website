import mongoose, { Schema, Document } from 'mongoose';

export interface StockTransactionModel {
    date: Date,
    ticker: string;
    totalPrice: number;
}

export interface StockTransactionInterface extends StockTransactionModel, Document {}

const StockTransactionSchema = new Schema<StockTransactionInterface>({
  date: { type: Date, required: true },
  ticker: { type: String, required: true },
  totalPrice: { type: Number, required: true },
});

export default mongoose.model('StockTransaction', StockTransactionSchema);
