<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}
include_once'connection.php';
?>
<!doctype html>
<html lang="en">
  <head>
    <title>Update</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link href="css/style.css" rel="stylesheet">
</head>
  <body>
      
   <!-- Form Start -->
   <div class="container-fluid pt-4 px-4">
                <div class="row g-4">
                    <div class="col-sm-12 col-xl-12">
                        <div class="bg-dark rounded h-100 p-4"> 
                            <h1 class="text-center text-light mb-3">Job Listings Update</h1>
                            <form action="" method="post" enctype="multipart/form-data">
                               <div class="row">
                               <div class="col-lg-3 mb-3">
                                    <label for="exampleInputPassword1" class="form-label text-light">Id</label> 
                                    <input name="id"  type="text" class="form-control" id="exampleInputPassword1"  value="<?php echo $_GET['id']; ?>" placeholder="id" >
                                </div>
                               <div class="col-lg-3 mb-3">
                                    <label for="exampleInputPassword1" class="form-label text-light">Position</label>
                                    <input type="text" name="Position" class="form-control" id="exampleInputPassword1" value="<?php echo $_GET['Position']; ?>">
                                </div>
                                <div class="col-lg-3 mb-3">
                                    <label for="exampleInputPassword1" class="form-label text-light">Qualification</label>
                                    <input type="text" name="Qualification" class="form-control" id="exampleInputPassword1" value="<?php echo $_GET['Qualification']; ?>">
                                </div>
                                <div class="col-lg-3 mb-3">
                                    <label for="exampleInputPassword1" class="form-label text-light">Location</label>
                                    <input type="text" name="Location" class="form-control" id="exampleInputPassword1" value="<?php echo $_GET['Location']; ?>">
                                </div>
                                <div class="col-lg-3 mb-3">
                                    <label for="exampleInputPassword1" class="form-label text-light">Experience</label>
                                    <input type="text" name="Experience" class="form-control" id="exampleInputPassword1" value="<?php echo $_GET['Experience']; ?>">
                                </div>
                                <div class="col-lg-3 mb-3">
                                    <label for="exampleInputPassword1" class="form-label text-light">Description</label>
                                    <input type="text" name="Description" class="form-control" id="exampleInputPassword1"  value="<?php echo $_GET['Description']; ?>">
                                </div>
                                <div class="col-lg-3 mb-3">
                                    <label for="formFileMultiple" class="form-label text-light ">Select file</label>
                                    <input class="form-control bg-dark sf-input" name="Details" type="file" id="formFileMultiple" multiple>
                                </div>
                               </div>
                               
                               <input type="submit" name="submit" class="btn yellow-bg" value="Update"> 
                            </form>
                        </div>
                    </div>
                   
                   
                  
                   
                </div>
            </div>
            <!-- Form End -->
 
  




<?php
error_reporting(0);
include('connection.php');

if ($_POST['submit']) {
	$id = $_POST['id'];
	$Position = $_POST['Position'];
	$Qualification = $_POST['Qualification'];
	$Location = $_POST['Location'];
	$Experience = $_POST['Experience'];
	$Description = $_POST['Description'];

	$oldDetails = ""; // Variable to store the old file name

	// Check if a new file is uploaded
	if ($_FILES['Details']['name']) {
		$fileName = $_FILES['Details']['name'];
		$tmpName = $_FILES['Details']['tmp_name'];
		$uploadDir = 'admin/uploads/';

		// Move the uploaded file to the desired directory
		move_uploaded_file($tmpName, $uploadDir . $fileName);

		$Details = $uploadDir . $fileName;

		// Retrieve the old file name from the database
		$sql = "SELECT Details FROM information WHERE id='$id'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0) {
			$row = $result->fetch_assoc();
			$oldDetails = $row['Details'];
		}
	} else {
		// No new file selected, retain the old file name
		$Details = $_GET['Details'];
	}

	$sql = "UPDATE information SET Position='$Position', Qualification='$Qualification', Location='$Location', Experience='$Experience', Details='$Details' , Description='$Description' WHERE id='$id'";
	$data = mysqli_query($conn, $sql);

	if ($data) {
		// Delete the old file if it exists
		if ($oldDetails && file_exists($oldDetails)) {
			unlink($oldDetails);
		}

		// echo "record updated";
		header('location:index.php');
	} else {
		echo "update failed";
	}
} else {
	echo "<h3 class='mt-5 text-center'> Click the button to save the changes. </h3>";
}
?>
 
  <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
 

</body>
</html>
