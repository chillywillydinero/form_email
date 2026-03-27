# Strona Formularza OLX

Strona internetowa w stylu OLX do zbierania adresu e-mail i numeru telefonu z integracją bota Telegram.

## Konfiguracja bota Telegram

Aby pracować z botem Telegram, konieczne jest:

1. Utwórz bota przez [@BotFather](https://t.me/botfather)
2. Uzyskaj token bota
3. Dowiedz się ID czatu, gdzie wysyłać wiadomości

### Zmienne środowiskowe

Dodaj następujące zmienne do swojego projektu Supabase:

```
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

## Funkcje

- ✅ Formularz z walidacją e-mail i telefonu
- ✅ Lokalizacja polska
- ✅ Responsywny design
- ✅ Integracja z botem Telegram
- ✅ Stan sukcesu po wysłaniu
- ✅ Animacje i efekty hover

## Uruchomienie

```bash
npm run dev
```

Aby pracować z integracją Telegram, upewnij się, że:
1. Połączyłeś Supabase z projektem
2. Skonfigurowałeś zmienne środowiskowe dla bota Telegram
3. Funkcja Edge zostanie automatycznie wdrożona w Supabase