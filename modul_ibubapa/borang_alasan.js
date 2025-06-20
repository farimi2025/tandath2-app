// modul_ibubapa/borang_alasan.js

function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

const inputNoKad = document.getElementById('no_kad');
const formBorangAlasan = document.getElementById('form-borang-alasan');

function init() {
  const noKad = getQueryParam('no_kad');
  if (!noKad) {
    alert('Nombor kad murid tidak diterima.');
    window.history.back();
    return;
  }
  inputNoKad.value = decodeURIComponent(noKad);
}

formBorangAlasan.addEventListener('submit', e => {
  e.preventDefault();

  const data = {
    no_kad: inputNoKad.value,
    tarikh: formBorangAlasan.tarikh.value,
    alasan: formBorangAlasan.alasan.value,
    catatan: formBorangAlasan.catatan.value.trim(),
  };

  if (!data.tarikh || !data.alasan) {
    alert('Sila lengkapkan semua medan wajib.');
    return;
  }

  // Simpan data ke localStorage (boleh tukar ke API backend)
  const key = `alasan_ibubapa_${data.no_kad}_${data.tarikh}`;
  localStorage.setItem(key, JSON.stringify(data));

  alert('Maklum ketidakhadiran berjaya dihantar.');
  // Redirect ke portal ibu bapa selepas submit
  window.location.href = 'portal_ibubapa.html';
});

document.addEventListener('DOMContentLoaded', init);
