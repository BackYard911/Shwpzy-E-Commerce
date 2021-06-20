<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/Product.php';

$db = new Database();
$db_conn = $db->connect();

Product::set_connection($db_conn);

$id = isset($_GET['id']) ? $_GET['id'] : null;
if ($id === null) {
    echo json_encode(['message' => 'please send product id']);
} else {

    $product = Product::findById($id);
    $product_item = [
        'id' => $product->id,
        'title' => $product->title,
        'price' => $product->price,
        'quantity' => $product->quantity,
        'description' => $product->description,
        'category_id' => $product->category_id,
        'category_name' => $product->category_name,
        'created_at' => $product->created_at
    ];

    echo json_encode($product_item);
}
