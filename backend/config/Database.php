<?php
class Database
{
    private $host = 'localhost';
    private $db_name = 'shop';
    private $Username = 'root';
    private $password = '';
    private $conn;


    public function connect()
    {
        $this->conn = null;
        try {
            $this->conn = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->db_name, $this->Username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); //set the error mode to get exceptions if something went wrong with the queries 
        } catch (PDOException $err) {
            echo 'connection error' . $err->getMessage();
        }
        return $this->conn;
    }
}
