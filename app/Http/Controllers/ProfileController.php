<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;
use App\Services\SettingService;

class ProfileController extends Controller
{
    protected $settingService;

    public function user() {
        $settings = $this->settingService->get();
        return view('settings/user', compact('settings'));
    }

    public function security() {
        $settings = $this->settingService->get();
        return view('settings/security', compact('settings'));
    }

    public function __construct(SettingService $settingService) {
        $this->settingService = $settingService;
    }
}
