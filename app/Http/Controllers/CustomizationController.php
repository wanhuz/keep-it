<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;
use App\Services\SettingService;

class CustomizationController extends Controller
{
    protected $settingService;

    public function home() {
        $settings = $this->settingService->get();
        return view('settings/home', compact('settings'));
    }

    public function layout() {
        $settings = $this->settingService->get();
        return view('settings/layout', compact('settings'));
    }

    public function theme() {
        $settings = $this->settingService->get();
        return view('settings/theme', compact('settings'));
    }

    public function __construct(SettingService $settingService) {
        $this->settingService = $settingService;
    }

    public function store(Request $request) {
        $this->settingService->handleStore($request);
        return back();
    }

    public function get() {
        return $this->settingService->get();
    }
}
