<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;
use App\Services\SettingService;

class CustomizationController extends Controller
{
    protected $settingService;

    public function home() {
        return view('settings/home');
    }

    public function layout() {
        return view('settings/layout');
    }

    public function theme() {
        return view('settings/theme');
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
