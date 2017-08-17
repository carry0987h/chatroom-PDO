<?php
session_start();

$username = $_POST['username'];
$password = $_POST['password'];

if ($username && $password) {
	require 'connect-to-db.php';

	$sql = "SELECT * FROM user WHERE username=? AND password=?";
	$query = $handler->prepare($sql);

	$query->execute([$username, $password]);

	$result = $query->fetch(PDO::FETCH_ASSOC);

	

	if ($result) {
		echo 'success';
        $_SESSION['username'] = $username;
        $_SESSION['user_id'] = $result['id'];
		$_SESSION['isAdmin'] = 0;

        header("Location: ../index.php");
        die();
	}
	else {
		echo 'failure';
		header('Location: ../login.html');
		die();
	}
}
else {
	die("Please enter a username and a password");
}

?>