// modul_integrasi/telegram_bot.js

const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN_HERE';
const TELEGRAM_CHAT_ID = 'YOUR_TELEGRAM_CHAT_ID_HERE';

// Fungsi hantar mesej ke Telegram menggunakan Bot API
async function hantarNotifikasiTelegram(message) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const payload = {
    chat_id: TELEGRAM_CHAT_ID,
    text: message,
    parse_mode: 'Markdown',
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!data.ok) throw new Error(data.description);
    return data;
  } catch (error) {
    console.error('Gagal hantar notifikasi Telegram:', error);
    throw error;
  }
}

export { hantarNotifikasiTelegram };
