import rateLimit from 'express-rate-limit';

// Strict rate limiter for authentication endpoints to prevent brute-force attacks
export const AuthRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // limit each IP to 15 login/register requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Muitas tentativas de login/registro detectadas. Por segurança, tente novamente em 15 minutos.'
  }
});

// General API rate limiter for all public endpoints
export const ApiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Limite de requisições excedido. Tente novamente mais tarde.'
  }
});
