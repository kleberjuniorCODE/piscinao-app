import { Router, Request, Response, NextFunction } from 'express';
import { getClientsStore, saveClientsStore } from './auth.routes.js';

const router = Router();

// GET all clients
router.get('/', (req: Request, res: Response) => {
  const clients = getClientsStore().map(({ passwordHash, ...safe }) => safe);
  res.json({ success: true, data: clients });
});

// GET client by ID
router.get('/:id', (req: Request, res: Response) => {
  const client = getClientsStore().find(c => c.id === req.params.id);
  if (!client) {
    return res.status(404).json({ success: false, error: 'Cliente não encontrado' });
  }
  const { passwordHash, ...safe } = client;
  res.json({ success: true, data: safe });
});

// UPDATE client data
router.put('/:id', (req: Request, res: Response) => {
  const clients = getClientsStore();
  const index = clients.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Cliente não encontrado' });
  }

  clients[index] = {
    ...clients[index],
    ...req.body,
    // Preserve ID and passwordHash
    id: clients[index].id,
    passwordHash: clients[index].passwordHash,
  };

  saveClientsStore(clients);

  const { passwordHash, ...safe } = clients[index];
  res.json({ success: true, data: safe });
});

export default router;
