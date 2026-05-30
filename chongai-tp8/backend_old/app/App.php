<?php
namespace app;

use think\App as BaseApp;

class App extends BaseApp
{
    protected $middleware = [
        \app\middleware\Cors::class,
        \app\middleware\ApiAuth::class,
    ];
}
