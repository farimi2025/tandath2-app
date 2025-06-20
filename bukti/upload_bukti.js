// modul_bukti/upload_bukti.js

const formUpload = document.getElementById('form-upload-bukti');
const statusElem = document.getElementById('status');

formUpload.addEventListener('submit', async (e) => {
  e.preventDefault();

  const idMurid = formUpload.id_murid.value.trim();
  const namaMurid = formUpload.nama_murid.value.trim();
  const jenisBukti = formUpload.jenis_bukti.value;
  const failBukti = formUpload.fail_bukti.files[0];

  if (!idMurid || !namaMurid || !jenisBukti || !failBukti) {
    alert('Sila lengkapkan semua medan wajib.');
    return;
  }

  const formData = new FormData();
  formData.append('id_murid', idMurid);
  formData.append('nama_murid', namaMurid);
  formData.append('jenis_bukti', jenisBukti);
  formData.append('fail_bukti', failBukti);

  statusElem.textContent = 'Sedang memuat naik... Sila tunggu.';

  try {
    const response = await fetch('/api/fungsi_upload_bukti.php', {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    if (result.status === 'success') {
      statusElem.textContent = 'Bukti berjaya dimuat naik.';
      formUpload.reset();
    } else {
      statusElem.textContent = `Gagal muat naik: ${result.message || 'Ralat tidak diketahui'}`;
    }
  } catch (error) {
    statusElem.textContent = `Ralat rangkaian: ${error.message}`;
  }
});
