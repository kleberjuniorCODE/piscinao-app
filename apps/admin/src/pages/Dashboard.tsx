import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Users, Ticket, ShoppingBag, DollarSign, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { formatCurrency } from '../utils/format';

const mockChartData = [
  { name: 'Seg', compras: 12 },
  { name: 'Ter', compras: 19 },
  { name: 'Qua', compras: 15 },
  { name: 'Qui', compras: 22 },
  { name: 'Sex', compras: 30 },
  { name: 'Sáb', compras: 45 },
  { name: 'Dom', compras: 25 },
];

const mockRecentPurchases = [
  { id: '1', client: 'João Silva', date: '2023-10-25', total: 450.00, status: 'Concluído' },
  { id: '2', client: 'Maria Santos', date: '2023-10-24', total: 120.50, status: 'Concluído' },
  { id: '3', client: 'Carlos Pereira', date: '2023-10-24', total: 890.00, status: 'Concluído' },
  { id: '4', client: 'Ana Oliveira', date: '2023-10-23', total: 340.00, status: 'Concluído' },
  { id: '5', client: 'Pedro Souza', date: '2023-10-23', total: 210.00, status: 'Concluído' },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page animate-fade-up">
      <header className="page-header-luxury">
        <div>
          <span className="eyebrow-text">VISÃO GERAL DO NEGÓCIO</span>
          <h1 className="page-title-luxury">Painel Administrativo</h1>
          <p className="subtitle-luxury">Acompanhamento de vendas, fidelidade e clientes em tempo real</p>
        </div>

        <div className="header-quick-action">
          <button className="btn-quick-primary" onClick={() => navigate('/clients')}>
            <Users size={16} /> Ver Clientes
          </button>
        </div>
      </header>

      {/* Stats Cards Grid with Circular Badges */}
      <div className="stats-grid-luxury">
        <div className="stat-card-luxury card-hover-motion">
          <div className="stat-icon-circle chocolate"><Users size={22} /></div>
          <div className="stat-info-luxury">
            <span className="stat-label">Total de Clientes</span>
            <p className="stat-value-bold">1,248</p>
            <span className="stat-trend positive"><TrendingUp size={12} /> +12% este mês</span>
          </div>
        </div>
        
        <div className="stat-card-luxury card-hover-motion">
          <div className="stat-icon-circle sky"><Ticket size={22} /></div>
          <div className="stat-info-luxury">
            <span className="stat-label">Cupons Emitidos</span>
            <p className="stat-value-bold">5,892</p>
            <span className="stat-trend positive"><Sparkles size={12} /> 94% taxa de engajamento</span>
          </div>
        </div>
        
        <div className="stat-card-luxury card-hover-motion">
          <div className="stat-icon-circle terracotta"><ShoppingBag size={22} /></div>
          <div className="stat-info-luxury">
            <span className="stat-label">Compras do Mês</span>
            <p className="stat-value-bold">342</p>
            <span className="stat-trend neutral">Média de 11/dia</span>
          </div>
        </div>
        
        <div className="stat-card-luxury card-hover-motion">
          <div className="stat-icon-circle chocolate"><DollarSign size={22} /></div>
          <div className="stat-info-luxury">
            <span className="stat-label">Receita do Mês</span>
            <p className="stat-value-bold">{formatCurrency(45890)}</p>
            <span className="stat-trend positive"><TrendingUp size={12} /> +18% vs mês anterior</span>
          </div>
        </div>
      </div>

      {/* Main Charts & Recent Purchases Row */}
      <div className="dashboard-content-luxury">
        <div className="card-luxury chart-box">
          <div className="card-header-row">
            <div>
              <h3>Volume de Vendas (Últimos 7 dias)</h3>
              <span className="card-subtitle-text">Distribuição semanal de pedidos</span>
            </div>
            <span className="badge-sky-sm">Atualizado</span>
          </div>

          <div className="chart-container-luxury">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAE1D5" />
                <XAxis dataKey="name" stroke="#7A4A2F" fontSize={12} tickLine={false} />
                <YAxis stroke="#7A4A2F" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    background: '#FFFFFF', 
                    border: '1px solid #EAE1D5', 
                    borderRadius: '12px',
                    boxShadow: '0 8px 24px rgba(91, 52, 34, 0.12)' 
                  }} 
                />
                <Bar dataKey="compras" fill="#5B3422" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-luxury purchases-box">
          <div className="card-header-row">
            <div>
              <h3>Últimas Compras</h3>
              <span className="card-subtitle-text">Sincronizadas com a loja</span>
            </div>
            <button className="btn-link-action" onClick={() => navigate('/purchases')}>
              Ver todas <ArrowRight size={14} />
            </button>
          </div>

          <div className="table-responsive-wrap">
            <table className="luxury-table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Data</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {mockRecentPurchases.map(purchase => (
                  <tr key={purchase.id} className="clickable-row">
                    <td><strong>{purchase.client}</strong></td>
                    <td>{new Date(purchase.date).toLocaleDateString('pt-BR')}</td>
                    <td className="amount-col">{formatCurrency(purchase.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
