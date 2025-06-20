// modul_kehadiran/alasan_form.js

// Ambil parameter murid dari URL query string (id_murid, nama_murid)
function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

const inputNamaMurid = document.getElementById('nama-murid');
const formAlasan = document.getElementById('form-alasan');

function init() {
  const namaMurid = getQueryParam('nama_murid');
  if (namaMurid) {
    inputNamaMurid.value = decodeURIComponent(namaMurid);
  } else {
    alert('Nama murid tidak diterima.');
    window.history.back();
  }
}

formAlasan.addEventListener('submit', e => {
  e.preventDefault();

  const dataAlasan = {
    nama_murid: inputNamaMurid.value,
    tarikh: formAlasan.tarikh.value,
    alasan: formAlasan.alasan.value,
    catatan: formAlasan.catatan.value.trim(),
  };

  if (!dataAlasan.tarikh || !dataAlasan.alasan) {
    alert('Sila lengkapkan semua medan wajib.');
    return;
  }

  // Simpan data alasan ke localStorage atau hantar ke API
  const kunci = `alasan_${dataAlasan.nama_murid}_${dataAlasan.tarikh}`;
  localStorage.setItem(kunci, JSON.stringify(dataAlasan));

  alert('Alasan ketidakhadiran berjaya dihantar.');
  window.location.href = '../modul_kehadiran/kehadiran.html';
});

document.addEventListener('DOMContentLoaded', init);
