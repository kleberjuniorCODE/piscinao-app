import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Users, Ticket, ShoppingBag, DollarSign } from 'lucide-react';
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
  { id: '1', client: 'João Silva', date: '2023-10-25', total: 450.00 },
  { id: '2', client: 'Maria Santos', date: '2023-10-24', total: 120.50 },
  { id: '3', client: 'Carlos Pereira', date: '2023-10-24', total: 890.00 },
  { id: '4', client: 'Ana Oliveira', date: '2023-10-23', total: 340.00 },
  { id: '5', client: 'Pedro Souza', date: '2023-10-23', total: 210.00 },
];

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <header className="page-header">
        <h1>Painel Administrativo</h1>
        <p className="subtitle">Resumo das atividades da loja</p>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon users"><Users size={24} /></div>
          <div className="stat-info">
            <h3>Total de Clientes</h3>
            <p className="stat-value">1,248</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon tickets"><Ticket size={24} /></div>
          <div className="stat-info">
            <h3>Cupons Emitidos</h3>
            <p className="stat-value">5,892</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon purchases"><ShoppingBag size={24} /></div>
          <div className="stat-info">
            <h3>Compras do Mês</h3>
            <p className="stat-value">342</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon revenue"><DollarSign size={24} /></div>
          <div className="stat-info">
            <h3>Receita do Mês</h3>
            <p className="stat-value">{formatCurrency(45890)}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="chart-section card">
          <h2>Compras (Últimos 7 dias)</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="compras" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="recent-purchases-section card">
          <h2>Últimas Compras</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Data</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {mockRecentPurchases.map(purchase => (
                <tr key={purchase.id}>
                  <td>{purchase.client}</td>
                  <td>{new Date(purchase.date).toLocaleDateString('pt-BR')}</td>
                  <td className="amount">{formatCurrency(purchase.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn-link">Ver todas as compras</button>
        </div>
      </div>
    </div>
  );
}
