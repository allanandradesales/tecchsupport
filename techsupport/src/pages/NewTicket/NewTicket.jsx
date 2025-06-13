import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTickets } from '../../context/TicketContext';
import { categories, priorities } from '../../data/mockData';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styles from './NewTicket.module.css';

const NewTicket = () => {
  const navigate = useNavigate();
  const { createTicket } = useTickets();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    createdBy: 'Admin',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'O título é obrigatório';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'A descrição é obrigatória';
    }
    
    if (!formData.category) {
      newErrors.category = 'A categoria é obrigatória';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const newTicket = await createTicket(formData);
      navigate(`/tickets/${newTicket.id}`);
    } catch (error) {
      console.error('Erro ao criar chamado:', error);
      setErrors({ submit: 'Falha ao criar chamado. Por favor, tente novamente.' });
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to="/" className={styles.backLink}>
          <FaArrowLeft />
          <span>Voltar ao Painel</span>
        </Link>
        
        <h1>Criar Novo Chamado</h1>
      </div>
      
      <motion.div 
        className={styles.formCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={handleSubmit} className={styles.form}>
          {errors.submit && (
            <div className={styles.errorMessage}>{errors.submit}</div>
          )}
          
          <div className={styles.formGroup}>
            <label htmlFor="title">Título</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Breve resumo do problema"
              className={errors.title ? styles.inputError : ''}
            />
            {errors.title && <p className={styles.errorText}>{errors.title}</p>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              placeholder="Descrição detalhada do problema"
              className={errors.description ? styles.inputError : ''}
            ></textarea>
            {errors.description && <p className={styles.errorText}>{errors.description}</p>}
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="category">Categoria</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={errors.category ? styles.inputError : ''}
              >
                <option value="">Selecione uma categoria</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && <p className={styles.errorText}>{errors.category}</p>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="priority">Prioridade</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                {priorities.map(priority => (
                  <option key={priority.id} value={priority.id}>
                    {priority.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className={styles.formActions}>
            <button 
              type="button" 
              onClick={() => navigate('/')}
              className="button secondary"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            
            <button 
              type="submit" 
              className={`button ${styles.submitButton}`}
              disabled={isSubmitting}
            >
              <FaSave />
              <span>Criar Chamado</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default NewTicket;