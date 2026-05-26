<?php
return [
    'default' => env('database.driver', 'mysql'),
    'connections' => [
        'mysql' => [
            'type' => 'mysql',
            'hostname' => env('database.hostname', '127.0.0.1'),
            'database' => env('database.database', 'chongai'),
            'username' => env('database.username', 'root'),
            'password' => env('database.password', 'root'),
            'hostport' => env('database.hostport', '3306'),
            'charset' => 'utf8mb4',
            'prefix' => 'chongai_',
            'debug' => env('app_debug', false),
        ],
    ],
];
