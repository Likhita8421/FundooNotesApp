import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
    {
        Title: {
            type: String,
            required: true,
        },
        Description: {
            type: String,
            required: true,
        },
        Color: {
            type: String,
        },
        isArchived: {
            type: Boolean, default: false
        },
        isDeleted: {
            type: Boolean, default: false
        },
        userId: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default model('Note', noteSchema);