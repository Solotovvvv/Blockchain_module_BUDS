<?php

include '../includes/config.php';





$sql = "SELECT * FROM dept";
$result = mysqli_query($conn, $sql);

$rows = array();
$data = array();
while ($row = mysqli_fetch_array($result)) {

  $dept_name = $row['dept_name'];
  $status = $row['status'];


  $subarray = array();
  $subarray[] = '<td>' . $dept_name . '</td>';
  if ($status == 'Enable') {
    $subarray[] = '<td><span class="badge" style="background: green; color: white;">'.$status.'<span></td>';
  } else {
    $subarray[] = '<td><span class="badge" style="background: red; color: white;">'.$status.'<span></td>';
  }
  $subarray[] = '<td>
                  <button class="btn btn-primary" onclick="Edit1(' . $row['dept_id'] . ')"><i class="nav-icon fas fa-edit"></i></button>
                </td>';







  $data[] = $subarray;
}


$output = array(
  'data' => $data,


);

echo json_encode($output);





?>