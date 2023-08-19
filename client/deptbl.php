<?php

include '../includes/config.php';





$sql = "SELECT * FROM trial";
$result = mysqli_query($conn, $sql);

$rows = array();
$data = array();
while ($row = mysqli_fetch_array($result)) {

  $name = $row['name'];
  $status = $row['status'];


  $subarray = array();
  $subarray[] = '<td>' . $name . '</td>';
  if ($status == 'approved') {
    $subarray[] = '<td><span class="badge" style="background: green; color: white;">'.$status.'<span></td>';
  } else {
    $subarray[] = '<td><span class="badge" style="background: red; color: white;">'.$status.'<span></td>';
  }
  $subarray[] = '<td>
                  <button class="btn btn-primary" onclick="Edit1(' . $row['id'] . ')"><i class="nav-icon fas fa-edit"></i></button>
                </td>';







  $data[] = $subarray;
}


$output = array(
  'data' => $data,


);

echo json_encode($output);





?>