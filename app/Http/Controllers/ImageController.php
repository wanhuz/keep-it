<?php

namespace App\Http\Controllers;

use App\Services\ImageService;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    protected $imageService;

    public function __construct(ImageService $imageService) {
        $this->imageService = $imageService;
    }

    public function store(Request $request) {
        $this->imageService->handleStore($request);
    }

    public function get() {
        return $this->imageService->handleGet();
    }
}
