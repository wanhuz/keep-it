<?php

namespace App\Http\Controllers;

use App\Models\Notes;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index() {
        $notes = Notes::all();

        return view('index', compact('notes'));
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
}


