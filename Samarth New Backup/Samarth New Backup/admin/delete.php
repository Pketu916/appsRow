<?php
include ('connection.php');
$id = $_GET['id'];
$sql ="DELETE FROM `information` WHERE id='$id'";
$data = mysqli_query($conn,$sql);
if ($data) {
	echo "deleted";
	header('location:index.php');
}else
{
	echo "error";
}
 ?>