<?php

namespace App\Http\Controllers;

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
                        ->get();
        
        return $notes_tag;
    }
}
