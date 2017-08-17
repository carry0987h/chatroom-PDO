<?php

require 'connect-to-db.php';

$username = $_POST['username'];
$password = $_POST['password'];

$sql = 'INSERT INTO user (username, password, isAdmin) VALUES (?, ?, 0)';
$query = $handler->prepare($sql);

$query->execute([$username, $password]);

header('Location: ../login.html');
die();
?>