// controllers/ticketController.js
import Ticket from '../models/ticketModel.js';

// GET /tickets
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar tickets', details: err.message });
  }
};

// GET /tickets/:id
export const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket não encontrado' });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar ticket', details: err.message });
  }
};

// POST /tickets
export const createTicket = async (req, res) => {
  try {
    const novoTicket = new Ticket(req.body);
    await novoTicket.save();
    res.status(201).json(novoTicket);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar ticket', details: err.message });
  }
};

// PUT /tickets/:id
export const updateTicket = async (req, res) => {
  try {
    const updated = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Ticket não encontrado' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar ticket', details: err.message });
  }
};

// DELETE /tickets/:id
export const deleteTicket = async (req, res) => {
  try {
    const deleted = await Ticket.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Ticket não encontrado' });
    res.json({ message: 'Ticket removido com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar ticket', details: err.message });
  }
};
