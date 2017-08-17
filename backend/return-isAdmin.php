<?php 
session_start();
require 'connect-to-db.php';

echo $_SESSION['isAdmin'];

?>