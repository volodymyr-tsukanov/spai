<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
//use App\Models\Product;
use App\Http\Controllers\ProductController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::resource('products', ProductController::class);
Route::get('/products/search/{name}', [ProductController::class, 'search']);
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