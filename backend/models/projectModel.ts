import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true }]
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
