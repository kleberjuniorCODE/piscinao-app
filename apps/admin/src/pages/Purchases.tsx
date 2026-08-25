import { useState } from 'react';
import { mockClients, mockProducts } from '../services/api';
import { User, Product } from '../types';
import './Purchases.css';

export default function Purchases() {
  const [clientId, setClientId] = useState('');
  const [items, setItems] = useState([{ productId: '', quantity: 1, unitPrice: 0 }]);
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleAddItem = () => {
    setItems([...items, { productId: '', quantity: 1, unitPrice: 0 }]);
  };

  const calculateSubtotal = () => {
    return items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
  };

  const total = calculateSubtotal();
  const couponsGenerated = Math.floor(total / 100);

  return (
    <div className="purchases-page">
      <div className="header-actions">
        <h1>Registrar Nova Compra</h1>
      </div>
      
      <div className="purchase-form-card card">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label>Cliente</label>
            <select value={clientId} onChange={(e) => setClientId(e.target.value)}>
              <option value="">Selecione um cliente...</option>
              {mockClients.map((c: User) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Data</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>

          <div className="items-section">
            <h3>Itens da Compra</h3>
            {items.map((item, index) => (
              <div key={index} className="item-row">
                <select 
                  value={item.productId}
                  onChange={(e) => {
                    const prod = mockProducts.find((p: Product) => p.id === e.target.value);
                    const newItems = [...items];
                    newItems[index].productId = e.target.value;
                    if (prod) newItems[index].unitPrice = prod.price;
                    setItems(newItems);
                  }}
                >
                  <option value="">Selecione um produto...</option>
                  {mockProducts.map((p: Product) => (
                    <option key={p.id} value={p.id}>{p.name} - R$ {p.price.toFixed(2)}</option>
                  ))}
                </select>
                <input 
                  type="number" 
                  min="1" 
                  value={item.quantity}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index].quantity = Number(e.target.value);
                    setItems(newItems);
                  }}
                />
                <span className="item-subtotal">
                  R$ {(item.quantity * item.unitPrice).toFixed(2)}
                </span>
              </div>
            ))}
            <button type="button" className="btn-secondary mt-sm" onClick={handleAddItem}>
              + Adicionar Item
            </button>
          </div>

          <div className="form-group mt-md">
            <label>Observações</label>
            <input 
              type="text" 
              placeholder="Ex: Compra em balcão, pagamento via PIX" 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)} 
            />
          </div>

          <div className="summary-section">
            <div className="summary-row">
              <span>Valor Total:</span>
              <strong>R$ {total.toFixed(2)}</strong>
            </div>
            <div className="summary-row highlight">
              <span>Cupons a Gerar:</span>
              <strong className="badge-gold">+{couponsGenerated} cupons</strong>
            </div>
          </div>

          <div className="form-actions mt-lg">
            <button type="submit" className="btn-primary" disabled={!clientId || total === 0}>
              Registrar Compra e Gerar Cupons
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
