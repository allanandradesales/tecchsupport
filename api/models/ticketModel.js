import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'O título é obrigatório']
  },
  description: {
    type: String,
    required: [true, 'A descrição é obrigatória']
  },
  category: {
    type: String,
    enum: ['general', 'infra', 'software', 'hardware'],
    default: 'general'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  createdBy: {
    type: String,
    required: [true, 'Informe quem criou o chamado']
  },
  assignedTo: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['new', 'in_progress', 'closed'],
    default: 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Ticket', ticketSchema);
