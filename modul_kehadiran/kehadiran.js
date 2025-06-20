// modul_kehadiran/kehadiran.js

import { loadData, saveData, rekodAudit } from '../modul_induk/main.js';

const STORAGE_KEY = 'data_kehadiran';

const urlParams = new URLSearchParams(window.location.search);
const idKelas = urlParams.get('id_kelas');
const idMuridTerpilih = urlParams.get('id_murid');

const kelasNamaElem = document.getElementById('kelasNama');
const muridTbody = document.getElementById('muridTbody');
const btnSimpan = document.getElementById('btnSimpan');
const statusMsg = document.getElementById('statusMsg');

kelasNamaElem.textContent = `Kelas: ${idKelas || '-'}`;

// Contoh data murid, boleh digantikan dengan API fetch
const muridList = [
  { id: '001', nama: 'Ali Bin Ahmad', kelas: '6 Bestari' },
  { id: '002', nama: 'Siti Aisyah', kelas: '6 Bestari' },
  { id: '003', nama: 'Ahmad Faiz', kelas: '6 Bestari' },
];

// Pilih murid ikut kelas
const muridDalamKelas = muridList.filter(m => m.kelas === idKelas);

// Data kehadiran sedia ada
let dataKehadiran = loadData(STORAGE_KEY);
if (!dataKehadiran[idKelas]) dataKehadiran[idKelas] = {};

// Fungsi papar senarai murid dan status kehadiran
function paparMurid() {
  muridTbody.innerHTML = '';
  muridDalamKelas.forEach((murid, index) => {
    const status = dataKehadiran[idKelas][murid.id] || { status: 'Hadir', alasan: '' };
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${murid.nama}</td>
      <td>${status.status}${status.alasan ? ` (${status.alasan})` : ''}</td>
      <td>
        <button class="hadir" data-id="${murid.id}">Hadir</button>
        <button class="tidak-hadir" data-id="${murid.id}">Tidak Hadir</button>
        <button class="alasan" data-id="${murid.id}">Alasan</button>
      </td>
    `;
    if (idMuridTerpilih === murid.id) {
      tr.style.backgroundColor = '#d0f0d0';
    }
    muridTbody.appendChild(tr);
  });
}

// Event handler tukar status kehadiran
muridTbody.addEventListener('click', e => {
  const target = e.target;
  if (!target.dataset.id) return;
  const muridId = target.dataset.id;

  if (target.classList.contains('hadir')) {
    dataKehadiran[idKelas][muridId] = { status: 'Hadir', alasan: '' };
  } else if (target.classList.contains('tidak-hadir')) {
    dataKehadiran[idKelas][muridId] = { status: 'Tidak Hadir', alasan: '' };
  } else if (target.classList.contains('alasan')) {
    const alasan = prompt('Masukkan alasan ketidakhadiran:');
    if (alasan !== null) {
      dataKehadiran[idKelas][muridId] = { status: 'Tidak Hadir', alasan };
    }
  }
  paparMurid();
});

// Simpan data ke localStorage dan rekod audit
btnSimpan.addEventListener('click', () => {
  saveData(STORAGE_KEY, dataKehadiran);
  rekodAudit('kehadiran', `Simpan kehadiran kelas ${idKelas}`, null, dataKehadiran[idKelas]);
  statusMsg.textContent = 'Rekod kehadiran berjaya disimpan.';
  setTimeout(() => { statusMsg.textContent = ''; }, 3000);
});

document.addEventListener('DOMContentLoaded', paparMurid);
