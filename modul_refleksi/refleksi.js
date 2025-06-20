// modul_refleksi/refleksi.js

const formRefleksi = document.getElementById('form-refleksi');
const statusElem = document.getElementById('status');

function loadRefleksi(bulanTahun) {
  const semuaRefleksi = JSON.parse(localStorage.getItem('refleksiData') || '{}');
  return semuaRefleksi[bulanTahun] || null;
}

function simpanRefleksi(bulanTahun, data) {
  const semuaRefleksi = JSON.parse(localStorage.getItem('refleksiData') || '{}');
  semuaRefleksi[bulanTahun] = data;
  localStorage.setItem('refleksiData', JSON.stringify(semuaRefleksi));
}

formRefleksi.addEventListener('submit', e => {
  e.preventDefault();

  const bulan = formRefleksi.bulan.value;
  if (!bulan) {
    alert('Sila pilih bulan dan tahun refleksi.');
    return;
  }

  const data = {
    cabaran: formRefleksi.cabaran.value.trim(),
    kejayaan: formRefleksi.kejayaan.value.trim(),
    perancangan: formRefleksi.perancangan.value.trim(),
    tarikhSimpan: new Date().toISOString(),
  };

  simpanRefleksi(bulan, data);

  statusElem.textContent = `Refleksi untuk bulan ${bulan} berjaya disimpan. Terima kasih!`;
  formRefleksi.reset();
  formRefleksi.bulan.value = bulan; // Kekal bulan yang sama selepas simpan
});

// Papar data refleksi bila pilih bulan
formRefleksi.bulan.addEventListener('change', () => {
  const bulan = formRefleksi.bulan.value;
  if (!bulan) return;

  const data = loadRefleksi(bulan);
  if (data) {
    formRefleksi.cabaran.value = data.cabaran || '';
    formRefleksi.kejayaan.value = data.kejayaan || '';
    formRefleksi.perancangan.value = data.perancangan || '';
    statusElem.textContent = `Memaparkan refleksi untuk bulan ${bulan}.`;
  } else {
    formRefleksi.cabaran.value = '';
    formRefleksi.kejayaan.value = '';
    formRefleksi.perancangan.value = '';
    statusElem.textContent = `Tiada data refleksi untuk bulan ${bulan}. Sila isi dan simpan.`;
  }
});

// Inisialisasi default bulan ke bulan kini
document.addEventListener('DOMContentLoaded', () => {
  const sekarang = new Date();
  const bulanTahun = sekarang.toISOString().slice(0,7);
  formRefleksi.bulan.value = bulanTahun;
  formRefleksi.bulan.dispatchEvent(new Event('change'));
});
