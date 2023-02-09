<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;
use App\Services\SettingService;

class SettingController extends Controller
{
    protected $settingService;

    public function __construct(SettingService $settingService) {
        $this->settingService = $settingService;
    }

    public function store(Request $request) {
        $this->settingService->handleStore($request);
    }

    public function get() {
        return $this->settingService->get();
    }
}
