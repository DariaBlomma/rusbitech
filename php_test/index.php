<?php
    function autoloader($class) {
        $class = str_replace("\\", "/", $class);
        $file = __DIR__ . "/$class.php";
        if (file_exists($file)) {
            require_once($file);
        }
    };
    spl_autoload_register('autoloader');

    $result = Classes\Task1::get();
    
    $result2 = Classes\Task3::select();

    $task2 = new Classes\Task2();
    $filtered = $task2->filter();
    include_once 'view.php';
?>
