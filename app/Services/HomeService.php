<?php

namespace App\Services;

use App\Services\SettingService;

class HomeService {
    protected $settingService;

    public function __construct(SettingService $settingService) {
        $this->settingService = $settingService;
    }

    public function initIfUserSettingDoesNotExist() {
        if (!$this->settingService->isUserSettingExists()) 
            $this->settingService->init();
    }

}