<?php
session_start();

require 'connect-to-db.php';

$userId = $_SESSION['user_id'];
$content = $_POST['message'];

$sql = 'INSERT INTO message (time, sender_id, content) VALUES (NOW(), ?, ?)';
$query = $handler->prepare($sql);

$query->execute([$userId, $content]);
?>