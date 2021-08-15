<?php 
    namespace Classes;

    class Task2 {
        public function __construct() {}

        public function filter() {
            $dir = '/datafiles';
            // $dir = 'C:\Users\Руслан\Downloads';
            $files = array();
            // выбираются только английские буквы и цифры, по максиммуму без доп символов

            foreach(glob($dir . '/[!0-9]*[!a-zA-Z].ixt' ) as $file) {
            // foreach(glob($dir . '/[!0-9]*[!a-zA-Z].*' ) as $file) {
                if (is_file($file) && preg_match("/^[a-z0-9]*[^а-яё\s_()-\.]*\.[a-z]{3}$/i", basename($file))) {
                    $files[] = basename($file);	
                }
            }
            return $files;
        }
    }