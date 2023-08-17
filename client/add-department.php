<?php

include '../includes/config.php';

if (isset($_POST['department1'])) {
    extract($_POST);

    // Check if user already exists
    $check_user_query = "SELECT * FROM dept WHERE dept_name='$department1'";
    $check_user_result = mysqli_query($conn, $check_user_query);

   

    if (mysqli_num_rows($check_user_result) > 0 ) {
        // User and course already exist, so don't insert the new record
        $data = array(
            'status' => 'data_exist',
        );
        echo json_encode($data);
    } else {
        // User or course doesn't exist, so insert the new record
      // Insert user record
            $insert_user_query = "INSERT INTO `dept` (`dept_name`,`status`)
            VALUES ('$department1','')";
            $insert_user_result = mysqli_query($conn, $insert_user_query);


        if ($insert_user_result) {
            $data = array(
                'status' => 'success',
            );
            echo json_encode($data);
        } else {
            $data = array(
                'status' => 'failed',
            );
            echo json_encode($data);
        }
    }
}

?>
