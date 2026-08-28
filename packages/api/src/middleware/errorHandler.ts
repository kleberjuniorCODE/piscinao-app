import { Request, Response, NextFunction } from 'express';
import { observability } from '../lib/observability';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const errorObj = err instanceof Error ? err : new Error(String(err));
  
  const report = observability.captureException(errorObj, {
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
  });

  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    eventId: report.eventId,
  });
};
