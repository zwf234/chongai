<?php
use think\facade\Route;

// 根路径 - 显示欢迎信息
Route::get('/', function () {
    return '<h1>宠爱到家 - API 服务正常运行！</h1><p>访问 /api/pets 获取宠物列表</p><p>管理后台访问 /admin.html</p>';
});

// API 路由组
Route::group('api', function () {
    Route::post('login', 'UserController/login');
    Route::get('user', 'UserController/getUserInfo');
    
    Route::get('pets', 'PetController/getList');
    Route::get('pet/:id', 'PetController/getDetail');
    Route::post('pet', 'PetController/add');
    Route::put('pet/:id', 'PetController/update');
    Route::delete('pet/:id', 'PetController/delete');
    
    Route::post('favorite', 'FavoriteController/add');
    Route::delete('favorite/:id', 'FavoriteController/delete');
    Route::get('favorites', 'FavoriteController/getList');
    
    Route::post('application', 'ApplicationController/add');
    Route::get('applications', 'ApplicationController/getList');
    Route::put('application/:id', 'ApplicationController/update');
});

// 管理员路由组
Route::group('admin', function () {
    Route::post('login', 'UserController/adminLogin');
    Route::get('stats', 'UserController/getStats');
    
    Route::get('pets', 'PetController/getList');
    Route::get('pet/:id', 'PetController/getDetail');
    Route::post('pet', 'PetController/add');
    Route::put('pet/:id', 'PetController/update');
    Route::delete('pet/:id', 'PetController/delete');
    
    Route::get('applications', 'ApplicationController/getList');
    Route::put('application/:id', 'ApplicationController/update');
    
    Route::get('users', 'UserController/getUserList');
});
