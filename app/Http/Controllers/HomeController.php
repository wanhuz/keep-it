<?php

namespace App\Http\Controllers;

use App\Services\HomeService;

class HomeController extends Controller
{
    protected $homeService;

    public function __construct(HomeService $homeService) {
        $this->homeService = $homeService;
    }

    public function index() {
        $this->homeService->initIfUserSettingDoesNotExist();
        return view('/home/home');
    }
}
