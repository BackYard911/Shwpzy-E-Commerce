<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/Product.php';

$db = new Database();
$db_conn = $db->connect();

Product::set_connection($db_conn);

$result = Product::findAll();

$rowCount = $result->rowCount();

if ($rowCount > 0) {
    $products = [];
    $products['data'] = [];

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) { //fetch as assoc array
        extract($row); //extract properties as variables
        $product_item = [
            'id' => $id,
            'title' => $title,
            'price' => $price,
            'quantity' => $quantity,
            'description' => $description,
            'category_id' => $category_id,
            'category_name' => $category_name,
            'created_at' => $created_at
        ];
        $products['data'][] = $product_item;
    }
    echo json_encode($products);
} else {

    echo json_encode(['message' => 'No products found']);
}
