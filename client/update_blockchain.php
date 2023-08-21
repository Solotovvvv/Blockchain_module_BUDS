<?php 


include '../includes/config.php';


if(isset($_POST['update'])){
  $id = $_POST['update'];

  $sql = "SELECT * FROM `trial` WHERE id= $id";
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





// if(isset($_POST['hiddendata2'])){

//     $hiddendata2 = $_POST['hiddendata2'];
//     $name = $_POST['name'];
//     $duration = $_POST['duration'];
//     $hashcode = $_POST['hashcode'];
   

// $sql3 = "UPDATE trial SET name = '$name',  duration = '$duration', hash ='$hashcode'  WHERE id = '$hiddendata2' ";
// $results3 = mysqli_query($conn, $sql3);

//   if($results3){
//     $data = array(
//         'status'=>'success',
//     );
//     echo json_encode($data);
// } else {
//     $data = array(
//         'status'=>'failed',
//     );
//     echo json_encode($data);
//     echo mysqli_error($conn); // Debugging statement to print MySQL error
// }

// }

?>