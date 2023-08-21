<?php
session_start();
include '../includes/config.php';



?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>UCC Admin</title>
    <link rel="icon" href="dist/img/ucc-logo.png">
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
    <link rel="stylesheet" href="plugins/fontawesome-free/css/all.min.css">
    <link rel="stylesheet" href="dist/css/adminlte.min.css">
    <link rel="stylesheet" href="plugins/overlayScrollbars/css/OverlayScrollbars.min.css">
    <link rel="stylesheet" href="plugins/datatables-bs4/css/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" href="plugins/datatables-responsive/css/responsive.bootstrap4.min.css">
    <link rel="stylesheet" href="plugins/datatables-buttons/css/buttons.bootstrap4.min.css">
    <style>
        #active {
            background: #494E53;
        }

        #add-department {
            width: 9rem;
        }

        #add-professor {
            width: 8rem;
        }
    </style>
</head>

<body class="hold-transition sidebar-mini layout-fixed">

    <div class="wrapper">
        <nav class="main-header navbar navbar-expand navbar-white navbar-light">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
                </li>
            </ul>
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
                        <button type="submit" class="nav-link btn" name="logout">Logout</button>
                    </form>
                </li>
            </ul>
        </nav>

        <aside class="main-sidebar sidebar-dark-primary elevation-4">
            <a href="https://ucc-caloocan.edu.ph/" class="brand-link" target="_blank">
                <img src="dist/img/ucc-logo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
                    style="opacity: .8">
                <span class="brand-text font-weight-light">UCC Admin</span>
            </a>
            <div class="sidebar">
                <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div class="image">
                        <a href="#" class="d-block">EVALUATION</a>
                        <!-- <a href="Approved.php" class="d-block">Approved</a> -->
                    </div>
                </div>

                <nav class="mt-2">
                    <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                        data-accordion="false">
                       
                        <li class="nav-item">
                            <a href="index.php" class="nav-link" id="">
                                <i class="nav-icon fas fa-user"></i>
                                <p>Add Department</p>
                            </a>
                        </li>

                        <li class="nav-item">
                            <a href="Approved.php" class="nav-link" id="active">
                                <i class="nav-icon fas fa-user"></i>
                                <p>APPROVED DEPARTMENT</p>
                            </a>
                        </li>

                    </ul>
                </nav>
            </div>
        </aside>

        <div class="content-wrapper">
            <div class="content-header">
                <div class="container">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Department</h1>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main content table -->
            <div class="container">
                <div class="card p-3">
               
                    <div class="card p-3">
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered" id="approvedDepartment">
                                <thead>
                                    <th>Department Name</th>
                                    <th>Duration</th>
                                    
                                    <th>Action</th>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!-- edit details modal -->
        <div class="modal fade" id="update_department" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Edit Details</h5>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="">Company:</label>
                            <input type="text" class="form-control" id="Update_Name"
                                placeholder="Edit Department Name">

                            <label for="">Duration:</label>
                            <input type="text" class="form-control" id="Update_Duration"
                                placeholder="Add Duration">

                            <label for="">ID:</label>
                            <input type="text" class="form-control" id="hashcode">
                    
                            
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal"
                            onclick="update2()">Update</button>
                        <input type="text" id="hiddendata2">
                    </div>
                </div>
            </div>
        </div>

   

    <footer class="main-footer">
        <strong>
            &copy; 2023-2024 <a href="https://ucc-caloocan.edu.ph/" target="_blank" class="text-muted">University of
                Caloocan City</a>.
        </strong>
        All rights reserved.
    </footer>
    <aside class="control-sidebar control-sidebar-dark"></aside>

    <script src="plugins/jquery/jquery.min.js"></script>
    <script src="plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"></script>
    <script src="dist/js/adminlte.js"></script>
    <script src="plugins/datatables/bootstrap 4/jquery.dataTables.min.js"></script>
    <script src="plugins/datatables/bootstrap 4/dataTables.bootstrap4.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.0/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/web3/1.5.0/web3.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/web3@1.5.3/dist/web3.min.js"></script>
    
   

    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/web3/4.1.0/web3.min.js" integrity="sha512-COI914Q0wT4y7lcjXOxq2fdsz6aOj8BcC2ojR1mwyLYpujAOjhaRdEgVVX2TFxirzLDpQD5CmEHwSu48VDJejg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  -->
    <script src="blockchain.js"></script>

   
    
</body>

</html>