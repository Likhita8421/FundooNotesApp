import { Schema, model } from 'mongoose';

const labelSchema = new Schema(
  {
    label: { 
        type: String,
         required: true 
    },
    userId: { 
        type: String
    }
  },
  {
    timestamps: true
  }
);

export default model('Label', labelSchema);