<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}
?>
<?php include_once'header.php'; include_once'connection.php';?>
          
        










            <!-- Job Listings Start -->
            <div class="container-fluid pt-4 px-4">
                <div class="bg-secondary text-center rounded p-4">
                    <div class="d-flex align-items-center justify-content-between mb-4">
                    <h2 class="mb-0">Job Listings</h2> 
                    </div>
                    <div class="table-responsive">
                        <table class="table text-start align-middle table-bordered table-hover mb-0">
              
                        <?php
 

    $conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve data from the table
$sql = "SELECT * FROM information";
$result = $conn->query($sql);
$i=1;
if ($result->num_rows > 0) {
    echo "
                        <thead>
                                <tr class='text-white text-center'> 
                                    <th scope='col'>id</th>
                                    <th scope='col'>Position</th>
                                    <th scope='col'>Qualification</th>
                                    <th scope='col'>Location</th>
                                    <th scope='col'>Experience</th>
                                    <th scope='col'>Details</th>
                                    <th scope='col'>Action</th>
                                </tr>
                            </thead> ";
                           
                            while ($row = $result->fetch_assoc()) {
                                echo "             <tbody class='text-center'>
                                <tr> 
                                <td>" . $i . "</td>
                                <td>" . $row["Position"] . "</td>
                                <td>" . $row["Qualification"] . "</td>
                                <td>" . $row["Location"] . "</td>
                                <td>" . $row["Experience"] . "</td>
                                <td><a class='yellow' target='blank' href='" . $row["Details"] . "'>View</a></td>
                                <td><a class='btn btn-sm btn-success' href='update.php?id=$row[id] &
                                    Position=$row[Position] & Qualification=$row[Qualification] & 
                                    Location=$row[Location] & Experience=$row[Experience] & Details=$row[Details] & Description=$row[Description]'> update </a> 
                                    <a class='btn btn-sm btn-danger' href='delete.php?id=$row[id]'>Delete</a></td>
                                </tr>";
                                $i++;
                            }
                            echo "</table>";
                        } else {
                            echo "No data found";
                        }
                        // Close the database connection
                        $conn->close();
                        ?>
                        

                    </div>
                </div>
            </div>


            <!-- Job Listings End -->
<?php include_once'footer.php';  ?>