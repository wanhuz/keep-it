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

class HomeController extends Controller
{
    private function getUser() {
        $userId = Auth::id();
        return User::find($userId);
    }

    public function index() {
        $userid = Auth::id();
        $user = $this->getUser();

        $notes = $user->notes()->get();
        $tags = $user->tags()->get();
        $settings = $user->settings()->get();

        if ($settings->first() == null) {
            SettingService::init($userid);
            $settings = $user->settings()->get();
        };

        return view('/home/home', compact('notes', 'tags', 'settings'));
    }
}
