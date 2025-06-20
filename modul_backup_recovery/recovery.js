// modul_backup_recovery/recovery.js

/**
 * Fungsi pemulihan data dari backup yang disimpan dalam localStorage
 * @param {string} tarikh - format YYYY-MM-DD
 */

function recoveryData(tarikh) {
  const backupKey = `backup_${tarikh}`;
  const backupStr = localStorage.getItem(backupKey);

  if (!backupStr) {
    console.warn(`Tiada backup ditemui untuk tarikh ${tarikh}`);
    return false;
  }

  try {
    const backupObj = JSON.parse(backupStr);
    localStorage.setItem('data_kehadiran', JSON.stringify(backupObj.kehadiran));
    localStorage.setItem('data_intervensi', JSON.stringify(backupObj.intervensi));
    localStorage.setItem('data_kebajikan', JSON.stringify(backupObj.kebajikan));
    console.log(`Data berjaya dipulihkan dari backup tarikh ${tarikh}`);
    return true;
  } catch (err) {
    console.error('Gagal pulih data:', err);
    return false;
  }
}

export { recoveryData };
