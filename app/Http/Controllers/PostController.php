<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\PostService;

class PostController extends Controller
{
    protected $postService;

    public function __construct(PostService $postService) {
        $this->postService = $postService;
    }

    public function store(Request $request) {
        return $this->postService->handleStore($request);
    }

    public function update(Request $request) {
        $this->postService->handleUpdate($request);
    }

    public function delete(Request $request) {
        $this->postService->handleDelete($request);
    }

    public function search(Request $request) {
        return $this->postService->handleSearch($request);
    }
} 


