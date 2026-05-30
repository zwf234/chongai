<?php
use think\facade\Route;

Route::group('api', function () {
    Route::post('login', 'UserController/login');
    Route::post('register', 'UserController/register');
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
