<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\CustomizationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
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
    Route::get('/settings/home', [CustomizationController::class, 'home']);
    Route::get('/settings/layout', [CustomizationController::class, 'layout']);
    Route::get('/settings/theme', [CustomizationController::class, 'theme']);
    Route::get('/settings/user', [ProfileController::class, 'user']);
    Route::get('/settings/security', [ProfileController::class, 'security']);

    Route::post('/settings/user', [ProfileController::class, 'store']);
    Route::get('/get-setting', [CustomizationController::class, 'get']);
    Route::post('/post-setting', [CustomizationController::class, 'store']);

});