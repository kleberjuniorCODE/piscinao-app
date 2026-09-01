import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  productName?: string;
}

export function WhatsAppButton({ productName }: WhatsAppButtonProps) {
  let message = 'Olá Piscinão! Gostaria de mais informações.';
  if (productName) {
    message = `Olá Piscinão! Tenho interesse no produto ${productName}.`;
  }

  const url = `https://wa.me/5518991024742?text=${encodeURIComponent(message)}`;

  return (
    <a href={url} target="_blank" rel="noreferrer" className="whatsapp-float" aria-label="Falar no WhatsApp">
      <MessageCircle size={32} />
    </a>
  );
};
