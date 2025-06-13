/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';

const TicketContext = createContext();

export function useTickets() {
  return useContext(TicketContext);
}

export function TicketProvider({ children }) {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Buscar tickets da API
  const fetchTickets = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await apiService.getTickets();
      setTickets(data);
    } catch (err) {
      setError('Falha ao carregar chamados: ' + err.message);
      console.error('Erro ao buscar tickets:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);
  
  // Buscar um ticket por ID
  const getTicketById = async (id) => {
    try {
      const ticket = await apiService.getTicketById(id);
      return ticket;
    } catch (err) {
      console.error('Erro ao buscar ticket:', err);
      return null;
    }
  };
  
  // Criar um novo ticket
  const createTicket = async (ticketData) => {
    try {
      const newTicket = await apiService.createTicket({
        ...ticketData,
        status: 'new'
      });
      
      // Atualizar lista local
      setTickets(currentTickets => [newTicket, ...currentTickets]);
      return newTicket;
    } catch (err) {
      console.error('Erro ao criar ticket:', err);
      throw new Error('Falha ao criar chamado: ' + err.message);
    }
  };
  
  // Atualizar um ticket
  const updateTicket = async (id, updatedData) => {
    try {
      const updatedTicket = await apiService.updateTicket(id, updatedData);
      
      // Atualizar lista local
      setTickets(currentTickets => 
        currentTickets.map(ticket => 
          ticket.id === Number(id) ? updatedTicket : ticket
        )
      );
      
      return updatedTicket;
    } catch (err) {
      console.error('Erro ao atualizar ticket:', err);
      throw new Error('Falha ao atualizar chamado: ' + err.message);
    }
  };
  
  // Deletar um ticket
  const deleteTicket = async (id) => {
    try {
      await apiService.deleteTicket(id);
      
      // Remover da lista local
      setTickets(currentTickets => 
        currentTickets.filter(ticket => ticket.id !== Number(id))
      );
    } catch (err) {
      console.error('Erro ao deletar ticket:', err);
      throw new Error('Falha ao deletar chamado: ' + err.message);
    }
  };
  
  // Filtrar tickets (mantém a lógica local para performance)
  const filterTickets = (filters) => {
    return tickets.filter(ticket => {
      let match = true;
      
      if (filters.status && filters.status !== 'all') {
        match = match && ticket.status === filters.status;
      }
      
      if (filters.category && filters.category !== 'all') {
        match = match && ticket.category === filters.category;
      }
      
      if (filters.priority && filters.priority !== 'all') {
        match = match && ticket.priority === filters.priority;
      }
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          ticket.title.toLowerCase().includes(searchLower) ||
          ticket.description.toLowerCase().includes(searchLower) ||
          ticket.createdBy.toLowerCase().includes(searchLower) ||
          (ticket.assignedTo && ticket.assignedTo.toLowerCase().includes(searchLower));
        
        match = match && matchesSearch;
      }
      
      return match;
    });
  };
  
  // Obter estatísticas dos tickets
  const getTicketStats = () => {
    const totalTickets = tickets.length;
    const statusCounts = tickets.reduce((acc, ticket) => {
      acc[ticket.status] = (acc[ticket.status] || 0) + 1;
      return acc;
    }, {});
    
    const categoryCounts = tickets.reduce((acc, ticket) => {
      acc[ticket.category] = (acc[ticket.category] || 0) + 1;
      return acc;
    }, {});
    
    const priorityCounts = tickets.reduce((acc, ticket) => {
      acc[ticket.priority] = (acc[ticket.priority] || 0) + 1;
      return acc;
    }, {});
    
    return {
      totalTickets,
      statusCounts,
      categoryCounts,
      priorityCounts
    };
  };

  // Recarregar tickets
  const refreshTickets = () => {
    fetchTickets();
  };
  
  const value = {
    tickets,
    isLoading,
    error,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket,
    filterTickets,
    getTicketStats,
    refreshTickets
  };
  
  return (
    <TicketContext.Provider value={value}>
      {children}
    </TicketContext.Provider>
  );
}