<?php

namespace App\Services;

use App\Models\Notes;
use App\Models\Tag;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class TagService {

    public function handleStore(Request $request) {

        $attributes = request()->validate([
            'name' => 'required',
        ]);

        $user = Auth::user();
        $user->tags()->create($attributes);
    }

    public function handleLoad() {
        $user = Auth::user();
        return $user->tags()->get();
    }

    public function handleGetNoteWithTag() {
        $notes_tag = \DB::table('notes_tag')
                        ->rightJoin('tags', 'notes_tag.tag_id', '=', 'tags.id')
                        ->whereNotNull('notes_tag.tag_id')
                        ->get();
        
        return $notes_tag;
    }

    public function handleTag(Request $request) {
        
        $attributes = request()->validate([
            'notes_id' => 'required',
            'tag_id' => 'required' 
        ]);
        
        $user = Auth::user();
        $note = $user->notes()->find($request->notes_id);

        if ($request->tag_id[0] == 0) {
            $note->tags()->detach();
        }
        else { 
            $note->tags()->sync($request->tag_id);
        }
        
        return;
    }

    public function handleUpdate(Request $request) {

        $attributes = request()->validate([
            'id' => 'required',
            'name' => 'required' 
        ]);

        $user = Auth::user();
        $tag = $user->tags()->find($request->id);

        $tag->name = $request->name;
        $tag->save();
    }

    public function handleDelete(Request $request) {

        $attributes = request()->validate([
            'id' => 'required'
        ]);

        $user = Auth::user();

        $tag = $user->tags()->find($request->id);
        $tag->delete();
    }
}
