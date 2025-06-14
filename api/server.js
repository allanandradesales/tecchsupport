// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.js';

import ticketRoutes from './routes/tickets.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/tickets', ticketRoutes);

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Conectado ao MongoDB');
  app.listen(3000, () => {
    console.log('🚀 Servidor rodando em: http://localhost:3000');
    console.log('📚 Documentação Swagger: http://localhost:3000/api-docs');
  });
}).catch(err => {
  console.error('❌ Erro na conexão com o MongoDB:', err.message);
});
