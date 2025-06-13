// Dados de configuração para categorias, status e prioridades

export const categories = [
  { id: "email", name: "E-mail", icon: "mail" },
  { id: "hardware", name: "Hardware", icon: "computer" },
  { id: "software", name: "Software", icon: "app" },
  { id: "network", name: "Rede", icon: "wifi" },
  { id: "website", name: "Website", icon: "globe" },
  { id: "access", name: "Solicitação de Acesso", icon: "lock" },
  { id: "other", name: "Outros", icon: "help" }
];

export const statuses = [
  { id: "new", name: "Novo", color: "var(--color-primary)" },
  { id: "in-progress", name: "Em Andamento", color: "var(--color-accent)" },
  { id: "pending", name: "Pendente", color: "var(--color-warning)" },
  { id: "resolved", name: "Resolvido", color: "var(--color-success)" },
  { id: "closed", name: "Fechado", color: "var(--color-neutral-600)" }
];

export const priorities = [
  { id: "low", name: "Baixa", color: "var(--color-neutral-400)" },
  { id: "medium", name: "Média", color: "var(--color-warning)" },
  { id: "high", name: "Alta", color: "var(--color-error)" }
];

export const users = [
  { id: 1, name: "Alice Santos", role: "Especialista de Suporte", avatar: "AS" },
  { id: 2, name: "David Costa", role: "Técnico de TI", avatar: "DC" },
  { id: 3, name: "Thiago Lima", role: "Administrador de Sistema", avatar: "TL" },
  { id: 4, name: "Roberto Wilson", role: "Engenheiro de Redes", avatar: "RW" },
  { id: 5, name: "James Wilson", role: "Desenvolvedor Web", avatar: "JW" }
];