// modul_dashboard/dashboard.js

// Fungsi simulasi fetch data, boleh tukar ke API sebenar
async function fetchDataKehadiran() {
  // Contoh data ringkas
  return [
    { nama: 'Ali Bin Ahmad', status: 'Hadir' },
    { nama: 'Siti Aisyah', status: 'Tidak Hadir' },
  ];
}

async function fetchDataIntervensi() {
  return [
    { nama: 'Ali Bin Ahmad', status: 'Dalam Tindakan', tindakan: 'Kaunseling minggu ini' },
    { nama: 'Siti Aisyah', status: 'Perlu Pantauan', tindakan: 'Hubungi ibu bapa' },
  ];
}

async function fetchDataKebajikan() {
  return [
    { nama: 'Ali Bin Ahmad', jenis: 'Surat Rawatan', tarikh: '2025-06-15' },
    { nama: 'Siti Aisyah', jenis: 'Kebenaran Ibu Bapa', tarikh: '2025-06-18' },
  ];
}

function paparSenarai(elemId, data, formatter) {
  const ul = document.getElementById(elemId);
  ul.innerHTML = '';
  data.forEach(item => {
    const li = document.createElement('li');
    li.textContent = formatter(item);
    ul.appendChild(li);
  });
}

async function init() {
  const kehadiran = await fetchDataKehadiran();
  const intervensi = await fetchDataIntervensi();
  const kebajikan = await fetchDataKebajikan();

  paparSenarai('list-kehadiran', kehadiran, item => `${item.nama} - ${item.status}`);
  paparSenarai('list-intervensi', intervensi, item => `${item.nama} - ${item.status} (${item.tindakan})`);
  paparSenarai('list-kebajikan', kebajikan, item => `${item.nama} - ${item.jenis} (${item.tarikh})`);
}

document.addEventListener('DOMContentLoaded', init);
