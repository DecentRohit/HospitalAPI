import mongoose from "mongoose";

export const reportSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    },
    status: { type: String, enum: ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'] },
    date: { type: Date }
})

//Report is name of collection and telling that its for reportSchema
export const reportModel = mongoose.model('Report', reportSchema);
