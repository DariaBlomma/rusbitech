<?php
    public class Task1 {
        private static $instance;

        private function __construct()
        {
            try {
            // PDO Here
            print("Connected!");
            } catch (PDOException $e) {
            die($e->getMessage());
            }
        }

        public static function getInstance() {
            // Check is $_instance has been set
            if (self::$instance === null) {
                self::$instance = new self;  
            }

            // Returns the instance
            return self::$instance;
        }

        private function __clone() {
        }
    
        private function __wakeup() {
        }
    }
?>