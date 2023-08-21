<?php 


include '../includes/config.php';



if(isset($_POST['id'])){

  
  $id = $_POST['id'];
  $name= $_POST['name'];
  $duration = $_POST['duration'];
  $dataHash = $_POST['dataHash'];
  
$sql3 = "UPDATE trial SET duration = '$duration',  hash = '$dataHash' WHERE id = '$id' ";
$results3 = mysqli_query($conn, $sql3);

if($results3){
  $data = array(
      'status'=>'success',
  );
  echo json_encode($data);
} else {
  $data = array(
      'status'=>'failed',
  );
  echo json_encode($data);
  echo mysqli_error($conn); // Debugging statement to print MySQL error
}

}


?>