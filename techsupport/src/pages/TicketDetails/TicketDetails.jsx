import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTickets } from '../../context/TicketContext';
import { statuses, categories, priorities } from '../../data/mockData';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa';
import StatusBadge from '../../components/common/StatusBadge';
import PriorityTag from '../../components/common/PriorityTag';
import CategoryBadge from '../../components/common/CategoryBadge';
import TicketHistoryTimeline from '../../components/tickets/TicketHistoryTimeline';
import styles from './TicketDetails.module.css';

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTicketById, updateTicket, deleteTicket, isLoading } = useTickets();
  const [ticket, setTicket] = useState(null);
  const [ticketLoading, setTicketLoading] = useState(true);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadTicket = async () => {
      try {
        setTicketLoading(true);
        const foundTicket = await getTicketById(id);
        if (foundTicket) {
          setTicket(foundTicket);
        }
      } catch (error) {
        console.error('Erro ao carregar ticket:', error);
      } finally {
        setTicketLoading(false);
      }
    };

    if (id) {
      loadTicket();
    }
  }, [id, getTicketById]);

  const handleStatusChange = async (newStatus) => {
    if (!ticket) return;
    
    setIsSubmitting(true);
    try {
      const updatedTicket = await updateTicket(id, { 
        status: newStatus,
        updatedBy: 'Usuário Admin',
        comment: `Status alterado de '${ticket.status}' para '${newStatus}'`
      });
      setTicket(updatedTicket);
      setShowStatusDropdown(false);
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Erro ao atualizar status do chamado');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !ticket) return;

    setIsSubmitting(true);
    try {
      const updatedTicket = await updateTicket(id, { 
        updatedBy: 'Usuário Admin',
        comment: newComment
      });
      setTicket(updatedTicket);
      setNewComment('');
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
      alert('Erro ao adicionar comentário');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este chamado? Esta ação não pode ser desfeita.')) {
      try {
        await deleteTicket(id);
        navigate('/');
      } catch (error) {
        console.error('Erro ao deletar ticket:', error);
        alert('Erro ao excluir chamado');
      }
    }
  };

  if (isLoading || ticketLoading) {
    return <div className={styles.loading}>Carregando detalhes do chamado...</div>;
  }

  if (!ticket) {
    return (
      <div className={styles.notFound}>
        <h2>Chamado Não Encontrado</h2>
        <p>O chamado que você está procurando não existe ou foi excluído.</p>
        <Link to="/" className="button">Voltar ao Painel</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to="/" className={styles.backLink}>
          <FaArrowLeft />
          <span>Voltar ao Painel</span>
        </Link>
        
        <div className={styles.actions}>
          <button onClick={handleDelete} className={styles.deleteButton}>
            <FaTrash />
            <span>Excluir</span>
          </button>
        </div>
      </div>
      
      <div className={styles.ticketHeader}>
        <div className={styles.ticketMeta}>
          <h1 className={styles.ticketTitle}>{ticket.title}</h1>
          
          <div className={styles.ticketInfo}>
            <span className={styles.ticketId}>Chamado #{ticket.id}</span>
            <span className={styles.ticketDate}>
              Criado em {format(new Date(ticket.createdAt), 'dd/MM/yyyy')}
            </span>
          </div>
        </div>
        
        <div className={styles.statusContainer}>
          <div className={styles.statusLabel}>Status:</div>
          <div className={styles.statusWrapper}>
            <button 
              className={styles.statusButton}
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
            >
              <StatusBadge status={ticket.status} />
              <span className={styles.statusArrow}>▼</span>
            </button>
            
            {showStatusDropdown && (
              <motion.div 
                className={styles.statusDropdown}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {statuses.map(status => (
                  <button
                    key={status.id}
                    className={styles.statusOption}
                    onClick={() => handleStatusChange(status.id)}
                    disabled={status.id === ticket.status || isSubmitting}
                  >
                    <StatusBadge status={status.id} />
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      <div className={styles.mainContent}>
        <div className={styles.ticketDetails}>
          <div className={styles.detailsPanel}>
            <div className={styles.tagsContainer}>
              <PriorityTag priority={ticket.priority} />
              <CategoryBadge category={ticket.category} />
            </div>
            
            <div className={styles.detailsSection}>
              <h3>Descrição</h3>
              <p className={styles.description}>{ticket.description}</p>
            </div>
            
            <div className={styles.detailsSection}>
              <h3>Detalhes</h3>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Criado por</span>
                  <span className={styles.detailValue}>{ticket.createdBy}</span>
                </div>
                
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Atribuído para</span>
                  <span className={styles.detailValue}>
                    {ticket.assignedTo || 'Não atribuído'}
                  </span>
                </div>
                
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Criado</span>
                  <span className={styles.detailValue}>
                    {format(new Date(ticket.createdAt), 'dd/MM/yyyy HH:mm')}
                  </span>
                </div>
                
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Última atualização</span>
                  <span className={styles.detailValue}>
                    {format(new Date(ticket.updatedAt), 'dd/MM/yyyy HH:mm')}
                  </span>
                </div>
                
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Prioridade</span>
                  <span className={styles.detailValue}>
                    {priorities.find(p => p.id === ticket.priority)?.name || 'Desconhecida'}
                  </span>
                </div>
                
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Categoria</span>
                  <span className={styles.detailValue}>
                    {categories.find(c => c.id === ticket.category)?.name || 'Desconhecida'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className={styles.commentSection}>
              <h3>Adicionar Comentário</h3>
              <form onSubmit={handleCommentSubmit}>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Adicione um comentário ou atualização sobre este chamado..."
                  className={styles.commentInput}
                  rows={4}
                  required
                ></textarea>
                <button 
                  type="submit" 
                  className="button"
                  disabled={isSubmitting || !newComment.trim()}
                >
                  Adicionar Comentário
                </button>
              </form>
            </div>
          </div>
          
          <div className={styles.historyPanel}>
            <TicketHistoryTimeline history={ticket.history || []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;