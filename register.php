<?php

define('REQUIRED', 'El campo es requerido');
define('BETWEEN', 'Debe tener entre :min y :max caracteres');
define('EMAIL', 'Dirección de correo no valida');
define('MAX', 'Máximo :max caracteres');
define('MATCH', 'El campo no coincide con :campo');

if (isset($_POST)) {
    $errorBag = [];

    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    $password2 = $_POST['password'] ?? '';
    $telephone = $_POST['telephone'] ?? '';

    if (!$name) {
        $errorBag['name'] = REQUIRED;
    } else if (strlen($name) > 40) {
        $errorBag['name'] = str_replace(':max', 40, BETWEEN);
    }

    if (!$email) {
        $errorBag['email'] = REQUIRED;
    } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errorBag['email'] = EMAIL;
    }

    if (!$username) {
        $errorBag['username'] = REQUIRED;
    } else if (strlen($username) < 7 || strlen($username) > 40) {
        $errorBag['username'] = str_replace([':min', ':max'], [7, 14], BETWEEN);
    }

    if (!$password) $errorBag['password'] = REQUIRED;
    if (!$password2) $errorBag['password2'] = REQUIRED;
    if (!$telephone) $errorBag['telephone'] = REQUIRED;

    if ($password && $password2 && strcmp($password, $password2)) {
        $errorBag['password2'] = str_replace(':campo', 'password', MATCH);
    }

    if (empty($errorBag)) {
        echo json_encode('Sin errores');
    } else {
        echo json_encode($errorBag);
    }
}
