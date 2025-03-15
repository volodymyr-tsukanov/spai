<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
//use App\Models\Product;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


//Trasy publiczne
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/products/search/{name}', [ProductController::class, 'search']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
//Trasy chronione
Route::group(['middleware' => ['auth:sanctum']], function() {
Route::post('/products', [ProductController::class, 'store']);
Route::patch('/products/{id}', [ProductController::class, 'update']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);
Route::post('/logout', [AuthController::class, 'logout']);
});

//Route::resource('products', ProductController::class);
//Route::get('/products/search/{name}', [ProductController::class, 'search']);
/*Route::get('/products', function(){
    return Product::all();
});*/
//Route::get('/products', [ProductController::class, 'index']);
//Route::get('products/{id}', [ProductController::class, 'show']);

/*Route::post('/products', function(){
    return Product::create([
    'name' => 'Produkt pierwszy',
    'description' => 'To jest przykladowy produkt',
    'price' => 235
    ]);
});*/
//Route::post('/products', [ProductController::class, 'store']);