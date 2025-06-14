import express from 'express';
import {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket
} from '../controllers/ticketController.js';

// Ticket routes
const router = express.Router();
/**
 * @route GET /
 * @desc Get all tickets
 * @access Public
 */
router.get('/', getAllTickets);

/**
 * @route GET /:id
 * @desc Get a ticket by ID
 * @access Public
 */
router.get('/:id', getTicketById);

/**
 * @route POST /
 * @desc Create a new ticket
 * @access Public
 */
router.post('/', createTicket);

/**
 * @route PUT /:id
 * @desc Update a ticket by ID
 * @access Public
 */
router.put('/:id', updateTicket);

/**
 * @route DELETE /:id
 * @desc Delete a ticket by ID
 * @access Public
 */
router.delete('/:id', deleteTicket);
router.delete('/:id', deleteTicket);

export default router;
