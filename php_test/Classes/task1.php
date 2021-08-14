<?php
    namespace Classes;

    final class Task1 {
        private static $connection;
        private static $stmt;

        private function __construct() {
            $config = include_once('./dbConfig.php');
            try {
                self::$connection = new \PDO('mysql:host=' .$config['host'] .';dbname=' .$config['dbName'] , $config['user'], $config['password']);
                self::$connection->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_WARNING);
                print("Connected!");
                self::create();
                self::fill();   
            } catch (PDOException $e) {
                die($e->getMessage());
            }
        }

        public static function getConnection() {
            // Check is $_instance has been set
            if (self::$connection === null) {
                self::$connection = new self;
            }
            // Returns the instance
            return self::$connection;
        }

        private static function create() {
            echo '<br>in create';
            self::getConnection()->query("CREATE TABLE IF NOT EXISTS test(
                id INT AUTO_INCREMENT PRIMARY KEY,
                script_name NVARCHAR(25),
                sort_index INT,
                result NVARCHAR(10),
                CONSTRAINT sort_range CHECK (sort_index BETWEEN 1 AND 999),
                CONSTRAINT result_range CHECK (result IN ('normal', 'illegal', 'failed', 'success'))
            )");
            // return self::$stmt;
        } 
        private static function fill() {
            echo '<br>in fill';
            $sortIndex = rand(1, 999);
            echo '<br>';
            echo $sortIndex;
            $resultArr = ['normal', 'illegal', 'failed', 'success'];
            $resultRandom = rand(0, count($resultArr) - 1);
            $resultItem = $resultArr[$resultRandom];
            echo '<br>';
            echo $resultItem;
            $enLettersArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
            echo '<br>';
            $scriptName = [];

            for ($i = 0; $i < 25; $i++) {
                $index = rand(0, count($enLettersArr) - 1);
                $scriptName[] = $enLettersArr[$index];
            }
            $scriptName = implode($scriptName);
            echo $scriptName;

            for ($i = 0; $i < 1000; $i++) {
                // prepare statement!
                // self::getConnection()->query("INSERT INTO test VALUES ($scriptName, $sortIndex, $resultItem)");
            }
            
        }
    }
?>