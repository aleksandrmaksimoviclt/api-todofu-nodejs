import mongoose from 'mongoose';
// import { CardSchema } from './card';

const ListSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true,
    trim: true
  }
});

export default mongoose.model('List', ListSchema);
