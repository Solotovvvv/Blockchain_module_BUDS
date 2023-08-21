<?php 


include '../includes/config.php';

if(isset($_POST['update'])){
  $id = $_POST['update'];

  $sql = "SELECT * FROM `trial` WHERE dept_id= $id";
  $result= mysqli_query($conn,$sql);
  $response= array();

  while($row = mysqli_fetch_assoc($result)){
    $response =$row;
  }
  echo json_encode($response);

}else {
  $response['status']=200;
  $response['message']='Invalid or data not found';
}




?>