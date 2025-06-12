import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  assignedMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true }],
  status: {
    type: String,
    enum: ['to-do', 'in-progress', 'done', 'cancelled'],
    default: 'to-do'
  }
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);
