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
}
