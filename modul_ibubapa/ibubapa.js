// modul_ibubapa/ibubapa.js

const btnSemak = document.getElementById('btnSemak');
const btnAlasan = document.getElementById('btnAlasan');
const inputNoKad = document.getElementById('no_kad_murid');
const hasilSemakan = document.getElementById('hasilSemakan');

// Data contoh — boleh disambung API sebenar
const dataKehadiran = {
  'A101': {
    nama: 'Ali Bin Ahmad',
    kehadiran: [
      { tarikh: '2025-06-15', status: 'Hadir' },
      { tarikh: '2025-06-16', status: 'Tidak Hadir', alasan: 'Cuti Sakit (MC)' },
      { tarikh: '2025-06-17', status: 'Hadir' },
    ],
    intervensi: [
      { tarikh: '2025-06-18', tindakan: 'Hubungi ibu bapa', status: 'Selesai' },
    ],
  },
  'S202': {
    nama: 'Siti Aisyah Binti Shahmi',
    kehadiran: [
      { tarikh: '2025-06-15', status: 'Hadir' },
      { tarikh: '2025-06-16', status: 'Hadir' },
      { tarikh: '2025-06-17', status: 'Tidak Hadir', alasan: 'Tiada Alasan' },
    ],
    intervensi: [],
  },
};

function paparDataKehadiran(data) {
  if (!data) {
    hasilSemakan.innerHTML = `<p>Rekod tidak dijumpai untuk nombor kad ini.</p>`;
    return;
  }

  let html = `<h2>Nama Anak: ${data.nama}</h2>`;

  html += `<h3>Kehadiran</h3><table><thead><tr><th>Tarikh</th><th>Status</th><th>Alasan</th></tr></thead><tbody>`;
  data.kehadiran.forEach(item => {
    html += `<tr>
      <td>${item.tarikh}</td>
      <td>${item.status}</td>
      <td>${item.alasan || '-'}</td>
    </tr>`;
  });
  html += '</tbody></table>';

  html += `<h3>Intervensi</h3>`;
  if (data.intervensi.length === 0) {
    html += `<p>Tiada rekod intervensi untuk anak anda setakat ini.</p>`;
  } else {
    html += `<table><thead><tr><th>Tarikh</th><th>Tindakan</th><th>Status</th></tr></thead><tbody>`;
    data.intervensi.forEach(i => {
      html += `<tr>
        <td>${i.tarikh}</td>
        <td>${i.tindakan}</td>
        <td>${i.status}</td>
      </tr>`;
    });
    html += '</tbody></table>';
  }

  hasilSemakan.innerHTML = html;
}

btnSemak.addEventListener('click', () => {
  const noKad = inputNoKad.value.trim().toUpperCase();
  if (!noKad) {
    alert('Sila masukkan nombor kad murid.');
    return;
  }
  const data = dataKehadiran[noKad];
  paparDataKehadiran(data);
});

btnAlasan.addEventListener('click', () => {
  const noKad = inputNoKad.value.trim().toUpperCase();
  if (!noKad) {
    alert('Sila masukkan nombor kad murid terlebih dahulu.');
    return;
  }
  // Redirect ke borang alasan, boleh bawa nombor kad murid sebagai query param
  window.location.href = `borang_alasan.html?no_kad=${encodeURIComponent(noKad)}`;
});
