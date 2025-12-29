<?php
// Enter your Host, username, password, database below.
// I left password empty because i do not set password on localhost.
// $connect = mysqli_connect('localhost', 'root', '', 'dynamic-career');
    // Create a database connection
  // $servername = "localhost"; // Replace with your server name
  //   $username = "u790759855_dynamiccareer"; // Replace with your database username
  //   $password = "Dynamiccareer321"; // Replace with your database password
  //   $dbname = "u790759855_dynamiccareer"; // Replace with your database name

  $servername = "localhost"; // Replace with your server name
  $username = "u173844004_samarth_career"; // Replace with your database username
  $password = 'f2&P_Hy64CTmS5'; // Replace with your database password
  $dbname = "u173844004_samarth_career"; // Replace with your database name

    $conn = new mysqli($servername, $username, $password, $dbname);
if ($conn) {
	// echo "Connection Successfully";
}
else{
	echo "Sorry Some Mistakes is";
}
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
?>