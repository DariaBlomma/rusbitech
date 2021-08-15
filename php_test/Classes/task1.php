<?php
    namespace Classes;

    final class Task1 {
        private static $connection = null;
        private static $stmt;

        public static function getConnection() {
            $config = include_once('./dbConfig.php');
            // Check is $_instance has been set
            if (!self::$connection) {
                try {
                    self::$connection = new \PDO('mysql:host=' .$config['host'] .';dbname=' .$config['dbName'] , $config['user'], $config['password']);
                    self::create();
                    self::fill();  
                } catch (PDOException $e) {
                    die($e->getMessage());
                }
            }
            // Returns the instance
            return self::$connection;
        }

        private static function create() {
            self::getConnection()->query("CREATE TABLE IF NOT EXISTS test(
                id INT AUTO_INCREMENT PRIMARY KEY,
                script_name NVARCHAR(25),
                sort_index INT,
                result NVARCHAR(10),
                CONSTRAINT sort_range CHECK (sort_index BETWEEN 1 AND 999),
                CONSTRAINT result_range CHECK (result IN ('normal', 'illegal', 'failed', 'success'))
            )");
        } 

        private static function fill() {
            $stmt = self::getConnection()->query("SELECT COUNT(*) FROM test");
            $amount = $stmt->fetch();            
            if ($amount[0] > 0) {
                return;
            }
            $resultArr = ['normal', 'illegal', 'failed', 'success'];
            $enLettersArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

            for ($i = 0; $i < 1000; $i++) {
                $sortIndex = rand(1, 999);
                $resultRandom = rand(0, count($resultArr) - 1);
                $resultItem = $resultArr[$resultRandom];
                $scriptName = [];
                for ($j = 0; $j < 25; $j++) {
                    $index = rand(0, count($enLettersArr) - 1);
                    $scriptName[] = $enLettersArr[$index];
                }
                $scriptName = implode($scriptName);
                $stmt = self::getConnection()->prepare("INSERT INTO test (script_name, sort_index, result) VALUES (:scriptName, :sortIndex, :resultItem)");
                $stmt->execute(array(':scriptName' => $scriptName, ':sortIndex' => $sortIndex, ':resultItem' => $resultItem));
            }
        }

        public static function get() {
            $rows = self::getConnection()->query("SELECT * FROM test
            WHERE result IN ('normal', 'success')
            ORDER BY sort_index DESC LIMIT 20");
            return $rows->fetchAll(\PDO::FETCH_ASSOC);
        }
    }
?>