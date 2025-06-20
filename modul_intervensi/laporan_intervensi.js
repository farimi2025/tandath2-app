// modul_intervensi/laporan_intervensi.js

function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

const infoMuridElem = document.getElementById('info-murid');
const jadualBody = document.querySelector('#jadualIntervensi tbody');
const ctx = document.getElementById('grafikProgres').getContext('2d');

let chartProgres = null;

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

  // Contoh nama murid - boleh gantikan dengan API fetch
  const namaMurid = 'Ali Bin Ahmad';

  infoMuridElem.textContent = `Kelas: ${idKelas} | Murid: ${namaMurid}`;

  // Contoh data intervensi
  const dataIntervensi = [
    {
      tarikh: '2025-06-01',
      matlamat: 'Tingkatkan kehadiran mingguan',
      ukuran: 'Tidak ponteng lebih dari 1 hari seminggu',
      capai: 'Boleh capai dengan pemantauan guru',
      relevan: 'Mengurangkan risiko ponteng',
      tempoh: '1 bulan',
      progres: 75, // Peratus kemajuan
    },
    {
      tarikh: '2025-07-01',
      matlamat: 'Tingkatkan tumpuan dalam kelas',
      ukuran: 'Selesaikan tugasan kelas tepat masa',
      capai: 'Dengan bimbingan kaunseling',
      relevan: 'Meningkatkan prestasi akademik',
      tempoh: '2 bulan',
      progres: 50,
    },
  ];

  paparJadualIntervensi(dataIntervensi);
  paparGrafikProgres(dataIntervensi);
}

function paparJadualIntervensi(data) {
  jadualBody.innerHTML = '';
  data.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.tarikh}</td>
      <td>${item.matlamat}</td>
      <td>${item.ukuran}</td>
      <td>${item.capai}</td>
      <td>${item.relevan}</td>
      <td>${item.tempoh}</td>
    `;
    jadualBody.appendChild(tr);
  });
}

function paparGrafikProgres(data) {
  const labels = data.map(i => i.tarikh);
  const progresData = data.map(i => i.progres);

  if (chartProgres) chartProgres.destroy();

  chartProgres = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Kemajuan (%)',
        data: progresData,
        backgroundColor: '#007bff',
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 10
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        tooltip: {
          enabled: true,
        }
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
