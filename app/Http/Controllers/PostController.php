<?php

namespace App\Http\Controllers;

use App\Models\Notes;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class PostController extends Controller
{
    public function index() {
        $notes = Notes::all();
        $tags = Tag::all();
        
        return view('index', ['notes' => $notes], ['tags' => $tags]);
    }

    public function store(Request $request) {

        $attributes = request()->validate([
            'title' => 'required',
            'body' => 'required',
        ]);
    

        Notes::create($attributes);
    }

    public function load() {
        return json_encode(Notes::all()) ;
    }

    public function update(Request $request) {

        $attributes = request()->validate([
            'title' => 'required',
            'body' => 'required',
        ]);

        Notes::where('id', $request->id)->increment('revision_count', 1);

        $note = Notes::find($request->id);

        $note->title = $request->title;
        $note->body = $request->body;

        $note->save();

    }

    public function delete(Request $request) {

        $note = Notes::find($request->id);

        $note->delete();
    }

    public function load_note_by_tag(Request $request) {
        $tag = $request->tag;

        $note_with_tag = Notes::whereHas('tags', function ($query) use($tag) {
                                return $query->where('tags.name', '=', $tag);
                                })->get();
        
        return json_encode($note_with_tag);
        
    }
}


