// modul_kebajikan/kebajikan.js

const formKebajikan = document.getElementById('form-kebajikan');
const jadualBody = document.querySelector('#jadual-kebajikan tbody');

function loadDataKebajikan() {
  return JSON.parse(localStorage.getItem('kebajikanData') || '[]');
}

function simpanDataKebajikan(data) {
  localStorage.setItem('kebajikanData', JSON.stringify(data));
}

function paparJadual(data) {
  jadualBody.innerHTML = '';
  data.forEach((item, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.id_murid}</td>
      <td>${item.nama_murid}</td>
      <td>${item.jenis_kebajikan}</td>
      <td>${item.tarikh}</td>
      <td>${item.catatan}</td>
      <td>
        <button data-index="${index}" class="btn-hapus">Padam</button>
      </td>
    `;
    jadualBody.appendChild(tr);
  });
}

// Tambah rekod baru
formKebajikan.addEventListener('submit', e => {
  e.preventDefault();

  const rekodBaru = {
    id_murid: formKebajikan.id_murid.value.trim(),
    nama_murid: formKebajikan.nama_murid.value.trim(),
    jenis_kebajikan: formKebajikan.jenis_kebajikan.value,
    tarikh: formKebajikan.tarikh.value,
    catatan: formKebajikan.catatan.value.trim(),
  };

  if (!rekodBaru.id_murid || !rekodBaru.nama_murid || !rekodBaru.jenis_kebajikan || !rekodBaru.tarikh) {
    alert('Sila lengkapkan semua medan wajib.');
    return;
  }

  const semuaData = loadDataKebajikan();
  semuaData.push(rekodBaru);
  simpanDataKebajikan(semuaData);

  paparJadual(semuaData);
  formKebajikan.reset();
});

// Padam rekod
jadualBody.addEventListener('click', e => {
  if (e.target.classList.contains('btn-hapus')) {
    const index = parseInt(e.target.getAttribute('data-index'), 10);
    if (confirm('Anda pasti mahu padam rekod ini?')) {
      const semuaData = loadDataKebajikan();
      semuaData.splice(index, 1);
      simpanDataKebajikan(semuaData);
      paparJadual(semuaData);
    }
  }
});

// Papar data bila mula-mula buka
document.addEventListener('DOMContentLoaded', () => {
  const semuaData = loadDataKebajikan();
  paparJadual(semuaData);
});
