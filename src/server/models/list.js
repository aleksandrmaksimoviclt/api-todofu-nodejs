import mongoose from 'mongoose';
import { CardSchema } from './card';

const ListSchema = new mongoose.Schema({
  cards: [CardSchema],
  name : {
    type: String,
    required: true,
    trim: true
  }
});

export default mongoose.model('List', ListSchema);
