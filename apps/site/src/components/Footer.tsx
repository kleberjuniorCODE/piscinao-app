import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube } from 'lucide-react';
import { categories } from '../data/products';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-col">
          <Link to="/" className="brand-logo">Piscinão</Link>
          <p className="footer-slogan">Confiança que se constrói</p>
          <p className="footer-about">
            Há mais de 20 anos realizando o sonho da piscina perfeita em Araçatuba e região, com produtos e serviços de excelência.
          </p>
        </div>
        
        <div className="footer-col">
          <h3>Navegação</h3>
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/produtos">Produtos</Link></li>
            <li><Link to="/servicos">Serviços</Link></li>
            <li><Link to="/sobre">Sobre</Link></li>
            <li><Link to="/contato">Contato</Link></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h3>Categorias</h3>
          <ul>
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link to={`/produtos?categoria=${cat.id}`}>{cat.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="footer-col">
          <h3>Contato</h3>
          <address>
            <p>Araçatuba - SP</p>
            <p>Telefone: (18) 99102-4742</p>
            <p>Email: contato@piscinao.com</p>
            <p>Horário: Seg-Sex 8h-18h / Sáb 8h-12h</p>
          </address>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2026 Piscinão Araçatuba. Todos os direitos reservados.</p>
        <div className="social-icons">
          <a href="#" aria-label="Instagram"><Instagram /></a>
          <a href="#" aria-label="Facebook"><Facebook /></a>
          <a href="#" aria-label="Youtube"><Youtube /></a>
        </div>
      </div>
    </footer>
  );
};
