<?php
   session_start();
   unset($_SESSION['username']);
   unset($_SESSION['user_id']);
   unset($_SESSION['isAdmin']);
   
   header('Location: ../login.html');
   die();
?>