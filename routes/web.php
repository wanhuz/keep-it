<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserHomeController;
use App\Http\Controllers\UserLayoutController;
use App\Http\Controllers\UserThemeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->middleware('auth');

// Authenticated routes...
Route::middleware('auth')->group(function () {

    // Posts
    Route::post('/post', [PostController::class, 'store']);
    Route::get('/load', [PostController::class, 'load']);
    Route::post('/update', [PostController::class, 'update']);
    Route::post('/delete', [PostController::class, 'delete']);

    // Tagging
    Route::get('/load-tag', [TagController::class, 'load']);
    Route::get('/load-note-tag', [TagController::class, 'load_notes_tag']);
    Route::post('/load-note-by-tag', [PostController::class, 'load_note_by_tag']);
    Route::post('/post-tag', [TagController::class, 'add']);
    Route::post('/add-tag', [TagController::class, 'tag_note']);
    Route::post('/delete-tag', [TagController::class, 'delete']);
    Route::post('/update-tag', [TagController::class, 'update']);

    // Search
    Route::get('/search', [PostController::class, 'search']);

    // Settings
    Route::get('/settings/home', [UserHomeController::class, 'index']);
    Route::get('/get-setting', [UserHomeController::class, 'get']);
    Route::get('/settings/layout', [UserLayoutController::class, 'index']);
    Route::get('/settings/theme', [UserThemeController::class, 'index']);
    Route::post('/post-setting', [UserHomeController::class, 'store']);

});