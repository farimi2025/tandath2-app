// modul_laporan/laporan.js

// Fungsi simulasi fetch data (ganti dengan API sebenar)
async function fetchDataKehadiran() {
  return [
    { nama: 'Ali Bin Ahmad', status: 'Hadir', alasan: '-' },
    { nama: 'Siti Aisyah', status: 'Tidak Hadir', alasan: 'MC' },
  ];
}

async function fetchDataIntervensi() {
  return [
    { nama: 'Ali Bin Ahmad', status: 'Dalam Tindakan', tindakan: 'Kaunseling' },
    { nama: 'Siti Aisyah', status: 'Perlu Pantauan', tindakan: 'Hubungi ibu bapa' },
  ];
}

async function fetchDataKebajikan() {
  return [
    { nama: 'Ali Bin Ahmad', jenis: 'Surat Rawatan', tarikh: '2025-06-15' },
    { nama: 'Siti Aisyah', jenis: 'Kebenaran Ibu Bapa', tarikh: '2025-06-18' },
  ];
}

function paparTable(idTable, data, columns) {
  const tbody = document.querySelector(`#${idTable} tbody`);
  tbody.innerHTML = '';
  data.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = columns.map(col => `<td>${item[col] || '-'}</td>`).join('');
    tbody.appendChild(tr);
  });
}

async function init() {
  const kehadiran = await fetchDataKehadiran();
  const intervensi = await fetchDataIntervensi();
  const kebajikan = await fetchDataKebajikan();

  paparTable('table-kehadiran', kehadiran, ['nama', 'status', 'alasan']);
  paparTable('table-intervensi', intervensi, ['nama', 'status', 'tindakan']);
  paparTable('table-kebajikan', kebajikan, ['nama', 'jenis', 'tarikh']);
}

document.getElementById('btnCetak').addEventListener('click', () => {
  window.print();
});

document.addEventListener('DOMContentLoaded', init);
