<?php

namespace App\Http\Controllers;

use App\Models\Notes;
use App\Models\Tag;
use App\Models\Setting;
use App\Models\User;
use DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Services\SettingService;
use Tiptap;

class HomeController extends Controller
{

    public function index() {
        $user = Auth::user();
        $notes = $user->notes()->get();

        $settings = $user->settings()->get();

        if ($settings->first() == null) {
            SettingService::init($userid);
            $settings = $user->settings()->get();
        };

        return view('/home/home');
    }
}
