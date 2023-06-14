<?php

namespace App\Http\Controllers;

use App\Models\Notes;
use App\Models\Tag;
use App\Models\Setting;
use App\Models\User;
use DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Services\PostService;


class PostController extends Controller
{
    protected $postService;

    public function __construct(PostService $postService) {
        $this->postService = $postService;
    }

    public function store(Request $request) {
        $this->postService->handleStore($request);
    }

    public function update(Request $request) {
        $this->postService->handleUpdate($request);
    }

    public function delete(Request $request) {
        $this->postService->handleDelete($request);
    }

    public function load_note_by_tag(Request $request) {
        $user = Auth::user();

        $tag = $request->tag;

        $note_with_tag = $user->notes()->whereHas('tags', function ($query) use($tag) {
                                                return $query->where('tags.name', '=', $tag);})->get();
        
        return json_encode($note_with_tag);
    }

    public function search(Request $request) {
        return $this->postService->handleSearch($request);
    }
} 


