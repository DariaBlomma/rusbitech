<?php
    namespace Classes;

    class Task3 extends Db {
        private static $connection = null;

        private static function create() {
            self::getConnection()->query("CREATE TABLE IF NOT EXISTS books(
                book_id INT AUTO_INCREMENT PRIMARY KEY,
                book_name NVARCHAR(100)
            ) ENGINE=InnoDB");
            self::getConnection()->query("CREATE TABLE IF NOT EXISTS authors(
                author_id INT AUTO_INCREMENT PRIMARY KEY,
                author_name NVARCHAR(100)
            ) ENGINE=InnoDB");
            self::getConnection()->query("CREATE TABLE IF NOT EXISTS books_authors(
                book_id INT,
                author_id INT,
                FOREIGN KEY (book_id) REFERENCES books (book_id),
                FOREIGN KEY (author_id) REFERENCES authors (author_id),
                CONSTRAINT book_author PRIMARY KEY (book_id, author_id)
            ) ENGINE=InnoDB ");
        }

        private static function fill() {
            $stmt = self::getConnection()->query("SELECT COUNT(*) FROM books");
            $amount = $stmt->fetch();            
            if ($amount[0] > 0) {
                return;
            }
            self::getConnection()->query("INSERT INTO books (book_name) VALUES 
            ('happy new year'), ('rosmarin'), ('harpa toner'), ('otherwise'), ('awake and alive'),
            ('suurin'), ('mamma mia'), ('elva kvinnor i ett hus'), ('oh, christmas tree'), ('I surrender'),
            ('I need a hero'), ('Fields of gold'), ('I will always love you')
            ");
            self::getConnection()->query("INSERT INTO authors (author_name) VALUES 
            ('Agnetha Faltskog'), ('Anni Frig Lingstad'), ('Bjorn Ulveus'), ('Benni Andrersson'), 
            ('Olyver Sa Tyr'), ('Fiona Ruggerberg'), ('Laura Fella'), ('Niel Mitra') , ('Stephan Groth'),
            ('Rugiger Maul'), ('Skye Edwards'), ('Ross Godfrey'), ('Paul Gofrey'), ('Daisy Martey'), ('John Cooper'),
            ('Korey Cooper'), ('Jen Ledger'), ('Seth Morrison'), ('Kati Ran'), ('Lark'), ('Elk'), ('Fable'), 
            ('Candice Night'), ('Richie Blackmore'), ('Jon Lord'), ('Nick Simper'), ('Rod Ewans'), ('Glenn Hughes'), 
            ('david Coverdale'), ('Tommy Bolin'), ('Joe Lynn Turner'), ('Sting'), ('Whitney Houston')        
            ");
            self::getConnection()->query("INSERT INTO books_authors  VALUES 
            (1, 1),
            (1, 2),
            (1, 3),
            (1, 4),
            (2, 5),
            (2, 6),
            (2, 7),
            (2, 8),
            (2, 9),
            (2, 10),
            (3, 5),
            (3, 6),
            (3, 7),
            (3, 8),
            (3, 9),
            (3, 10),
            (3, 19),
            (3, 20),
            (3, 21),
            (3, 22),
            (4, 11),
            (4, 12),
            (4, 13),
            (4, 14),
            (5, 15),
            (5, 16),
            (5, 17),
            (5, 18),
            (6, 5),
            (6, 6),
            (6, 7),
            (6, 8),
            (6, 9),
            (6, 10),
            (6, 19),
            (6, 20),
            (6, 21),
            (6, 22),
            (7, 1),
            (7, 2),
            (7, 3),
            (7, 4),
            (8, 1),
            (9, 23),
            (9, 24),
            (10, 24),
            (10, 25),
            (10, 26),
            (10, 27),
            (10, 28),
            (10, 29),
            (10, 30),
            (10, 31),
            (10, 23),
            (11, 15),
            (11, 16),
            (11, 17),
            (11, 18),
            (12, 32),
            (13, 33)
            ");
        }

        public static function select() {
            self::create();
            self::fill();
            $data = self::getConnection()->query("SELECT 
                books.book_name,
                COUNT(*) AS amount
                FROM books_authors
                JOIN books ON books_authors.book_id = books.book_id
                GROUP BY books_authors.book_id
                HAVING amount > 3
                ORDER BY amount DESC
            ");
            return $data->fetchAll(\PDO::FETCH_ASSOC);
        }
    }
?>