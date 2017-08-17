<?php
require 'connect-to-db.php';

$query = $handler->query('SELECT content, time, username, sender_id, message.id FROM message INNER JOIN user ON message.sender_id=user.id ORDER BY message.id DESC LIMIT 20');
echo json_encode($query->fetchAll(PDO::FETCH_ASSOC));
?>