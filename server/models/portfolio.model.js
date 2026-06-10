import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  headline: { type: String, default: '' },
  biography: { type: String, default: '' },
  interests: [{ type: String }],
  skills: [{ name: String, percentage: Number }],
  projects: [{
    title: { type: String },
    description: { type: String },
    technologies: [{ type: String }],
    keyHighlights: [{ type: String }]
  }],
  contentScore: { type: Number, default: 80 },
  seoScore: { type: Number, default: 75 }
}, { timestamps: true });

export default mongoose.model('Portfolio', portfolioSchema);