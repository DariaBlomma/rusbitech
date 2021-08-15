<?php
    function autoloader($class) {
        $class = str_replace("\\", "/", $class);
        $file = __DIR__ . "/$class.php";
        if (file_exists($file)) {
            require_once($file);
        }
    };
    spl_autoload_register('autoloader');

    // Classes\Task1::getConnection();
    $result = Classes\Task1::get();
    

    // Classes\Task3::sayHi();
    $result2 = Classes\Task3::select();

    include_once 'task1View.php';
?>
