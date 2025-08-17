import mongoose, { Schema } from 'mongoose';

const LeadSchema = new Schema(
    {
        name: { type: String, trim: true, required: true },
        email: { type: String, trim: true, required: true },
        phone: { type: String, trim: true },
        website: { type: String, trim: true },
        projectType: { type: String, trim: true }, // WordPress | Shopify | Custom | Maintenance
        budget: { type: String, trim: true },
        timeline: { type: String, trim: true },
        message: { type: String, trim: true },
        source: { type: String, trim: true, default: 'website' }, // marketing attribution if needed
        ip: { type: String, trim: true },
        userAgent: { type: String, trim: true },
    },
    { timestamps: true }
);

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
