<?php 
    $good_email = "test@gmail.com";
    $good_pass = "password";
    
    if ($good_email == $_POST["email"] && $good_pass == $_POST["password"]) {
        echo '{"credentialsValid":true, "uid":1481395286486}';
        //echo '"email": "' . $_POST["email"] . '",';
        //echo '"password": "' . $_POST["password"] . '"}'; 
    } else {
        echo '{"credentialsValid":false,';
        echo '"email": "' . $_POST["email"] . '",';
        echo '"password": "' . $_POST["password"] . '"}';
    }
?>