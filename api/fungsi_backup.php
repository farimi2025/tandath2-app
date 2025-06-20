<?php
// api/fungsi_backup.php
// Backend API untuk simpan dan pulih fail backup JSON

header('Content-Type: application/json; charset=utf-8');

// Tentukan folder root projek
define('FOLDER_DATA', __DIR__ . '/../data');
define('FOLDER_BACKUP', FOLDER_DATA . '/backup');

function json_response($status, $message, $data = null) {
  http_response_code($status);
  echo json_encode([
    'status' => $status,
    'message' => $message,
    'data' => $data
  ]);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $action = $_POST['action'] ?? '';
  $folder = $_POST['folder'] ?? '';
  $namaFail = $_POST['namaFail'] ?? '';
  $dataJson = $_POST['data'] ?? '';

  if (!$action || !$folder || !$namaFail) {
    json_response(400, 'Parameter tidak lengkap');
  }

  // Sanitasi nama folder dan fail
  $folder = basename($folder);
  $namaFail = basename($namaFail);

  $folderPath = FOLDER_BACKUP . "/$folder";
  if (!in_array($folder, ['harian', 'mingguan', 'bulanan'])) {
    json_response(400, 'Folder backup tidak sah');
  }

  if (!file_exists($folderPath)) {
    mkdir($folderPath, 0777, true);
  }

  $failPath = "$folderPath/$namaFail";

  if ($action === 'simpan') {
    if (!$dataJson) {
      json_response(400, 'Tiada data untuk disimpan');
    }
    // Simpan data ke fail
    $saved = file_put_contents($failPath, $dataJson);
    if ($saved === false) {
      json_response(500, 'Gagal simpan fail backup');
    }
    json_response(200, 'Backup berjaya disimpan', ['file' => $failPath]);
  }

  if ($action === 'pulih') {
    if (!file_exists($failPath)) {
      json_response(404, 'Fail backup tidak ditemui');
    }
    $content = file_get_contents($failPath);
    if ($content === false) {
      json_response(500, 'Gagal baca fail backup');
    }
    json_response(200, 'Backup berjaya dipulihkan', json_decode($content, true));
  }

  json_response(400, 'Tindakan tidak dikenali');
}

json_response(405, 'Kaedah HTTP tidak dibenarkan');
