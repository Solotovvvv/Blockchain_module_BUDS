<?php 


include '../includes/config.php';


if(isset($_POST['update1'])){
  $id = $_POST['update1'];

  $sql = "SELECT * FROM `dept` WHERE dept_id= $id";
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





if(isset($_POST['hiddendata1'])){

    

    $hiddendata1 = $_POST['hiddendata1'];
    $status= $_POST['status1'];
    $department1 = $_POST['department1'];
   

$sql3 = "UPDATE dept SET dept_name = '$department1',  status = '$status' WHERE dept_id = '$hiddendata1' ";
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