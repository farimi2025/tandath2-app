
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('service-worker.js')
        .then(function(reg) { console.log("Service Worker registered!"); })
        .catch(function(err) { console.log("Service Worker registration failed: ", err); });
    });
  }

// main.js — Sync kelas.json dari Github (auto), fallback offline, AI "Kelas Kerap Anda"
// Gantikan dengan direct download link Github Pages kelas.json anda (format uc?id=...)
const KELAS_JSON_URL = "https://raw.githubusercontent.com/farimi2025/skkemahang2/refs/heads/main/kelas.json";

let senaraiKelas = [];
let senaraiKelasAktif = [];
const LIMIT_FAV = 4;

// Fetch kelas.json dari Github Pages (auto)
async function fetchKelasJSON() {
  let statusDiv = document.getElementById('status-sync');
  try {
    const response = await fetch(KELAS_JSON_URL, { cache: "no-store" });
    if (!response.ok) throw new Error("Gagal fetch dari Drive");
    const data = await response.json();
    // Simpan ke localStorage cache
    localStorage.setItem('cache_kelas', JSON.stringify(data));
    localStorage.setItem('cache_kelas_time', Date.now());
    if (statusDiv) statusDiv.textContent = "✓ Data kelas berjaya dikemaskini dari Github Pages.";
    return data;
  } catch (err) {
    // fallback ke local cache
    const cache = localStorage.getItem('cache_kelas');
    if (statusDiv) statusDiv.textContent = "✗ Tidak dapat sync data, guna data simpanan (offline).";
    if (cache) return JSON.parse(cache);
    // fallback default jika tiada cache
    return [
      "1 Bestari", "1 Harmoni", "2 Bestari", "2 Harmoni",
      "3 Bestari", "3 Harmoni", "4 Bestari", "4 Harmoni",
      "5 Bestari", "5 Harmoni", "6 Bestari", "6 Harmoni"
    ];
  }
}

// Simpan statistik klik kelas (AI "Kelas Kerap Anda")
function tambahKlikKelas(namaKelas) {
  let rekod = JSON.parse(localStorage.getItem('stat_kelas') || '{}');
  rekod[namaKelas] = (rekod[namaKelas] || 0) + 1;
  localStorage.setItem('stat_kelas', JSON.stringify(rekod));
}

// Dapatkan senarai kelas kegemaran (top 4)
function getKelasFavourites(limit = LIMIT_FAV) {
  let rekod = JSON.parse(localStorage.getItem('stat_kelas') || '{}');
  let fav = Object.entries(rekod)
    .sort((a, b) => b[1] - a[1])
    .map(([nama]) => nama)
    .filter(nama => senaraiKelas.includes(nama));
  return fav.slice(0, limit);
}

// Papar grid kelas dengan "Kelas Kerap Anda" di atas
function paparKelas() {
  const grid = document.getElementById('senarai-kelas');
  grid.innerHTML = '';
  const kelasFav = getKelasFavourites();
  if (kelasFav.length) {
    const labelFav = document.createElement('div');
    labelFav.className = 'label-fav';
    labelFav.textContent = 'Kelas Kerap Anda';
    grid.appendChild(labelFav);

    kelasFav.forEach(namaKelas => {
      const btn = document.createElement('button');
      btn.className = 'butang-kelas fav';
      btn.textContent = namaKelas + " ★";
      btn.onclick = () => pilihKelas(namaKelas);
      grid.appendChild(btn);
    });

    if (senaraiKelasAktif.filter(n => !kelasFav.includes(n)).length > 0) {
      const garis = document.createElement('div');
      garis.className = 'pemisah-kelas';
      grid.appendChild(garis);
    }
  }
  let kelasLain = senaraiKelasAktif.filter(nama => !kelasFav.includes(nama));
  if (kelasLain.length === 0 && kelasFav.length === 0) {
    grid.innerHTML = '<div class="msg-tiada">Tiada kelas dijumpai.</div>';
    return;
  }
  kelasLain.forEach(namaKelas => {
    const btn = document.createElement('button');
    btn.className = 'butang-kelas';
    btn.textContent = namaKelas;
    btn.onclick = () => pilihKelas(namaKelas);
    grid.appendChild(btn);
  });
}

// Pilih kelas, simpan statistik, redirect kehalaman murid
function pilihKelas(namaKelas) {
  tambahKlikKelas(namaKelas);
  localStorage.setItem('kelas_dipilih', namaKelas);
  window.location.href = 'modul_kehadiran/kehadiran.html';
}

// Reset statistik kelas kegemaran
function resetStatKelas() {
  if (confirm("Padamkan sejarah kelas kegemaran pada telefon ini?")) {
    localStorage.removeItem('stat_kelas');
    paparKelas();
  }
}

// Carian kelas
function onCariKelas(e) {
  const q = e.target.value.toLowerCase();
  senaraiKelasAktif = senaraiKelas.filter(k => k.toLowerCase().includes(q));
  paparKelas();
}

// INISIALISASI APP
document.addEventListener('DOMContentLoaded', async () => {
  // AUTO SYNC kelas.json dari Google Drive setiap kali buka app
  senaraiKelas = await fetchKelasJSON();
  senaraiKelasAktif = [...senaraiKelas];
  paparKelas();

  const input = document.getElementById('cari-kelas');
  if (input) input.addEventListener('input', onCariKelas);

  const btnReset = document.getElementById('reset-stat');
  if (btnReset) btnReset.onclick = resetStatKelas;
});
