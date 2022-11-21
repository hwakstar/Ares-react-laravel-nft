<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InfoController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::fallback(function() {
    return view('welcome');
});

Route::post('/detail',[InfoController::class, 'index']);
Route::post('/confirm',[InfoController::class, 'create']);
Route::get('/', function () {
    return view('welcome');
});
  