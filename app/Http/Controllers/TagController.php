<?php

namespace App\Http\Controllers;

use App\Models\Notes;
use App\Models\Tag;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Services\TagService;

class TagController extends Controller
{
    protected $tagService;

    public function __construct(TagService $tagService) {
        $this->tagService = $tagService;
    }

    public function store(Request $request) {
        $this->tagService->handleStore($request);
    }

    public function load() {
        return $this->tagService->handleLoad();
    }

    public function load_notes_tag() {
        $notes_tag = \DB::table('notes_tag')
                        ->rightJoin('tags', 'notes_tag.tag_id', '=', 'tags.id')
                        ->whereNotNull('notes_tag.tag_id')
                        ->get();
        
        return $notes_tag;
    }

    public function tag(Request $request) {
        $this->tagService->handleTag($request);
    }

    public function update(Request $request) {
        $this->tagService->handleUpdate($request);
    }

    public function delete(Request $request) {
        $this->tagService->handleDelete($request);
    }
}
