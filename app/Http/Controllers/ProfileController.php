<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;
use App\Services\SettingService;
use App\Services\ProfileService;

class ProfileController extends Controller
{
    protected $settingService;
    protected $profileService;

    public function user() {
        $settings = $this->settingService->get();
        return view('settings/user', compact('settings'));
    }

    public function security() {
        $settings = $this->settingService->get();
        return view('settings/security', compact('settings'));
    }

    public function __construct(SettingService $settingService, ProfileService $profileService) {
        $this->settingService = $settingService;
        $this->profileService = $profileService;
    }

    public function store(Request $request) {
        $this->profileService->handleStore($request);
        return back();
    }
}
