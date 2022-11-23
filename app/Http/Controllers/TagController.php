<?php

namespace App\Http\Controllers;

use App\Models\Notes;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function add(Request $request) {

        $attributes = request()->validate([
            'name' => 'required',
        ]);
    
        Tag::create($attributes);
    }

    public function load() {
        return Tag::all();
    }

    public function load_notes_tag() {
        $notes_tag = \DB::table('notes_tag')
                        ->rightJoin('tags', 'notes_tag.tag_id', '=', 'tags.id')
                        ->whereNotNull('notes_tag.tag_id')
                        ->get();
        
        return $notes_tag;
    }

    public function tag_note(Request $request) {
        
        $attributes = request()->validate([
            'notes_id' => 'required',
            'tag_id' => 'required' 
        ]);

        $note = Notes::find($request->notes_id);

        if ($request->tag_id[0] == 0) {
            $note->tags()->detach();
        }
        else { 
            $note->tags()->sync($request->tag_id);
        }
        

        return;
    }
}
