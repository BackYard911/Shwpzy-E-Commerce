<?php

class Order
{

    private static $conn;
    public $id;
    public $name;
    public $address;
    public $phone;
    public $total;
    public $created_at;
    public $products;


    public static function set_connection($db_conn)
    {
        Order::$conn = $db_conn;
    }

    public function __construct($name, $address, $phone, $total, $products)
    {
        $this->name = $name;
        $this->address = $address;
        $this->phone = $phone;
        $this->total = $total;
        $this->products = $products;
    }



    // public static function findAll()
    // {
    //     $query = "SELECT
    //             o.id,
    //             o.name,
    //             o.address,
    //             o.phone,
    //             o.total,
    //             o.created_at
    //             FROM
    //             orders o
    //             ORDER BY 
    //                 o.created_at DESC

    //     ";
    //     //prepare statement
    //     $stmt = Order::$conn->prepare($query);
    //     $stmt->execute();
    //     return $stmt;
    // }


    // public static function findById($id)
    // {
    //     $query = "SELECT
    //     o.id,
    //     o.name,
    //     o.address,
    //     o.phone,
    //     o.total,
    //     o.created_at
    //     FROM
    //     orders o
    //     WHERE o.id = ?
    //     LIMIT 0,1
    //     ";
    //     //prepare statement
    //     $stmt = Order::$conn->prepare($query);
    //     $stmt->bindParam(1, $id);
    //     $stmt->execute();
    //     $row = $stmt->fetch(PDO::FETCH_ASSOC);
    //     $order = new Order($row['name'], $row['address'], $row['phone'], $row['total']);
    //     $order->created_at = $row['created_at'];
    //     $order->id = $row['id'];
    //     return $order;
    // }

    public static function create($order)
    {

        $query = "INSERT INTO orders
                SET 
                    name = :name,
                    address = :address,
                    phone = :phone,
                    total = :total,
                ";

        $stmt = Order::$conn->prepare($query);
        // validate data to pervent malicious submissions 
        $order->name = htmlspecialchars(strip_tags($order->name));
        $order->address = htmlspecialchars(strip_tags($order->address));
        $order->phone = htmlspecialchars(strip_tags($order->phone));
        $order->total = htmlspecialchars(strip_tags($order->total));
        $stmt->bindParam(':name', $order->name);
        $stmt->bindParam(':address', $order->address);
        $stmt->bindParam(':phone', $order->phone);
        $stmt->bindParam(':total', $order->total);
        if ($stmt->execute()) {
            return true;
        }
        //print error
        printf("Error: %s.\n", $stmt->error);
    }
}
