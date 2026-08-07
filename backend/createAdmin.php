<?php

$pdo = new PDO(
    "mysql:host=127.0.0.1;dbname=seminariophp;charset=utf8mb4",
    "root",
    ""
);

$password = password_hash("admin", PASSWORD_DEFAULT);

$stmt = $pdo->prepare("
    INSERT INTO users (name, email, password, is_admin)
    VALUES (?, ?, ?, ?)
");

$stmt->execute([
    "Admin",
    "admin@email.com",
    $password,
    1
]);

echo "Administrador creado.";

