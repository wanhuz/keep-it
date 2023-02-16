<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\SettingController;
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
Route::get('/', [PostController::class, 'index'])->middleware('auth');
Route::post('/post', [PostController::class, 'store']);

Route::get('/load', [PostController::class, 'load'])->middleware('auth');
Route::post('/update', [PostController::class, 'update']);
Route::post('/delete', [PostController::class, 'delete']);

Route::get('/load-tag', [TagController::class, 'load'])->middleware('auth');
Route::get('/load-note-tag', [TagController::class, 'load_notes_tag'])->middleware('auth');
Route::post('/load-note-by-tag', [PostController::class, 'load_note_by_tag']);
Route::post('/post-tag', [TagController::class, 'add']);
Route::post('/add-tag', [TagController::class, 'tag_note']);
Route::post('/delete-tag', [TagController::class, 'delete']);
Route::post('/update-tag', [TagController::class, 'update']);

Route::get('/search', [PostController::class, 'search'])->middleware('auth');

Route::get('/get-setting', [SettingController::class, 'get'])->middleware('auth');
Route::post('/post-setting', [SettingController::class, 'store']);
