<?php
// api/fungsi_analisis.php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
  http_response_code(405);
  echo json_encode(['status' => 405, 'message' => 'Kaedah HTTP tidak dibenarkan']);
  exit;
}

// Terima parameter id_kelas
$id_kelas = $_GET['id_kelas'] ?? null;

if (!$id_kelas) {
  http_response_code(400);
  echo json_encode(['status' => 400, 'message' => 'Parameter id_kelas diperlukan']);
  exit;
}

// Contoh data analisis (boleh diambil dari database atau fail JSON)
$dataTrend = [
  'labels' => ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun'],
  'hadir' => [90, 85, 88, 92, 87, 90],
  'tidakHadir' => [10, 15, 12, 8, 13, 10],
];

$dataRisiko = [
  ['nama' => 'Ali Bin Ahmad', 'status' => 'Tinggi', 'cadangan' => 'Hubungi ibu bapa & kaunseling'],
  ['nama' => 'Siti Aisyah Binti Shahmi', 'status' => 'Sederhana', 'cadangan' => 'Pantau dan beri motivasi'],
];

echo json_encode([
  'status' => 200,
  'message' => 'Data analisis berjaya diperolehi',
  'dataTrend' => $dataTrend,
  'dataRisiko' => $dataRisiko,
]);
