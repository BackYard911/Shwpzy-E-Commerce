<?php

class Product
{

    private static $conn;
    public $id;
    public $title;
    public $price;
    public $quantity;
    public $description;
    public $category_id;
    public $category_name;
    public $created_at;


    public static function set_connection($db_conn)
    {
        Product::$conn = $db_conn;
    }

    public function __construct($title, $price, $quantity, $description, $category_id)
    {
        $this->title = $title;
        $this->price = $price;
        $this->quantity = $quantity;
        $this->description = $description;
        $this->category_id = $category_id;
    }



    public static function findAll()
    {
        $query = "SELECT
                p.id,
                p.title,
                p.price,
                p.quantity,
                p.description,
                p.category_id,
                c.name AS category_name,
                p.created_at
                FROM
                products p
                 JOIN
                    categories  c ON p.category_id = c.id
                ORDER BY 
                    p.created_at DESC

        ";
        //prepare statement
        $stmt = Product::$conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }


    public static function findById($id)
    {
        $query = "SELECT
        p.id,
        p.title,
        p.price,
        p.quantity,
        p.description,
        p.category_id,
        c.name AS category_name,
        p.created_at
        FROM
        products p
         JOIN
            categories  c ON p.category_id = c.id
        WHERE p.id = ?
        LIMIT 0,1
        ";
        //prepare statement
        $stmt = Product::$conn->prepare($query);
        $stmt->bindParam(1, $id);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $product = new Product($row['title'], $row['price'], $row['quantity'], $row['description'], $row['category_id']);
        $product->category_name = $row['category_name'];
        $product->created_at = $row['created_at'];
        $product->id = $row['id'];
        return $product;
    }

}
