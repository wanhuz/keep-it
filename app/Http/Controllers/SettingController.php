<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;

class SettingController extends Controller
{
    public function store(Request $request) {

        // return $request['app-name'];
        $userSetting = $request->all();

        foreach ($userSetting as $key => $value) {
            if ($key == "_token") continue;

            switch($key) {
                case "favicon-img":
                    $value = request()->file('favicon-img')->store('favicon');
            }

            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }
        
        return $userSetting;
    }
}
