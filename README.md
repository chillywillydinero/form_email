# OLX Form Page

Pagină web în stilul OLX pentru colectarea email-ului și numărului de telefon cu integrare Telegram bot.

## Configurarea Telegram bot-ului

Pentru a lucra cu Telegram bot-ul este necesar:

1. Creați un bot prin [@BotFather](https://t.me/botfather)
2. Obțineți token-ul bot-ului
3. Aflați ID-ul chat-ului unde să trimiteți mesajele

### Variabile de mediu

Adăugați următoarele variabile în proiectul dvs. Supabase:

```
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

## Funcții

- ✅ Formular cu validare email și telefon
- ✅ Localizare română
- ✅ Design responsive
- ✅ Integrare cu Telegram bot
- ✅ Stare de succes după trimitere
- ✅ Animații și efecte hover

## Rulare

```bash
npm run dev
```

Pentru a lucra cu integrarea Telegram asigurați-vă că:
1. Ați conectat Supabase la proiect
2. Ați configurat variabilele de mediu pentru Telegram bot
3. Funcția Edge se va implementa automat în Supabase