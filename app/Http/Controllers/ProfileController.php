<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ProfileService;

class ProfileController extends Controller
{
    protected $profileService;

    public function user() {
        return view('settings/user');
    }

    public function security() {
        return view('settings/security');
    }

    public function __construct(ProfileService $profileService) {
        $this->profileService = $profileService;
    }

    public function store(Request $request) {
        $this->profileService->handleStore($request);
        return back();
    }
}
