<?php
namespace think;

require __DIR__ . '/../vendor/autoload.php';

$app = new App();

$response = $app->run();

$response->send();

$app->end();
