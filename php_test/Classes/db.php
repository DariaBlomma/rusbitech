<?php
    namespace Classes;

    class Db {
        private static $connection = null;

        public static function getConnection() {
            $config = include_once($_SERVER['DOCUMENT_ROOT'] . '/php_test/dbConfig.php');
            // на хостинге
            // $config = include_once($_SERVER['DOCUMENT_ROOT'] . '/rusbitech/php_test/dbConfig.php');

            // Check is $_instance has been set
            if (!self::$connection) {
                try {
                    self::$connection = new \PDO('mysql:host=' .$config['host'] .';dbname=' .$config['dbName'] , $config['user'], $config['password']);
                } catch (PDOException $e) {
                    die($e->getMessage());
                }
            }
            // Returns the instance
            return self::$connection;
        }
    }