// modul_intervensi/intervensi.js

function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

const infoMuridElem = document.getElementById('info-murid');
const formIntervensi = document.getElementById('form-intervensi');

let idKelas = null;
let idMurid = null;

function init() {
  idKelas = getQueryParam('id_kelas');
  idMurid = getQueryParam('id_murid');

  if (!idKelas || !idMurid) {
    alert('ID kelas atau murid tidak diterima.');
    window.location.href = '../modul_induk/index.html';
    return;
  }

  // Contoh nama murid (boleh fetch dari API)
  const namaMurid = 'Nama Murid'; // Sementara, boleh gantikan dari API

  infoMuridElem.textContent = `Kelas: ${idKelas} | Murid: ${namaMurid}`;
}

formIntervensi.addEventListener('submit', e => {
  e.preventDefault();

  const dataIntervensi = {
    id_kelas: idKelas,
    id_murid: idMurid,
    matlamat: formIntervensi.matlamat.value.trim(),
    ukuran: formIntervensi.ukuran.value.trim(),
    capai: formIntervensi.capai.value.trim(),
    relevan: formIntervensi.relevan.value.trim(),
    tempoh: formIntervensi.tempoh.value.trim(),
    tarikh_simpan: new Date().toISOString(),
  };

  // Validasi ringkas
  if (Object.values(dataIntervensi).some(v => v === '')) {
    alert('Sila lengkapkan semua medan.');
    return;
  }

  // Simpan ke localStorage sebagai contoh
  const kunci = `intervensi_${idMurid}_${new Date().toISOString()}`;
  localStorage.setItem(kunci, JSON.stringify(dataIntervensi));

  alert('Intervensi SMART berjaya disimpan.');
  // Boleh redirect ke modul lain jika perlu
});

document.addEventListener('DOMContentLoaded', init);
