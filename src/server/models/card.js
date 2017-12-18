import mongoose from 'mongoose';

export const CardSchema = new mongoose.Schema({
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List'
  },
  title: {
    type: String,
    required: true,
    trim: true
  }
});

export default mongoose.model('Card', CardSchema);
