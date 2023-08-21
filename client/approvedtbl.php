<?php

include '../includes/config.php';





$sql = "SELECT * FROM trial where status = 'approved' ";
$result = mysqli_query($conn, $sql);

$rows = array();
$data = array();
while ($row = mysqli_fetch_array($result)) {

  $company = $row['name'];
  $duration = $row['duration'];


  $subarray = array();
  $subarray[] = '<td>' . $company . '</td>';

  $subarray[] = '<td>'.$duration.'</td>';

  $subarray[] = '<td>
                  <button class="btn btn-primary" onclick="Edit2(' . $row['id'] . ')"><i class="nav-icon fas fa-edit"></i></button>
                </td>';







  $data[] = $subarray;
}


$output = array(
  'data' => $data,


);

echo json_encode($output);





?>