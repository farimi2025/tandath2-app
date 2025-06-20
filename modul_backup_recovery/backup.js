// modul_backup_recovery/backup.js

/**
 * Fungsi backup data kehadiran, intervensi dan kebajikan ke localStorage
 * Simpan secara berkala dalam folder backup/harian, mingguan, bulanan
 */

function dapatkanTarikhString() {
  const now = new Date();
  return now.toISOString().slice(0, 10); // YYYY-MM-DD
}

function backupData() {
  try {
    const dataKehadiran = localStorage.getItem('data_kehadiran') || '{}';
    const dataIntervensi = localStorage.getItem('data_intervensi') || '{}';
    const dataKebajikan = localStorage.getItem('data_kebajikan') || '{}';

    const backupObj = {
      tarikh: dapatkanTarikhString(),
      kehadiran: JSON.parse(dataKehadiran),
      intervensi: JSON.parse(dataIntervensi),
      kebajikan: JSON.parse(dataKebajikan),
    };

    // Simpan backup dalam localStorage sebagai contoh
    const backupKey = `backup_${backupObj.tarikh}`;
    localStorage.setItem(backupKey, JSON.stringify(backupObj));

    console.log(`Backup berjaya disimpan dengan kunci: ${backupKey}`);

    // Di sini boleh tambah fungsi simpan ke Google Drive atau server jika perlu

  } catch (err) {
    console.error('Gagal buat backup:', err);
  }
}

// Backup harian contohnya
setInterval(backupData, 24 * 60 * 60 * 1000); // 24 jam sekali

// Backup manual juga boleh dipanggil bila perlu
export { backupData };
