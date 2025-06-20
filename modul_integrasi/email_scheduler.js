// modul_integrasi/email_scheduler.js

/**
 * Fungsi hantar emel menggunakan EmailJS
 * @param {Object} templateParams - Parameter template emel seperti { to_name, from_name, message }
 */
async function hantarEmel(templateParams) {
  try {
    const result = await emailjs.send('service_79kkpyb', 'template_3uulku6', templateParams);
    console.log('Emel berjaya dihantar:', result.status, result.text);
  } catch (error) {
    console.error('Gagal hantar emel:', error);
    throw error;
  }
}

export { hantarEmel };
