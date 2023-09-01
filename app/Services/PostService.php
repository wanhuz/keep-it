<?php

namespace App\Services;

use App\Models\Notes;
use App\Models\Tag;
use App\Models\Setting;
use App\Models\User;
use DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Services\SettingService;
use App\Services\EditorService;

class PostService {

    protected $editorService;

    public function __construct(EditorService $editorService) {
        $this->editorService = $editorService;
    }

    public function handleStore(Request $request) {

        $attributes = $request->validate([
            'title' => 'required',
            'body' => 'required',
        ]);

        $request->body = json_encode($request->body);
    
        $user = Auth::user();
        $storedNote = $user->notes()->create(['title' => $request->title, 
                                    'body' => $request->body]);

        return $storedNote;
    }

    public function handleUpdate(Request $request) {

        $attributes = request()->validate([
            'title' => 'required',
            'body' => 'required',
        ]);

        $user = Auth::user();
        $user->notes()->where('id', $request->id)->increment('revision_count', 1);

        $note = $user->notes()->find($request->id);
        $note->title = $request->title;
        $note->body = $request->body;

        $note->save();
    }

    public function handleDelete(Request $request) {
        $user = Auth::user();
        $note = $user->notes()->find($request->id);

        $note->delete();
    }

    public function handleSearch(Request $request) {
        $user = Auth::user();
        $note = $user->notes()->filter($request->all())->get();
        
        return $this->editorService->transformNoteBodyHTML($note);
    }



}