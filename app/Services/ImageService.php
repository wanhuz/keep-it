<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Image;
use App\Models\Notes;

class ImageService {

    public function handleStore(Request $request) {
        $user = Auth::user();
        $noteId = $request->note_id;
        $images = $this->extractImage($request);

        $this->storeImages($noteId, $images);

    }

    public function handleGet() {
        $user = Auth::user();
        $notes = $user->notes();

        $images = $notes->rightJoin('images', 'notes.id', '=', 'images.notes_id')
                        ->select('images.notes_id', 'images.path', 'images.id')
                        ->get();

        return $images;
    }

    private function storeImages($noteId, $images) {
        foreach ($images as $image) {
            $path = $image->store("uploads/image");

            Image::create(['notes_id' => $noteId, 
                            'path' => $path]);
        }
    }
    
    private function extractImage(Request $request) {
        $images = array();

        foreach ($request->all() as $key => $value) {
            if (str_contains($key, 'image')) {
                array_push($images, $value);
            }
        }

        return $images;
    }

}