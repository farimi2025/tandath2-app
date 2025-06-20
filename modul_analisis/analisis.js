// modul_analisis/analisis.js

// Contoh fungsi analisa data kehadiran dan buat cadangan mudah
function analisaKehadiran(dataKehadiran) {
  // dataKehadiran: array objek { id_murid, nama_murid, kehadiran: [{ tarikh, status, alasan }] }

  const laporan = dataKehadiran.map(murid => {
    const totalHari = murid.kehadiran.length;
    const ponteng = murid.kehadiran.filter(h => h.status === 'Tidak Hadir' && !h.alasan).length;
    const mc = murid.kehadiran.filter(h => h.alasan === 'MC').length;
    const cuti = murid.kehadiran.filter(h => h.alasan === 'Cuti').length;

    let risiko = 'Rendah';
    if (ponteng > 5) risiko = 'Tinggi';
    else if (ponteng > 2) risiko = 'Sederhana';

    const cadangan = [];
    if (risiko === 'Tinggi') {
      cadangan.push('Segera hubungi ibu bapa dan buat intervensi.');
    } else if (risiko === 'Sederhana') {
      cadangan.push('Pantau dan beri perhatian khusus.');
    } else {
      cadangan.push('Teruskan pemantauan biasa.');
    }

    return {
      id_murid: murid.id_murid,
      nama_murid: murid.nama_murid,
      totalHari,
      ponteng,
      mc,
      cuti,
      risiko,
      cadangan,
    };
  });

  return laporan;
}

// Fungsi ringkas untuk tunjukkan laporan di console (boleh tukar ke UI)
function paparLaporan(laporan) {
  laporan.forEach(item => {
    console.log(`Murid: ${item.nama_murid} | Risiko: ${item.risiko} | Cadangan: ${item.cadangan.join(', ')}`);
  });
}

// Export untuk digunakan modul lain
export { analisaKehadiran, paparLaporan };
