// models/Lead.js
import mongoose, { Schema } from 'mongoose';

const LeadSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        phone: { type: String, required: true, trim: true },
        website: { type: String, trim: true },
        projectType: { type: String, trim: true },
        budget: { type: String, trim: true },
        timeline: { type: String, trim: true },
        message: { type: String, required: true, trim: true },
        source: { type: String, default: 'website' },
        ip: String,
        userAgent: String,
    },
    { timestamps: true }
);

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
