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

class PostController extends Controller
{
    private function getUser() {
        $userId = Auth::id();
        return User::find($userId);
    }

    public function index() {
        $user = $this->getUser();

        $notes = $user->notes()->get();
        $tags = $user->tags()->get();
        $settings = Setting::all();
        
        return view('index', compact('notes', 'tags', 'settings'));
    }

    public function store(Request $request) {

        $attributes = request()->validate([
            'title' => 'required',
            'body' => 'required',
        ]);
    
        $user = $this->getUser();
        $user->notes()->create($attributes);
    }

    public function load() {
        $user = $this->getUser();

        return json_encode($user->notes()->get()) ;
    }

    public function update(Request $request) {

        $attributes = request()->validate([
            'title' => 'required',
            'body' => 'required',
        ]);

        $user = $this->getUser();

        $user->notes()->where('id', $request->id)->increment('revision_count', 1);

        $note = $user->notes()->find($request->id);

        $note->title = $request->title;
        $note->body = $request->body;

        $note->save();

    }

    public function delete(Request $request) {
        $user = $this->getUser();

        $note = $user->notes()->find($request->id);

        $note->delete();
    }

    public function load_note_by_tag(Request $request) {
        $user = $this->getUser();

        $tag = $request->tag;

        $note_with_tag = $user->notes()->whereHas('tags', function ($query) use($tag) {
                                                return $query->where('tags.name', '=', $tag);})->get();
        
        return json_encode($note_with_tag);
        
    }

    public function search() {
        $user = $this->getUser();

        return $user->notes()->filter(request(['searchQuery', 'filterBy']))->get();
    }
} 


