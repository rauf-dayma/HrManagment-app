// models/Slot.js (Interview Slot Model)
import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
    hr: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    candidateName: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Slot', slotSchema);
