// modul_integrasi/google_drive_api.js

/**
 * Modul ini contoh asas integrasi Google Drive API menggunakan OAuth2
 * untuk upload dan download fail backup data secara automatik.
 *
 * Nota:
 * - Token akses dan refresh token perlu disimpan dan dikawal selia secara selamat.
 * - Ini contoh ringkas, integrasi sebenar perlu ikut piawaian Google API.
 */

import { google } from 'googleapis';

// Konfigurasi OAuth2
const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = 'YOUR_REDIRECT_URI';
const REFRESH_TOKEN = 'YOUR_REFRESH_TOKEN';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

// Contoh fungsi upload fail ke Google Drive folder tertentu
async function uploadFile(fileName, fileContent, mimeType = 'application/json') {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        mimeType,
        parents: ['GOOGLE_DRIVE_FOLDER_ID'], // Gantikan dengan folder ID Google Drive
      },
      media: {
        mimeType,
        body: fileContent,
      },
    });
    console.log('Fail berjaya dimuat naik ke Google Drive:', response.data.id);
    return response.data.id;
  } catch (error) {
    console.error('Gagal muat naik fail ke Google Drive:', error);
    throw error;
  }
}

// Contoh fungsi muat turun fail dari Google Drive mengikut fileId
async function downloadFile(fileId) {
  try {
    const response = await drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'stream' }
    );
    let data = '';
    response.data.on('data', chunk => {
      data += chunk;
    });
    return new Promise((resolve, reject) => {
      response.data.on('end', () => resolve(data));
      response.data.on('error', err => reject(err));
    });
  } catch (error) {
    console.error('Gagal muat turun fail dari Google Drive:', error);
    throw error;
  }
}

export { uploadFile, downloadFile };
