<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\TagController;
use Illuminate\Support\Facades\Route;

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
Route::get('/', [PostController::class, 'index']);
Route::post('/post', [PostController::class, 'store']);

Route::get('/load', [PostController::class, 'load']);
Route::post('/update', [PostController::class, 'update']);
Route::post('/delete', [PostController::class, 'delete']);

Route::post('/post-tag', [TagController::class, 'add']);
Route::get('/load-tag', [TagController::class, 'load']);
Route::get('/load-note-tag', [TagController::class, 'load_notes_tag']);
//Route::get('/', [PostController::class, 'index'])->middleware('auth');
//Route::post('/posts', [PostController::class, 'store'])->middleware('auth');


