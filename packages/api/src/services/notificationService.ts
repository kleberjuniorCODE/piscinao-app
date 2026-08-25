import 'dotenv/config';
import nodemailer from 'nodemailer';

// Email Transporter Config via Environment Variables or custom SMTP
export function getEmailTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER || '';
  const pass = process.env.SMTP_PASS || '';

  if (!user || !pass) {
    return null; // SMTP credentials not configured yet
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

// REAL EMAIL DISPATCH FUNCTION
export async function sendEmail2FaCode(toEmail: string, code: string): Promise<{ success: boolean; message: string }> {
  const transporter = getEmailTransporter();

  if (!transporter) {
    console.log(`[SIMULAÇÃO EMAIL 2FA] Para: ${toEmail} | Código: ${code}`);
    return {
      success: true,
      message: `[Simulado] Configure SMTP_USER e SMTP_PASS no arquivo .env para envio de email real. Código: ${code}`
    };
  }

  try {
    await transporter.sendMail({
      from: `"Piscinão Araçatuba" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: `🔑 Seu Código de Verificação 2FA: ${code}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #F9F6F0; border-radius: 12px;">
          <h2 style="color: #2C1810; margin-bottom: 10px;">Piscinão Araçatuba — Verificação de Conta</h2>
          <p style="font-size: 15px; color: #444;">Olá! Seu código de segurança para confirmação em 2 etapas é:</p>
          <div style="background: #2C1810; color: #D4A853; font-size: 28px; font-weight: bold; letter-spacing: 5px; padding: 14px 24px; display: inline-block; border-radius: 10px; margin: 16px 0;">
            ${code}
          </div>
          <p style="font-size: 13px; color: #777;">Este código expira em 10 minutos. Se você não solicitou este código, desconsidere este email.</p>
        </div>
      `,
    });

    console.log(`[EMAIL REAL ENVIADO] Código 2FA enviado com sucesso para ${toEmail}`);
    return { success: true, message: `Código de verificação enviado com sucesso para ${toEmail}!` };
  } catch (error: any) {
    console.error(`[ERRO ENVIO EMAIL REAL]`, error);
    return { success: false, message: `Falha no disparo do email: ${error?.message || error}` };
  }
}

// REAL SMS DISPATCH FUNCTION (Twilio / Z-API / WhatsApp API)
export async function sendSms2FaCode(toPhone: string, code: string): Promise<{ success: boolean; message: string }> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromPhone = process.env.TWILIO_PHONE_NUMBER;

  if (accountSid && authToken && fromPhone) {
    try {
      const cleanPhone = toPhone.replace(/\D/g, '');
      const formattedPhone = cleanPhone.startsWith('55') ? `+${cleanPhone}` : `+55${cleanPhone}`;
      
      const body = new URLSearchParams({
        To: formattedPhone,
        From: fromPhone,
        Body: `Piscinao Aracatuba: Seu codigo de verificacao 2FA e ${code}`,
      });

      const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      });

      if (response.ok) {
        console.log(`[SMS REAL ENVIADO] SMS disparado via Twilio para ${toPhone}`);
        return { success: true, message: `SMS de verificação enviado para ${toPhone}!` };
      }
    } catch (e: any) {
      console.error(`[ERRO ENVIO SMS REAL]`, e);
    }
  }

  console.log(`[SIMULAÇÃO SMS 2FA] Para: ${toPhone} | Código: ${code}`);
  return {
    success: true,
    message: `[Simulado] Configure TWILIO_ACCOUNT_SID no arquivo .env para envio de SMS real. Código: ${code}`
  };
}
