export default {
  openapi: '3.0.0',
  info: {
    title: 'API de Tickets',
    version: '1.0.0',
    description: 'Documentação da API de Chamados'
  },
  paths: {
    '/tickets': {
      get: {
        summary: 'Listar todos os tickets',
        responses: {
          200: { description: 'OK' }
        }
      },
      post: {
        summary: 'Criar um ticket',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' },
                  category: { type: 'string' },
                  priority: { type: 'string' },
                  createdBy: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          201: { description: 'Criado' }
        }
      }
    },
    '/tickets/{id}': {
      get: {
        summary: 'Buscar ticket por ID',
        parameters: [{ name: 'id', in: 'path', required: true }],
        responses: { 200: { description: 'OK' }, 404: { description: 'Não encontrado' } }
      },
      put: {
        summary: 'Atualizar ticket',
        parameters: [{ name: 'id', in: 'path', required: true }],
        responses: { 200: { description: 'Atualizado' }, 404: { description: 'Não encontrado' } }
      },
      delete: {
        summary: 'Excluir ticket',
        parameters: [{ name: 'id', in: 'path', required: true }],
        responses: { 200: { description: 'Removido' }, 404: { description: 'Não encontrado' } }
      }
    }
  }
};
