<?php 
    namespace Classes;

    class Task2 {
        public function __construct() {
            

            
        }

        public function filter() {
                        // $dir = '\datafiles';
            // $dir = 'C:\Programming';
            // $dir = $_SERVER['DOCUMENT_ROOT'];
            // . "/php_test"
            // $dir = './../';
            // $dir = __DIR__;
            $dir = 'C:\Users\Руслан\Downloads';
            $test = 'hte 8testрусский ';
            //echo $dir;
            $files = array();
            if (preg_match("/^[a-zA-Z0-9\s]+$/", $test)) {
                // $files[] = basename($file);	
                // echo $test;
            }
            // foreach(glob($dir . '/*.ixt') as $file) {
                // '/[a-zA-Z0-9]*'
                // [^а-яА-ЯЁё]
                // [a-zA-Z0-9\s]
                // [^а-яё]*

                // '/[!0-9][a-zA-Z0-9]*[!a-zA-Z].*'
// выбираются только английские буквы и цифры, по максиммуму без доп символов
            // foreach(glob($dir . '/[!0-9][a-zA-Z0-9]*[!a-zA-Z].*' ) as $file) {
                foreach(glob($dir . '/[!0-9]*[!a-zA-Z].*' ) as $file) {
                // echo basename($file ."<br>");
                // if (is_file($file) && preg_match("/^[^а-яё]+$/i", basename($file))) {
                    if (is_file($file) && preg_match("/^[a-z0-9]*[^а-яё\s_()-\.]*\.[a-z]{3}$/i", basename($file))) {
                    $files[] = basename($file);	
                }
            } 
            
            // echo count($files);

            // print_r($files);
            return $files;
        }
    }