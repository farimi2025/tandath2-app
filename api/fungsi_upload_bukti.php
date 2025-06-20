<?php
header('Content-Type: application/json');

$uploadDir = __DIR__ . '/../uploads/bukti/'; // Folder simpan fail bukti

// Pastikan folder upload wujud
if (!is_dir($uploadDir)) {
  mkdir($uploadDir, 0755, true);
}

$response = ['status' => 'error', 'message' => 'Tiada fail diterima.'];

// Semak POST dan fail upload wujud
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['fail_bukti'])) {
  $id_murid = trim($_POST['id_murid'] ?? '');
  $nama_murid = trim($_POST['nama_murid'] ?? '');
  $jenis_bukti = trim($_POST['jenis_bukti'] ?? '');

  if (empty($id_murid) || empty($nama_murid) || empty($jenis_bukti)) {
    $response['message'] = 'Maklumat murid atau jenis bukti tidak lengkap.';
    echo json_encode($response);
    exit;
  }

  $file = $_FILES['fail_bukti'];
  $allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  $maxSize = 5 * 1024 * 1024; // 5MB

  // Semak jenis fail
  if (!in_array($file['type'], $allowedTypes)) {
    $response['message'] = 'Jenis fail tidak dibenarkan. Hanya JPG, PNG dan PDF dibenarkan.';
    echo json_encode($response);
    exit;
  }

  // Semak saiz fail
  if ($file['size'] > $maxSize) {
    $response['message'] = 'Saiz fail melebihi 5MB.';
    echo json_encode($response);
    exit;
  }

  // Nama fail unik berdasarkan masa dan id murid
  $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
  $safeNamaMurid = preg_replace('/[^a-zA-Z0-9_\-]/', '_', strtolower($nama_murid));
  $fileName = $id_murid . '_' . $safeNamaMurid . '_' . time() . '.' . $ext;
  $targetFile = $uploadDir . $fileName;

  if (move_uploaded_file($file['tmp_name'], $targetFile)) {
    // Simpan rekod ringkas ke fail JSON bukti (boleh digantikan DB)
    $buk
